document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const readableItems = document.querySelectorAll("[data-read]");
    const synth = window.speechSynthesis;

    function speakText(text) {
        if (!chkVoiceReader?.checked || !text || !synth) return;
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

    chkVoiceReader?.addEventListener("change", () => {
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

    document.querySelectorAll(".destination-card").forEach((card) => {
        const link = card.querySelector('a[href*="destination-detail.html"]');
        if (!link) return;

        card.classList.add("is-clickable");
        card.setAttribute("role", "link");
        card.setAttribute("aria-label", link.textContent.trim() ? `Open ${card.querySelector("h3")?.textContent?.trim() || "destination"} details` : "Open destination details");

        card.addEventListener("click", (event) => {
            if (event.target.closest("a, button, input, select, textarea, label")) return;
            window.location.href = link.href;
        });

        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            link.click();
        });
    });
});
// script.js - Intersection Observer para animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animación para las columnas principales (fade-up)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => observer.observe(el));
    
    // Animación para cada feature-item, trust-badge y start-engine
    const itemsToAnimate = document.querySelectorAll('.feature-item, .trust-badge, .start-engine');
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-item');
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    itemsToAnimate.forEach(el => itemObserver.observe(el));
});
function getOpenRoutesUser() {
    try {
        return JSON.parse(localStorage.getItem("loggedUser") || "null");
    } catch (error) {
        return null;
    }
}

function protectTourBookingLinks() {
    document.querySelectorAll(".tour-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            if (getOpenRoutesUser()) return;
            event.preventDefault();
            localStorage.setItem("openRoutesPendingBooking", button.getAttribute("href") || "tour-detail.html");
            window.location.href = "login.html";
        });
    });
}

protectTourBookingLinks();
