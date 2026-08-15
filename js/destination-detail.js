const params = new URLSearchParams(window.location.search);
const place = params.get("place") || "santa ana";

const sharedGallery = [
  // Video de YouTube (reemplaza el ID por el tuyo)
  "https://www.youtube.com/watch?v=q6WZM7Mp-yk", 
  // Imágenes estáticas
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
];

const destinations = {
  "santa-ana": {
    name: "Santa Ana Volcano",
    location: "Santa Ana, El Salvador",
    summary: "One of the most iconic volcanoes in El Salvador with breathtaking views.",
    overview: "Santa Ana Volcano is the highest volcano in El Salvador and offers one of the best hiking experiences in the country. The route rewards travelers with crater views, fresh mountain air and a memorable look at the western landscape.",
    locationText: "Located inside Los Volcanes National Park, this destination is best reached from Santa Ana or nearby towns with planned transportation.",
    heroImage: "https://www.paradisecatchers.com/wp-content/uploads/2023/04/Santa-Ana-Volcano-Crater3.jpg",
    gallery: sharedGallery,
    highlights: [
      { title: "Crater Views", text: "A colorful volcanic lagoon at the summit.", icon: "fa-mountain-sun" },
      { title: "Fresh Climate", text: "Cool mountain weather during most mornings.", icon: "fa-cloud-sun" },
      { title: "Guided Routes", text: "Local guides can support safer visits.", icon: "fa-person-hiking" },
      { title: "Photography", text: "Wide views of Izalco and Coatepeque.", icon: "fa-camera" }
    ],
    todo: ["Hike with a local guide", "Take landscape photos", "Visit nearby viewpoints", "Plan a picnic stop after the hike"],
    tips: ["Wear comfortable hiking shoes", "Bring water and sunscreen", "Go early in the morning", "Check weather conditions before leaving"],
    accessDetails: [
      { title: "Wheelchair Access", text: "The summit trail is not wheelchair accessible.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking is available near the park entrance.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Basic facilities are available near access points.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Guides are recommended for support.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "coatepeque": {
    name: "Lake Coatepeque",
    location: "Santa Ana, El Salvador",
    summary: "Enjoy the breathtaking beauty of Lake Coatepeque, one of the most stunning lakes in El Salvador. Perfect for relaxation, nature and accessible experiences for everyone.",
    overview: "Lake Coatepeque is a volcanic crater lake known for its deep blue waters and beautiful views. It is an ideal destination for travelers looking for a peaceful and accessible place to enjoy nature.",
    locationText: "Lake Coatepeque is located in Santa Ana, surrounded by panoramic roads, restaurants, viewpoints and lakefront activities.",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    gallery: sharedGallery,
    highlights: [
      { title: "Stunning Views", text: "Panoramic landscapes that make the visit unforgettable.", icon: "fa-mountain" },
      { title: "Perfect Climate", text: "Warm and pleasant weather through most of the year.", icon: "fa-cloud-sun" },
      { title: "Local Culture", text: "Friendly lake communities and Salvadoran cuisine.", icon: "fa-people-group" },
      { title: "Water Activities", text: "Kayaking, swimming and boat tours available.", icon: "fa-water" }
    ],
    todo: ["Take a boat ride around the lake", "Try local seafood", "Visit a panoramic viewpoint", "Enjoy kayaking or swimming in safe areas"],
    tips: ["Visit during sunset", "Bring cash for small restaurants", "Ask about accessible entrances before booking", "Use sunscreen during midday"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Accessible paths and ramps available in selected areas.", status: "Yes", icon: "fa-wheelchair" },
      { title: "Parking", text: "Designated accessible parking spaces in main spots.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Accessible restrooms available in some restaurants.", status: "Yes", icon: "fa-restroom" },
      { title: "Audio Information", text: "Audio guides and descriptions can be requested.", status: "Yes", icon: "fa-volume-high" },
      { title: "Guided Assistance", text: "Staff availability depends on the place you visit.", status: "Limited", icon: "fa-hands-helping" }
    ]
  },
  "el-tunco": {
    name: "El Tunco Beach",
    location: "La Libertad, El Salvador",
    summary: "A famous surf beach with restaurants, nightlife and beautiful sunsets by the Pacific coast.",
    overview: "El Tunco is a popular beach destination known for surfing, sunsets and a lively coastal atmosphere. Travelers can enjoy food, music and ocean views in a compact walkable town.",
    locationText: "El Tunco is located in La Libertad, close to the coastal highway and other beaches along Surf City.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    gallery: sharedGallery,
    highlights: [
      { title: "Surf Culture", text: "Popular waves and surf schools for visitors.", icon: "fa-water" },
      { title: "Sunsets", text: "Golden evening views over the Pacific.", icon: "fa-sun" },
      { title: "Restaurants", text: "Compact food spots and beachfront cafes.", icon: "fa-utensils" },
      { title: "Nightlife", text: "Music and social spaces during weekends.", icon: "fa-music" }
    ],
    todo: ["Take a surf lesson", "Walk near the beach caves", "Watch the sunset", "Try seafood and local snacks"],
    tips: ["Best waves are usually in the morning", "Bring sandals for rocky areas", "Weekends can be crowded", "Keep personal items close"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Town access is easier than direct sand access.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Public and private parking options nearby.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in restaurants and hotels.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Local support can be arranged ahead of time.", status: "Limited", icon: "fa-hands-helping" }
    ]
  },
  "suchitoto": {
    name: "Suchitoto",
    location: "Cuscatlan, El Salvador",
    summary: "A charming colonial town full of culture, art, history and lake views.",
    overview: "Suchitoto is one of El Salvador's most beautiful colonial towns, known for cobblestone streets, galleries, cultural spaces and views toward Lake Suchitlan.",
    locationText: "Suchitoto is located in Cuscatlan and is commonly visited as a day trip from San Salvador.",
    heroImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85",
    gallery: sharedGallery,
    highlights: [
      { title: "Colonial Streets", text: "Colorful architecture and historic corners.", icon: "fa-landmark" },
      { title: "Art Spaces", text: "Galleries, workshops and cultural houses.", icon: "fa-palette" },
      { title: "Lake Views", text: "Peaceful viewpoints toward Lake Suchitlan.", icon: "fa-water" },
      { title: "Local Food", text: "Traditional flavors in town restaurants.", icon: "fa-utensils" }
    ],
    todo: ["Take a walking tour", "Visit local art shops", "Explore the central plaza", "Take a boat ride on Lake Suchitlan"],
    tips: ["Wear comfortable walking shoes", "Some streets are cobblestone", "Visit during cultural festivals", "Bring a light jacket for evenings"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Main plaza areas are easier to access.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking available near central areas.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in restaurants and public places.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Local guides can help with route planning.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "historic-center": {
    name: "Historic Center",
    location: "San Salvador, El Salvador",
    summary: "The cultural and political heart of the capital city, filled with landmarks and public squares.",
    overview: "The Historic Center of San Salvador features iconic landmarks such as the Metropolitan Cathedral, National Palace, National Theater and vibrant plazas.",
    locationText: "Located in downtown San Salvador, the Historic Center is connected to public transportation and city services.",
    heroImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=85",
    gallery: sharedGallery,
    highlights: [
      { title: "Landmarks", text: "Cathedral, theater and historic buildings.", icon: "fa-landmark" },
      { title: "Public Plazas", text: "Open spaces for walking and photos.", icon: "fa-city" },
      { title: "Street Food", text: "Traditional snacks near central areas.", icon: "fa-utensils" },
      { title: "Culture", text: "Museums, events and guided city stories.", icon: "fa-book-open" }
    ],
    todo: ["Visit the National Palace", "Walk around Plaza Barrios", "Explore the National Theater", "Try local street food"],
    tips: ["Visit during daytime", "Stay aware of crowds", "Use comfortable shoes", "Plan parking before arriving"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Many main sidewalks and plazas are accessible.", status: "Yes", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking varies by zone.", status: "Limited", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in museums and restaurants.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "City guides can support planned routes.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "imposible": {
    name: "El Imposible National Park",
    location: "Ahuachapan, El Salvador",
    summary: "One of the most important natural reserves in El Salvador, ideal for wildlife and hiking.",
    overview: "El Imposible National Park is a protected rainforest area known for biodiversity, trails, viewpoints and nature experiences for adventurous travelers.",
    locationText: "Located in Ahuachapan, the park requires planned transportation and guide coordination for the best experience.",
    heroImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85",
    gallery: sharedGallery,
    highlights: [
      { title: "Biodiversity", text: "Birds, forest life and native plants.", icon: "fa-leaf" },
      { title: "Trails", text: "Nature routes with different difficulty levels.", icon: "fa-person-hiking" },
      { title: "Waterfalls", text: "Natural scenery during guided visits.", icon: "fa-water" },
      { title: "Viewpoints", text: "Forest and mountain landscapes.", icon: "fa-mountain-sun" }
    ],
    todo: ["Hike with a certified guide", "Observe wildlife", "Take nature photos", "Visit scenic viewpoints"],
    tips: ["Go with a guide", "Wear hiking boots", "Bring insect repellent", "Carry enough water"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Trails are steep and not wheelchair accessible.", status: "No", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking is available near access areas.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Basic facilities are limited.", status: "Limited", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Guides are strongly recommended.", status: "Yes", icon: "fa-hands-helping" }
    ]
  }
};

const data = destinations[place] || destinations.coatepeque;

const nameEl = document.getElementById("placeName");
const locationEl = document.getElementById("placeLocation");
const summaryEl = document.getElementById("summary");
const overviewEl = document.getElementById("overviewText");
const highlightsEl = document.getElementById("highlights");
const todoEl = document.getElementById("todoList");
const tipsEl = document.getElementById("tipsList");
const accessEl = document.getElementById("accessText");
const accessSummaryEl = document.getElementById("accessibilitySummary");
const galleryEl = document.getElementById("placeGallery");
const locationTextEl = document.getElementById("locationText");
const crumbEl = document.getElementById("crumb");

function renderStackList(container, items, iconClass) {
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "stack-item";
    div.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${item}</span>`;
    container.appendChild(div);
  });
}

function renderHighlights(items) {
  if (!highlightsEl) return;
  highlightsEl.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("article");
    div.className = "feature-item";
    div.innerHTML = `
      <span class="feature-icon"><i class="fa-solid ${item.icon}"></i></span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    highlightsEl.appendChild(div);
  });
}

let galleryIndex = 0;
let galleryImages = [];

function updateGalleryCarousel() {
  if (!galleryEl) return;
  const track = galleryEl.querySelector(".gallery-track");
  const dots = galleryEl.querySelectorAll(".gallery-dot");

  if (track) {
    track.style.transform = `translateX(-${galleryIndex * 100}%)`;
  }

  dots.forEach((dot, index) => {
    const isActive = index === galleryIndex;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function setupGalleryCarousel() {
  if (!galleryEl || galleryImages.length === 0) return;

  const goToSlide = (index) => {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    updateGalleryCarousel();
  };

  galleryEl.querySelector(".carousel-btn.prev")?.addEventListener("click", () => goToSlide(galleryIndex - 1));
  galleryEl.querySelector(".carousel-btn.next")?.addEventListener("click", () => goToSlide(galleryIndex + 1));

  galleryEl.querySelectorAll(".gallery-dot").forEach((dot) => {
    dot.addEventListener("click", () => goToSlide(Number(dot.dataset.slide)));
  });

  galleryEl.querySelector(".gallery-carousel")?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goToSlide(galleryIndex - 1);
    if (event.key === "ArrowRight") goToSlide(galleryIndex + 1);
  });

  updateGalleryCarousel();
}

function renderGallery(images) {
  if (!galleryEl) return;
  
  // Guardamos las imágenes originales o las compartidas por defecto
  galleryImages = images && images.length ? images : sharedGallery;
  galleryIndex = 0;

  // Creamos el HTML base del carrusel
  galleryEl.innerHTML = `
    <div class="gallery-carousel" tabindex="0" aria-roledescription="carousel" aria-label="Photos and videos of ${data.name}">
      <button class="carousel-btn prev" type="button" aria-label="Previous media">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="gallery-track">
        ${galleryImages.map((media, index) => {
          // Detectamos si es un video de YouTube o Vimeo
          const isVideo = media.includes("youtube.com/embed") || media.includes("vimeo.com");
          
          if (isVideo) {
            // Si es un video, renderizamos un iframe
            return `
              <article class="gallery-slide video-slide" aria-label="Video ${index + 1} of ${galleryImages.length}">
                <iframe src="${media}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        style="width: 100%; height: 100%; object-fit: cover;"></iframe>
                <div class="gallery-caption">
                  <div>
                    <strong>${data.name} Video</strong>
                    <span>Video ${index + 1} of ${galleryImages.length}</span>
                  </div>
                </div>
              </article>
            `;
          } else {
            // Si es una imagen, renderizamos como siempre
            return `
              <article class="gallery-slide" aria-label="Photo ${index + 1} of ${galleryImages.length}">
                <img src="${media}" alt="${data.name} photo ${index + 1}">
                <div class="gallery-caption">
                  <div>
                    <strong>${data.name}</strong>
                    <span>Photo ${index + 1} of ${galleryImages.length}</span>
                  </div>
                </div>
              </article>
            `;
          }
        }).join("")}
      </div>
      <button class="carousel-btn next" type="button" aria-label="Next media">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="gallery-dots" aria-label="Choose a photo or video">
      ${galleryImages.map((_, index) => `
        <button class="gallery-dot" type="button" data-slide="${index}" aria-label="Show media ${index + 1}"></button>
      `).join("")}
    </div>
  `;

  setupGalleryCarousel();
}
function renderAccessibilitySummary(items) {
  if (!accessSummaryEl || !accessEl) return;
  accessSummaryEl.innerHTML = "";
  accessEl.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("div");
    const statusClass = item.status.toLowerCase() === "limited" ? "limited" : item.status.toLowerCase() === "no" ? "no" : "";
    row.className = "access-row";
    row.innerHTML = `
      <i class="fa-solid ${item.icon}"></i>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
      <span class="badge ${statusClass}">${item.status}</span>
    `;
    accessSummaryEl.appendChild(row);

    const detail = document.createElement("div");
    detail.className = "stack-item";
    detail.innerHTML = `<i class="fa-solid ${item.icon}"></i><span><strong>${item.title}:</strong> ${item.text} (${item.status})</span>`;
    accessEl.appendChild(detail);
  });
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-selected", item === button ? "true" : "false");
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === tab);
      });
    });
  });
}

