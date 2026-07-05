document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const readableItems = document.querySelectorAll("[data-read]");
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

    // Contact form handling
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!fullName || !email || !subject || !message) {
                formStatus.textContent = "Please fill in all fields before sending.";
                formStatus.classList.add("error");
                speakText("Please fill in all fields before sending.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formStatus.textContent = "Please enter a valid email address.";
                formStatus.classList.add("error");
                speakText("Please enter a valid email address.");
                return;
            }

            // No backend connected yet: this just confirms the message was ready to send.
            formStatus.classList.remove("error");
            formStatus.textContent = `Thank you, ${fullName}! Your message has been sent.`;
            speakText("Your message has been sent. Thank you.");
            contactForm.reset();
        });
    }
});