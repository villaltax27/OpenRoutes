document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationCards = document.querySelectorAll(".destination-card");
    const readableItems = document.querySelectorAll("[data-read]");
    const synth = window.speechSynthesis;

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
            const filter = button.dataset.filter;
            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            destinationCards.forEach((card) => {
                const shouldShow = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });
});
