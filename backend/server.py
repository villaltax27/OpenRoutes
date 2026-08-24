#!/usr/bin/env python3
"""
Local web server and Ollama proxy for the OpenRoutes voice assistant.

Run from the OpenRoutes project:
    python backend/server.py

Then open:
    http://127.0.0.1:5500
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent
DEFAULT_MODEL = os.environ.get("OLLAMA_MODEL", "gemma3:1b")
OLLAMA_CHAT_URL = os.environ.get(
    "OLLAMA_CHAT_URL",
    "http://127.0.0.1:11434/api/chat",
)

ALLOWED_ACTIONS = {
    "navigate",
    "scroll",
    "read_page",
    "summarize_page",
    "stop_reading",
    "go_back",
    "go_forward",
    "high_contrast",
    "dark_mode",
    "text_size",
    "search_destinations",
    "filter_destinations",
    "open_tab",
    "add_favorite",
    "book_trip",
    "fill_planner",
    "save_plan",
    "checklist",
    "video_menu",
    "click_visible",
    "logout",
    "read_menu",
    "repeat_help",
    "stop_assistant",
    "answer",
    "none",
}

ALLOWED_TARGETS = {
    "home",
    "destinations",
    "plan_trip",
    "about",
    "contact",
    "favorites",
    "interpreters",
    "steven",
    "login",
    "register",
    "settings",
    "faq",
    "accessibility_statement",
    "santa_ana",
    "coatepeque",
    "el_tunco",
    "suchitoto",
    "historic_center",
    "cerro_verde",
    "ruta_flores",
    "none",
}

ALLOWED_VALUES = {
    "up",
    "down",
    "top",
    "bottom",
    "on",
    "off",
    "increase",
    "decrease",
    "all",
    "nature",
    "beach",
    "culture",
    "lake",
    "wheelchair",
    "low-walking",
    "restrooms",
    "sign-language",
    "guide",
    "relaxed",
    "hiking",
    "photo",
    "family",
    "food",
    "easy-access",
    "az",
    "recommended",
    "overview",
    "practical",
    "accessibility",
    "things",
    "location",
    "guides",
    "tips",
    "security",
    "travel",
    "language",
    "notifications",
    "privacy",
    "none",
}

OUTPUT_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "action": {
            "type": "string",
            "enum": sorted(ALLOWED_ACTIONS),
        },
        "target": {
            "type": "string",
            "enum": sorted(ALLOWED_TARGETS),
        },
        "value": {
            "type": "string",
            "enum": sorted(ALLOWED_VALUES),
        },
        "reply": {
            "type": "string",
            "maxLength": 180,
        },
        "query": {
            "type": "string",
            "maxLength": 100,
        },
    },
    "required": ["action", "target", "value", "query", "reply"],
    "additionalProperties": False,
}

SYSTEM_PROMPT = """
You are the command interpreter for OpenRoutes, an accessible tourism website
about El Salvador.

The user speaks English. Convert the user's request into one safe website
action. The response must exactly follow the supplied JSON schema.

Available pages and destinations. Use the target name shown in parentheses:
- home (home)
- destinations (destinations)
- plan your trip or trip planner (plan_trip)
- about (about)
- contact (contact)
- favorites (favorites)
- interpreters, guides, or local guides (interpreters)
- Steven interpreter profile (steven)
- login (login)
- register (register)
- settings (settings)
- FAQ or help page (faq)
- accessibility statement (accessibility_statement)
- Santa Ana Volcano (santa_ana)
- Lake Coatepeque (coatepeque)
- El Tunco Beach (el_tunco)
- Suchitoto (suchitoto)
- Historic Center of San Salvador (historic_center)
- Cerro Verde tour (cerro_verde)
- Ruta de las Flores tour (ruta_flores)

Available actions:
- navigate: open an allowed page or destination
- scroll: value must be up, down, top, or bottom
- read_page: read visible page content
- summarize_page: briefly summarize the current page
- stop_reading
- go_back
- go_forward
- high_contrast: value must be on or off
- dark_mode: value must be on or off
- text_size: value must be increase or decrease
- search_destinations: search the destinations page. Put the search words in query.
- filter_destinations: apply a destination filter. Value can be nature, beach, culture, lake, wheelchair, low-walking, restrooms, sign-language, guide, relaxed, hiking, photo, family, food, easy-access, az, recommended, or all.
- open_tab: open a visible page section or tab. Value can be overview, practical, accessibility, things, location, guides, tips, security, travel, language, notifications, or privacy.
- add_favorite: click the favorite button for the current destination, interpreter, or visible item.
- book_trip: open the booking area or booking button.
- fill_planner: update the Plan Your Trip form. Put desired style, time, support, and start point in query.
- save_plan: save the current plan.
- checklist: update or show the trip checklist. Put the item in query and use value on or off.
- video_menu: open or close the sign language navigation menu. Value must be on or off.
- click_visible: click a visible local button/link by label. Put the label in query.
- read_menu: read the main navigation options.
- logout: log out from the local session.
- repeat_help
- stop_assistant
- answer: briefly answer a question using only the supplied page context
- none: unclear, unrelated, or unsupported request

