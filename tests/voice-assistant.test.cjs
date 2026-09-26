const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(projectRoot, "js", "voice-assistant.js"), "utf8");
const storage = new Map([["openRoutesLanguageV3", "en"]]);

const localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },
  setItem(key, value) {
    storage.set(key, String(value));
  },
  removeItem(key) {
    storage.delete(key);
  }
};

const document = {
  readyState: "loading",
  addEventListener() {}
};

const window = {
  location: {
    hostname: "example.com",
    pathname: "/index.html",
    search: "",
    href: "https://example.com/index.html"
  },
  SpeechRecognition: null,
  webkitSpeechRecognition: null,
  speechSynthesis: null,
  setTimeout,
  clearTimeout
};

const context = vm.createContext({
  window,
  document,
  localStorage,
  sessionStorage: localStorage,
  URLSearchParams,
  console,
  setTimeout,
  clearTimeout
});

vm.runInContext(source, context, { filename: "voice-assistant.js" });

const assistant = window.OpenRoutesVoiceAssistant;
assert.ok(assistant, "The voice assistant test API must be available.");

function setPage(page, language = "en") {
  window.location.pathname = `/${page}`;
  window.location.href = `https://example.com/${page}`;
  storage.set("openRoutesLanguageV3", language);
}

function expectCommand(page, language, transcript, expected) {
  setPage(page, language);
  const result = assistant.interpretCommand(transcript);
  assert.ok(result, `${page}: command was not recognized: ${transcript}`);
  Object.entries(expected).forEach(([key, value]) => {
    assert.equal(result[key], value, `${page}: ${transcript} should set ${key}=${value}, got ${result[key]}`);
  });
}

