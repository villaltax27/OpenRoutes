document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById('viewBtn');
    const closeBtn = document.getElementById('closeBtn');
    const detailPanel = document.getElementById('detailPanel');
    const favoriteButton = document.querySelector('.fav-btn');
    const toggle = document.getElementById('btnDropdownToggle');
    const menu = document.getElementById('accessibilityMenu');
    const voice = document.getElementById('chkVoiceReader');
    const contrast = document.getElementById('chkContrast');
    const textSize = document.getElementById('chkTextSize');

    viewBtn?.addEventListener('click', () => detailPanel?.classList.remove('hidden'));
    closeBtn?.addEventListener('click', () => detailPanel?.classList.add('hidden'));
    favoriteButton?.addEventListener('click', () => {
        favoriteButton.classList.toggle('active');
        const icon = favoriteButton.querySelector('i');
        icon?.classList.toggle('fa-regular');
        icon?.classList.toggle('fa-solid');
    });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('show');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.accessibility-dropdown')) {
                menu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    contrast?.addEventListener('change', () => document.body.classList.toggle('high-contrast', contrast.checked));
    textSize?.addEventListener('change', () => document.body.classList.toggle('large-text', textSize.checked));
    voice?.addEventListener('change', () => {
        if (!voice.checked || !('speechSynthesis' in window)) {
            window.speechSynthesis?.cancel();
            return;
        }
        const utterance = new SpeechSynthesisUtterance(document.querySelector('main')?.innerText || document.body.innerText);
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
});

function saveStevenFavorite() {
    const key = "openRoutesFavorites";
    const item = {
        id: "interpreter-steven-amaya",
        type: "interpreter",
        title: "Steven Amaya",
        description: "Professional bilingual interpreter and cultural guide for Open Routes travelers.",
        image: document.querySelector(".profile-img")?.src || "https://i.ibb.co/6cyD53rd/Gemini-Generated-Image-vgo8xuvgo8xuvgo8.png",
        link: "Steven_information.html"
    };
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = favorites.filter((favorite) => favorite.id !== item.id);
    filtered.unshift(item);
    localStorage.setItem(key, JSON.stringify(filtered));
}

document.querySelector(".fav-btn")?.addEventListener("click", () => {
    saveStevenFavorite();
    window.location.href = "favorites.html";
});
