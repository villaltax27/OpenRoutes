const tours = {
  "santa-ana": {
    name: "Santa Ana Volcano",
    badge: "Most Popular",
    location: "Santa Ana, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 15 people",
    price: "$230",
    image: "https://thf.bing.com/th/id/R.16a9d0ceaafc7d36fe72237465acccdb?rik=HUFWnO8PTnlkBg&pid=ImgRaw&r=0",
    description: "Climb the highest volcano in El Salvador with a certified guide and enjoy one of the country's most memorable views.",
    overview: "This package is designed for travelers who want adventure, nature and guided support. It includes route planning, basic accessibility assistance, meals and transport coordination.",
    includes: ["Round-trip transportation", "Certified local guide", "Lunch and water", "Travel insurance", "Basic accessibility assistance"],
    plan: ["Morning pickup and route briefing", "Guided volcano hike with rest stops", "Lunch with scenic views", "Return transfer and final recommendations"]
  },
  "coatepeque": {
    name: "Lake Coatepeque Escape",
    badge: "Top Rated",
    location: "Santa Ana, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 20 people",
    price: "$195",
    image: "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/06/Lago-Coatepeque_03.jpg",
    description: "Relax by the crater lake, enjoy local food and discover peaceful viewpoints around Coatepeque.",
    overview: "A calm nature package for travelers who prefer scenic views, light activities and comfortable lakeside experiences.",
    includes: ["Boat tour", "Lunch by the lake", "Local guide", "Parking coordination", "Life jacket"],
    plan: ["Arrival at the lake viewpoint", "Boat ride around the crater lake", "Lunch and free time", "Sunset stop before returning"]
  },
  "el-tunco": {
    name: "El Tunco Surf Experience",
    badge: "Best Seller",
    location: "La Libertad, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 12 people",
    price: "$210",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/8a/19/69/surf.jpg?w=1200&h=900&s=1",
    description: "Catch the perfect wave with surf lessons, beach time and sunset views.",
    overview: "A beach package for visitors who want lessons, nightlife options and easy access to restaurants near the coast.",
    includes: ["Hotel stay", "Breakfast", "Surf lesson", "Transportation", "Guide"],
    plan: ["Beach arrival and check-in", "Beginner-friendly surf class", "Sunset walk and dinner time", "Morning beach activity"]
  },
  "suchitoto": {
    name: "Suchitoto Colonial Tour",
    badge: "Cultural",
    location: "Cuscatlan, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 18 people",
    price: "$180",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/6f/7a/f0.jpg",
    description: "Explore cobblestone streets, art galleries and Lake Suchitlan in one of the most beautiful towns in the country.",
    overview: "A cultural package for visitors who want history, local art, relaxed walking routes and traditional food.",
    includes: ["Walking tour", "Museum tickets", "Lunch", "Local guide", "Souvenir stop"],
    plan: ["Historic center walking tour", "Art gallery and museum visit", "Lunch in town", "Lake Suchitlan viewpoint"]
  },
  "cerro-verde": {
    name: "Cerro Verde Cloud Forest",
    badge: "Eco Friendly",
    location: "Santa Ana, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 14 people",
    price: "$250",
    image: "https://images.squarespace-cdn.com/content/v1/596b2969d2b85786e6892853/1685911318945-9D27CQ4SR2NJGJ88WSDW/0K3A0110_3-Edit-2.jpg",
    description: "Hike through misty forest trails and enjoy a cooler mountain landscape.",
    overview: "A nature-first package with soft hiking, viewpoints and support from guides familiar with the area.",
    includes: ["Park entry", "Nature guide", "Meals", "Transportation", "Rest-stop planning"],
    plan: ["Arrival at Cerro Verde", "Guided forest trail", "Viewpoint and lunch", "Optional short nature walk"]
  },
  "ruta-flores": {
    name: "Ruta de Las Flores",
    badge: "Foodie",
    location: "Ahuachapan and Sonsonate, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 16 people",
    price: "$220",
    image: "https://guanacos.com/wp-content/uploads/2022/03/Foto-3-2-768x511.jpg",
    description: "Visit colorful towns, coffee farms and local food festivals along Ruta de Las Flores.",
    overview: "A food and culture package built around small towns, crafts, coffee history and relaxed exploration.",
    includes: ["Town-to-town transportation", "Coffee farm visit", "Food tasting", "Local guide", "Craft market stop"],
    plan: ["Start in Nahuizalco or Juayua", "Coffee and craft stops", "Food tasting experience", "Second town walking route"]
  }
};

const params = new URLSearchParams(window.location.search);
const tourId = params.get("tour") || "santa-ana";
const tour = tours[tourId] || tours["santa-ana"];

const setText = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

function renderList(id, items, icon) {
  const container = document.getElementById(id);
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<i class="fa-solid ${icon}"></i><span>${item}</span>`;
    container.appendChild(div);
  });
}

document.title = `${tour.name} - Open Routes`;
document.documentElement.style.setProperty("--hero-image", `url('${tour.image}')`);
setText("crumb", tour.name);
setText("tourBadge", tour.badge);
setText("tourName", tour.name);
setText("tourDescription", tour.description);
setText("tourOverview", tour.overview);
setText("tourDuration", tour.duration);
setText("tourGroup", tour.group);
setText("tourLocation", tour.location);
setText("tourPrice", tour.price);
renderList("tourIncludes", tour.includes, "fa-check");
renderList("tourPlan", tour.plan, "fa-location-dot");

document.querySelector(".booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thanks! Your trip request has been received.");
});

document.addEventListener("DOMContentLoaded", () => {
  const btnDropdownToggle = document.getElementById("btnDropdownToggle");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const chkContrast = document.getElementById("chkContrast");
  const chkTextSize = document.getElementById("chkTextSize");
  const chkVoiceReader = document.getElementById("chkVoiceReader");

  btnDropdownToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = accessibilityMenu?.classList.toggle("show");
    btnDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".accessibility-dropdown")) {
      accessibilityMenu?.classList.remove("show");
      btnDropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });

  chkContrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", chkContrast.checked));
  chkTextSize?.addEventListener("change", () => document.body.classList.toggle("large-text", chkTextSize.checked));
  chkVoiceReader?.addEventListener("change", () => {
    if (!chkVoiceReader.checked || !("speechSynthesis" in window)) {
      window.speechSynthesis?.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(document.querySelector("main")?.innerText || document.body.innerText);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
});
