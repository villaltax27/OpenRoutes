document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const plannerForm = document.getElementById("plannerForm");
    const readableItems = document.querySelectorAll("[data-read]");
    const synth = window.speechSynthesis;

    const resultImage = document.getElementById("resultImage");
    const resultBadge = document.getElementById("resultBadge");
    const resultTitle = document.getElementById("resultTitle");
    const resultDescription = document.getElementById("resultDescription");
    const matchList = document.getElementById("matchList");
    const routeSteps = document.getElementById("routeSteps");
    const destinationLink = document.getElementById("destinationLink");
    const interpreterLink = document.getElementById("interpreterLink");
    const savePlan = document.getElementById("savePlan");
    const transportNote = document.getElementById("transportNote");
    const supportNote = document.getElementById("supportNote");
    const checkboxes = document.querySelectorAll("[data-check-item]");
    const progressText = document.getElementById("checkProgress");
    const progressBar = document.getElementById("checkProgressBar");

    const plans = {
        relaxed: {
            title: "Lake Coatepeque Easy Day",
            destination: "Lake Coatepeque",
            badge: "Relaxed route",
            image: "https://tse3.mm.bing.net/th/id/OIP.kNAvHfoTD-ffUFfJZNuvugHaE8?r=0&cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3",
            alt: "Lake Coatepeque",
            link: "destination-detail.html?place=coatepeque",
            description: "A calm route with scenic views, flexible timing and good options for guide support before visiting.",
            matches: ["Scenic views", "Flexible timing", "Guide available"],
            steps: ["Start from San Salvador in the morning.", "Visit a lake viewpoint and restaurant stop.", "Return before evening traffic."],
            transport: "Private transport is recommended if you need flexible timing, extra stops or mobility support."
        },
        nature: {
            title: "Santa Ana Volcano View Route",
            destination: "Santa Ana Volcano",
            badge: "Nature route",
            image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
            alt: "Santa Ana Volcano",
            link: "destination-detail.html?place=santa-ana",
            description: "A nature-focused route for travelers who want landscapes, viewpoints and a more active outdoor experience.",
            matches: ["Outdoor views", "Early start", "Route planning needed"],
            steps: ["Leave early and confirm trail conditions.", "Visit accessible viewpoints or easier walking areas.", "Plan rest breaks and return before late afternoon."],
            transport: "Use private transport and confirm road or trail conditions before leaving."
        },
        culture: {
            title: "Suchitoto Culture Walk",
            destination: "Suchitoto",
            badge: "Culture route",
            image: "https://tse3.mm.bing.net/th/id/OIP.hW0UJVspMfddhoJFwtLlfQHaEK",
            alt: "Suchitoto",
            link: "destination-detail.html?place=suchitoto",
            description: "A cultural route with historic streets, local food, artisan spaces and guide support for context.",
            matches: ["Local culture", "Short stops", "Interpreter useful"],
            steps: ["Start with the historic center.", "Visit a local food or artisan stop.", "Finish with a viewpoint or calm plaza area."],
            transport: "Choose drop-off points close to the main area to reduce walking distance."
        },
        beach: {
            title: "El Tunco Beach Sunset Plan",
            destination: "El Tunco Beach",
            badge: "Beach route",
            image: "https://tse3.mm.bing.net/th/id/OIP.skfvtLItixcFJGeyZrcaxAHaFj",
            alt: "El Tunco Beach",
            link: "destination-detail.html?place=el-tunco",
            description: "A beach plan focused on ocean views, relaxed timing, shaded breaks and sunset.",
            matches: ["Beach services", "Sunset timing", "Restaurant stops"],
            steps: ["Travel after the hottest hours.", "Confirm parking and restroom availability.", "Plan dinner or support before returning."],
            transport: "Private transport is helpful for beach equipment, mobility support and flexible return time."
        }
    };

    function speakText(text) {
        if (!chkVoiceReader || !chkVoiceReader.checked || !text || !synth) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        synth.speak(utterance);
    }

    function stopSpeaking() {
        if (synth) synth.cancel();
    }

    function getPlannerState() {
        const formData = new FormData(plannerForm);
        return {
            style: formData.get("style") || "relaxed",
            time: formData.get("time") || "full-day",
            startPoint: formData.get("startPoint") || "san-salvador",
            support: formData.getAll("support")
        };
    }

    function buildRecommendation(state) {
        const base = { ...plans[state.style] };

        if (state.support.includes("low-walking") || state.support.includes("wheelchair")) {
            if (state.style === "nature") {
                base.title = "Lake Coatepeque Viewpoint Plan";
                base.destination = "Lake Coatepeque";
                base.badge = "Lower walking";
                base.image = plans.relaxed.image;
                base.alt = plans.relaxed.alt;
                base.link = plans.relaxed.link;
                base.description = "A lower-pressure route with scenic views and easier planning than a demanding trail.";
                base.matches = ["Lower walking", "Scenic views", "Support recommended"];
                base.steps = ["Choose a viewpoint or restaurant with close access.", "Avoid steep walking sections.", "Contact support to confirm parking and restroom details."];
            }
            if (!base.matches.includes("Low walking option")) base.matches.unshift("Low walking option");
        }

        if (state.support.includes("interpreter") && !base.matches.includes("Interpreter available")) {
            base.matches.push("Interpreter available");
        }

        if (state.support.includes("audio") && !base.matches.includes("Audio guide useful")) {
            base.matches.push("Audio guide useful");
        }

        if (state.support.includes("restrooms") && !base.matches.includes("Restroom check needed")) {
            base.matches.push("Restroom check needed");
        }

        if (state.time === "half-day") {
            base.title = base.title.replace("Weekend", "").replace("Full Day", "Half Day");
            base.steps = [
                "Choose one main stop only.",
                "Confirm access and travel time before leaving.",
                "Keep the route short and return with extra time."
            ];
        }

        if (state.time === "weekend") {
            base.title = `${base.destination} Weekend Plan`;
            base.steps = [
                "Day one: travel, check access points and enjoy the main destination.",
                "Day two: add a nearby food, culture or viewpoint stop.",
                "Return with enough time for rest breaks."
            ];
        }

        if (state.support.includes("transport")) {
            base.transport = "Private transport is the best match for this plan because it gives more control over stops, timing and accessibility support.";
        }

        return base;
    }

    function renderRecommendation() {
        if (!plannerForm) return;

        const state = getPlannerState();
        const plan = buildRecommendation(state);

        resultImage.src = plan.image;
        resultImage.alt = plan.alt;
        resultBadge.textContent = plan.badge;
        resultTitle.textContent = plan.title;
        resultDescription.textContent = plan.description;
        destinationLink.href = plan.link;
        interpreterLink.href = state.support.includes("interpreter") ? "interpreters.html" : "interpreters.html";
        transportNote.textContent = plan.transport;
        supportNote.textContent = state.support.length
            ? "Your selected support needs should be confirmed before the visit. Contact Open Routes if you need route details or assistance."
            : "You can add accessibility needs above to get a more specific support note.";

        matchList.innerHTML = plan.matches.map((match) => `<span><i class="fa-solid fa-circle-check"></i> ${match}</span>`).join("");
        routeSteps.innerHTML = plan.steps.map((step) => `<li>${step}</li>`).join("");

        const readText = `Recommended trip. ${plan.title}. ${plan.description}`;
        document.querySelector(".result-content")?.setAttribute("data-read", readText);
        localStorage.setItem("openRoutesTripPlannerDraft", JSON.stringify({ state, plan }));
        speakText(readText);
    }

    function updateChoiceChips() {
        document.querySelectorAll(".choice-chip").forEach((chip) => {
            const input = chip.querySelector("input");
            chip.classList.toggle("active", Boolean(input?.checked));
        });
    }

    function updateChecklist() {
        if (!checkboxes.length || !progressText || !progressBar) return;
        const checked = Array.from(checkboxes).filter((item) => item.checked).length;
        const percent = Math.round((checked / checkboxes.length) * 100);
        progressText.textContent = `${percent}%`;
        progressBar.style.width = `${percent}%`;

        const state = {};
        checkboxes.forEach((item) => {
            state[item.dataset.checkItem] = item.checked;
        });
        localStorage.setItem("openRoutesTripChecklist", JSON.stringify(state));
    }

    if (btnDropdownToggle && accessibilityMenu) {
        btnDropdownToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = accessibilityMenu.classList.toggle("show");
            btnDropdownToggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (event) => {
            if (!accessibilityMenu.contains(event.target) && !btnDropdownToggle.contains(event.target)) {
                accessibilityMenu.classList.remove("show");
                btnDropdownToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    chkContrast?.addEventListener("change", () => {
        document.body.classList.toggle("high-contrast", chkContrast.checked);
        speakText(chkContrast.checked ? "High contrast activated" : "High contrast deactivated");
    });

    chkVoiceReader?.addEventListener("change", () => {
        if (chkVoiceReader.checked) speakText("Audio guide enabled");
        else stopSpeaking();
    });

    readableItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        const text = item.getAttribute("data-read");
        item.addEventListener("mouseenter", () => speakText(text));
        item.addEventListener("mouseleave", stopSpeaking);
        item.addEventListener("focus", () => speakText(text));
        item.addEventListener("blur", stopSpeaking);
    });

    plannerForm?.addEventListener("change", () => {
        updateChoiceChips();
        renderRecommendation();
    });

    savePlan?.addEventListener("click", () => {
        const state = getPlannerState();
        const plan = buildRecommendation(state);
        localStorage.setItem("openRoutesSavedTripPlan", JSON.stringify({ state, plan, savedAt: new Date().toISOString() }));
        savePlan.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
        speakText("Trip plan saved");
        setTimeout(() => {
            savePlan.innerHTML = '<i class="fa-regular fa-heart"></i> Save Plan';
        }, 1800);
    });

    try {
        const savedChecklist = JSON.parse(localStorage.getItem("openRoutesTripChecklist") || "{}");
        checkboxes.forEach((item) => {
            item.checked = Boolean(savedChecklist[item.dataset.checkItem]);
            item.addEventListener("change", updateChecklist);
        });
    } catch (error) {
        checkboxes.forEach((item) => item.addEventListener("change", updateChecklist));
    }

    updateChoiceChips();
    updateChecklist();
    renderRecommendation();
});
