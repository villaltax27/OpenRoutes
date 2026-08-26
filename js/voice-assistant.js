(() => {
  "use strict";

  const CONFIG = Object.freeze({
    endpoint:
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost"
        ? "/api/assistant"
        : "http://127.0.0.1:5510/api/assistant",
    language: localStorage.getItem("openRoutesLanguageV3") === "es" ? "es-SV" : "en-US",
    resumeKey: "openRoutesVoiceAssistantResume",
    pendingActionKey: "openRoutesVoiceAssistantPendingAction",
    promptChoiceKey: "openRoutesVoiceAssistantPromptChoice",
    requestTimeoutMs: 120000
  });

  const ROUTES = Object.freeze({
    home: "index.html",
    destinations: "destinations.html",
    plan_trip: "plan-your-trip.html",
    popular_tours: "index.html#popularTours",
    about: "about.html",
    contact: "contact.html",
    favorites: "favorites.html",
    interpreters: "interpreters.html",
    steven: "Steven_information.html",
    login: "login.html",
    register: "registrer.html",
    settings: "settings.html",
    faq: "faq.html",
    accessibility_statement: "accessibility-statement.html",
    santa_ana: "destination-detail.html?place=santa-ana",
    coatepeque: "destination-detail.html?place=coatepeque",
    el_tunco: "destination-detail.html?place=el-tunco",
    suchitoto: "destination-detail.html?place=suchitoto",
    historic_center: "destination-detail.html?place=historic-center",
    el_imposible: "destination-detail.html?place=imposible",
    tour_santa_ana: "tour-detail.html?tour=santa-ana",
    tour_coatepeque: "tour-detail.html?tour=coatepeque",
    tour_el_tunco: "tour-detail.html?tour=el-tunco",
    tour_suchitoto: "tour-detail.html?tour=suchitoto",
    cerro_verde: "tour-detail.html?tour=cerro-verde",
    ruta_flores: "tour-detail.html?tour=ruta-flores"
  });

  const HELP_MESSAGES = Object.freeze({
    en:
      "You can say: open home, open destinations, open Lake Coatepeque, open popular tours, " +
      "turn on dark mode, increase text, add this to favorites, book this trip, open the sign language menu, " +
      "read this page, read menu, or stop listening.",
    es:
      "Puedes decir: abrir inicio, abrir destinos, abrir lago de Coatepeque, abrir tours populares, " +
      "activar modo oscuro, aumentar texto, agregar esto a favoritos, reservar este viaje, abrir el menu de lengua de senas, " +
      "leer esta pagina, leer menu o detener asistente."
  });

  const NAVIGATION_MESSAGES = Object.freeze({
    en:
      "Main pages: Home, Destinations, Plan Your Trip, About Us, and Contact. " +
      "Account pages: Login, Register, Favorites, Settings, and FAQ. " +
      "Destination pages: Lake Coatepeque, El Tunco Beach, Suchitoto, Santa Ana Volcano, Historic Center and El Imposible. " +
      "Tour pages: Santa Ana Volcano, Lake Coatepeque, El Tunco, Suchitoto, Cerro Verde and Ruta de las Flores.",
    es:
      "Paginas principales: Inicio, Destinos, Planifica tu viaje, Sobre nosotros y Contacto. " +
      "Paginas de cuenta: Iniciar sesion, Registrarse, Favoritos, Configuracion y Preguntas frecuentes. " +
      "Paginas de destino: Lago de Coatepeque, playa El Tunco, Suchitoto, volcan de Santa Ana, Centro Historico y El Imposible. " +
      "Paginas de tours: volcan de Santa Ana, lago de Coatepeque, El Tunco, Suchitoto, Cerro Verde y Ruta de las Flores."
  });

  const PAGE_SUMMARIES = Object.freeze({
    en: {
      "index.html": "This is the Open Routes home page. It introduces accessible tourism in El Salvador, highlights popular destinations, shows popular tours and gives visitors a quick way to start exploring the site.",
      "destinations.html": "This is the destinations page. It lets visitors browse places in El Salvador, filter by travel style or accessibility needs, and open each destination detail page.",
      "destination-detail.html": "This is a destination detail page. It explains one place in El Salvador with photos, accessibility notes, practical information, local experiences, guides, location details, reviews and related tour options.",
      "plan-your-trip.html": "This is the Plan Your Trip page. It helps visitors choose travel style, time, accessibility needs and support options before booking a trip.",
      "tour-detail.html": "This is a tour detail page. It shows the package information, price, date selection, number of travelers, accessibility requests and booking summary.",
      "about.html": "This is the About Us page. It explains the Open Routes project, the team's mission and the people behind the accessible tourism website.",
      "contact.html": "This is the contact page. Visitors can send a message, find support information and contact Open Routes for travel or accessibility questions.",
      "favorites.html": "This is the favorites page. It shows destinations, guides or interpreters saved by the user while planning a trip.",
      "interpreters.html": "This is the interpreters and guides page. Visitors can find people who support language, sign language and accessible travel planning.",
      "Steven_information.html": "This is Steven's interpreter profile page. It shows information about Steven, his support services and options to contact or save him.",
      "login.html": "This is the login page. Returning users can sign in before booking trips, saving favorites or managing their account.",
      "registrer.html": "This is the register page. New users can create an Open Routes account to use booking, favorites and profile features.",
      "settings.html": "This is the settings page. Users can manage account, travel, language, notification and privacy preferences.",
      "faq.html": "This is the Help and FAQ page. It answers common questions about bookings, accessibility support, interpreters, favorites, videos and the voice assistant.",
      "accessibility-statement.html": "This is the accessibility statement page. It explains Open Routes' accessibility commitment, available tools, current limitations and support contact."
    },
    es: {
      "index.html": "Esta es la pagina principal de Open Routes. Presenta el turismo accesible en El Salvador, muestra destinos populares, tours populares y ayuda a los visitantes a empezar a explorar el sitio.",
      "destinations.html": "Esta es la pagina de destinos. Permite explorar lugares de El Salvador, filtrar por estilo de viaje o necesidades de accesibilidad y abrir la informacion de cada destino.",
      "destination-detail.html": "Esta es una pagina de detalle de destino. Explica un lugar de El Salvador con fotos, notas de accesibilidad, informacion practica, experiencias locales, guias, ubicacion, resenas y tours relacionados.",
      "plan-your-trip.html": "Esta es la pagina Plan Your Trip. Ayuda a elegir estilo de viaje, tiempo disponible, necesidades de accesibilidad y opciones de apoyo antes de reservar.",
      "tour-detail.html": "Esta es una pagina de detalle de tour. Muestra informacion del paquete, precio, fecha, numero de viajeros, solicitudes de accesibilidad y resumen de reserva.",
      "about.html": "Esta es la pagina About Us. Explica el proyecto Open Routes, la mision del equipo y las personas detras del sitio de turismo accesible.",
      "contact.html": "Esta es la pagina de contacto. Los visitantes pueden enviar un mensaje, encontrar soporte y contactar a Open Routes por dudas de viaje o accesibilidad.",
      "favorites.html": "Esta es la pagina de favoritos. Muestra destinos, guias o interpretes guardados por el usuario mientras planea su viaje.",
      "interpreters.html": "Esta es la pagina de interpretes y guias. Los visitantes pueden encontrar personas que apoyan con idioma, lengua de senas y planificacion accesible.",
      "Steven_information.html": "Esta es la pagina del perfil del interprete Steven. Muestra informacion sobre Steven, sus servicios de apoyo y opciones para contactarlo o guardarlo.",
      "login.html": "Esta es la pagina de inicio de sesion. Los usuarios pueden entrar antes de reservar viajes, guardar favoritos o administrar su cuenta.",
      "registrer.html": "Esta es la pagina de registro. Nuevos usuarios pueden crear una cuenta de Open Routes para usar reservas, favoritos y funciones de perfil.",
      "settings.html": "Esta es la pagina de configuracion. Los usuarios pueden administrar preferencias de cuenta, viaje, idioma, notificaciones y privacidad.",
      "faq.html": "Esta es la pagina de ayuda y preguntas frecuentes. Responde dudas comunes sobre reservas, accesibilidad, interpretes, favoritos, videos y el asistente de voz.",
      "accessibility-statement.html": "Esta es la declaracion de accesibilidad. Explica el compromiso de Open Routes, herramientas disponibles, limitaciones actuales y contacto de soporte."
    }
  });

  const DESTINATION_SUMMARIES = Object.freeze({
    en: {
      "santa-ana": "This page is about Santa Ana Volcano, one of El Salvador's most iconic volcanoes. It includes destination information, accessibility notes, practical tips, location details and related tours.",
      coatepeque: "This page is about Lake Coatepeque, a volcanic crater lake known for deep blue water, viewpoints and lakeside experiences. It includes photos, accessibility notes, practical information, guides and tours.",
      "el-tunco": "This page is about El Tunco Beach, a Pacific coast destination known for surf, sunsets, restaurants and nightlife. It includes accessibility details, local experiences and related tour options.",
      suchitoto: "This page is about Suchitoto, a colonial town known for culture, art, cobblestone streets and views of Lake Suchitlan. It includes accessibility notes, local recommendations, guides and tours.",
      "historic-center": "This page is about the Historic Center of San Salvador, with landmarks such as the cathedral, National Palace, National Theater and public plazas. It includes practical and accessibility information.",
      imposible: "This page is about El Imposible National Park, a protected natural area known for biodiversity, trails and viewpoints. It includes accessibility guidance, practical information and local recommendations."
    },
    es: {
      "santa-ana": "Esta pagina trata sobre el volcan de Santa Ana, uno de los volcanes mas iconicos de El Salvador. Incluye informacion del destino, accesibilidad, consejos, ubicacion y tours relacionados.",
      coatepeque: "Esta pagina trata sobre el lago de Coatepeque, un lago de crater volcanico conocido por su agua azul, miradores y experiencias junto al lago. Incluye fotos, accesibilidad, informacion practica, guias y tours.",
      "el-tunco": "Esta pagina trata sobre playa El Tunco, un destino del Pacifico conocido por surf, atardeceres, restaurantes y ambiente costero. Incluye accesibilidad, experiencias locales y tours relacionados.",
      suchitoto: "Esta pagina trata sobre Suchitoto, un pueblo colonial conocido por cultura, arte, calles empedradas y vistas al lago Suchitlan. Incluye accesibilidad, recomendaciones locales, guias y tours.",
      "historic-center": "Esta pagina trata sobre el Centro Historico de San Salvador, con lugares como la catedral, Palacio Nacional, Teatro Nacional y plazas publicas. Incluye informacion practica y de accesibilidad.",
      imposible: "Esta pagina trata sobre el Parque Nacional El Imposible, un area natural protegida conocida por biodiversidad, senderos y miradores. Incluye accesibilidad, informacion practica y recomendaciones locales."
    }
  });

  const TOUR_SUMMARIES = Object.freeze({
    en: {
      "santa-ana": "This page is about the Santa Ana Volcano tour package. Visitors can review the experience, price, date, number of travelers, accessibility requests and booking summary.",
      coatepeque: "This page is about the Lake Coatepeque tour package. Visitors can review the lake experience, price, date, travelers, support needs and booking summary.",
      "el-tunco": "This page is about the El Tunco surf tour package. Visitors can review the beach experience, price, date, travelers, accessibility requests and booking summary.",
      suchitoto: "This page is about the Suchitoto colonial tour package. Visitors can review the cultural experience, price, date, travelers, support requests and booking summary.",
      "cerro-verde": "This page is about the Cerro Verde tour package. Visitors can review the mountain experience, price, date, travelers, accessibility needs and booking summary.",
      "ruta-flores": "This page is about the Ruta de las Flores tour package. Visitors can review the towns, food and coffee experience, price, date, travelers and booking summary."
    },
    es: {
      "santa-ana": "Esta pagina trata sobre el paquete del tour al volcan de Santa Ana. Permite revisar experiencia, precio, fecha, viajeros, solicitudes de accesibilidad y resumen de reserva.",
      coatepeque: "Esta pagina trata sobre el paquete del tour al lago de Coatepeque. Permite revisar la experiencia del lago, precio, fecha, viajeros, apoyo requerido y resumen de reserva.",
      "el-tunco": "Esta pagina trata sobre el paquete del tour de surf en El Tunco. Permite revisar experiencia de playa, precio, fecha, viajeros, accesibilidad y resumen de reserva.",
      suchitoto: "Esta pagina trata sobre el paquete del tour colonial en Suchitoto. Permite revisar experiencia cultural, precio, fecha, viajeros, apoyo requerido y resumen de reserva.",
      "cerro-verde": "Esta pagina trata sobre el paquete del tour a Cerro Verde. Permite revisar experiencia de montana, precio, fecha, viajeros, accesibilidad y resumen de reserva.",
      "ruta-flores": "Esta pagina trata sobre el paquete Ruta de las Flores. Permite revisar pueblos, comida, cafe, precio, fecha, viajeros y resumen de reserva."
    }
  });

  const TAB_ALIASES = Object.freeze({
    overview: "overview",
    resumen: "overview",
    practical: "practical",
    "practical info": "practical",
    "informacion practica": "practical",
    practica: "practical",
    accessibility: "accessibility",
    access: "accessibility",
    accesibilidad: "accessibility",
    things: "things",
    "things to do": "things",
    activities: "things",
    actividades: "things",
    cultura: "things",
    gastronomia: "things",
    recomendaciones: "things",
    location: "location",
    ubicacion: "location",
    mapa: "location",
    map: "location",
    guides: "guides",
    guide: "guides",
    interpreters: "guides",
    guias: "guides",
    guia: "guides",
    interpretes: "guides",
    tips: "tips",
    consejos: "tips",
    security: "security",
    seguridad: "security",
    "login security": "security",
    travel: "travel",
    "travel preferences": "travel",
    language: "language",
    region: "language",
    notifications: "notifications",
    privacy: "privacy"
  });

  const DESTINATION_FILTERS = Object.freeze({
    all: "all",
    todos: "all",
    todo: "all",
    nature: "nature",
    naturaleza: "nature",
    beach: "beach",
    beaches: "beach",
    playa: "beach",
    playas: "beach",
    culture: "culture",
    cultural: "culture",
    cultura: "culture",
    lake: "lake",
    lakes: "lake",
    lago: "lake",
    lagos: "lake",
    wheelchair: "wheelchair",
    "wheelchair access": "wheelchair",
    silla: "wheelchair",
    "silla de ruedas": "wheelchair",
    "low walking": "low-walking",
    "poca caminata": "low-walking",
    "caminar poco": "low-walking",
    restrooms: "restrooms",
    bathrooms: "restrooms",
    banos: "restrooms",
    "sign language": "sign-language",
    "lenguaje de senas": "sign-language",
    "lengua de senas": "sign-language",
    guide: "guide",
    guides: "guide",
    guia: "guide",
    guias: "guide",
    relaxed: "relaxed",
    relajado: "relaxed",
    tranquilo: "relaxed",
    hiking: "hiking",
    caminata: "hiking",
    senderismo: "hiking",
    photography: "photo",
    photo: "photo",
    foto: "photo",
    fotos: "photo",
    family: "family",
    familia: "family",
    food: "food",
    comida: "food",
    gastronomia: "food",
    "easy access": "easy-access",
    "acceso facil": "easy-access",
    "a z": "az",
    recommended: "recommended",
    recomendados: "recommended"
  });

  const PLANNER_VALUES = Object.freeze({
    relaxed: "relaxed",
    relajado: "relaxed",
    tranquilo: "relaxed",
    nature: "nature",
    naturaleza: "nature",
    culture: "culture",
    cultura: "culture",
    beach: "beach",
    playa: "beach",
    "half day": "half-day",
    "medio dia": "half-day",
    "full day": "full-day",
    "dia completo": "full-day",
    weekend: "weekend",
    "fin de semana": "weekend",
    wheelchair: "wheelchair",
    "silla de ruedas": "wheelchair",
    "low walking": "low-walking",
    "poca caminata": "low-walking",
    restrooms: "restrooms",
    banos: "restrooms",
    interpreter: "interpreter",
    interprete: "interpreter",
    guide: "interpreter",
    guia: "interpreter",
    audio: "audio",
    transport: "transport",
    transporte: "transport",
    "private transport": "transport",
    "transporte privado": "transport"
  });

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
  let assistantPrompt = null;
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

  function closeAssistantPrompt() {
    if (!assistantPrompt) return;
    assistantPrompt.classList.remove("is-visible");
    assistantPrompt.setAttribute("aria-hidden", "true");
  }

  function showAssistantPrompt() {
    if (!assistantPrompt || active) return;
    assistantPrompt.classList.add("is-visible");
    assistantPrompt.setAttribute("aria-hidden", "false");
    assistantPrompt.querySelector("[data-orva-accept]")?.focus();
  }

  function createAssistantPrompt() {
    if (document.getElementById("orvaAssistantPrompt")) {
      assistantPrompt = document.getElementById("orvaAssistantPrompt");
      return;
    }

    const prompt = document.createElement("section");
    prompt.id = "orvaAssistantPrompt";
    prompt.className = "orva-assistant-prompt";
    prompt.setAttribute("role", "dialog");
    prompt.setAttribute("aria-modal", "true");
    prompt.setAttribute("aria-labelledby", "orvaPromptTitle");
    prompt.setAttribute("aria-describedby", "orvaPromptText");
    prompt.setAttribute("aria-hidden", "true");
    prompt.innerHTML = `
      <div class="orva-prompt-card">
        <div class="orva-prompt-icon" aria-hidden="true">
          <i class="fa-solid fa-microphone-lines"></i>
        </div>
        <div class="orva-prompt-copy">
          <span class="orva-prompt-eyebrow">Voice assistance</span>
          <h2 id="orvaPromptTitle">Do you need a voice assistant?</h2>
          <p id="orvaPromptText">You can use voice commands to navigate Open Routes, search destinations, read content and use accessibility tools.</p>
        </div>
        <div class="orva-prompt-actions">
          <button type="button" class="orva-prompt-primary" data-orva-accept>Yes, enable it</button>
          <button type="button" class="orva-prompt-secondary" data-orva-decline>No, continue normally</button>
        </div>
      </div>
    `;

    prompt.querySelector("[data-orva-accept]")?.addEventListener("click", () => {
      sessionStorage.setItem(CONFIG.promptChoiceKey, "accepted");
      closeAssistantPrompt();
      startAssistant(true);
    });

    prompt.querySelector("[data-orva-decline]")?.addEventListener("click", () => {
      sessionStorage.setItem(CONFIG.promptChoiceKey, "declined");
      closeAssistantPrompt();
    });

    prompt.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      sessionStorage.setItem(CONFIG.promptChoiceKey, "declined");
      closeAssistantPrompt();
    });

    document.body.appendChild(prompt);
    assistantPrompt = prompt;
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
        sessionStorage.setItem(CONFIG.promptChoiceKey, "accepted");
        startAssistant(true);
      } else if (!assistantCheckbox.checked && active) {
        stopAssistant("Voice assistant stopped.");
      }
    });
  }

  function updateControls() {
    if (assistantCheckbox) {
      assistantCheckbox.checked = active;
    }

    if (statusPanel) {
      statusPanel.hidden = !active;
    }
  }

  function setStatus(message) {
    if (statusText) {
      statusText.textContent = localizeAssistantText(message);
    }
  }

  function normalizeText(text) {
    return String(text)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\bwhat'?s\b/g, "what is")
      .replace(/\bwhats\b/g, "what is")
      .replace(/[.,!?;:]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(command, phrases) {
    return phrases.some((phrase) => command.includes(phrase));
  }

  function getAssistantLanguage() {
    return localStorage.getItem("openRoutesLanguageV3") === "es" ? "es-SV" : "en-US";
  }

  function getLanguageCode() {
    return localStorage.getItem("openRoutesLanguageV3") === "es" ? "es" : "en";
  }

  function getHelpMessage() {
    return HELP_MESSAGES[getLanguageCode()] || HELP_MESSAGES.en;
  }

  function getNavigationMessage() {
    return NAVIGATION_MESSAGES[getLanguageCode()] || NAVIGATION_MESSAGES.en;
  }

  function localizeAssistantLabel(label) {
    if (getLanguageCode() !== "es") {
      return label;
    }

    const replacements = {
      "Home": "Inicio",
      "Destinations": "Destinos",
      "Plan Your Trip": "Planifica tu viaje",
      "Popular Tours": "Tours populares",
      "About Us": "Sobre nosotros",
      "Contact": "Contacto",
      "Favorites": "Favoritos",
      "Interpreters": "Interpretes",
      "Steven": "Steven",
      "Login": "Inicio de sesion",
      "Register": "Registro",
      "Settings": "Configuracion",
      "Help and FAQ": "Ayuda y preguntas frecuentes",
      "Accessibility Statement": "Declaracion de accesibilidad",
      "Santa Ana Volcano": "volcan de Santa Ana",
      "Santa Ana Volcano Tour": "tour del volcan de Santa Ana",
      "Lake Coatepeque": "lago de Coatepeque",
      "Lake Coatepeque Tour": "tour del lago de Coatepeque",
      "El Tunco Beach": "playa El Tunco",
      "El Tunco Surf Tour": "tour de surf en El Tunco",
      "Suchitoto": "Suchitoto",
      "Suchitoto Colonial Tour": "tour colonial de Suchitoto",
      "Historic Center": "Centro Historico",
      "El Imposible National Park": "Parque Nacional El Imposible",
      "Cerro Verde": "Cerro Verde",
      "Ruta de las Flores": "Ruta de las Flores"
    };

    return replacements[label] || label;
  }

  function localizeAssistantText(text) {
    if (getLanguageCode() !== "es") {
      return text;
    }

    const exact = {
      "Text-to-speech is not supported in this browser.": "La lectura por voz no esta disponible en este navegador.",
      "I could not speak that response.": "No pude leer esa respuesta.",
      "Reading stopped.": "Lectura detenida.",
      "Voice assistant stopped.": "Asistente de voz detenido.",
      "Okay. Voice assistant stopped.": "De acuerdo. Asistente de voz detenido.",
      "I will read this page.": "Voy a leer esta pagina.",
      "Going back.": "Volviendo atras.",
      "Going forward.": "Avanzando.",
      "High contrast turned on.": "Alto contraste activado.",
      "High contrast turned off.": "Alto contraste desactivado.",
      "Dark mode turned on.": "Modo oscuro activado.",
      "Dark mode turned off.": "Modo oscuro desactivado.",
      "Text size increased.": "Tamano del texto aumentado.",
      "Text size decreased.": "Tamano del texto reducido.",
      "Opening the sign language menu.": "Abriendo el menu de lengua de senas.",
      "Closing the sign language menu.": "Cerrando el menu de lengua de senas.",
      "Adding this to favorites.": "Agregando esto a favoritos.",
      "Opening the booking option.": "Abriendo la opcion de reserva.",
      "Saving your trip plan.": "Guardando tu plan de viaje.",
      "Logging out.": "Cerrando sesion.",
      "Spanish activated.": "Espanol activado.",
      "English activated.": "Ingles activado.",
      "That language is not available.": "Ese idioma no esta disponible.",
      "That page is not available.": "Esa pagina no esta disponible.",
      "I could not find readable content on this page.": "No pude encontrar contenido legible en esta pagina.",
      "Text size controls are not available on this page.": "Los controles de tamano de texto no estan disponibles en esta pagina.",
      "The sign language menu is not available on this page.": "El menu de lengua de senas no esta disponible en esta pagina.",
      "That accessibility control is not available on this page.": "Ese control de accesibilidad no esta disponible en esta pagina.",
      "I did not understand that command.": "No entendi ese comando.",
      "I did not understand. Say what can I say to hear the commands.": "No entendi. Di que puedo decir para escuchar los comandos.",
      "This page is part of Open Routes, an accessible tourism website for El Salvador.": "Esta pagina forma parte de Open Routes, un sitio de turismo accesible en El Salvador."
      ,
      "Finished reading. Listening…": "Lectura terminada. Escuchando...",
      "Listening… Speak now.": "Escuchando... Habla ahora.",
      "I did not hear anything. Listening again…": "No escuche nada. Estoy escuchando otra vez...",
      "No microphone was found.": "No se encontro ningun microfono.",
      "Reading stopped. Listening…": "Lectura detenida. Escuchando...",
      "Opening destinations to search.": "Abriendo destinos para buscar.",
      "Opening destinations to apply the filter.": "Abriendo destinos para aplicar el filtro.",
      "I could not find that destination filter.": "No pude encontrar ese filtro de destinos.",
      "Filter applied.": "Filtro aplicado.",
      "I could not find that section on this page.": "No pude encontrar esa seccion en esta pagina.",
      "I could not find a favorite button on this page.": "No pude encontrar un boton de favoritos en esta pagina.",
      "I added this item to your favorites.": "Agregue este elemento a tus favoritos.",
      "The booking form is ready.": "El formulario de reserva esta listo.",
      "I could not find a booking option on this page.": "No pude encontrar una opcion de reserva en esta pagina.",
      "I updated your trip plan.": "Actualice tu plan de viaje.",
      "Tell me a style like beach, nature, culture, or relaxed.": "Dime un estilo como playa, naturaleza, cultura o relajado.",
      "Your trip plan has been saved.": "Tu plan de viaje fue guardado.",
      "The checklist is ready. You can say check water, check passport, or check medication.": "La lista esta lista. Puedes decir marcar agua, marcar pasaporte o marcar medicina.",
      "Checklist updated.": "Lista actualizada.",
      "Tell me what button or link you want me to open.": "Dime que boton o enlace quieres que abra.",
      "I could not find that visible control.": "No pude encontrar ese control visible.",
      "I cannot open external links by voice.": "No puedo abrir enlaces externos por voz."
    };

    if (exact[text]) {
      return exact[text];
    }

    let match = text.match(/^Opening (.+)\.$/);
    if (match) return `Abriendo ${localizeAssistantLabel(match[1])}.`;

    match = text.match(/^Showing (.+)\.$/);
    if (match) return `Mostrando ${localizeAssistantLabel(match[1])}.`;

    match = text.match(/^Applying (.+) filter\.$/);
    if (match) return `Aplicando filtro de ${localizeAssistantLabel(match[1])}.`;

    match = text.match(/^Searching destinations for (.+)\.$/);
    if (match) return `Buscando destinos sobre ${match[1]}.`;

    match = text.match(/^Searching destinations for (.+)\. (.+)$/);
    if (match) return `Buscando destinos sobre ${match[1]}. ${match[2]}`;

    match = text.match(/^Filter applied\. (.+)$/);
    if (match) return `Filtro aplicado. ${match[1]}`;

    match = text.match(/^Opening destinations to (.+)\.$/);
    if (match) return `Abriendo destinos para ${match[1]}.`;

    match = text.match(/^Scrolling (.+)\.$/);
    if (match) {
      const directions = { up: "hacia arriba", down: "hacia abajo", top: "al inicio", bottom: "al final" };
      return `Desplazando ${directions[match[1]] || match[1]}.`;
    }

    match = text.match(/^Reading this page in (\d+) parts\.$/);
    if (match) return `Leyendo esta pagina en ${match[1]} partes.`;

    match = text.match(/^You said: (.+)$/);
    if (match) return `Dijiste: ${match[1]}`;

    match = text.match(/^Recognition error: (.+)$/);
    if (match) return `Error de reconocimiento: ${match[1]}`;

    return text;
  }

  function localizeStatusPrefix(prefix) {
    if (getLanguageCode() !== "es") {
      return prefix;
    }

    return prefix === "Assistant" ? "Asistente" : prefix;
  }

  function selectVoice(language) {
    if (!synth) {
      return null;
    }

    const voices = synth.getVoices();
    return (
      voices.find((voice) => voice.lang === language) ||
      voices.find((voice) => voice.lang.startsWith(language.slice(0, 2))) ||
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

    const cleanText = localizeAssistantText(String(text || "").trim());

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
    utterance.lang = getAssistantLanguage();
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = selectVoice(utterance.lang);
    if (voice) {
      utterance.voice = voice;
    }

    speaking = true;
    setStatus(`${localizeStatusPrefix(statusPrefix)}: ${cleanText}`);

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
    recognition.lang = getAssistantLanguage();
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
    sessionStorage.setItem(CONFIG.promptChoiceKey, "accepted");
    sessionStorage.setItem(CONFIG.resumeKey, "1");
    suspendExistingAudioGuide();
    closeAssistantPrompt();
    updateControls();

    const greeting = fromUserGesture
      ? getLanguageCode() === "es"
        ? "Hola. Necesitas ayuda? Puedes decir si, abrir inicio o que puedo decir?"
        : "Hello. Do you need help? You can say yes, go to home, or what can I say?"
      : getLanguageCode() === "es"
        ? `Asistente de voz reanudado. Estas en ${getPageName()}. Como puedo ayudar?`
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

  function getPreparedPageSummary() {
    const language = getLanguageCode();
    const summaries = PAGE_SUMMARIES[language] || PAGE_SUMMARIES.en;
    const destinationSummaries = DESTINATION_SUMMARIES[language] || DESTINATION_SUMMARIES.en;
    const tourSummaries = TOUR_SUMMARIES[language] || TOUR_SUMMARIES.en;
    const pathName = window.location.pathname.split("/").pop() || "index.html";
    const params = new URLSearchParams(window.location.search);

    if (pathName === "destination-detail.html") {
      const place = params.get("place") || "coatepeque";
      return destinationSummaries[place] || summaries[pathName];
    }

    if (pathName === "tour-detail.html") {
      const tour = params.get("tour") || "santa-ana";
      return tourSummaries[tour] || summaries[pathName];
    }

    return summaries[pathName] || "";
  }

  function summarizeCurrentPage() {
    const preparedSummary = getPreparedPageSummary();

    if (preparedSummary) {
      speak(preparedSummary);
      return;
    }

    const heading =
      document.querySelector("main h1, .hero h1, .planner-hero h1, .place-title")?.textContent ||
      getPageName();
    const intro =
      document.querySelector("main p, .hero p, .planner-hero p, .place-description")?.textContent ||
      getPageContext().slice(0, 220);
    const summary = `${heading.replace(/\s+/g, " ").trim()}. ${intro.replace(/\s+/g, " ").trim()}`;

    speak(summary || "This page is part of Open Routes, an accessible tourism website for El Salvador.");
  }

  function readNavigationMenu() {
    speak(getNavigationMessage());
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

  function queueActionAndNavigate(action, target, reply) {
    sessionStorage.setItem(CONFIG.pendingActionKey, JSON.stringify(action));
    navigateTo(target, reply);
  }

  function getVisibleText(element) {
    return normalizeText(
      [
        element.textContent,
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.getAttribute("placeholder")
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  function isVisible(element) {
    if (!element || element.disabled || element.getAttribute("aria-hidden") === "true") {
      return false;
    }

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
  }

  function scrollToElement(element) {
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function getResultsSummary() {
    return document.getElementById("resultsCount")?.textContent?.trim() || "";
  }

  function searchDestinations(query, reply) {
    const cleanQuery = String(query || "").trim();
    const searchInput = document.getElementById("destinationSearch");

    if (!searchInput) {
      queueActionAndNavigate(
        { action: "search_destinations", target: "none", value: "none", query: cleanQuery, reply },
        "destinations",
        "Opening destinations to search."
      );
      return;
    }

    searchInput.value = cleanQuery;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    scrollToElement(document.getElementById("destinations") || searchInput);
    speak(reply || `Searching destinations for ${cleanQuery || "your request"}. ${getResultsSummary()}`);
  }

  function filterDestinations(value, reply) {
    const filter = DESTINATION_FILTERS[normalizeText(value)] || value;
    const filtersSection = document.getElementById("destinations");

    if (!filtersSection) {
      queueActionAndNavigate(
        { action: "filter_destinations", target: "none", value: filter, query: "", reply },
        "destinations",
        "Opening destinations to apply the filter."
      );
      return;
    }

    const categoryButton = document.querySelector(`.filter-btn[data-filter="${CSS.escape(filter)}"]`);
    const chip = document.querySelector(
      `.filter-chip[data-access="${CSS.escape(filter)}"], .filter-chip[data-experience="${CSS.escape(filter)}"]`
    );
    const sortSelect = document.getElementById("destinationSort");

    if (categoryButton) {
      categoryButton.click();
    } else if (chip) {
      if (!chip.classList.contains("active")) chip.click();
    } else if (sortSelect && ["recommended", "easy-access", "az"].includes(filter)) {
      sortSelect.value = filter;
      sortSelect.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      speak("I could not find that destination filter.");
      return;
    }

    scrollToElement(filtersSection);
    speak(reply || `Filter applied. ${getResultsSummary()}`);
  }

  function showPageSection(value, reply) {
    const tab = TAB_ALIASES[normalizeText(value)] || value;
    const tabButton = document.querySelector(
      `.tab-btn[data-tab="${CSS.escape(tab)}"], .settings-tab[data-panel="${CSS.escape(tab)}"]`
    );

    if (tabButton) {
      tabButton.click();
      scrollToElement(tabButton);
      speak(reply || `Showing ${tab.replaceAll("-", " ")}.`);
      return;
    }

    const target = document.getElementById(tab) || document.querySelector(`[data-panel="${CSS.escape(tab)}"]`);
    if (target) {
      scrollToElement(target);
      speak(reply || `Showing ${tab.replaceAll("-", " ")}.`);
      return;
    }

    speak("I could not find that section on this page.");
  }

  function addCurrentFavorite(reply) {
    const favoriteButton = Array.from(
      document.querySelectorAll("#addDestinationFavorite, .fav-btn, .fav, [aria-label*='favorite' i], button")
    ).find((button) => isVisible(button) && /favorite|favorites|heart|add/.test(getVisibleText(button)));

    if (!favoriteButton) {
      speak("I could not find a favorite button on this page.");
      return;
    }

    favoriteButton.click();
    speak(reply || "I added this item to your favorites.");
  }

  function bookCurrentTrip(reply) {
    const bookingBox = document.getElementById("bookingBox");

    if (bookingBox) {
      scrollToElement(bookingBox);
      speak(reply || "The booking form is ready.");
      return;
    }

    const bookTarget = Array.from(document.querySelectorAll("a, button")).find((element) => {
      const text = getVisibleText(element);
      return isVisible(element) && /book|reserve|trip/.test(text);
    });

    if (!bookTarget) {
      speak("I could not find a booking option on this page.");
      return;
    }

    bookTarget.click();
    speak(reply || "Opening the booking option.");
  }

  function setPlannerControl(value, query, reply) {
    const plannerForm = document.getElementById("plannerForm");
    const desired = normalizeText(`${value || ""} ${query || ""}`);

    if (!plannerForm) {
      queueActionAndNavigate(
        { action: "fill_planner", target: "none", value, query, reply },
        "plan_trip",
        "Opening the trip planner."
      );
      return;
    }

    let changed = false;

    Object.entries(PLANNER_VALUES).forEach(([phrase, controlValue]) => {
      if (!desired.includes(phrase)) return;

      const radio = plannerForm.querySelector(`input[type="radio"][value="${CSS.escape(controlValue)}"]`);
      const checkbox = plannerForm.querySelector(`input[type="checkbox"][value="${CSS.escape(controlValue)}"]`);

      if (radio) {
        radio.checked = true;
        changed = true;
      }
      if (checkbox) {
        checkbox.checked = true;
        changed = true;
      }
    });

    plannerForm.dispatchEvent(new Event("change", { bubbles: true }));
    scrollToElement(document.getElementById("resultCard") || plannerForm);
    speak(changed ? reply || "I updated your trip plan." : "Tell me a style like beach, nature, culture, or relaxed.");
  }

  function saveCurrentPlan(reply) {
    const saveButton = document.getElementById("savePlan");
    if (!saveButton) {
      queueActionAndNavigate(
        { action: "save_plan", target: "none", value: "none", query: "", reply },
        "plan_trip",
        "Opening the trip planner."
      );
      return;
    }

    saveButton.click();
    speak(reply || "Your trip plan has been saved.");
  }

  function updateChecklist(value, query, reply) {
    const checklistItems = Array.from(document.querySelectorAll("[data-check-item]"));

    if (!checklistItems.length) {
      queueActionAndNavigate(
        { action: "checklist", target: "none", value, query, reply },
        "plan_trip",
        "Opening the trip checklist."
      );
      return;
    }

    const desired = normalizeText(query || value || "");
    const item = checklistItems.find((checkbox) => {
      const label = checkbox.closest("label");
      return desired && normalizeText(`${checkbox.dataset.checkItem || ""} ${label?.textContent || ""}`).includes(desired);
    });

    if (!item) {
      scrollToElement(checklistItems[0].closest(".checklist-card") || checklistItems[0]);
      speak("The checklist is ready. You can say check water, check passport, or check medication.");
      return;
    }

    item.checked = value !== "off";
    item.dispatchEvent(new Event("change", { bubbles: true }));
    scrollToElement(item.closest("label") || item);
    speak(reply || "Checklist updated.");
  }

  function setVideoMenu(value, reply) {
    const shouldOpen = value !== "off";
    const menu = document.getElementById("navVideoMenu");
    const openBtn = document.getElementById("openVideoMenu");
    const closeBtn = document.getElementById("closeVideoMenu");

    if (!menu || !openBtn || !closeBtn) {
      speak("The sign language menu is not available on this page.");
      return;
    }

    const isOpen = menu.classList.contains("is-open");
    if (shouldOpen !== isOpen) {
      (shouldOpen ? openBtn : closeBtn).click();
    }

    speak(reply || (shouldOpen ? "Opening the sign language menu." : "Closing the sign language menu."));
  }

  function clickVisibleControl(query, reply) {
    const cleanQuery = normalizeText(query);

    if (!cleanQuery) {
      speak("Tell me what button or link you want me to open.");
      return;
    }

    const control = Array.from(document.querySelectorAll("a, button, summary")).find((element) => {
      if (!isVisible(element)) return false;
      return getVisibleText(element).includes(cleanQuery);
    });

    if (!control) {
      speak("I could not find that visible control.");
      return;
    }

    const href = control.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        speak("I cannot open external links by voice.");
        return;
      }
    }

    control.click();
    speak(reply || `Opening ${cleanQuery}.`);
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

  function setSiteLanguage(language) {
    if (!["en", "es"].includes(language)) {
      speak("That language is not available.");
      return;
    }

    localStorage.setItem("openRoutesLanguageV3", language);

    const languageSelect = document.querySelector("[data-language-select]");
    if (languageSelect) {
      languageSelect.value = language;
      languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (window.OpenRoutesLanguage?.apply) {
      window.OpenRoutesLanguage.apply(language);
      window.dispatchEvent(
        new CustomEvent("openroutes:languagechange", { detail: { language } })
      );
    }

    speak(language === "es" ? "Spanish activated." : "English activated.");
  }

  function getNavigationAction(command) {
    const navigationAliases = [
      {
        target: "tour_santa_ana",
        label: "Santa Ana Volcano Tour",
        aliases: [
          "santa ana tour",
          "santa ana volcano tour",
          "santa ana package",
          "volcano tour",
          "volcano route tour",
          "tour santa ana",
          "tour del volcan",
          "paquete santa ana",
          "paquete del volcan"
        ]
      },
      {
        target: "tour_coatepeque",
        label: "Lake Coatepeque Tour",
        aliases: [
          "coatepeque tour",
          "lake coatepeque tour",
          "coatepeque package",
          "lake package",
          "tour coatepeque",
          "tour del lago",
          "paquete coatepeque",
          "paquete del lago"
        ]
      },
      {
        target: "tour_el_tunco",
        label: "El Tunco Surf Tour",
        aliases: [
          "el tunco tour",
          "el tunco surf tour",
          "tunco tour",
          "surf tour",
          "beach tour",
          "el tunco package",
          "tour el tunco",
          "tour de surf",
          "paquete el tunco",
          "paquete de playa"
        ]
      },
      {
        target: "tour_suchitoto",
        label: "Suchitoto Colonial Tour",
        aliases: [
          "suchitoto tour",
          "suchitoto colonial tour",
          "cultural tour",
          "colonial tour",
          "suchitoto package",
          "tour suchitoto",
          "tour colonial",
          "paquete suchitoto",
          "paquete cultural"
        ]
      },
      {
        target: "santa_ana",
        label: "Santa Ana Volcano",
        aliases: [
          "santa ana volcano",
          "santa ana",
          "volcano",
          "volcan",
          "volcan santa ana",
          "volcan de santa ana",
          "santa ana volcano detail",
          "santa ana information",
          "informacion de santa ana"
        ]
      },
      {
        target: "coatepeque",
        label: "Lake Coatepeque",
        aliases: [
          "lake coatepeque",
          "coatepeque lake",
          "coatepeque",
          "coatepec",
          "coatepeq",
          "lago de coatepeque",
          "lago coatepeque",
          "the lake",
          "coatepeque detail",
          "coatepeque information",
          "lake information",
          "informacion de coatepeque",
          "informacion del lago",
          "detalle de coatepeque"
        ]
      },
      {
        target: "el_tunco",
        label: "El Tunco Beach",
        aliases: [
          "el tunco beach",
          "el tunco",
          "tunco",
          "playa el tunco",
          "the beach",
          "tunco beach",
          "el tunco information",
          "informacion del tunco",
          "informacion de el tunco",
          "detalle del tunco"
        ]
      },
      {
        target: "suchitoto",
        label: "Suchitoto",
        aliases: [
          "suchitoto",
          "suchi toto",
          "suchitoto information",
          "suchitoto detail",
          "informacion de suchitoto",
          "detalle de suchitoto"
        ]
      },
      {
        target: "historic_center",
        label: "Historic Center",
        aliases: [
          "historic center",
          "historical center",
          "centro historico",
          "centro historico de san salvador",
          "centro de san salvador",
          "centro historico de san salvador",
          "san salvador historic center",
          "historic center information",
          "informacion del centro historico",
          "detalle del centro historico"
        ]
      },
      {
        target: "el_imposible",
        label: "El Imposible National Park",
        aliases: [
          "el imposible",
          "el imposible national park",
          "parque el imposible",
          "parque nacional el imposible",
          "imposible park",
          "imposible",
          "informacion de el imposible",
          "informacion del imposible"
        ]
      },
      {
        target: "cerro_verde",
        label: "Cerro Verde",
        aliases: [
          "cerro verde",
          "cerro verde tour",
          "tour cerro verde",
          "cerro verde package",
          "paquete cerro verde",
          "tour de cerro verde"
        ]
      },
      {
        target: "ruta_flores",
        label: "Ruta de las Flores",
        aliases: [
          "ruta de las flores",
          "ruta flores",
          "flowers route",
          "flower route",
          "tour ruta de las flores",
          "ruta de las flores tour",
          "paquete ruta de las flores"
        ]
      },
      {
        target: "destinations",
        label: "Destinations",
        aliases: [
          "destinations",
          "destination page",
          "places",
          "routes",
          "explore places",
          "browse places",
          "destinos",
          "lugares",
          "pagina de destinos",
          "ver destinos",
          "explorar lugares"
        ]
      },
      {
        target: "plan_trip",
        label: "Plan Your Trip",
        aliases: [
          "plan your trip",
          "trip planner",
          "travel planner",
          "planner",
          "plan trip",
          "build trip",
          "build my trip",
          "plan a trip",
          "travel plan",
          "planear viaje",
          "planear mi viaje",
          "planificar viaje",
          "planificador",
          "planificador de viaje",
          "planifica mi viaje",
          "crear mi viaje",
          "armar mi viaje"
        ]
      },
      {
        target: "popular_tours",
        label: "Popular Tours",
        aliases: [
          "popular tours",
          "tour packages",
          "packages",
          "travel packages",
          "tour cards",
          "paquetes",
          "tours populares",
          "paquetes populares",
          "paquetes de viaje",
          "cards de tours"
        ]
      },
      {
        target: "about",
        label: "About Us",
        aliases: [
          "about us",
          "about page",
          "about",
          "team",
          "our team",
          "meet the team",
          "sobre nosotros",
          "nosotros",
          "equipo",
          "nuestro equipo"
        ]
      },
      {
        target: "contact",
        label: "Contact",
        aliases: [
          "contact us",
          "contact page",
          "contact",
          "support",
          "customer support",
          "contact support",
          "contacto",
          "soporte",
          "ayuda de contacto",
          "contactar"
        ]
      },
      {
        target: "favorites",
        label: "Favorites",
        aliases: [
          "favorites",
          "favourites",
          "my favorites",
          "saved places",
          "saved trips",
          "favorite places",
          "favoritos",
          "mis favoritos",
          "lugares guardados",
          "viajes guardados"
        ]
      },
      {
        target: "interpreters",
        label: "Interpreters",
        aliases: [
          "interpreters",
          "interpreter",
          "guides",
          "guide",
          "find an interpreter",
          "find a guide",
          "tour guides",
          "interpretes",
          "interprete",
          "guias",
          "guia",
          "buscar interprete",
          "buscar guia",
          "guias e interpretes"
        ]
      },
      {
        target: "steven",
        label: "Steven",
        aliases: [
          "steven",
          "steven profile",
          "steven information",
          "steven interpreter",
          "steven guide",
          "perfil de steven",
          "informacion de steven",
          "interprete steven"
        ]
      },
      {
        target: "login",
        label: "Login",
        aliases: [
          "login",
          "log in",
          "sign in",
          "access account",
          "my account",
          "iniciar sesion",
          "inicio de sesion",
          "entrar a mi cuenta",
          "mi cuenta"
        ]
      },
      {
        target: "register",
        label: "Register",
        aliases: [
          "register",
          "registration",
          "sign up",
          "create account",
          "new account",
          "make an account",
          "registrarse",
          "registro",
          "crear cuenta",
          "nueva cuenta",
          "hacer cuenta"
        ]
      },
      {
        target: "settings",
        label: "Settings",
        aliases: [
          "settings",
          "preferences",
          "account settings",
          "profile settings",
          "configuracion",
          "ajustes",
          "configuracion de cuenta",
          "ajustes de perfil"
        ]
      },
      {
        target: "faq",
        label: "Help and FAQ",
        aliases: [
          "faq",
          "help",
          "help page",
          "frequently asked questions",
          "questions",
          "common questions",
          "preguntas frecuentes",
          "ayuda",
          "preguntas",
          "dudas",
          "preguntas comunes"
        ]
      },
      {
        target: "accessibility_statement",
        label: "Accessibility Statement",
        aliases: [
          "accessibility statement",
          "accessibility policy",
          "accessibility commitment",
          "accessibility information",
          "declaracion de accesibilidad",
          "politica de accesibilidad",
          "compromiso de accesibilidad"
        ]
      },
      {
        target: "home",
        label: "Home",
        aliases: [
          "home page",
          "homepage",
          "the home",
          "home",
          "main page",
          "start page",
          "inicio",
          "pagina principal",
          "pagina de inicio",
          "menu principal"
        ]
      }
    ];

    const hasNavigationIntent =
      /(^|\s)(go|open|take|navigate|come|bring|show|visit|switch|change|move|send|lead|enter|ir|abre|abrir|entra|entrar|muestra|mostrar|ver|visitar|cambia|lleva|llevame|manda|mandame|dirigete)(\s|$)/.test(command) ||
      command.includes("take me to") ||
      command.includes("go to") ||
      command.includes("send me to") ||
      command.includes("bring me to") ||
      command.includes("i want to go") ||
      command.includes("i want to open") ||
      command.includes("i want to see") ||
      command.includes("ir a") ||
      command.includes("quiero ir") ||
      command.includes("quiero abrir") ||
      command.includes("quiero ver") ||
      command.includes("quiero conocer") ||
      command.includes("abre la") ||
      command.includes("abre el") ||
      command.includes("abre los") ||
      command.includes("abre mi") ||
      command.includes("muestrame") ||
      command.includes("llevame a") ||
      command.includes("mandame a") ||
      command.includes("entrar a") ||
      command.includes("switch to") ||
      command.includes("change to") ||
      command.startsWith("yes ");

    for (const item of navigationAliases) {
      const matchedAlias = item.aliases.find((alias) => command.includes(alias));
      if (matchedAlias && (hasNavigationIntent || command === matchedAlias)) {
        return {
          action: "navigate",
          target: item.target,
          value: "none",
          query: "",
          reply: `Opening ${item.label}.`
        };
      }
    }

    return null;
  }

  function parseLocalCommand(rawTranscript) {
    const command = normalizeText(rawTranscript);

    if (
      includesAny(command, [
        "stop reading",
        "stop speaking",
        "be quiet",
        "pause reading",
        "cancel reading",
        "stop the voice",
        "quiet please",
        "detener lectura",
        "parar lectura",
        "detener audio",
        "parar audio",
        "pausar lectura",
        "cancelar lectura",
        "para de hablar",
        "deja de hablar",
        "callate"
      ])
    ) {
      return {
        action: "stop_reading",
        target: "none",
        value: "none",
        reply: "Reading stopped."
      };
    }

    if (
      includesAny(command, [
        "stop listening",
        "stop assistant",
        "turn off assistant",
        "close assistant",
        "disable assistant",
        "assistant off",
        "finish assistant",
        "detener asistente",
        "apagar asistente",
        "cerrar asistente",
        "desactivar asistente",
        "terminar asistente",
        "ya no escuchar",
        "deja de escuchar"
      ]) ||
      command === "goodbye" ||
      command === "adios"
    ) {
      return {
        action: "stop_assistant",
        target: "none",
        value: "none",
        reply: "Voice assistant stopped."
      };
    }

    if (
      includesAny(command, [
        "what can i say",
        "available commands",
        "voice commands",
        "show commands",
        "tell me the commands",
        "commands list",
        "what can you do",
        "how can you help",
        "assistant help",
        "que puedo decir",
        "que puedes hacer",
        "como me ayudas",
        "como puedes ayudar",
        "lista de comandos",
        "comandos",
        "mostrar comandos"
      ]) ||
      command === "help" ||
      command === "ayuda" ||
      command === "yes" ||
      command === "yes please" ||
      command === "si" ||
      command === "si por favor" ||
      command.includes("i need help") ||
      command.includes("necesito ayuda")
    ) {
      return {
        action: "repeat_help",
        target: "none",
        value: "none",
        reply: getHelpMessage()
      };
    }

    if (
      includesAny(command, [
        "read menu",
        "read navbar",
        "read navigation",
        "read the menu",
        "read the navbar",
        "read navigation menu",
        "what pages can i open",
        "where can i go",
        "available pages",
        "menu options",
        "navigation options",
        "tell me the menu",
        "say the menu",
        "what is in the navbar",
        "site menu",
        "leer menu",
        "leer navbar",
        "leer navegacion",
        "dime el menu",
        "decime el menu",
        "opciones del menu",
        "que paginas hay",
        "a donde puedo ir",
        "leer barra de navegacion"
      ])
    ) {
      return {
        action: "read_menu",
        target: "none",
        value: "none",
        query: "",
        reply: getNavigationMessage()
      };
    }

    if (
      includesAny(command, [
        "what is this page about",
        "what is the page about",
        "what is this about",
        "what page is this",
        "where am i",
        "where am i now",
        "what am i looking at",
        "tell me where i am",
        "summarize this page",
        "summarize the page",
        "summary of this page",
        "tell me about this page",
        "describe this page",
        "page summary",
        "explain this page",
        "what does this page do",
        "what is this section about",
        "tell me what this page does",
        "de que trata esta pagina",
        "de que trata la pagina",
        "que es esta pagina",
        "en que pagina estoy",
        "donde estoy",
        "que estoy viendo",
        "explica esta pagina",
        "resume esta pagina",
        "resumen de esta pagina",
        "descripcion de la pagina",
        "dime de que trata",
        "dime donde estoy"
      ])
    ) {
      return {
        action: "summarize_page",
        target: "none",
        value: "none",
        query: "",
        reply: ""
      };
    }

    if (
      command === "no" ||
      command.includes("no thank you") ||
      command.includes("no thanks") ||
      command.includes("no gracias")
    ) {
      return {
        action: "stop_assistant",
        target: "none",
        value: "none",
        reply: "Okay. Voice assistant stopped."
      };
    }

    if (
      includesAny(command, [
        "read this page",
        "read the page",
        "read page",
        "read aloud",
        "read the content",
        "read content",
        "start reading",
        "voice guide",
        "tell me what it says",
        "leer pagina",
        "lee la pagina",
        "leer esta pagina",
        "leer contenido",
        "lee el contenido",
        "empieza a leer",
        "dime que dice",
        "guia de audio",
        "audio guide"
      ])
    ) {
      return {
        action: "read_page",
        target: "none",
        value: "none",
        reply: "I will read this page."
      };
    }

    if (command.includes("go back") || command.includes("regresar") || command.includes("volver") || command === "back") {
      return {
        action: "go_back",
        target: "none",
        value: "none",
        reply: "Going back."
      };
    }

    if (command.includes("go forward") || command.includes("adelante") || command === "forward") {
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
      ["go down", "down"],
      ["page down", "down"],
      ["lower the page", "down"],
      ["bajar", "down"],
      ["baja", "down"],
      ["baja la pagina", "down"],
      ["mueve hacia abajo", "down"],
      ["desplazar abajo", "down"],
      ["scroll up", "up"],
      ["move up", "up"],
      ["go up", "up"],
      ["page up", "up"],
      ["subir", "up"],
      ["sube", "up"],
      ["sube la pagina", "up"],
      ["mueve hacia arriba", "up"],
      ["desplazar arriba", "up"],
      ["go to the top", "top"],
      ["scroll to top", "top"],
      ["back to top", "top"],
      ["top of page", "top"],
      ["ir arriba", "top"],
      ["hasta arriba", "top"],
      ["inicio de la pagina", "top"],
      ["go to the bottom", "bottom"],
      ["scroll to bottom", "bottom"],
      ["bottom of page", "bottom"],
      ["end of page", "bottom"],
      ["ir abajo", "bottom"],
      ["hasta abajo", "bottom"],
      ["final de la pagina", "bottom"]
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
      includesAny(command, [
        "turn on high contrast",
        "enable high contrast",
        "use high contrast",
        "put high contrast",
        "contrast mode",
        "make it easier to see",
        "activar alto contraste",
        "activar contraste",
        "alto contraste",
        "poner contraste",
        "modo contraste",
        "que se vea mejor"
      ]) &&
      !includesAny(command, ["turn off", "disable", "desactivar", "quitar"])
    ) {
      return {
        action: "high_contrast",
        target: "none",
        value: "on",
        reply: "High contrast turned on."
      };
    }

    if (
      includesAny(command, [
        "turn off high contrast",
        "disable high contrast",
        "remove high contrast",
        "normal contrast",
        "desactivar alto contraste",
        "quitar alto contraste",
        "desactivar contraste",
        "quitar contraste",
        "contraste normal"
      ])
    ) {
      return {
        action: "high_contrast",
        target: "none",
        value: "off",
        reply: "High contrast turned off."
      };
    }

    if (
      includesAny(command, [
        "turn on dark mode",
        "enable dark mode",
        "dark mode",
        "night mode",
        "make it dark",
        "put dark mode",
        "switch to dark mode",
        "activar modo oscuro",
        "modo oscuro",
        "poner modo oscuro",
        "modo noche",
        "pantalla oscura",
        "cambiar a modo oscuro"
      ]) &&
      !includesAny(command, ["turn off", "disable", "desactivar", "quitar", "modo claro"])
    ) {
      return {
        action: "dark_mode",
        target: "none",
        value: "on",
        reply: "Dark mode turned on."
      };
    }

    if (
      includesAny(command, [
        "turn off dark mode",
        "disable dark mode",
        "light mode",
        "make it light",
        "switch to light mode",
        "normal mode",
        "desactivar modo oscuro",
        "quitar modo oscuro",
        "modo claro",
        "activar modo claro",
        "pantalla clara",
        "cambiar a modo claro"
      ])
    ) {
      return {
        action: "dark_mode",
        target: "none",
        value: "off",
        reply: "Dark mode turned off."
      };
    }

    if (
      includesAny(command, [
        "change to spanish",
        "switch to spanish",
        "spanish language",
        "set spanish",
        "put spanish",
        "translate to spanish",
        "show in spanish",
        "espanol",
        "cambiar a espanol",
        "poner espanol",
        "activar espanol",
        "traducir a espanol",
        "mostrar en espanol",
        "pagina en espanol"
      ])
    ) {
      return {
        action: "language",
        target: "none",
        value: "es",
        query: "",
        reply: "Spanish activated."
      };
    }

    if (
      includesAny(command, [
        "change to english",
        "switch to english",
        "english language",
        "set english",
        "put english",
        "translate to english",
        "show in english",
        "ingles",
        "cambiar a ingles",
        "poner ingles",
        "activar ingles",
        "traducir a ingles",
        "mostrar en ingles",
        "pagina en ingles"
      ])
    ) {
      return {
        action: "language",
        target: "none",
        value: "en",
        query: "",
        reply: "English activated."
      };
    }

    if (
      includesAny(command, [
        "increase text",
        "bigger text",
        "make text bigger",
        "larger text",
        "zoom text",
        "text up",
        "increase font",
        "make letters bigger",
        "aumentar texto",
        "texto grande",
        "letra mas grande",
        "agrandar letra",
        "aumentar letra",
        "subir texto",
        "aumentar fuente",
        "hacer letras mas grandes"
      ])
    ) {
      return {
        action: "text_size",
        target: "none",
        value: "increase",
        reply: "Text size increased."
      };
    }

    if (
      includesAny(command, [
        "decrease text",
        "smaller text",
        "make text smaller",
        "reduce text",
        "text down",
        "decrease font",
        "make letters smaller",
        "disminuir texto",
        "texto pequeno",
        "letra mas pequena",
        "hacer letra pequena",
        "reducir letra",
        "bajar texto",
        "disminuir fuente",
        "hacer letras mas pequenas"
      ])
    ) {
      return {
        action: "text_size",
        target: "none",
        value: "decrease",
        reply: "Text size decreased."
      };
    }

    if (
      includesAny(command, [
        "open sign language",
        "show sign language",
        "open video menu",
        "show video menu",
        "sign language menu",
        "open signs",
        "show signs",
        "open lessa menu",
        "show lessa menu",
        "abrir lenguaje de senas",
        "mostrar lenguaje de senas",
        "abrir lengua de senas",
        "mostrar lengua de senas",
        "abrir menu de videos",
        "mostrar menu de videos",
        "abrir menu de lessa",
        "mostrar menu de lessa",
        "menu de senas"
      ])
    ) {
      return {
        action: "video_menu",
        target: "none",
        value: "on",
        query: "",
        reply: "Opening the sign language menu."
      };
    }

    if (
      includesAny(command, [
        "close sign language",
        "hide sign language",
        "close video menu",
        "hide video menu",
        "close signs",
        "hide signs",
        "close lessa menu",
        "cerrar lenguaje de senas",
        "ocultar lenguaje de senas",
        "cerrar lengua de senas",
        "ocultar lengua de senas",
        "cerrar menu de videos",
        "ocultar menu de videos",
        "cerrar menu de lessa"
      ])
    ) {
      return {
        action: "video_menu",
        target: "none",
        value: "off",
        query: "",
        reply: "Closing the sign language menu."
      };
    }

    if (
      includesAny(command, [
        "add to favorites",
        "add this to favorites",
        "favorite this",
        "save favorite",
        "save this place",
        "save this destination",
        "keep this place",
        "add place to favorites",
        "agregar a favoritos",
        "anadir a favoritos",
        "guardar favorito",
        "guardar en favoritos",
        "guardar este lugar",
        "guardar este destino",
        "agrega esto a favoritos",
        "anade esto a favoritos"
      ])
    ) {
      return {
        action: "add_favorite",
        target: "none",
        value: "none",
        query: "",
        reply: "Adding this to favorites."
      };
    }

    if (
      includesAny(command, [
        "book this",
        "book trip",
        "book now",
        "reserve this",
        "reserve trip",
        "book the trip",
        "book the tour",
        "reserve the tour",
        "make a booking",
        "start booking",
        "start reservation",
        "reservar viaje",
        "reservar tour",
        "reservar ahora",
        "hacer reserva",
        "book tour",
        "empezar reserva",
        "iniciar reserva",
        "reservar este viaje",
        "reservar este tour"
      ])
    ) {
      return {
        action: "book_trip",
        target: "none",
        value: "none",
        query: "",
        reply: "Opening the booking option."
      };
    }

    if (
      includesAny(command, [
        "save plan",
        "save my plan",
        "save this plan",
        "keep my plan",
        "guardar plan",
        "guardar mi plan",
        "guardar este plan",
        "guardar itinerario",
        "guardar mi itinerario"
      ])
    ) {
      return {
        action: "save_plan",
        target: "none",
        value: "none",
        query: "",
        reply: "Saving your trip plan."
      };
    }

    if (
      includesAny(command, [
        "log out",
        "logout",
        "sign out",
        "close session",
        "exit account",
        "cerrar sesion",
        "salir de la cuenta",
        "cerrar mi cuenta",
        "salir"
      ])
    ) {
      return {
        action: "logout",
        target: "none",
        value: "none",
        query: "",
        reply: "Logging out."
      };
    }

    const navigationAction = getNavigationAction(command);
    if (navigationAction) {
      return navigationAction;
    }

    const searchMatch =
      command.match(/(?:search|find|look for|show me|look up|search for)\s+(?:destinations?\s+|places?\s+)?(?:for\s+|with\s+|about\s+)?(.+)/) ||
      command.match(/(?:find|show me|look for)\s+(.+)\s+(?:destinations?|places?)/) ||
      command.match(/(?:buscar|busca|encontrar|encuentra|mostrar|muestrame|ver|buscame|encuentrame)\s+(?:destinos?\s+|lugares?\s+)?(?:de\s+|con\s+|sobre\s+)?(.+)/) ||
      command.match(/(?:buscar|mostrar|muestrame)\s+(.+)\s+(?:destinos?|lugares?)/);

    if (searchMatch && searchMatch[1]) {
      const searchQuery = searchMatch[1]
        .replace(/\b(destinations?|places?|routes?)\b/g, "")
        .trim();

      if (searchQuery) {
        for (const [phrase, tabValue] of Object.entries(TAB_ALIASES)) {
          if (searchQuery.includes(phrase) && !command.includes("destination")) {
            return {
              action: "open_tab",
              target: "none",
              value: tabValue,
              query: "",
              reply: `Showing ${phrase}.`
            };
          }
        }

        const exactFilter = DESTINATION_FILTERS[normalizeText(searchQuery)];
        if (exactFilter) {
          return {
            action: "filter_destinations",
            target: "none",
            value: exactFilter,
            query: "",
            reply: `Applying ${searchQuery} filter.`
          };
        }

        return {
          action: "search_destinations",
          target: "none",
          value: "none",
          query: searchQuery,
          reply: `Searching destinations for ${searchQuery}.`
        };
      }
    }

    for (const [phrase, filterValue] of Object.entries(DESTINATION_FILTERS)) {
      if (
        command.includes(`filter ${phrase}`) ||
        command.includes(`only ${phrase}`) ||
        command.includes(`filtrar ${phrase}`) ||
        command.includes(`solo ${phrase}`) ||
        command.includes(`show ${phrase}`) ||
        command.includes(`mostrar ${phrase}`) ||
        command.includes(`ver ${phrase}`) ||
        command.includes(`${phrase} destinations`) ||
        command.includes(`${phrase} places`) ||
        command.includes(`destinos ${phrase}`) ||
        command.includes(`lugares ${phrase}`) ||
        command.includes(`destinos de ${phrase}`) ||
        command.includes(`lugares de ${phrase}`) ||
        command.includes(`sort by ${phrase}`)
      ) {
        return {
          action: "filter_destinations",
          target: "none",
          value: filterValue,
          query: "",
          reply: `Applying ${phrase} filter.`
        };
      }
    }

    for (const [phrase, tabValue] of Object.entries(TAB_ALIASES)) {
      if (
        command.includes(`show ${phrase}`) ||
        command.includes(`show me ${phrase}`) ||
        command.includes(`open ${phrase}`) ||
        command.includes(`go to ${phrase}`) ||
        command.includes(`read ${phrase}`) ||
        command.includes(`tell me ${phrase}`) ||
        command.includes(`mostrar ${phrase}`) ||
        command.includes(`muestrame ${phrase}`) ||
        command.includes(`abrir ${phrase}`) ||
        command.includes(`abre ${phrase}`) ||
        command.includes(`ir a ${phrase}`) ||
        command.includes(`leer ${phrase}`) ||
        command.includes(`dime ${phrase}`) ||
        command.includes(`ver ${phrase}`)
      ) {
        return {
          action: "open_tab",
          target: "none",
          value: tabValue,
          query: "",
          reply: `Showing ${phrase}.`
        };
      }
    }

    if (
      command.includes("plan a") ||
      command.includes("plan my") ||
      command.includes("make a plan") ||
      command.includes("create a trip") ||
      command.includes("trip plan") ||
      command.includes("build my trip") ||
      command.includes("help me plan") ||
      command.includes("plan this trip") ||
      command.includes("planear") ||
      command.includes("planificar") ||
      command.includes("crear viaje") ||
      command.includes("hacer plan") ||
      command.includes("armar viaje") ||
      command.includes("ayudame a planear")
    ) {
      return {
        action: "fill_planner",
        target: "none",
        value: "none",
        query: command,
        reply: "Updating the trip planner."
      };
    }

    const checklistMatch = command.match(/(?:check|mark|add|select|marcar|agregar|anadir|seleccionar)\s+(?:the\s+|el\s+|la\s+)?(.+)/);
    if (checklistMatch && (command.includes("check") || command.includes("marcar"))) {
      return {
        action: "checklist",
        target: "none",
        value: "on",
        query: checklistMatch[1],
        reply: "Updating your checklist."
      };
    }

    const clickMatch = command.match(/(?:click|press|tap|choose|select|open|abre|abrir|tocar|presiona|selecciona|elige|escoge)\s+(?:the\s+|el\s+|la\s+|los\s+|las\s+)?(.+)/);
    if (clickMatch && clickMatch[1]) {
      const requested = clickMatch[1].trim();
      if (requested.length > 2) {
        return {
          action: "click_visible",
          target: "none",
          value: "none",
          query: requested,
          reply: `Opening ${requested}.`
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
      "summarize_page",
      "stop_reading",
      "go_back",
      "go_forward",
      "high_contrast",
      "dark_mode",
      "text_size",
      "language",
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
      "en",
      "es",
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
      "none"
    ]);
    const value =
      data && allowedValues.has(data.value) ? data.value : "none";
    const query =
      data && typeof data.query === "string"
        ? data.query.trim().replace(/\s+/g, " ").slice(0, 100)
        : "";
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

    return { action, target, value, query, reply };
  }

  async function processVoiceCommand(transcript) {
    const localAction = parseLocalCommand(transcript);

    if (localAction) {
      executeAction(localAction);
      return;
    }

    setStatus(
      getLanguageCode() === "es"
        ? "Entendiendo tu solicitud con Ollama..."
        : "Understanding your request with Ollama..."
    );

    try {
      const ollamaAction = await askOllama(transcript);
      executeAction(ollamaAction);
    } catch (error) {
      console.error("Ollama assistant error:", error);

      const errorMessage =
        error.name === "AbortError"
          ? getLanguageCode() === "es"
            ? "Ollama tardo demasiado en responder. Manten abierto el servidor local del asistente e intenta otra vez."
            : "Ollama took too long to respond. Keep the assistant server open and try again."
          : error.message ||
            (getLanguageCode() === "es"
              ? "No pude conectarme al servidor local del asistente. Ejecuta start-assistant-server.bat y abre el sitio local que proporciona."
              : "I could not reach the local assistant server. Run start-assistant-server.bat and open the local site it provides.");

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

      case "summarize_page":
        summarizeCurrentPage();
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

      case "language":
        setSiteLanguage(command.value);
        break;

      case "search_destinations":
        searchDestinations(command.query, command.reply);
        break;

      case "filter_destinations":
        filterDestinations(command.value !== "none" ? command.value : command.query, command.reply);
        break;

      case "open_tab":
        showPageSection(command.value !== "none" ? command.value : command.query, command.reply);
        break;

      case "add_favorite":
        addCurrentFavorite(command.reply);
        break;

      case "book_trip":
        bookCurrentTrip(command.reply);
        break;

      case "fill_planner":
        setPlannerControl(command.value, command.query, command.reply);
        break;

      case "save_plan":
        saveCurrentPlan(command.reply);
        break;

      case "checklist":
        updateChecklist(command.value, command.query, command.reply);
        break;

      case "video_menu":
        setVideoMenu(command.value, command.reply);
        break;

      case "click_visible":
        clickVisibleControl(command.query, command.reply);
        break;

      case "logout":
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("rememberSession");
        speak(command.reply || "Logging out.", {
          listenAfter: false,
          afterSpeak: () => {
            window.location.href = ROUTES.home;
          }
        });
        break;

      case "repeat_help":
        speak(command.reply || getHelpMessage());
        break;

      case "read_menu":
        readNavigationMenu();
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
            (getLanguageCode() === "es"
              ? "No entendi. Di que puedo decir para escuchar los comandos."
              : "I did not understand. Say what can I say to hear the commands.")
        );
        break;
    }
  }

  function runPendingAction() {
    const rawAction = sessionStorage.getItem(CONFIG.pendingActionKey);
    if (!rawAction) return;

    sessionStorage.removeItem(CONFIG.pendingActionKey);

    try {
      const action = validateAction(JSON.parse(rawAction));
      window.setTimeout(() => executeAction(action), 450);
    } catch (error) {
      console.debug("Pending assistant action ignored:", error);
    }
  }

  function initialize() {
    injectStylesheet();
    createStatusPanel();
    createAssistantPrompt();
    addAccessibilityMenuControl();
    setupRecognition();
    updateControls();

    const shouldResume =
      sessionStorage.getItem(CONFIG.resumeKey) === "1";
    const promptChoice = sessionStorage.getItem(CONFIG.promptChoiceKey);

    if (shouldResume) {
      window.setTimeout(() => startAssistant(false), 650);
    } else if (!promptChoice) {
      window.setTimeout(showAssistantPrompt, 700);
    }

    window.setTimeout(runPendingAction, shouldResume ? 1000 : 450);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
