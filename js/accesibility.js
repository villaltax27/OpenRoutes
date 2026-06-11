document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const cards = document.querySelectorAll(".card, .access-card");
    const synth = window.speechSynthesis;

    document.body.addEventListener("click", () => {
        console.log("Audio Engine Ready.");
    }, { once: true });

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

    function speakText(text) {
        if (!chkVoiceReader.checked || !text || !synth) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        synth.speak(utterance);
    }

    function stopSpeaking() {
        if (synth) synth.cancel();
    }

    cards.forEach((card) => {
        const textToRead = card.getAttribute("data-text");
        card.addEventListener("mouseenter", () => speakText(textToRead));
        card.addEventListener("mouseleave", stopSpeaking);
        card.addEventListener("focus", () => speakText(textToRead));
        card.addEventListener("blur", stopSpeaking);
    });

    chkContrast.addEventListener("change", () => {
        document.body.classList.toggle("high-contrast", chkContrast.checked);
        speakText(chkContrast.checked ? "High contrast activated" : "High contrast deactivated");
    });

    chkTextSize.addEventListener("change", () => {
        document.body.classList.toggle("large-text", chkTextSize.checked);
        speakText(chkTextSize.checked ? "Large text size activated" : "Text size returned to normal");
    });

    chkVoiceReader.addEventListener("change", () => {
        if (chkVoiceReader.checked) {
            speakText("Voice reader enabled");
        } else {
            stopSpeaking();
        }
    });

    const cardTextSize = document.getElementById("cardTextSize");
    const cardContrast = document.getElementById("cardContrast");

    if (cardTextSize) {
        cardTextSize.addEventListener("click", (event) => {
            event.stopPropagation();
            chkTextSize.checked = !chkTextSize.checked;
            chkTextSize.dispatchEvent(new Event("change"));
        });
    }

    if (cardContrast) {
        cardContrast.addEventListener("click", (event) => {
            event.stopPropagation();
            chkContrast.checked = !chkContrast.checked;
            chkContrast.dispatchEvent(new Event("change"));
        });
    }
});
