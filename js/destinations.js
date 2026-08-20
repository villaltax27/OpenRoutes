document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterChips = document.querySelectorAll(".filter-chip");
    const destinationGrid = document.querySelector(".destination-grid");
    const destinationCards = Array.from(document.querySelectorAll(".destination-card"));
    const searchInput = document.getElementById("destinationSearch");
    const sortSelect = document.getElementById("destinationSort");
    const resultsCount = document.getElementById("resultsCount");
    const emptyState = document.getElementById("destinationEmptyState");
    const clearButtons = document.querySelectorAll(".clear-filters");
    const readableItems = document.querySelectorAll("[data-read]");
    const synth = window.speechSynthesis;

    const activeFilters = {
        category: "all",
        access: new Set(),
        experience: new Set(),
        query: "",
        sort: "recommended"
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

    function getTokens(card, key) {
        return (card.dataset[key] || "").toLowerCase().split(/\s+/).filter(Boolean);
    }

    function getSearchText(card) {
        const title = card.querySelector("h3")?.textContent || "";
        const description = card.querySelector("p")?.textContent || "";
        return `${title} ${description} ${card.dataset.category || ""} ${card.dataset.location || ""} ${card.dataset.keywords || ""} ${card.dataset.access || ""} ${card.dataset.experience || ""}`.toLowerCase();
    }

    function matchesSet(tokens, selectedSet) {
        if (!selectedSet.size) return true;
        return Array.from(selectedSet).every((item) => tokens.includes(item));
    }

    function sortCards(cards) {
        const sorted = [...cards];
        sorted.sort((a, b) => {
            if (activeFilters.sort === "az") {
                return (a.querySelector("h3")?.textContent || "").localeCompare(b.querySelector("h3")?.textContent || "");
            }
            if (activeFilters.sort === "easy-access") {
                return Number(a.dataset.ease || 99) - Number(b.dataset.ease || 99);
            }
            return Number(a.dataset.popularity || 99) - Number(b.dataset.popularity || 99);
        });
        sorted.forEach((card) => destinationGrid?.appendChild(card));
    }

    function applyDestinationFilters() {
        const query = activeFilters.query.trim().toLowerCase();
        const visibleCards = [];

        destinationCards.forEach((card) => {
            const categoryMatch = activeFilters.category === "all" || card.dataset.category === activeFilters.category;
            const accessMatch = matchesSet(getTokens(card, "access"), activeFilters.access);
            const experienceMatch = matchesSet(getTokens(card, "experience"), activeFilters.experience);
            const queryMatch = !query || getSearchText(card).includes(query);
            const shouldShow = categoryMatch && accessMatch && experienceMatch && queryMatch;

            card.classList.toggle("is-hidden", !shouldShow);
            if (shouldShow) visibleCards.push(card);
        });

        sortCards(visibleCards);

        if (resultsCount) {
            const label = visibleCards.length === 1 ? "destination found" : "destinations found";
            resultsCount.textContent = `${visibleCards.length} ${label}`;
        }

        if (emptyState) {
            emptyState.hidden = visibleCards.length !== 0;
        }
    }

    function clearAllFilters() {
        activeFilters.category = "all";
        activeFilters.access.clear();
        activeFilters.experience.clear();
        activeFilters.query = "";
        activeFilters.sort = "recommended";

        if (searchInput) searchInput.value = "";
        if (sortSelect) sortSelect.value = "recommended";

        filterButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.filter === "all");
        });
        filterChips.forEach((chip) => chip.classList.remove("active"));
        applyDestinationFilters();
    }

    if (btnDropdownToggle && accessibilityMenu) {
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
    }

    if (chkContrast) {
        chkContrast.addEventListener("change", () => {
            document.body.classList.toggle("high-contrast", chkContrast.checked);
            speakText(chkContrast.checked ? "High contrast activated" : "High contrast deactivated");
        });
    }

    if (chkTextSize) {
        chkTextSize.addEventListener("change", () => {
            document.body.classList.toggle("large-text", chkTextSize.checked);
            speakText(chkTextSize.checked ? "Bigger text activated" : "Text size returned to normal");
        });
    }

    if (chkVoiceReader) {
        chkVoiceReader.addEventListener("change", () => {
            if (chkVoiceReader.checked) speakText("Audio guide enabled");
            else stopSpeaking();
        });
    }

    readableItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        const text = item.getAttribute("data-read");
        item.addEventListener("mouseenter", () => speakText(text));
        item.addEventListener("mouseleave", stopSpeaking);
        item.addEventListener("focus", () => speakText(text));
        item.addEventListener("blur", stopSpeaking);
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeFilters.category = button.dataset.filter;
            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            applyDestinationFilters();
        });
    });

    filterChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const filterType = chip.dataset.access ? "access" : "experience";
            const value = chip.dataset.access || chip.dataset.experience;
            const targetSet = activeFilters[filterType];

            if (targetSet.has(value)) {
                targetSet.delete(value);
                chip.classList.remove("active");
            } else {
                targetSet.add(value);
                chip.classList.add("active");
            }
            applyDestinationFilters();
        });
    });

    searchInput?.addEventListener("input", () => {
        activeFilters.query = searchInput.value;
        applyDestinationFilters();
    });

    sortSelect?.addEventListener("change", () => {
        activeFilters.sort = sortSelect.value;
        applyDestinationFilters();
    });

    clearButtons.forEach((button) => button.addEventListener("click", clearAllFilters));

    applyDestinationFilters();
});