const cases = [
  ["index.html", "en", "read this page", { action: "read_page" }],
  ["index.html", "es", "lee esta pagina", { action: "read_page" }],
  ["index.html", "es", "leeme la pagina", { action: "read_page" }],
  ["index.html", "en", "read destinations", { action: "read_collection", value: "destinations" }],
  ["index.html", "es", "leer tours", { action: "read_collection", value: "tours" }],
  ["index.html", "en", "open the first destination", { action: "open_indexed_item", value: "destinations", query: "first" }],
  ["index.html", "es", "abrir el primer tour", { action: "open_indexed_item", value: "tours", query: "primer" }],
  ["destinations.html", "en", "read filters", { action: "read_collection", value: "filters" }],
  ["destinations.html", "es", "filtrar silla de ruedas", { action: "filter_destinations", value: "wheelchair" }],
  ["destinations.html", "en", "filter by low walking", { action: "filter_destinations", value: "low-walking" }],
  ["destination-detail.html", "en", "read accessibility", { action: "read_section", value: "accessibility" }],
  ["destination-detail.html", "es", "abre accesibilidad", { action: "read_section", value: "accessibility" }],
  ["destination-detail.html", "es", "leer informacion practica", { action: "read_section", value: "practical" }],
  ["destination-detail.html", "en", "read local experiences", { action: "read_section", value: "things" }],
  ["destination-detail.html", "es", "leer resenas", { action: "read_collection", value: "reviews" }],
  ["destination-detail.html", "en", "add this to favorites", { action: "add_favorite" }],
  ["plan-your-trip.html", "en", "choose nature", { action: "fill_planner", value: "nature" }],
  ["plan-your-trip.html", "es", "elegir playa", { action: "fill_planner", value: "playa" }],
  ["plan-your-trip.html", "es", "marcar interprete", { action: "fill_planner", value: "interprete" }],
  ["plan-your-trip.html", "en", "save plan", { action: "save_plan" }],
  ["plan-your-trip.html", "en", "check medication", { action: "checklist", query: "medication" }],
  ["plan-your-trip.html", "es", "marcar medicina", { action: "checklist", query: "medicina" }],
  ["plan-your-trip.html", "es", "marcar pasaporte", { action: "checklist", query: "pasaporte" }],
  ["plan-your-trip.html", "es", "marcar agua", { action: "checklist", query: "agua" }],
  ["tour-detail.html", "en", "read booking", { action: "read_collection", value: "booking" }],
  ["tour-detail.html", "es", "reservar este viaje", { action: "book_trip" }],
  ["about.html", "en", "read our story", { action: "read_section", value: "story" }],
  ["about.html", "es", "leer mision", { action: "read_section", value: "mission" }],
  ["about.html", "en", "read vision", { action: "read_section", value: "vision" }],
  ["about.html", "es", "leer valores", { action: "read_section", value: "values" }],
  ["about.html", "en", "read the team", { action: "read_collection", value: "team" }],
  ["about.html", "es", "leer equipo", { action: "read_collection", value: "team" }],
  ["about.html", "es", "leeme el equipo", { action: "read_collection", value: "team" }],
  ["faq.html", "en", "read questions", { action: "read_collection", value: "questions" }],
  ["faq.html", "es", "leer preguntas de accesibilidad", { action: "read_collection", value: "faq_accessibility" }],
  ["faq.html", "en", "read accessibility", { action: "read_collection", value: "faq_accessibility" }],
  ["faq.html", "en", "read booking questions", { action: "read_collection", value: "booking" }],
  ["faq.html", "es", "leer preguntas de reservas", { action: "read_collection", value: "booking" }],
  ["faq.html", "en", "read account questions", { action: "read_collection", value: "faq_account" }],
  ["faq.html", "es", "leer preguntas de cuenta", { action: "read_collection", value: "faq_account" }],
  ["faq.html", "en", "read video and guide questions", { action: "read_collection", value: "faq_videos_guides" }],
  ["faq.html", "es", "leer preguntas de videos y guias", { action: "read_collection", value: "faq_videos_guides" }],
  ["profile.html", "es", "leer perfil", { action: "read_collection", value: "profile" }],
  ["favorites.html", "en", "read favorites", { action: "read_collection", value: "favorites" }],
  ["contact.html", "es", "leer contacto", { action: "read_collection", value: "contact" }],
  ["settings.html", "en", "read security", { action: "read_section", value: "security" }],
  ["settings.html", "es", "leer notificaciones", { action: "read_section", value: "notifications" }],
  ["interpreters.html", "en", "read guides", { action: "read_collection", value: "guides" }],
  ["interpreters.html", "en", "search Steven", { action: "search_interpreters", query: "steven" }],
  ["interpreters.html", "es", "buscar Steven", { action: "search_interpreters", query: "steven" }],
  ["interpreters.html", "en", "filter guides by Spanish", { action: "filter_interpreters", value: "spanish" }],
  ["interpreters.html", "es", "filtrar guias en ingles", { action: "filter_interpreters", value: "ingles" }],
  ["index.html", "en", "go to destinations", { action: "navigate", target: "destinations" }],
  ["index.html", "es", "ir al lago de Coatepeque", { action: "navigate", target: "coatepeque" }],
  ["index.html", "es", "abre playa el Tumco", { action: "navigate", target: "el_tunco" }],
  ["index.html", "es", "ve a parque el Impossible", { action: "navigate", target: "el_imposible" }],
  ["index.html", "en", "open Historic Center", { action: "navigate", target: "historic_center" }],
  ["index.html", "en", "open the accessibility statement", { action: "navigate", target: "accessibility_statement" }],
  ["index.html", "es", "cambiar a ingles", { action: "language", value: "en" }],
  ["index.html", "en", "change to Spanish", { action: "language", value: "es" }],
  ["index.html", "es", "activar alto contraste", { action: "high_contrast", value: "on" }],
  ["index.html", "en", "turn off dark mode", { action: "dark_mode", value: "off" }],
  ["index.html", "es", "aumentar texto", { action: "text_size", value: "increase" }],
  ["index.html", "en", "open sign language menu", { action: "video_menu", value: "on" }],
  ["index.html", "es", "leer menu", { action: "read_menu" }],
  ["index.html", "en", "what can I say", { action: "repeat_help" }],
  ["index.html", "es", "detener asistente", { action: "stop_assistant" }]
];

