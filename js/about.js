document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const readableItems = document.querySelectorAll("[data-read]");
    const members = document.querySelectorAll(".member");
    const synth = window.speechSynthesis;

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

    chkContrast.addEventListener("change", () => {
        document.body.classList.toggle("high-contrast", chkContrast.checked);
        speakText(chkContrast.checked ? "High contrast activated" : "High contrast deactivated");
    });

    chkTextSize.addEventListener("change", () => {
        document.body.classList.toggle("large-text", chkTextSize.checked);
        speakText(chkTextSize.checked ? "Bigger text activated" : "Text size returned to normal");
    });

    chkVoiceReader.addEventListener("change", () => {
        if (chkVoiceReader.checked) {
            speakText("Audio guide enabled");
        } else {
            stopSpeaking();
        }
    });

    readableItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        const text = item.getAttribute("data-read");
        item.addEventListener("mouseenter", () => speakText(text));
        item.addEventListener("mouseleave", stopSpeaking);
        item.addEventListener("focus", () => speakText(text));
        item.addEventListener("blur", stopSpeaking);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                members.forEach((member, index) => {
                    setTimeout(() => member.classList.add("show"), index * 140);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    const teamSection = document.querySelector(".team-section");
    if (teamSection) observer.observe(teamSection);
});
