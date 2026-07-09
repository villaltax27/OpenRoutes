const STORAGE_KEY = "openRoutesFavorites";
let currentFilter = "all";

const getFavorites = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const saveFavorites = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

function removeFavorite(id) {
  saveFavorites(getFavorites().filter((item) => item.id !== id));
  renderFavorites();
}

function renderFavorites() {
  const grid = document.getElementById("favoritesGrid");
  const emptyState = document.getElementById("emptyState");
  const count = document.getElementById("favoriteCount");
  const favorites = getFavorites();
  const visible = currentFilter === "all" ? favorites : favorites.filter((item) => item.type === currentFilter);

  if (count) count.textContent = `${favorites.length} saved`;
  if (!grid || !emptyState) return;

  grid.innerHTML = "";
  emptyState.classList.toggle("show", visible.length === 0);

  visible.forEach((item) => {
    const card = document.createElement("article");
    card.className = "favorite-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="favorite-body">
        <span class="favorite-type">${item.type}</span>
        <h3>${item.title}</h3>
        <p>${item.description || item.subtitle || "Saved item from Open Routes."}</p>
        <div class="favorite-actions">
          <a href="${item.link}">Open</a>
          <button type="button" aria-label="Remove ${item.title}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    card.querySelector("button")?.addEventListener("click", () => removeFavorite(item.id));
    grid.appendChild(card);
  });
}

document.querySelectorAll(".filter-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter || "all";
    document.querySelectorAll(".filter-tabs button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderFavorites();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();

  const toggle = document.getElementById("btnDropdownToggle");
  const menu = document.getElementById("accessibilityMenu");
  const voice = document.getElementById("chkVoiceReader");
  const contrast = document.getElementById("chkContrast");
  const textSize = document.getElementById("chkTextSize");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("show");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".accessibility-dropdown")) {
        menu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  contrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", contrast.checked));
  textSize?.addEventListener("change", () => document.body.classList.toggle("large-text", textSize.checked));
  voice?.addEventListener("change", () => {
    if (!voice.checked || !("speechSynthesis" in window)) {
      window.speechSynthesis?.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(document.querySelector("main")?.innerText || document.body.innerText);
    utterance.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
});
