const PROFILE_NOTE_KEY = "openRoutesProfileGuideNote";

document.addEventListener("DOMContentLoaded", () => {
    const user = readJson("loggedUser") || {};
    const settings = readJson("openRoutesSettings") || {};
    const favorites = readJson("openRoutesFavorites") || [];
    const lastBooking = readJson("openRoutesLastBooking");
    const savedPlan = readJson("openRoutesSavedTripPlan");

    const displayName = user.name || user.fullName || user.username || "Open Routes User";
    const email = user.email || "Sign in to save your profile details";
    const firstName = getFirstName(displayName);
    const guideFavorites = favorites.filter((item) => item.type === "guide" || item.type === "interpreter");
    const destinationFavorites = favorites.filter((item) => item.type === "destination");

    setText("profileName", displayName);
    setText("profileEmail", email);
    setText("profileDisplayName", displayName);
    setText("profileFavoriteCount", String(favorites.length));
    setText("profileGuideCount", String(guideFavorites.length));
    setText("profileBookingCount", lastBooking ? "1" : "0");
    setText("profilePlanState", savedPlan ? "Saved" : "Draft");
    setText("profileTravelStyle", settings.travelStyle || "Not selected");
    setText("profileDifficulty", settings.difficulty || "Not selected");
    setText("profileInterests", formatInterests(settings.travelPreferences));
    setText("profileType", buildTravelerType(settings.travelPreferences, destinationFavorites));
    renderAvatar(user.photo, firstName);
    renderActivity({ favorites, guideFavorites, destinationFavorites, lastBooking, savedPlan });
    renderBooking(lastBooking);
    setupGuideNote();
});

function readJson(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
        return null;
    }
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function getFirstName(value) {
    const cleaned = String(value || "").trim();
    if (!cleaned) return "User";
    if (cleaned.includes("@")) return cleaned.split("@")[0];
    return cleaned.split(/\s+/)[0];
}

function getInitials(name) {
    return String(name || "User").trim().slice(0, 1).toUpperCase() || "U";
}

function renderAvatar(photo, name) {
    const avatar = document.getElementById("profileAvatar");
    if (!avatar) return;

    if (photo) {
        avatar.innerHTML = `<img src="${photo}" alt="${name}">`;
        avatar.classList.remove("is-placeholder");
        return;
    }

    avatar.classList.add("is-placeholder");
    avatar.innerHTML = `<i class="fa-solid fa-user" aria-hidden="true"></i>`;
    avatar.setAttribute("aria-label", "Default profile picture");
}

function formatInterests(interests) {
    if (!Array.isArray(interests) || !interests.length) return "No interests saved";
    return interests.slice(0, 3).join(", ");
}

function buildTravelerType(interests, destinationFavorites) {
    const values = Array.isArray(interests) ? interests : [];
    if (values.includes("Culture")) return "Culture Traveler";
    if (values.includes("Nature")) return "Nature Explorer";
    if (values.includes("Beach")) return "Coastal Traveler";
    if (destinationFavorites.length >= 3) return "Destination Collector";
    return "Accessible Explorer";
}

function renderActivity(data) {
    const list = document.getElementById("profileActivityList");
    if (!list) return;

    const items = [];

    if (data.lastBooking) {
        items.push({
            icon: "fa-calendar-check",
            title: "Latest booking saved",
            text: `${data.lastBooking.tourName || "Tour package"}${data.lastBooking.date ? ` for ${formatDate(data.lastBooking.date)}` : ""}.`
        });
    }

    if (data.savedPlan) {
        items.push({
            icon: "fa-route",
            title: "Trip plan created",
            text: "A travel plan draft is saved from Plan Your Trip."
        });
    }

    if (data.favorites.length) {
        items.push({
            icon: "fa-heart",
            title: "Favorites ready",
            text: `${data.favorites.length} saved item${data.favorites.length === 1 ? "" : "s"} available for planning.`
        });
    }

    if (data.guideFavorites.length) {
        items.push({
            icon: "fa-hands-helping",
            title: "Guide support saved",
            text: `${data.guideFavorites.length} guide or interpreter profile saved.`
        });
    }

    if (!items.length) {
        items.push(
            { icon: "fa-map-location-dot", title: "Start exploring", text: "Save a destination, create a trip plan or book a tour to build your profile activity." },
            { icon: "fa-universal-access", title: "Accessibility tools available", text: "Use the floating accessibility button on any page to adjust your experience." }
        );
    }

    list.innerHTML = items.slice(0, 4).map((item) => `
        <article class="activity-item">
            <i class="fa-solid ${item.icon}"></i>
            <div>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        </article>
    `).join("");
}

function renderBooking(booking) {
    const preview = document.getElementById("profileBookingPreview");
    if (!preview || !booking) return;

    preview.innerHTML = `
        <i class="fa-solid fa-suitcase-rolling"></i>
        <div>
            <h3>${booking.tourName || "Open Routes booking"}</h3>
            <p>${booking.reference || "Saved request"}${booking.date ? ` - ${formatDate(booking.date)}` : ""}${booking.guests ? ` - ${booking.guests} traveler${Number(booking.guests) === 1 ? "" : "s"}` : ""}</p>
            <p>${booking.guide || "Guide support can be confirmed before the trip."}</p>
        </div>
    `;
}

function setupGuideNote() {
    const textarea = document.getElementById("guideNote");
    const counter = document.getElementById("guideNoteCount");
    const button = document.getElementById("saveGuideNote");
    if (!textarea) return;

    textarea.value = localStorage.getItem(PROFILE_NOTE_KEY) || "";
    updateNoteCount();

    textarea.addEventListener("input", updateNoteCount);
    button?.addEventListener("click", () => {
        localStorage.setItem(PROFILE_NOTE_KEY, textarea.value.trim());
        button.innerHTML = `<i class="fa-solid fa-check"></i> Saved`;
        setTimeout(() => {
            button.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save note`;
        }, 1500);
    });

    function updateNoteCount() {
        if (counter) counter.textContent = `${textarea.value.length}/180`;
    }
}

function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