cases.push(
  ["destination-detail.html", "en", "read overview", { action: "read_section", value: "overview" }],
  ["destination-detail.html", "es", "leer experiencias locales", { action: "read_section", value: "things" }],
  ["destination-detail.html", "en", "read location", { action: "read_section", value: "location" }],
  ["destination-detail.html", "es", "leer guias", { action: "read_collection", value: "guides" }],
  ["destination-detail.html", "en", "read tips", { action: "read_section", value: "tips" }],
  ["destination-detail.html", "es", "leer tours", { action: "read_collection", value: "tours" }],
  ["plan-your-trip.html", "en", "read options", { action: "read_collection", value: "options" }],
  ["plan-your-trip.html", "es", "elegir cultura", { action: "fill_planner", value: "cultura" }],
  ["plan-your-trip.html", "en", "check wheelchair", { action: "fill_planner", value: "wheelchair" }],
  ["plan-your-trip.html", "en", "check interpreter", { action: "fill_planner", value: "interpreter" }],
  ["tour-detail.html", "en", "go to popular tours", { action: "navigate", target: "popular_tours" }],
  ["about.html", "es", "leer nuestra historia", { action: "read_section", value: "story" }],
  ["contact.html", "en", "go to FAQ", { action: "navigate", target: "faq" }],
  ["contact.html", "es", "ir a la declaracion de accesibilidad", { action: "navigate", target: "accessibility_statement" }],
  ["profile.html", "en", "open favorites", { action: "navigate", target: "favorites" }],
  ["profile.html", "es", "abrir configuracion", { action: "navigate", target: "settings" }],
  ["favorites.html", "es", "abrir guias", { action: "navigate", target: "interpreters" }],
  ["settings.html", "es", "leer viaje", { action: "read_section", value: "travel" }],
  ["settings.html", "es", "leer idioma", { action: "read_section", value: "language" }],
  ["settings.html", "en", "read privacy", { action: "read_section", value: "privacy" }],
  ["faq.html", "en", "open contact", { action: "navigate", target: "contact" }],
  ["interpreters.html", "en", "filter guides by English", { action: "filter_interpreters", value: "english" }],
  ["interpreters.html", "en", "open Steven", { action: "navigate", target: "steven" }],
  ["Steven_information.html", "en", "open guides", { action: "navigate", target: "interpreters" }],
  ["login.html", "en", "open register", { action: "navigate", target: "register" }],
  ["registrer.html", "es", "abrir inicio de sesion", { action: "navigate", target: "login" }],
  ["accessibility-statement.html", "en", "read accessibility tools", { action: "answer" }],
  ["index.html", "en", "turn on high contrast", { action: "high_contrast", value: "on" }],
  ["index.html", "es", "activar modo oscuro", { action: "dark_mode", value: "on" }],
  ["index.html", "en", "decrease text", { action: "text_size", value: "decrease" }],
  ["index.html", "es", "cerrar menu de lengua de senas", { action: "video_menu", value: "off" }]
);

