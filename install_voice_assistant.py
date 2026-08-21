#!/usr/bin/env python3
"""
Add the OpenRoutes voice-assistant script to every root HTML page.

Place this file in the OpenRoutes project root, then run:
    python install_voice_assistant.py
"""

from __future__ import annotations

import shutil
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
SCRIPT_TAG = '    <script src="js/voice-assistant.js"></script>'
MARKER = 'src="js/voice-assistant.js"'


def patch_html_file(path: Path) -> bool:
    raw = path.read_bytes()

    encoding = "utf-8-sig" if raw.startswith(b"\xef\xbb\xbf") else "utf-8"
    text = raw.decode(encoding)

    if MARKER in text:
        print(f"Already installed: {path.name}")
        return False

    backup = path.with_suffix(path.suffix + ".voice-backup")
    if not backup.exists():
        shutil.copy2(path, backup)

    lower_text = text.lower()
    closing_body_index = lower_text.rfind("</body>")

    if closing_body_index >= 0:
        text = (
            text[:closing_body_index]
            + SCRIPT_TAG
            + "\n"
            + text[closing_body_index:]
        )
    else:
        text = text.rstrip() + "\n" + SCRIPT_TAG + "\n"

    path.write_text(text, encoding="utf-8")
    print(f"Updated: {path.name}")
    return True


def main() -> None:
    required_files = [
        PROJECT_ROOT / "js" / "voice-assistant.js",
        PROJECT_ROOT / "css" / "voice-assistant.css",
        PROJECT_ROOT / "backend" / "server.py",
    ]

    missing = [path for path in required_files if not path.exists()]
    if missing:
        print("These required files are missing:")
        for path in missing:
            print(f"  - {path.relative_to(PROJECT_ROOT)}")
        raise SystemExit(1)

    html_files = sorted(PROJECT_ROOT.glob("*.html"))
    if not html_files:
        print("No HTML files were found in the project root.")
        raise SystemExit(1)

    updated = sum(patch_html_file(path) for path in html_files)

    print()
    print(f"Finished. Updated {updated} HTML file(s).")
    print("Backups use the extension .html.voice-backup.")
    print("Now run: python backend/server.py")


if __name__ == "__main__":
    main()