Rules:
1. Never invent a URL, JavaScript, selector, file, command, or action.
2. For navigate, use only an allowed target.
3. For click_visible, use only labels that are likely visible on the current page, such as Contact Support, Find Guide, View Destination, or Book Trip.
4. For answer, only use facts present in the page context.
5. Keep reply friendly, in English, and under 25 words.
6. If uncertain, use action "answer" for help questions or "none" for unsupported requests.
7. Interpret phrases such as "come to the home" as navigation to home.
8. Always include query. Use an empty string when no query is needed.
""".strip()


def safe_result(raw_result: Any) -> dict[str, str]:
    """Validate the model result before returning it to the browser."""
    fallback = {
        "action": "none",
        "target": "none",
        "value": "none",
        "query": "",
        "reply": "I did not understand that command.",
    }

    if not isinstance(raw_result, dict):
        return fallback

    action = raw_result.get("action")
    target = raw_result.get("target", "none")
    value = raw_result.get("value", "none")
    query = raw_result.get("query", "")
    reply = raw_result.get("reply", "")

    action_aliases = {
        "open": "navigate",
        "go": "navigate",
        "visit": "navigate",
        "show_page": "navigate",
        "go_to": "navigate",
        "summarize": "summarize_page",
        "summary": "summarize_page",
        "read_navigation": "read_menu",
        "read_navbar": "read_menu",
        "sign_out": "logout",
    }
    if isinstance(action, str):
        action = action_aliases.get(action.strip().lower(), action.strip().lower())

    target_aliases = {
        "home page": "home",
        "homepage": "home",
        "destination": "destinations",
        "destination page": "destinations",
        "plan your trip": "plan_trip",
        "planner": "plan_trip",
        "about us": "about",
        "contact us": "contact",
        "help": "faq",
        "questions": "faq",
        "accessibility statement": "accessibility_statement",
        "lake coatepeque": "coatepeque",
        "coatepeque lake": "coatepeque",
        "el tunco beach": "el_tunco",
        "santa ana volcano": "santa_ana",
        "historic center": "historic_center",
        "historical center": "historic_center",
        "centro historico": "historic_center",
        "cerro verde tour": "cerro_verde",
        "ruta de las flores": "ruta_flores",
    }
    if isinstance(target, str):
        target = target_aliases.get(target.strip().lower(), target.strip().lower())

    if action not in ALLOWED_ACTIONS:
        return fallback
    if target not in ALLOWED_TARGETS:
        target = "none"
    if value not in ALLOWED_VALUES:
        value = "none"
    if not isinstance(query, str):
        query = ""
    if not isinstance(reply, str) or not reply.strip():
        reply = fallback["reply"]

    query = " ".join(query.strip().split())[:100]
    reply = " ".join(reply.strip().split())[:180]

    if action == "navigate" and target == "none":
        return fallback

    required_values = {
        "scroll": {"up", "down", "top", "bottom"},
        "high_contrast": {"on", "off"},
        "dark_mode": {"on", "off"},
        "text_size": {"increase", "decrease"},
        "video_menu": {"on", "off"},
        "checklist": {"on", "off", "none"},
        "filter_destinations": {
            "all",
            "nature",
            "beach",
            "culture",
            "lake",
            "wheelchair",
            "low-walking",
            "restrooms",
            "sign-language",
            "guide",
            "relaxed",
            "hiking",
            "photo",
            "family",
            "food",
            "easy-access",
            "az",
            "recommended",
        },
        "open_tab": {
            "overview",
            "practical",
            "accessibility",
            "things",
            "location",
            "guides",
            "tips",
            "security",
            "travel",
            "language",
            "notifications",
            "privacy",
        },
    }
    if action in required_values and value not in required_values[action]:
        return fallback

    actions_requiring_query = {"search_destinations", "fill_planner", "click_visible"}
    if action in actions_requiring_query and not query:
        return fallback

    return {
        "action": action,
        "target": target,
        "value": value,
        "query": query,
        "reply": reply,
    }


def parse_model_json(model_content: str) -> Any:
    """Parse Ollama JSON even when the small model wraps it in extra text."""
    if not isinstance(model_content, str) or not model_content.strip():
        raise RuntimeError("Ollama returned an empty response.")

    text = model_content.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fenced:
        return json.loads(fenced.group(1))

    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return json.loads(text[start : end + 1])

    raise RuntimeError("Ollama returned invalid JSON.")


def request_ollama(
    *,
    message: str,
    current_page: str,
    page_context: str,
    model: str,
) -> dict[str, str]:
    payload = {
        "model": model,
        "stream": False,
        "format": "json",
        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": (
                    f"Current page: {current_page}\n"
                    f"Page context:\n{page_context}\n\n"
                    f"Voice request: {message}"
                ),
            },
        ],
        "options": {
            "temperature": 0,
            "num_predict": 140,
        },
    }

    request = urllib.request.Request(
        OLLAMA_CHAT_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=115) as response:
            ollama_response = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Ollama returned HTTP {exc.code}: {body[:300]}"
        ) from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(
            "Could not connect to Ollama at "
            f"{OLLAMA_CHAT_URL}. Make sure Ollama is running."
        ) from exc

    model_content = (
        ollama_response.get("message", {}).get("content", "")
        if isinstance(ollama_response, dict)
        else ""
    )

    parsed = parse_model_json(model_content)

    return safe_result(parsed)


class OpenRoutesHandler(SimpleHTTPRequestHandler):
    server_version = "OpenRoutesVoiceServer/1.0"

    def __init__(self, *args: Any, model: str, **kwargs: Any) -> None:
        self.ollama_model = model
        super().__init__(*args, **kwargs)

    def _send_json(
        self,
        status: HTTPStatus,
        payload: dict[str, Any],
    ) -> None:
        encoded = json.dumps(payload).encode("utf-8")
        self.send_response(status.value)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(encoded)

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT.value)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path.split("?", 1)[0] == "/api/health":
            self._send_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "model": self.ollama_model,
                    "ollama_url": OLLAMA_CHAT_URL,
                },
            )
            return

        super().do_GET()

    def do_POST(self) -> None:
        if self.path.split("?", 1)[0] != "/api/assistant":
            self._send_json(
                HTTPStatus.NOT_FOUND,
                {"error": "Endpoint not found."},
            )
            return

        content_length_text = self.headers.get("Content-Length", "0")
        try:
            content_length = int(content_length_text)
        except ValueError:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "Invalid Content-Length."},
            )
            return

        if content_length <= 0 or content_length > 80_000:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "Request body is empty or too large."},
            )
            return

        try:
            body = self.rfile.read(content_length)
            data = json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "The request body must be valid JSON."},
            )
            return

        message = str(data.get("message", "")).strip()[:500]
        current_page = str(data.get("currentPage", "unknown")).strip()[:120]
        page_context = str(data.get("pageContext", "")).strip()[:3500]

        if not message:
            self._send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "A voice message is required."},
            )
            return

        try:
            result = request_ollama(
                message=message,
                current_page=current_page,
                page_context=page_context,
                model=self.ollama_model,
            )
        except RuntimeError as exc:
            self._send_json(
                HTTPStatus.BAD_GATEWAY,
                {"error": str(exc)},
            )
            return
        except Exception as exc:  # Defensive server boundary.
            print(f"Unexpected assistant error: {exc}", file=sys.stderr)
            self._send_json(
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {"error": "Unexpected assistant server error."},
            )
            return

        self._send_json(HTTPStatus.OK, result)

    def log_message(self, format_string: str, *args: Any) -> None:
        print(
            f"[{self.log_date_time_string()}] "
            f"{self.address_string()} - {format_string % args}"
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Serve OpenRoutes and proxy voice commands to Ollama."
    )
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Server host. Default: 127.0.0.1",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=5500,
        help="Server port. Default: 5500",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help=f"Ollama model. Default: {DEFAULT_MODEL}",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    handler = partial(
        OpenRoutesHandler,
        directory=str(PROJECT_ROOT),
        model=args.model,
    )
    server = ThreadingHTTPServer((args.host, args.port), handler)

    print("OpenRoutes voice assistant server")
    print(f"Project: {PROJECT_ROOT}")
    print(f"Website: http://{args.host}:{args.port}")
    print(f"Ollama model: {args.model}")
    print("Press Ctrl+C to stop.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