cases.push(
  ["destinations.html", "en", "filter restrooms", { action: "filter_destinations", value: "restrooms" }],
  ["destinations.html", "es", "filtrar lengua de senas", { action: "filter_destinations", value: "sign-language" }],
  ["destinations.html", "es", "filtrar naturaleza", { action: "filter_destinations", value: "nature" }],
  ["destinations.html", "en", "filter beach", { action: "filter_destinations", value: "beach" }],
  ["destinations.html", "es", "abrir el sexto destino", { action: "open_indexed_item", value: "destinations", query: "sexto" }],
  ["destination-detail.html", "en", "read practical info", { action: "read_section", value: "practical" }],
  ["destination-detail.html", "es", "leer ubicacion", { action: "read_section", value: "location" }],
  ["destination-detail.html", "en", "read guides", { action: "read_collection", value: "guides" }],
  ["destination-detail.html", "es", "leer consejos", { action: "read_section", value: "tips" }],
  ["destination-detail.html", "en", "read reviews", { action: "read_collection", value: "reviews" }],
  ["destination-detail.html", "es", "agregar esto a favoritos", { action: "add_favorite" }],
  ["destination-detail.html", "en", "open the first tour", { action: "open_indexed_item", value: "tours", query: "first" }],
  ["plan-your-trip.html", "en", "choose culture", { action: "fill_planner", value: "culture" }],
  ["plan-your-trip.html", "es", "seleccionar naturaleza", { action: "fill_planner", value: "naturaleza" }],
  ["plan-your-trip.html", "es", "marcar silla de ruedas", { action: "fill_planner", value: "silla de ruedas" }],
  ["plan-your-trip.html", "en", "check water", { action: "checklist", query: "water" }],
  ["tour-detail.html", "es", "leer pago", { action: "read_collection", value: "booking" }],
  ["tour-detail.html", "en", "book this trip", { action: "book_trip" }],
  ["about.html", "en", "go to contact", { action: "navigate", target: "contact" }],
  ["about.html", "es", "dime quienes estan en el equipo", { action: "read_collection", value: "team" }],
  ["faq.html", "es", "abrir contacto", { action: "navigate", target: "contact" }],
  ["profile.html", "en", "go to plan your trip", { action: "navigate", target: "plan_trip" }],
  ["favorites.html", "en", "open destinations", { action: "navigate", target: "destinations" }],
  ["settings.html", "en", "read notifications", { action: "read_section", value: "notifications" }],
  ["settings.html", "es", "leer privacidad", { action: "read_section", value: "privacy" }],
  ["settings.html", "en", "read options", { action: "read_collection", value: "options" }],
  ["interpreters.html", "es", "leer interpretes", { action: "read_collection", value: "guides" }],
  ["interpreters.html", "es", "filtrar guias en espanol", { action: "filter_interpreters", value: "espanol" }],
  ["interpreters.html", "en", "filter guides by French", { action: "filter_interpreters", value: "french" }],
  ["Steven_information.html", "es", "abrir favoritos", { action: "navigate", target: "favorites" }],
  ["login.html", "es", "abrir registro", { action: "navigate", target: "register" }],
  ["accessibility-statement.html", "es", "leer herramientas de accesibilidad", { action: "read_collection", value: "accessibility_tools" }],
  ["index.html", "en", "go to Santa Ana Volcano", { action: "navigate", target: "santa_ana" }],
  ["index.html", "es", "ir a Suchitoto", { action: "navigate", target: "suchitoto" }],
  ["index.html", "es", "abre el centro historico", { action: "navigate", target: "historic_center" }],
  ["index.html", "en", "open El Imposible National Park", { action: "navigate", target: "el_imposible" }],
  ["index.html", "en", "open Santa Ana tour", { action: "navigate", target: "tour_santa_ana" }],
  ["index.html", "es", "abrir tour coatepeque", { action: "navigate", target: "tour_coatepeque" }],
  ["index.html", "en", "open El Tunco surf tour", { action: "navigate", target: "tour_el_tunco" }],
  ["index.html", "es", "abrir tour suchitoto", { action: "navigate", target: "tour_suchitoto" }],
  ["index.html", "en", "open Cerro Verde", { action: "navigate", target: "cerro_verde" }],
  ["index.html", "es", "ir a ruta de las flores", { action: "navigate", target: "ruta_flores" }],
  ["index.html", "es", "cambia a espanol", { action: "language", value: "es" }],
  ["index.html", "en", "change the language to Spanish", { action: "language", value: "es" }],
  ["index.html", "es", "cambia el idioma a ingles", { action: "language", value: "en" }],
  ["index.html", "es", "desactivar alto contraste", { action: "high_contrast", value: "off" }],
  ["index.html", "es", "modo claro", { action: "dark_mode", value: "off" }],
  ["index.html", "es", "disminuir texto", { action: "text_size", value: "decrease" }],
  ["index.html", "es", "abrir menu de senas", { action: "video_menu", value: "on" }],
  ["index.html", "en", "scroll down", { action: "scroll", value: "down" }],
  ["index.html", "es", "sube la pagina", { action: "scroll", value: "up" }],
  ["index.html", "en", "what is this page about", { action: "summarize_page" }],
  ["index.html", "es", "que es open routes", { action: "answer" }],
  ["index.html", "en", "what accessibility features are available", { action: "answer" }]
);

cases.forEach(([page, language, transcript, expected]) => {
  expectCommand(page, language, transcript, expected);
});

