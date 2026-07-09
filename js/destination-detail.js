const params = new URLSearchParams(window.location.search);
const place = params.get("place") || "coatepeque";

const destinations = {
  "santa-ana": {
    name: "Santa Ana Volcano",
    location: "Santa Ana, El Salvador",
    summary: "One of the most iconic volcanoes in El Salvador with breathtaking views.",
    overview: "Santa Ana Volcano is the highest volcano in El Salvador and offers one of the best hiking experiences in the country.",
    highlights: ["Stunning crater lake", "Panoramic views of Izalco and Coatepeque", "Guided hiking tours"],
    todo: ["Hiking the volcano", "Photography", "Bird watching"],
    tips: ["Wear comfortable shoes", "Bring water and sunscreen", "Go early in the morning"],
    access: ["Moderate accessibility", "Guided routes available", "Not fully wheelchair accessible"]
  },
  "coatepeque": {
    name: "Lake Coatepeque",
    location: "Santa Ana, El Salvador",
    summary: "A beautiful volcanic lake surrounded by nature and peaceful viewpoints.",
    overview: "Lake Coatepeque is one of the most stunning lakes in El Salvador, known for its deep blue water and calm environment.",
    highlights: ["Volcanic crater lake", "Boat tours", "Restaurants by the lake"],
    todo: ["Swimming", "Kayaking", "Boat rides"],
    tips: ["Visit during sunset", "Try local seafood", "Bring cash for small restaurants"],
    access: ["Partial wheelchair access", "Easy access to main viewpoints", "Some areas are steep"]
  },
  "el-tunco": {
    name: "El Tunco Beach",
    location: "La Libertad, El Salvador",
    summary: "A famous surf beach with nightlife, restaurants and beautiful sunsets.",
    overview: "El Tunco is a popular beach destination known for surfing, nightlife and backpacker culture.",
    highlights: ["Surfing waves", "Sunset views", "Nightlife and bars"],
    todo: ["Surfing", "Walking on the beach", "Watching the sunset"],
    tips: ["Watch your belongings", "Best waves are usually in the morning", "Bring sandals"],
    access: ["Easy beach town access", "Crowded on weekends", "Limited ramps near the sand"]
  },
  "suchitoto": {
    name: "Suchitoto",
    location: "Cuscatlan, El Salvador",
    summary: "A charming colonial town full of culture, art and history.",
    overview: "Suchitoto is one of El Salvador's most beautiful colonial towns, known for its cobblestone streets, art galleries and Lake Suchitlan views.",
    highlights: ["Colonial architecture", "Art galleries and culture", "Lake Suchitlan views"],
    todo: ["Walking tours", "Cultural museums", "Boat rides on the lake"],
    tips: ["Wear comfortable walking shoes", "Visit local art shops", "Explore during festivals"],
    access: ["Moderate accessibility", "Some cobblestone streets", "Wheelchair access is limited in old areas"]
  },
  "historic-center": {
    name: "Historic Center",
    location: "San Salvador, El Salvador",
    summary: "The cultural and political heart of the capital city.",
    overview: "The Historic Center of San Salvador features iconic landmarks such as the Metropolitan Cathedral, National Palace and vibrant public squares.",
    highlights: ["Metropolitan Cathedral", "National Palace", "Plaza Gerardo Barrios"],
    todo: ["City walking tours", "Museum visits", "Photography"],
    tips: ["Visit during daytime", "Be aware of crowds", "Try local street food"],
    access: ["Good accessibility in main areas", "Some streets are crowded", "Wheelchair access varies"]
  },
  "imposible": {
    name: "El Imposible National Park",
    location: "Ahuachapan, El Salvador",
    summary: "One of the most important natural reserves in El Salvador.",
    overview: "El Imposible National Park is a protected rainforest area known for biodiversity, hiking trails and wildlife.",
    highlights: ["Rich biodiversity", "Dense rainforest", "Waterfalls and trails"],
    todo: ["Hiking", "Wildlife observation", "Nature photography"],
    tips: ["Go with a guide", "Wear hiking boots", "Bring insect repellent"],
    access: ["Limited accessibility", "Steep hiking trails", "Not wheelchair accessible"]
  }
};

const data = destinations[place];

const nameEl = document.getElementById("placeName");
const locationEl = document.getElementById("placeLocation");
const summaryEl = document.getElementById("summary");
const overviewEl = document.getElementById("overviewText");
const highlightsEl = document.getElementById("highlights");
const todoEl = document.getElementById("todoList");
const tipsEl = document.getElementById("tipsList");
const accessEl = document.getElementById("accessText");
const crumbEl = document.getElementById("crumb");

function renderList(container, items, iconClass) {
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${item}`;
    container.appendChild(div);
  });
}

if (data) {
  document.title = `${data.name} - Open Routes`;
  nameEl.textContent = data.name;
  locationEl.textContent = data.location;
  summaryEl.textContent = data.summary;
  overviewEl.textContent = data.overview;
  if (crumbEl) crumbEl.textContent = data.name;

  renderList(highlightsEl, data.highlights, "fa-star");
  renderList(todoEl, data.todo, "fa-mountain-sun");
  renderList(tipsEl, data.tips, "fa-lightbulb");
  renderList(accessEl, data.access, "fa-wheelchair");
} else {
  nameEl.textContent = "Destination not found";
  locationEl.textContent = "";
  summaryEl.textContent = "Please return to destinations and choose a valid place.";
  overviewEl.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const btnDropdownToggle = document.getElementById("btnDropdownToggle");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const chkContrast = document.getElementById("chkContrast");
  const chkTextSize = document.getElementById("chkTextSize");

  if (!btnDropdownToggle || !accessibilityMenu) return;

  btnDropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = accessibilityMenu.classList.toggle("show");
    btnDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!accessibilityMenu.contains(event.target) && !btnDropdownToggle.contains(event.target)) {
      accessibilityMenu.classList.remove("show");
      btnDropdownToggle.setAttribute("aria-expanded", "false");
    }
  });

  chkContrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", chkContrast.checked));
  chkTextSize?.addEventListener("change", () => document.body.classList.toggle("large-text", chkTextSize.checked));
});

const FAVORITES_KEY = "openRoutesFavorites";
function saveFavoriteItem(item) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  const filtered = favorites.filter((favorite) => favorite.id !== item.id);
  filtered.unshift(item);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

document.getElementById("addDestinationFavorite")?.addEventListener("click", () => {
  if (!data) return;
  saveFavoriteItem({
    id: `destination-${place}`,
    type: "destination",
    title: data.name,
    subtitle: data.location,
    description: data.summary,
    image: document.querySelector(".gallery img")?.src || "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    link: `destination-detail.html?place=${place}`
  });
  window.location.href = "favorites.html";
});
