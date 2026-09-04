const tours = {
  "santa-ana": {
    name: "Santa Ana Volcano",
    badge: "Most Popular",
    location: "Santa Ana, El Salvador",
    duration: "2 days / 1 night",
    group: "Up to 15 people",
    price: "$230",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cerro_verde.jpg",
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
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lago_de_Coatepeque.jpg",
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
    image: "https://elsalvadorinfo.net/wp-content/uploads/2023/09/El-Tunco-Beach-El-Salvador-1.jpg",
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
    image: "https://tse3.mm.bing.net/th/id/OIP.hW0UJVspMfddhoJFwtLlfQHaEK",
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
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cerro_verde.jpg",
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
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruta_de_las_Flores_banner.jpg",
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

function getOpenRoutesUser() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser") || "null");
  } catch (error) {
    return null;
  }
}

function redirectToLoginForBooking(targetUrl = window.location.href) {
  localStorage.setItem("openRoutesPendingBooking", targetUrl);
  window.location.href = "login.html";
}

const bookingForm = document.getElementById("bookingForm");
const bookingError = document.getElementById("bookingError");
const bookingConfirmation = document.getElementById("bookingConfirmation");
const confirmationText = document.getElementById("confirmationText");
const bookingDate = document.getElementById("bookingDate");
const bookingGuests = document.getElementById("bookingGuests");
const bookingGuide = document.getElementById("bookingGuide");
const bookingAccessibility = document.getElementById("bookingAccessibility");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const summaryTour = document.getElementById("summaryTour");
const summaryDate = document.getElementById("summaryDate");
const summaryGuests = document.getElementById("summaryGuests");
const summarySupport = document.getElementById("summarySupport");
const summaryTotal = document.getElementById("summaryTotal");
const summaryDeposit = document.getElementById("summaryDeposit");

function getTourBasePrice() {
  return Number(tour.price.replace(/[^0-9.]/g, "")) || 0;
}

function formatMoney(value) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function getSelectedGuideFee() {
  const option = bookingGuide?.selectedOptions?.[0];
  return Number(option?.dataset.fee || 0);
}

function getBookingEstimate() {
  const guests = Math.max(1, Number(bookingGuests?.value || 1));
  const subtotal = getTourBasePrice() * guests;
  const supportFee = getSelectedGuideFee();
  const total = subtotal + supportFee;
  const deposit = Math.max(25, Math.round(total * 0.2));

  return { guests, supportFee, total, deposit };
}

function formatDisplayDate(value) {
  if (!value) return "Select date";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function updateBookingSummary() {
  const estimate = getBookingEstimate();
  if (summaryTour) summaryTour.textContent = tour.name;
  if (summaryDate) summaryDate.textContent = formatDisplayDate(bookingDate?.value);
  if (summaryGuests) summaryGuests.textContent = `${estimate.guests} ${estimate.guests === 1 ? "person" : "people"}`;
  if (summarySupport) summarySupport.textContent = bookingGuide?.value || "Local guide included";
  if (summaryTotal) summaryTotal.textContent = formatMoney(estimate.total);
  if (summaryDeposit) summaryDeposit.textContent = formatMoney(estimate.deposit);
}

function setMinimumBookingDate() {
  if (!bookingDate) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  bookingDate.min = tomorrow.toISOString().split("T")[0];
}

function prefillBookingUser() {
  const user = getOpenRoutesUser();
  if (!user) return;

  const nameInput = document.getElementById("bookingName");
  const emailInput = document.getElementById("bookingEmail");
  const displayName = user.name || user.fullName || user.username || "";

  if (nameInput && !nameInput.value) nameInput.value = displayName;
  if (emailInput && !emailInput.value) emailInput.value = user.email || "";
}

function getDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCardNumber(value) {
  return getDigits(value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = getDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isExpiryValid(value) {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  if (month < 1 || month > 12) return false;

  const expiryEnd = new Date(year, month, 0, 23, 59, 59);
  return expiryEnd >= new Date();
}

function showBookingError(message) {
  if (!bookingError) return;
  bookingError.textContent = message;
  bookingError.classList.toggle("show", Boolean(message));
}

function validateBookingForm() {
  if (!bookingForm) return false;

  const requiredFields = Array.from(bookingForm.querySelectorAll("[required]"));
  const emptyField = requiredFields.find((field) => !String(field.value || "").trim());
  if (emptyField) {
    emptyField.focus();
    showBookingError("Please complete all required booking and payment fields.");
    return false;
  }

  if (bookingDate?.value && bookingDate.min && bookingDate.value < bookingDate.min) {
    bookingDate.focus();
    showBookingError("Please select a future travel date.");
    return false;
  }

  if (getDigits(cardNumber?.value).length < 13) {
    cardNumber?.focus();
    showBookingError("Please enter a valid test card number.");
    return false;
  }

  if (!isExpiryValid(cardExpiry?.value)) {
    cardExpiry?.focus();
    showBookingError("Please enter a valid future expiry date.");
    return false;
  }

  const cvc = getDigits(document.getElementById("cardCvc")?.value);
  if (cvc.length < 3) {
    document.getElementById("cardCvc")?.focus();
    showBookingError("Please enter a valid CVC.");
    return false;
  }

  showBookingError("");
  return true;
}

function confirmBooking() {
  const estimate = getBookingEstimate();
  const reference = `OR-${Date.now().toString().slice(-6)}`;
  const lastFour = getDigits(cardNumber?.value).slice(-4);
  const booking = {
    reference,
    tour: tour.name,
    date: bookingDate?.value,
    guests: estimate.guests,
    accessibility: bookingAccessibility?.value || "No specific needs",
    guide: bookingGuide?.value || "Local guide included",
    total: estimate.total,
    deposit: estimate.deposit,
    cardLastFour: lastFour
  };

  localStorage.setItem("openRoutesLastBooking", JSON.stringify(booking));
  bookingForm.hidden = true;
  bookingConfirmation.hidden = false;
  if (confirmationText) {
    confirmationText.textContent = `${reference}: ${tour.name} for ${estimate.guests} ${estimate.guests === 1 ? "person" : "people"} on ${formatDisplayDate(booking.date)}. Deposit ${formatMoney(estimate.deposit)} confirmed with card ending in ${lastFour}.`;
  }
}

document.querySelector('a[href="#bookingBox"]')?.addEventListener("click", (event) => {
  if (getOpenRoutesUser()) return;
  event.preventDefault();
  redirectToLoginForBooking(window.location.href);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!getOpenRoutesUser()) {
    redirectToLoginForBooking(window.location.href);
    return;
  }
  if (!validateBookingForm()) return;
  confirmBooking();
});

[bookingDate, bookingGuests, bookingGuide, bookingAccessibility].forEach((field) => {
  field?.addEventListener("input", updateBookingSummary);
  field?.addEventListener("change", updateBookingSummary);
});

cardNumber?.addEventListener("input", () => {
  cardNumber.value = formatCardNumber(cardNumber.value);
});

cardExpiry?.addEventListener("input", () => {
  cardExpiry.value = formatExpiry(cardExpiry.value);
});

setMinimumBookingDate();
prefillBookingUser();
updateBookingSummary();

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