const htmlFiles = fs.readdirSync(projectRoot).filter((file) => file.endsWith(".html"));
htmlFiles.forEach((file) => {
  const html = fs.readFileSync(path.join(projectRoot, file), "utf8");
  assert.match(html, /<script\s+src=["']js\/voice-assistant\.js["']><\/script>/i, `${file} must load the voice assistant.`);
  assert.match(html, /<script\s+src=["']js\/language\.js["']><\/script>/i, `${file} must load language synchronization.`);
  assert.match(html, /id=["']chkContrast["']/i, `${file} must expose high contrast to voice control.`);
  assert.match(html, /id=["']chkDarkMode["']/i, `${file} must expose dark mode to voice control.`);
  assert.match(html, /id=["']textSizeRange["']/i, `${file} must expose text size to voice control.`);
});

const aboutHtml = fs.readFileSync(path.join(projectRoot, "about.html"), "utf8");
assert.equal((aboutHtml.match(/class=["']member["']/g) || []).length, 6, "About Us must expose all six team members.");

const faqHtml = fs.readFileSync(path.join(projectRoot, "faq.html"), "utf8");
assert.ok((faqHtml.match(/class=["']faq-group["']/g) || []).length >= 4, "FAQ groups must be available to the assistant.");

const detailHtml = fs.readFileSync(path.join(projectRoot, "destination-detail.html"), "utf8");
["overview", "practical", "accessibility", "things", "location", "guides", "tips"].forEach((panel) => {
  assert.match(detailHtml, new RegExp(`class=["'][^"']*tab-btn[^"']*["'][^>]*data-tab=["']${panel}["']`), `Destination tab ${panel} must exist.`);
  assert.match(detailHtml, new RegExp(`class=["'][^"']*tab-panel[^"']*["'][^>]*data-panel=["']${panel}["']`), `Destination panel ${panel} must exist.`);
});
assert.match(detailHtml, /id=["']addDestinationFavorite["']/i, "Destination favorite control must exist.");
assert.match(detailHtml, /id=["']destinationReviews["']/i, "Destination reviews must exist.");
assert.match(detailHtml, /id=["']destinationTours["']/i, "Destination tours must exist.");

const settingsHtml = fs.readFileSync(path.join(projectRoot, "settings.html"), "utf8");
["security", "travel", "language", "notifications", "privacy"].forEach((panel) => {
  assert.match(settingsHtml, new RegExp(`class=["'][^"']*settings-tab[^"']*["'][^>]*data-panel=["']${panel}["']`), `Settings tab ${panel} must exist.`);
  assert.match(settingsHtml, new RegExp(`class=["'][^"']*settings-panel[^"']*["'][^>]*data-panel=["']${panel}["']`), `Settings panel ${panel} must exist.`);
});

const interpretersHtml = fs.readFileSync(path.join(projectRoot, "interpreters.html"), "utf8");
assert.match(interpretersHtml, /id=["']searchInput["']/i, "Interpreter search input must exist.");
assert.match(interpretersHtml, /id=["']filterLang["']/i, "Interpreter language filter must exist.");
assert.ok((interpretersHtml.match(/class=["']interpreter-card["']/g) || []).length >= 1, "Interpreter cards must exist.");

const plannerHtml = fs.readFileSync(path.join(projectRoot, "plan-your-trip.html"), "utf8");
["plannerForm", "savePlan"].forEach((id) => {
  assert.match(plannerHtml, new RegExp(`id=["']${id}["']`), `Planner control ${id} must exist.`);
});
["id", "meds", "water"].forEach((item) => {
  assert.match(plannerHtml, new RegExp(`data-check-item=["']${item}["']`), `Planner checklist item ${item} must exist.`);
});

const requiredFiles = [
  "index.html", "destinations.html", "destination-detail.html", "plan-your-trip.html", "tour-detail.html",
  "about.html", "contact.html", "profile.html", "favorites.html", "interpreters.html", "Steven_information.html",
  "login.html", "registrer.html", "settings.html", "faq.html", "accessibility-statement.html"
];
requiredFiles.forEach((file) => assert.ok(fs.existsSync(path.join(projectRoot, file)), `Voice navigation route ${file} must exist.`));

const tourHtml = fs.readFileSync(path.join(projectRoot, "tour-detail.html"), "utf8");
assert.match(tourHtml, /id=["']bookingBox["']/i, "Tour booking section must exist.");

console.log(`Voice assistant tests passed: ${cases.length} commands and ${htmlFiles.length} page contracts`);
