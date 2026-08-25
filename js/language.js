/* Open Routes language controller. Spanish is the default; English is always available. */
(() => {
  "use strict";

  const LANGUAGE_KEY = "openRoutesLanguage";
  const supported = new Set(["es", "en"]);
  const originals = new WeakMap();
  const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"]);
  const originalTitle = document.title;

  const translations = {
    "Explore El Salvador without limits": "Explora El Salvador sin límites",
    "Explore El Salvador": "Explora El Salvador", "Without": "Sin", "Limits": "límites",
    "Accessible tourism for everyone. Discover amazing places, live unique experiences and travel with freedom.": "Turismo accesible para todos. Descubre lugares increíbles, vive experiencias únicas y viaja con libertad.",
    "Explore Now": "Explora ahora", "Popular": "Populares", "View more": "Ver más",
    "We are committed to accessibility.": "Estamos comprometidos con la accesibilidad.",
    "Our tools help everyone enjoy the journey.": "Nuestras herramientas ayudan a que todos disfruten del viaje.",
    "Popular Destinations": "Destinos populares", "Popular Tours": "Tours populares",
    "Santa Ana Volcano. Enjoy breathtaking views and accessible trails for everyone.": "Volcán de Santa Ana. Disfruta de vistas impresionantes y senderos accesibles para todos.",
    "Enjoy breathtaking views and accessible trails for everyone.": "Disfruta de vistas impresionantes y senderos accesibles para todos.",
    "Lake Coatepeque. A beautiful lake perfect for relaxation and nature.": "Lago de Coatepeque. Un hermoso lago perfecto para relajarse y disfrutar de la naturaleza.",
    "A beautiful lake perfect for relaxation and nature.": "Un hermoso lago perfecto para relajarse y disfrutar de la naturaleza.",
    "El Tunco Beach. Surf, sun and sea with accessible beach services.": "Playa El Tunco. Surf, sol y mar con servicios de playa accesibles.",
    "Surf, sun and sea with accessible beach services.": "Surf, sol y mar con servicios de playa accesibles.",
    "Suchitoto. Culture, art and history in an accessible town.": "Suchitoto. Cultura, arte e historia en un pueblo accesible.",
    "Culture, art and history in an accessible town.": "Cultura, arte e historia en un pueblo accesible.",
    "Find trips that fit your freedom": "Encuentra viajes que se adapten a tu libertad",
    "Traveling offers freedom and flexibility, solitude and spontaneity, and privacy and purpose.": "Viajar ofrece libertad y flexibilidad, tranquilidad y espontaneidad, privacidad y propósito.",
    "flexible packages with no change fees.": "paquetes flexibles sin cargos por cambios.",
    "Get back to nature by travel": "Vuelve a la naturaleza viajando",
    "The world is a playground, and you can finally explore Mother Nature's most spectacular landscapes.": "El mundo es un lugar para explorar y por fin puedes descubrir los paisajes más espectaculares de la naturaleza.",
    "Reignite those travel tastebuds": "Despierta tu gusto por viajar", "There are countless reasons to love travel, and one of the best is discovering amazing food.": "Hay muchas razones para amar los viajes, y una de las mejores es descubrir comida increíble.",
    "The route details and accessibility notes helped us plan a calm family day.": "Los detalles de la ruta y las notas de accesibilidad nos ayudaron a planificar un día familiar tranquilo.",
    "The guide suggestions made the colonial walk easier and more enjoyable.": "Las recomendaciones del guía hicieron que el recorrido colonial fuera más fácil y agradable.",
    "I liked knowing the parking and restroom details before arriving.": "Me gustó conocer los detalles de estacionamiento y baños antes de llegar.",
    "Handpicked experiences for unforgettable memories": "Experiencias seleccionadas para recuerdos inolvidables", "VIEW ALL": "VER TODOS",
    "Accessible travel inspiration in El Salvador": "Inspiración para viajar de forma accesible por El Salvador",
    "One of the most iconic volcanoes in El Salvador with breathtaking views.": "Uno de los volcanes más emblemáticos de El Salvador, con vistas impresionantes.",
    "Santa Ana Volcano is the highest volcano in El Salvador and offers one of the best hiking experiences in the country. The route rewards travelers with crater views, fresh mountain air and a memorable look at the western landscape.": "El volcán de Santa Ana es el más alto de El Salvador y ofrece una de las mejores experiencias de senderismo del país. La ruta recompensa a los viajeros con vistas al cráter, aire fresco de montaña y un paisaje occidental memorable.",
    "Enjoy the breathtaking beauty of Lake Coatepeque, one of the most stunning lakes in El Salvador. Perfect for relaxation, nature and accessible experiences for everyone.": "Disfruta de la impresionante belleza del lago de Coatepeque, uno de los más hermosos de El Salvador. Es perfecto para relajarse, conectar con la naturaleza y vivir experiencias accesibles.",
    "Lake Coatepeque is a volcanic crater lake known for its deep blue waters and beautiful views. It is an ideal destination for travelers looking for a peaceful and accessible place to enjoy nature.": "El lago de Coatepeque es un lago de cráter volcánico conocido por sus aguas azul profundo y hermosas vistas. Es un destino ideal para quienes buscan un lugar tranquilo y accesible para disfrutar de la naturaleza.",
    "A famous surf beach with restaurants, nightlife and beautiful sunsets by the Pacific coast.": "Una famosa playa de surf con restaurantes, vida nocturna y hermosos atardeceres junto a la costa del Pacífico.",
    "El Tunco is a popular beach destination known for surfing, sunsets and a lively coastal atmosphere. Travelers can enjoy food, music and ocean views in a compact walkable town.": "El Tunco es un popular destino de playa conocido por el surf, los atardeceres y su animado ambiente costero. Los viajeros pueden disfrutar de comida, música y vistas al océano en un pueblo compacto y caminable.",
    "A charming colonial town full of culture, art, history and lake views.": "Un encantador pueblo colonial lleno de cultura, arte, historia y vistas al lago.",
    "Suchitoto is one of El Salvador's most beautiful colonial towns, known for cobblestone streets, galleries, cultural spaces and views toward Lake Suchitlan.": "Suchitoto es uno de los pueblos coloniales más bellos de El Salvador, conocido por sus calles empedradas, galerías, espacios culturales y vistas al lago de Suchitlán.",
    "The cultural and political heart of the capital city, filled with landmarks and public squares.": "El corazón cultural y político de la capital, lleno de monumentos y plazas públicas.",
    "The Historic Center of San Salvador features iconic landmarks such as the Metropolitan Cathedral, National Palace, National Theater and vibrant plazas.": "El Centro Histórico de San Salvador cuenta con lugares emblemáticos como la Catedral Metropolitana, el Palacio Nacional, el Teatro Nacional y plazas llenas de vida.",
    "One of the most important natural reserves in El Salvador, ideal for wildlife and hiking.": "Una de las reservas naturales más importantes de El Salvador, ideal para observar vida silvestre y hacer senderismo.",
    "El Imposible National Park is a protected rainforest area known for biodiversity, trails, viewpoints and nature experiences for adventurous travelers.": "El Parque Nacional El Imposible es una zona protegida de bosque tropical conocida por su biodiversidad, senderos, miradores y experiencias de naturaleza para viajeros aventureros.",
    "Climb the highest volcano in El Salvador with a certified guide and enjoy one of the country's most memorable views.": "Sube el volcán más alto de El Salvador con un guía certificado y disfruta de una de las vistas más memorables del país.",
    "This package is designed for travelers who want adventure, nature and guided support. It includes route planning, basic accessibility assistance, meals and transport coordination.": "Este paquete está diseñado para viajeros que buscan aventura, naturaleza y apoyo guiado. Incluye planificación de ruta, asistencia básica de accesibilidad, comidas y coordinación de transporte.",
    "Relax by the crater lake, enjoy local food and discover peaceful viewpoints around Coatepeque.": "Relájate junto al lago de cráter, disfruta de comida local y descubre miradores tranquilos alrededor de Coatepeque.",
    "A calm nature package for travelers who prefer scenic views, light activities and comfortable lakeside experiences.": "Un paquete de naturaleza tranquilo para viajeros que prefieren vistas escénicas, actividades suaves y cómodas experiencias junto al lago.",
    "Catch the perfect wave with surf lessons, beach time and sunset views.": "Encuentra la ola perfecta con clases de surf, tiempo en la playa y vistas del atardecer.",
    "Explore cobblestone streets, art galleries and Lake Suchitlan in one of the most beautiful towns in the country.": "Explora calles empedradas, galerías de arte y el lago de Suchitlán en uno de los pueblos más bellos del país.",
    "Hike through misty forest trails and enjoy a cooler mountain landscape.": "Camina por senderos de bosque cubiertos de neblina y disfruta de un paisaje de montaña más fresco.",
    "Visit colorful towns, coffee farms and local food festivals along Ruta de Las Flores.": "Visita pueblos coloridos, fincas de café y festivales gastronómicos locales a lo largo de la Ruta de Las Flores.",
    "Open Routes - Home": "Open Routes - Inicio",
    "Open Routes - About Us": "Open Routes - Sobre nosotros",
    "Accessibility Statement - Open Routes": "Declaración de accesibilidad - Open Routes",
    "Home": "Inicio", "Destinations": "Destinos", "Plan Your Trip": "Planifica tu viaje",
    "About Us": "Sobre nosotros", "Contact": "Contacto", "Login": "Iniciar sesión",
    "Register": "Registrarse", "Log in": "Iniciar sesión", "Sign up": "Registrarse",
    "Favorites": "Favoritos", "Settings": "Configuración", "FAQ": "Preguntas frecuentes",
    "Accessibility": "Accesibilidad", "Accessibility Statement": "Declaración de accesibilidad",
    "High Contrast": "Alto contraste", "Dark Mode": "Modo oscuro", "Text Size": "Tamaño del texto",
    "Accessible Mode": "Modo accesible", "Language": "Idioma", "English": "English", "Spanish": "Español",
    "Choose your language": "Elige tu idioma", "Interface language": "Idioma de la interfaz",
    "Sign language": "Lengua de señas", "Explore Open Routes": "Explora Open Routes",
    "Close sign language menu": "Cerrar menú de lengua de señas", "Open sign language menu": "Abrir menú de lengua de señas",
    "Home sign language guide": "Guía en lengua de señas de Inicio",
    "Destinations sign language guide": "Guía en lengua de señas de Destinos",
    "Plan Your Trip sign language guide": "Guía en lengua de señas de Planifica tu viaje",
    "About Us sign language guide": "Guía en lengua de señas de Sobre nosotros",
    "Contact sign language guide": "Guía en lengua de señas de Contacto",
    "Main navigation": "Navegación principal", "Open Routes Home": "Inicio de Open Routes",
    "Search": "Buscar", "Search destinations": "Buscar destinos", "View details": "Ver detalles",
    "Learn more": "Conoce más", "Explore Routes": "Explorar rutas", "Explore destinations": "Explorar destinos",
    "Plan my trip": "Planificar mi viaje", "Contact Us": "Contáctanos", "Send message": "Enviar mensaje",
    "Subscribe": "Suscribirme", "Newsletter": "Boletín", "Your email": "Tu correo electrónico",
    "All rights reserved.": "Todos los derechos reservados.",
    "Accessible tourism for every traveler.": "Turismo accesible para cada viajero.",
    "Travel without barriers.": "Viaja sin barreras.", "Our Story": "Nuestra historia",
    "Making tourism accessible for everyone": "Haciendo el turismo accesible para todas las personas",
    "Mission": "Misión", "Vision": "Visión", "Values": "Valores", "Our Team": "Nuestro equipo",
    "Accessible Routes": "Rutas accesibles", "Happy Travelers": "Viajeros satisfechos",
    "Local Partners": "Aliados locales", "Accessibility tools": "Herramientas de accesibilidad",
    "Last reviewed": "Última revisión", "August 2026": "Agosto de 2026",
    "Our Commitment": "Nuestro compromiso", "Available Tools": "Herramientas disponibles",
    "Feedback": "Comentarios", "Contact information": "Información de contacto",
    "Frequently Asked Questions": "Preguntas frecuentes", "Find answers to common questions.": "Encuentra respuestas a preguntas frecuentes.",
    "Save changes": "Guardar cambios", "Saved": "Guardado", "Cancel": "Cancelar", "Continue": "Continuar",
    "Back": "Volver", "Next": "Siguiente", "Previous": "Anterior", "Close": "Cerrar",
    "Overview": "Resumen", "Practical info": "Información práctica", "Accessibility details": "Detalles de accesibilidad",
    "Things to do": "Qué hacer", "Location": "Ubicación", "Guides": "Guías", "Reviews": "Reseñas",
    "Add to favorites": "Agregar a favoritos", "Remove from favorites": "Quitar de favoritos",
    "No favorites yet": "Aún no tienes favoritos", "Book this tour": "Reservar este tour",
    "Book now": "Reservar ahora", "Booking": "Reserva", "Travel date": "Fecha de viaje",
    "Number of guests": "Número de viajeros", "Select a guide": "Selecciona un guía",
    "Accessibility support": "Apoyo de accesibilidad", "Payment details": "Datos de pago",
    "Confirm booking": "Confirmar reserva", "Total": "Total", "Estimated total": "Total estimado",
    "Plan your perfect accessible trip": "Planifica tu viaje accesible ideal",
    "Tell us what you need and we will suggest a route.": "Cuéntanos qué necesitas y te sugeriremos una ruta.",
    "Your preferences": "Tus preferencias", "Travel style": "Estilo de viaje", "Interests": "Intereses",
    "Duration": "Duración", "Accessibility needs": "Necesidades de accesibilidad",
    "Get recommendations": "Ver recomendaciones", "Recommended for you": "Recomendado para ti",
    "Nature": "Naturaleza", "Beach": "Playa", "Culture": "Cultura", "Lake": "Lago",
    "Wheelchair access": "Acceso para silla de ruedas", "Low walking": "Poca caminata",
    "Restrooms": "Baños", "Sign language": "Lengua de señas", "Guide": "Guía",
    "Relaxed": "Relajado", "Hiking": "Senderismo", "Photography": "Fotografía", "Family": "Familia",
    "Food": "Gastronomía", "Easy access": "Acceso fácil", "Recommended": "Recomendados",
    "Voice Assistant": "Asistente de voz", "Voice assistance": "Asistencia por voz",
    "Do you need a voice assistant?": "¿Necesitas un asistente de voz?", "Yes, enable it": "Sí, activarlo",
    "No, continue normally": "No, continuar normalmente", "Assistant is ready.": "El asistente está listo.",
    "Voice assistant stopped.": "Asistente de voz detenido.", "Listening… Speak now.": "Escuchando… habla ahora.",
    "Contact us": "Contáctanos", "Name": "Nombre", "Email": "Correo electrónico", "Message": "Mensaje",
    "Subject": "Asunto", "Send": "Enviar", "Get in touch": "Ponte en contacto",
    "Welcome back": "Bienvenido de nuevo", "Create your account": "Crea tu cuenta", "Password": "Contraseña",
    "Confirm password": "Confirmar contraseña", "Remember me": "Recuérdame", "Forgot password?": "¿Olvidaste tu contraseña?",
    "Profile": "Perfil", "Privacy": "Privacidad", "Notifications": "Notificaciones", "Security": "Seguridad",
    "Travel preferences": "Preferencias de viaje", "Account": "Cuenta", "Log out": "Cerrar sesión",
    "Interpreters": "Intérpretes", "Find an interpreter": "Encuentra un intérprete",
    "Available": "Disponible", "Contact interpreter": "Contactar intérprete"
    ,"Accessibility Checklist": "Lista de verificación de accesibilidad", "Accessibility Information": "Información de accesibilidad",
    "Accessibility Planning": "Planificación de accesibilidad", "Accessibility questions, travel plans and support.": "Preguntas de accesibilidad, planes de viaje y apoyo.",
    "Accessible Destinations": "Destinos accesibles", "Accessible restrooms": "Baños accesibles", "Accessible tools": "Herramientas accesibles",
    "Accessible Travel Planner": "Planificador de viajes accesibles", "Account Center": "Centro de cuenta", "Account Features": "Funciones de la cuenta",
    "Active session": "Sesión activa", "Adjustable text size": "Tamaño de texto ajustable", "All languages": "Todos los idiomas",
    "Already have an account?": "¿Ya tienes una cuenta?", "Audio guide": "Guía de audio", "Audio guide support": "Apoyo con guía de audio",
    "Available interpreters": "Intérpretes disponibles", "Back to tours": "Volver a los tours", "Book Trip": "Reservar viaje",
    "Booking request confirmed": "Solicitud de reserva confirmada", "Bookings": "Reservas", "Browse Places": "Explorar lugares",
    "Build your trip before you book.": "Organiza tu viaje antes de reservar.", "Change password": "Cambiar contraseña",
    "Clear filters": "Limpiar filtros", "Clear recent searches": "Borrar búsquedas recientes", "Common Questions": "Preguntas comunes",
    "Confirm Booking": "Confirmar reserva", "Confirm Password": "Confirmar contraseña", "Contact Support": "Contactar soporte",
    "Create account": "Crear cuenta", "Create Account": "Crear cuenta", "Create an account for smoother accessible travel planning.": "Crea una cuenta para planificar viajes accesibles con mayor facilidad.",
    "Destination access details": "Detalles de acceso del destino", "Destination recommendation": "Recomendación de destino",
    "Discover places": "Descubre lugares", "Don't have an account?": "¿No tienes una cuenta?", "Easy access first": "Priorizar acceso fácil",
    "Easy routes": "Rutas fáciles", "Email updates": "Actualizaciones por correo", "Emergency contacts": "Contactos de emergencia",
    "Emergency Numbers": "Números de emergencia", "Entry and Documents": "Ingreso y documentos", "Explore interpreters": "Explorar intérpretes",
    "Explore more tours": "Explorar más tours", "Featured": "Destacado", "Featured Tour": "Tour destacado",
    "Feedback and Support": "Comentarios y soporte", "Find Guide": "Buscar guía", "Find guides": "Buscar guías",
    "Flexible timing": "Horario flexible", "Follow Us": "Síguenos", "Food nearby": "Comida cercana", "Forgot password?": "¿Olvidaste tu contraseña?",
    "Full day": "Día completo", "Full Name": "Nombre completo", "Full Profile": "Perfil completo", "Get In Touch": "Ponte en contacto",
    "Get reminders about places in favorites.": "Recibe recordatorios sobre los lugares guardados en favoritos.", "Group Size": "Tamaño del grupo",
    "Guide available": "Guía disponible", "Guides and Interpreters": "Guías e intérpretes", "Health and Safety": "Salud y seguridad",
    "Help Center": "Centro de ayuda", "Hide Details": "Ocultar detalles", "Hours": "Horarios", "ID or passport": "Documento de identidad o pasaporte",
    "Information": "Información", "Interpreter availability": "Disponibilidad de intérpretes", "Interpreter or guide": "Intérprete o guía"
  };

  const phrases = [
    ["Open Routes is committed to", "Open Routes se compromete a"],
    ["We help people discover El Salvador", "Ayudamos a las personas a descubrir El Salvador"],
    ["accessible tourism", "turismo accesible"], ["accessible travel", "viajes accesibles"],
    ["for everyone", "para todas las personas"], ["for all", "para todos"],
    ["with accessibility in mind", "pensando en la accesibilidad"],
    ["travel information", "información de viaje"], ["your trip", "tu viaje"],
    ["the website", "el sitio web"], ["Learn more", "Conoce más"],
    ["Read more", "Leer más"], ["See details", "Ver detalles"],
    ["Choose", "Elige"], ["Select", "Selecciona"], ["Required", "Obligatorio"],
    ["Optional", "Opcional"], ["Loading", "Cargando"], ["Error", "Error"]
  ];


  function currentLanguage() {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return supported.has(saved) ? saved : "en";
  }

  function translate(value) {
    const source = String(value || "");
    if (!source.trim()) return source;
    const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const prefix = match ? match[1] : "";
    const suffix = match ? match[3] : "";
    const normalized = (match ? match[2] : source).replace(/\s+/g, " ").trim();
    if (translations[normalized]) return `${prefix}${translations[normalized]}${suffix}`;
    let result = normalized;
    phrases.forEach(([english, spanish]) => {
      result = result.replaceAll(english, spanish);
    });
    return `${prefix}${result}${suffix}`;
  }

  function translateNode(node, language) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (!parent || ignoredTags.has(parent.tagName) || !node.nodeValue.trim()) return;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const nextValue = language === "es" ? translate(originals.get(node)) : originals.get(node);
      if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE || ignoredTags.has(node.tagName)) return;
    ["title", "placeholder", "aria-label", "aria-description", "data-read", "alt"].forEach((attribute) => {
      if (!node.hasAttribute(attribute)) return;
      const key = `${attribute}`;
      let stored = originals.get(node);
      if (!stored) { stored = {}; originals.set(node, stored); }
      if (!(key in stored)) stored[key] = node.getAttribute(attribute);
      const nextValue = language === "es" ? translate(stored[key]) : stored[key];
      if (node.getAttribute(attribute) !== nextValue) node.setAttribute(attribute, nextValue);
    });
  }

  function applyLanguage(language = currentLanguage()) {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.title = language === "es" ? translate(originalTitle) : originalTitle;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateNode(node, language);
    document.querySelectorAll("[data-language-select]").forEach((select) => { select.value = language; });
  }

  function addLanguageControl() {
    const menu = document.getElementById("accessibilityMenu");
    if (!menu || menu.querySelector("[data-language-select]")) return;
    const control = document.createElement("div");
    control.className = "menu-item language-control";
    control.innerHTML = `
      <label for="languageSelect"><i class="fa-solid fa-language" aria-hidden="true"></i> <span data-language-label>Language</span></label>
      <select id="languageSelect" data-language-select aria-label="Language">
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>`;
    const select = control.querySelector("select");
    select.value = currentLanguage();
    select.addEventListener("change", () => {
      localStorage.setItem(LANGUAGE_KEY, select.value);
      applyLanguage(select.value);
      window.dispatchEvent(new CustomEvent("openroutes:languagechange", { detail: { language: select.value } }));
    });
    menu.appendChild(control);
  }

  function injectLanguageStyles() {
    if (document.getElementById("openRoutesLanguageStyles")) return;
    const stylesheet = document.createElement("link");
    stylesheet.id = "openRoutesLanguageStyles";
    stylesheet.rel = "stylesheet";
    stylesheet.href = "css/language-control.css";
    document.head.appendChild(stylesheet);
  }

  function start() {
    const observer = new MutationObserver((records) => {
      if (currentLanguage() !== "es") return;
      records.forEach((record) => record.addedNodes.forEach((node) => {
        translateNode(node, "es");
        if (node.querySelectorAll) node.querySelectorAll("*").forEach((child) => translateNode(child, "es"));
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    injectLanguageStyles();
    addLanguageControl();
    applyLanguage();
  }

  window.OpenRoutesLanguage = { get: currentLanguage, apply: applyLanguage };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start) : start();
})();