function setupAccessibilityMenu() {
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
}

function setupShareButton() {
  const shareButton = document.getElementById("shareDestination");
  if (!shareButton) return;

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: `${data.name} - Open Routes`,
      text: data.summary,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(window.location.href);
    shareButton.innerHTML = `<i class="fa-solid fa-check"></i> Link copied`;
    setTimeout(() => {
      shareButton.innerHTML = `<i class="fa-solid fa-share-nodes"></i> Share`;
    }, 1800);
  });
}

const FAVORITES_KEY = "openRoutesFavorites";
function saveFavoriteItem(item) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  const filtered = favorites.filter((favorite) => favorite.id !== item.id);
  filtered.unshift(item);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

function setupFavoriteButton() {
  document.getElementById("addDestinationFavorite")?.addEventListener("click", () => {
    saveFavoriteItem({
      id: `destination-${place}`,
      type: "destination",
      title: data.name,
      subtitle: data.location,
      description: data.summary,
      image: data.gallery?.[0] || data.heroImage,
      link: `destination-detail.html?place=${place}`
    });
    window.location.href = "favorites.html";
  });
}

function renderDestination() {
  document.title = `${data.name} - Open Routes`;
  document.documentElement.style.setProperty("--hero-image", `url("${data.heroImage}")`);

  nameEl.textContent = data.name;
  locationEl.textContent = data.location;
  summaryEl.textContent = data.summary;
  overviewEl.textContent = data.overview;
  locationTextEl.textContent = data.locationText;
  if (crumbEl) crumbEl.textContent = data.name;

  renderHighlights(data.highlights);
  renderStackList(todoEl, data.todo, "fa-circle-check");
  renderStackList(tipsEl, data.tips, "fa-lightbulb");
  renderAccessibilitySummary(data.accessDetails);
  renderGallery(data.gallery || sharedGallery);
}

renderDestination();
setupTabs();
setupAccessibilityMenu();
setupShareButton();
setupFavoriteButton();

