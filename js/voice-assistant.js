(() => {
  "use strict";

  const CONFIG = Object.freeze({
    endpoint: "/api/assistant",
    language: "en-US",
    resumeKey: "openRoutesVoiceAssistantResume",
    requestTimeoutMs: 25000
  });

  const ROUTES = Object.freeze({
    home: "index.html",
    destinations: "destinations.html",
    plan_trip: "plan-your-trip.html",
    about: "about.html",
    contact: "contact.html",
    favorites: "favorites.html",
    interpreters: "interpreters.html",
    steven: "Steven_information.html",
    login: "login.html",
    register: "registrer.html",
    settings: "settings.html",
    santa_ana: "destination-detail.html?place=santa-ana",
    coatepeque: "destination-detail.html?place=coatepeque",
    el_tunco: "destination-detail.html?place=el-tunco",
    suchitoto: "destination-detail.html?place=suchitoto",
    cerro_verde: "tour-detail.html?tour=cerro-verde",
    ruta_flores: "tour-detail.html?tour=ruta-flores"
  });

  const HELP_MESSAGE =
    "You can say: go to home, open destinations, plan your trip, read this page, " +
    "scroll down, go back, turn on high contrast, increase text size, " +
    "open contact, or stop listening.";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const synth = window.speechSynthesis || null;

  let recognition = null;
  let active = false;
  let listening = false;
  let speaking = false;
  let processing = false;
  let suppressRecognitionRestart = false;
  let previousReaderState = null;
  let assistantCheckbox = null;
  let assistantButton = null;
  let statusPanel = null;
  let statusText = null;

  function injectStylesheet() {
    if (document.getElementById("openRoutesVoiceAssistantStyles")) {
      return;
    }

    const stylesheet = document.createElement("link");
    stylesheet.id = "openRoutesVoiceAssistantStyles";
    stylesheet.rel = "stylesheet";
    stylesheet.href = "css/voice-assistant.css";
    document.head.appendChild(stylesheet);
  }

  function createStatusPanel() {
    const panel = document.createElement("section");
    panel.id = "orvaStatusPanel";
    panel.className = "orva-status-panel";
    panel.setAttribute("aria-label", "Voice assistant status");
    panel.hidden = true;

    const title = document.createElement("strong");
    title.textContent = "Voice Assistant";

    const text = document.createElement("p");
    text.id = "orvaStatusText";
    text.setAttribute("role", "status");
    text.setAttribute("aria-live", "polite");
    text.textContent = "Assistant is ready.";

    panel.append(title, text);
    document.body.appendChild(panel);

    statusPanel = panel;
    statusText = text;
  }

  function createFloatingButton() {
    const button = document.createElement("button");
    button.id = "orvaAssistantButton";
    button.className = "orva-assistant-button";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Start voice assistant");
    button.title = "Start voice assistant";
    button.innerHTML =
      '<i class="fa-solid fa-microphone-lines" aria-hidden="true"></i>' +
      '<span class="orva-button-label">Voice assistant</span>';

    button.addEventListener("click", () => {
      if (active) {
        stopAssistant("Voice assistant stopped.");
      } else {
        startAssistant(true);
      }
    });

    document.body.appendChild(button);
    assistantButton = button;
  }

  function addAccessibilityMenuControl() {
    const menu = document.getElementById("accessibilityMenu");
    if (!menu || document.getElementById("chkVoiceAssistant")) {
      return;
    }

    const label = document.createElement("label");
    label.className = "menu-item orva-menu-item";
    label.innerHTML = `
      <span>
        <i class="fa-solid fa-microphone-lines" aria-hidden="true"></i>
        Voice Assistant
      </span>
      <input type="checkbox" id="chkVoiceAssistant">
      <span class="slider"></span>
    `;

    menu.appendChild(label);
    assistantCheckbox = label.querySelector("#chkVoiceAssistant");

    assistantCheckbox.addEventListener("change", () => {
      if (assistantCheckbox.checked && !active) {
        startAssistant(true);
      } else if (!assistantCheckbox.checked && active) {
        stopAssistant("Voice assistant stopped.");
      }
    });
  }

  function updateControls() {
    if (assistantButton) {
      assistantButton.classList.toggle("is-active", active);
      assistantButton.setAttribute("aria-pressed", String(active));
      assistantButton.setAttribute(
        "aria-label",
        active ? "Stop voice assistant" : "Start voice assistant"
      );
      assistantButton.title =
        active ? "Stop voice assistant" : "Start voice assistant";
    }

    if (assistantCheckbox) {
      assistantCheckbox.checked = active;
    }

    if (statusPanel) {
      statusPanel.hidden = !active;
    }
  }

  function setStatus(message) {
    if (statusText) {
      statusText.textContent = message;
    }
  }

  function normalizeText(text) {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,!?;:]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function selectEnglishVoice() {
    if (!synth) {
      return null;
    }

    const voices = synth.getVoices();
    return (
      voices.find((voice) => voice.lang === "en-US") ||
      voices.find((voice) => voice.lang.startsWith("en")) ||
      null
    );
  }

  function stopRecognitionOnly() {
    if (!recognition || !listening) {
      return;
    }

    suppressRecognitionRestart = true;

    try {
      recognition.abort();
    } catch (error) {
      console.debug("Recognition abort skipped:", error);
    }

    listening = false;
  }

  function speak(text, options = {}) {
    const {
      listenAfter = true,
      afterSpeak = null,
      statusPrefix = "Assistant"
    } = options;

    const cleanText = String(text || "").trim();

    if (!cleanText) {
      if (typeof afterSpeak === "function") {
        afterSpeak();
      }
      if (listenAfter && active) {
        window.setTimeout(startListening, 350);
      }
      return;
    }

    if (!synth) {
      setStatus("Text-to-speech is not supported in this browser.");
      return;
    }

    stopRecognitionOnly();
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = CONFIG.language;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = selectEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    speaking = true;
    setStatus(`${statusPrefix}: ${cleanText}`);

    utterance.onend = () => {
      speaking = false;

      if (typeof afterSpeak === "function") {
        afterSpeak();
      }

      if (listenAfter && active) {
        window.setTimeout(startListening, 400);
      }
    };

    utterance.onerror = (event) => {
      speaking = false;
      console.error("Speech synthesis error:", event.error);
      setStatus("I could not speak that response.");

      if (listenAfter && active) {
        window.setTimeout(startListening, 400);
      }
    };

    synth.speak(utterance);
  }

  function splitIntoSpeechChunks(text, maximumLength = 240) {
    const cleanText = String(text)
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      return [];
    }

    const sentences =
      cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];
    const chunks = [];
    let current = "";

    for (const sentence of sentences) {
      const candidate = `${current} ${sentence}`.trim();

      if (candidate.length <= maximumLength) {
        current = candidate;
        continue;
      }

      if (current) {
        chunks.push(current);
      }

      if (sentence.length <= maximumLength) {
        current = sentence.trim();
        continue;
      }

      const words = sentence.trim().split(/\s+/);
      current = "";

      for (const word of words) {
        const wordCandidate = `${current} ${word}`.trim();
        if (wordCandidate.length > maximumLength && current) {
          chunks.push(current);
          current = word;
        } else {
          current = wordCandidate;
        }
      }
    }

    if (current) {
      chunks.push(current);
    }

    return chunks;
  }

  function speakChunks(chunks, index = 0) {
    if (!active || index >= chunks.length) {
      if (active) {
        setStatus("Finished reading. Listening…");
        window.setTimeout(startListening, 400);
      }
      return;
    }

    speak(chunks[index], {
      listenAfter: false,
      statusPrefix: `Reading ${index + 1} of ${chunks.length}`,
      afterSpeak: () => speakChunks(chunks, index + 1)
    });
  }

  function suspendExistingAudioGuide() {
    const readerCheckbox = document.getElementById("chkVoiceReader");

    if (!readerCheckbox) {
      previousReaderState = null;
      return;
    }

    previousReaderState = readerCheckbox.checked;
    readerCheckbox.checked = false;

    if (synth) {
      synth.cancel();
    }
  }

  function restoreExistingAudioGuide() {
    const readerCheckbox = document.getElementById("chkVoiceReader");

    if (readerCheckbox && previousReaderState === true) {
      readerCheckbox.checked = true;
    }

    previousReaderState = null;
  }

  function setupRecognition() {
    if (!SpeechRecognition) {
      setStatus(
        "Voice recognition is not supported. Use a current version of Chrome or Edge."
      );
      return false;
    }

    recognition = new SpeechRecognition();
    recognition.lang = CONFIG.language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      listening = true;
      suppressRecognitionRestart = false;
      setStatus("Listening… Speak now.");
    };

    recognition.onresult = async (event) => {
      listening = false;
      processing = true;

      const result = event.results[event.resultIndex];
      const transcript = result[0].transcript.trim();

      setStatus(`You said: ${transcript}`);
      await processVoiceCommand(transcript);

      processing = false;

      if (active && !speaking) {
        window.setTimeout(startListening, 350);
      }
    };

    recognition.onerror = (event) => {
      listening = false;

      if (event.error === "no-speech") {
        setStatus("I did not hear anything. Listening again…");
        return;
      }

      if (event.error === "not-allowed") {
        active = false;
        sessionStorage.removeItem(CONFIG.resumeKey);
        updateControls();
        restoreExistingAudioGuide();
        setStatus(
          "Microphone permission was denied. Allow microphone access and try again."
        );
        return;
      }

      if (event.error === "audio-capture") {
        setStatus("No microphone was found.");
        return;
      }

      setStatus(`Recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      listening = false;

      if (suppressRecognitionRestart) {
        suppressRecognitionRestart = false;
        return;
      }

      if (active && !speaking && !processing) {
        window.setTimeout(startListening, 450);
      }
    };

    return true;
  }

  function startListening() {
    if (
      !active ||
      !recognition ||
      listening ||
      speaking ||
      processing
    ) {
      return;
    }

    try {
      recognition.start();
    } catch (error) {
      console.debug("Recognition start skipped:", error);
    }
  }

  function startAssistant(fromUserGesture = false) {
    if (active) {
      return;
    }

    if (!recognition && !setupRecognition()) {
      active = false;
      updateControls();
      return;
    }

    active = true;
    sessionStorage.setItem(CONFIG.resumeKey, "1");
    suspendExistingAudioGuide();
    updateControls();

    const greeting = fromUserGesture
      ? "Hello. Do you need help? You can say yes, go to home, or what can I say?"
      : `Voice assistant resumed. You are on ${getPageName()}. How can I help?`;

    speak(greeting);
  }

  function stopAssistant(message = "Voice assistant stopped.") {
    active = false;
    processing = false;
    sessionStorage.removeItem(CONFIG.resumeKey);
    stopRecognitionOnly();

    if (synth) {
      synth.cancel();
    }

    speaking = false;
    restoreExistingAudioGuide();
    updateControls();
    setStatus(message);
  }

  function getPageName() {
    const title = document.title
      .replace(/\s*-\s*Open Routes.*$/i, "")
      .replace(/Open Routes\s*-\s*/i, "")
      .trim();

    return title || window.location.pathname.split("/").pop() || "this page";
  }

  function getPageContext() {
    const main = document.querySelector("main");
    if (!main) {
      return document.title;
    }

    const copy = main.cloneNode(true);

    copy
      .querySelectorAll(
        "script, style, noscript, button, input, select, textarea, " +
        "[aria-hidden='true'], .orva-status-panel"
      )
      .forEach((element) => element.remove());

    return copy.textContent.replace(/\s+/g, " ").trim().slice(0, 3500);
  }

  function readCurrentPage() {
    const context = getPageContext();

    if (!context) {
      speak("I could not find readable content on this page.");
      return;
    }

    const chunks = splitIntoSpeechChunks(context.slice(0, 5000));
    setStatus(`Reading this page in ${chunks.length} parts.`);
    speakChunks(chunks);
  }

  function stopReading() {
    if (synth) {
      synth.cancel();
    }

    speaking = false;
    setStatus("Reading stopped. Listening…");

    if (active) {
      window.setTimeout(startListening, 350);
    }
  }

  function navigateTo(target, reply) {
    const url = ROUTES[target];

    if (!url) {
      speak("That page is not available.");
      return;
    }

    sessionStorage.setItem(CONFIG.resumeKey, "1");

    speak(reply || `Opening ${target.replaceAll("_", " ")}.`, {
      listenAfter: false,
      afterSpeak: () => {
        window.location.href = url;
      }
    });
  }

  function setCheckboxControl(id, enabled, enabledReply, disabledReply) {
    const checkbox = document.getElementById(id);

    if (!checkbox) {
      speak("That accessibility control is not available on this page.");
      return;
    }

    checkbox.checked = enabled;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    // Existing controls can also speak. Cancel that voice and use one response.
    window.setTimeout(() => {
      if (synth) {
        synth.cancel();
      }
      speaking = false;
      speak(enabled ? enabledReply : disabledReply);
    }, 80);
  }

  function changeTextSize(direction) {
    const buttonId =
      direction === "increase" ? "textSizePlus" : "textSizeMinus";
    const button = document.getElementById(buttonId);

    if (button) {
      button.click();
      speak(
        direction === "increase"
          ? "Text size increased."
          : "Text size decreased."
      );
      return;
    }

    const range = document.getElementById("textSizeRange");

    if (!range) {
      speak("Text size controls are not available on this page.");
      return;
    }

    const step = Number(range.step) || 5;
    const minimum = Number(range.min) || 90;
    const maximum = Number(range.max) || 130;
    const current = Number(range.value) || 100;
    const next =
      direction === "increase"
        ? Math.min(maximum, current + step)
        : Math.max(minimum, current - step);

    range.value = String(next);
    range.dispatchEvent(new Event("input", { bubbles: true }));
    range.dispatchEvent(new Event("change", { bubbles: true }));

    speak(
      direction === "increase"
        ? "Text size increased."
        : "Text size decreased."
    );
  }

  function parseLocalCommand(rawTranscript) {
    const command = normalizeText(rawTranscript);

    if (
      command.includes("stop reading") ||
      command.includes("stop speaking") ||
      command.includes("be quiet")
    ) {
      return {
        action: "stop_reading",
        target: "none",
        value: "none",
        reply: "Reading stopped."
      };
    }

    if (
      command.includes("stop listening") ||
      command.includes("stop assistant") ||
      command.includes("turn off assistant") ||
      command === "goodbye"
    ) {
      return {
        action: "stop_assistant",
        target: "none",
        value: "none",
        reply: "Voice assistant stopped."
      };
    }

    if (
      command.includes("what can i say") ||
      command.includes("available commands") ||
      command.includes("voice commands") ||
      command === "help" ||
      command === "yes" ||
      command === "yes please" ||
      command.includes("i need help")
    ) {
      return {
        action: "repeat_help",
        target: "none",
        value: "none",
        reply: HELP_MESSAGE
      };
    }

    if (
      command === "no" ||
      command.includes("no thank you") ||
      command.includes("no thanks")
    ) {
      return {
        action: "stop_assistant",
        target: "none",
        value: "none",
        reply: "Okay. Voice assistant stopped."
      };
    }

    if (
      command.includes("read this page") ||
      command.includes("read the page") ||
      command.includes("read page") ||
      command.includes("read aloud")
    ) {
      return {
        action: "read_page",
        target: "none",
        value: "none",
        reply: "I will read this page."
      };
    }

    if (command.includes("go back") || command === "back") {
      return {
        action: "go_back",
        target: "none",
        value: "none",
        reply: "Going back."
      };
    }

    if (command.includes("go forward") || command === "forward") {
      return {
        action: "go_forward",
        target: "none",
        value: "none",
        reply: "Going forward."
      };
    }

    const scrollCommands = [
      ["scroll down", "down"],
      ["move down", "down"],
      ["scroll up", "up"],
      ["move up", "up"],
      ["go to the top", "top"],
      ["scroll to top", "top"],
      ["go to the bottom", "bottom"],
      ["scroll to bottom", "bottom"]
    ];

    for (const [phrase, value] of scrollCommands) {
      if (command.includes(phrase)) {
        return {
          action: "scroll",
          target: "none",
          value,
          reply: `Scrolling ${value}.`
        };
      }
    }

    if (
      command.includes("turn on high contrast") ||
      command.includes("enable high contrast")
    ) {
      return {
        action: "high_contrast",
        target: "none",
        value: "on",
        reply: "High contrast turned on."
      };
    }

    if (
      command.includes("turn off high contrast") ||
      command.includes("disable high contrast")
    ) {
      return {
        action: "high_contrast",
        target: "none",
        value: "off",
        reply: "High contrast turned off."
      };
    }

    if (
      command.includes("turn on dark mode") ||
      command.includes("enable dark mode")
    ) {
      return {
        action: "dark_mode",
        target: "none",
        value: "on",
        reply: "Dark mode turned on."
      };
    }

    if (
      command.includes("turn off dark mode") ||
      command.includes("disable dark mode") ||
      command.includes("light mode")
    ) {
      return {
        action: "dark_mode",
        target: "none",
        value: "off",
        reply: "Dark mode turned off."
      };
    }

    if (
      command.includes("increase text") ||
      command.includes("bigger text") ||
      command.includes("make text bigger")
    ) {
      return {
        action: "text_size",
        target: "none",
        value: "increase",
        reply: "Text size increased."
      };
    }

    if (
      command.includes("decrease text") ||
      command.includes("smaller text") ||
      command.includes("make text smaller")
    ) {
      return {
        action: "text_size",
        target: "none",
        value: "decrease",
        reply: "Text size decreased."
      };
    }

    const navigationAliases = [
      {
        target: "santa_ana",
        aliases: ["santa ana volcano", "santa ana"]
      },
      {
        target: "coatepeque",
        aliases: ["lake coatepeque", "coatepeque lake", "coatepeque"]
      },
      {
        target: "el_tunco",
        aliases: ["el tunco beach", "el tunco"]
      },
      {
        target: "suchitoto",
        aliases: ["suchitoto"]
      },
      {
        target: "cerro_verde",
        aliases: ["cerro verde"]
      },
      {
        target: "ruta_flores",
        aliases: ["ruta de las flores", "ruta flores"]
      },
      {
        target: "destinations",
        aliases: ["destinations", "destination page"]
      },
      {
        target: "plan_trip",
        aliases: [
          "plan your trip",
          "trip planner",
          "travel planner",
          "planner",
          "plan trip"
        ]
      },
      {
        target: "about",
        aliases: ["about us", "about page"]
      },
      {
        target: "contact",
        aliases: ["contact us", "contact page", "contact"]
      },
      {
        target: "favorites",
        aliases: ["favorites", "favourites"]
      },
      {
        target: "interpreters",
        aliases: ["interpreters", "interpreter", "guides", "guide"]
      },
      {
        target: "steven",
        aliases: ["steven", "steven profile", "steven information"]
      },
      {
        target: "login",
        aliases: ["login", "log in", "sign in"]
      },
      {
        target: "register",
        aliases: ["register", "registration", "sign up"]
      },
      {
        target: "settings",
        aliases: ["settings", "preferences"]
      },
      {
        target: "home",
        aliases: ["home page", "homepage", "the home", "home"]
      }
    ];

    const hasNavigationIntent =
      /(^|\s)(go|open|take|navigate|come|bring|show|visit)(\s|$)/.test(
        command
      ) ||
      command.startsWith("yes ");

    for (const item of navigationAliases) {
      if (
        item.aliases.some((alias) => command.includes(alias)) &&
        (hasNavigationIntent || command === item.aliases[0])
      ) {
        return {
          action: "navigate",
          target: item.target,
          value: "none",
          reply: `Opening ${item.aliases[0]}.`
        };
      }
    }

    return null;
  }

  async function askOllama(transcript) {
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      CONFIG.requestTimeoutMs
    );

    try {
      const response = await fetch(CONFIG.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: transcript,
          currentPage: getPageName(),
          pageContext: getPageContext()
        }),
        signal: controller.signal
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || `Assistant server returned HTTP ${response.status}`
        );
      }

      return validateAction(data);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function validateAction(data) {
    const allowedActions = new Set([
      "navigate",
      "scroll",
      "read_page",
      "stop_reading",
      "go_back",
      "go_forward",
      "high_contrast",
      "dark_mode",
      "text_size",
      "repeat_help",
      "stop_assistant",
      "answer",
      "none"
    ]);

    const action =
      data && allowedActions.has(data.action) ? data.action : "none";
    const target =
      data && Object.hasOwn(ROUTES, data.target) ? data.target : "none";
    const allowedValues = new Set([
      "up",
      "down",
      "top",
      "bottom",
      "on",
      "off",
      "increase",
      "decrease",
      "none"
    ]);
    const value =
      data && allowedValues.has(data.value) ? data.value : "none";
    const reply =
      data && typeof data.reply === "string" && data.reply.trim()
        ? data.reply.trim().slice(0, 180)
        : "I did not understand that command.";

    if (action === "navigate" && target === "none") {
      return {
        action: "none",
        target: "none",
        value: "none",
        reply: "That page is not available."
      };
    }

    return { action, target, value, reply };
  }

  async function processVoiceCommand(transcript) {
    const localAction = parseLocalCommand(transcript);

    if (localAction) {
      executeAction(localAction);
      return;
    }

    setStatus("Understanding your request with Ollama…");

    try {
      const ollamaAction = await askOllama(transcript);
      executeAction(ollamaAction);
    } catch (error) {
      console.error("Ollama assistant error:", error);

      const errorMessage =
        error.name === "AbortError"
          ? "Ollama took too long to respond."
          : "I could not connect to Ollama. Basic voice commands still work.";

      speak(errorMessage);
    }
  }

  function executeAction(command) {
    switch (command.action) {
      case "navigate":
        navigateTo(command.target, command.reply);
        break;

      case "scroll": {
        const scrollOptions = {
          up: { top: -Math.round(window.innerHeight * 0.75) },
          down: { top: Math.round(window.innerHeight * 0.75) },
          top: { top: -document.documentElement.scrollHeight },
          bottom: { top: document.documentElement.scrollHeight }
        };

        window.scrollBy({
          ...scrollOptions[command.value],
          behavior: "smooth"
        });
        speak(command.reply);
        break;
      }

      case "read_page":
        readCurrentPage();
        break;

      case "stop_reading":
        stopReading();
        break;

      case "go_back":
        speak(command.reply, {
          listenAfter: false,
          afterSpeak: () => window.history.back()
        });
        break;

      case "go_forward":
        speak(command.reply, {
          listenAfter: false,
          afterSpeak: () => window.history.forward()
        });
        break;

      case "high_contrast":
        setCheckboxControl(
          "chkContrast",
          command.value === "on",
          "High contrast turned on.",
          "High contrast turned off."
        );
        break;

      case "dark_mode":
        setCheckboxControl(
          "chkDarkMode",
          command.value === "on",
          "Dark mode turned on.",
          "Dark mode turned off."
        );
        break;

      case "text_size":
        changeTextSize(command.value);
        break;

      case "repeat_help":
        speak(command.reply || HELP_MESSAGE);
        break;

      case "stop_assistant": {
        const finalReply = command.reply || "Voice assistant stopped.";
        active = false;
        sessionStorage.removeItem(CONFIG.resumeKey);
        stopRecognitionOnly();
        restoreExistingAudioGuide();
        updateControls();
        speak(finalReply, { listenAfter: false });
        break;
      }

      case "answer":
        speak(command.reply);
        break;

      case "none":
      default:
        speak(
          command.reply ||
            "I did not understand. Say what can I say to hear the commands."
        );
        break;
    }
  }

  function initialize() {
    injectStylesheet();
    createStatusPanel();
    createFloatingButton();
    addAccessibilityMenuControl();
    setupRecognition();
    updateControls();

    const shouldResume =
      sessionStorage.getItem(CONFIG.resumeKey) === "1";

    if (shouldResume) {
      window.setTimeout(() => startAssistant(false), 650);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
