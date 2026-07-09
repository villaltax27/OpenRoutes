document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('btnDropdownToggle');
    const menu = document.getElementById('accessibilityMenu');
    const voice = document.getElementById('chkVoiceReader');
    const contrast = document.getElementById('chkContrast');
    const textSize = document.getElementById('chkTextSize');
    const searchInput = document.getElementById('searchInput');
    const filterLang = document.getElementById('filterLang');
    const cards = Array.from(document.querySelectorAll('.interpreter-card'));
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeModal = document.getElementById('closeModal');

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
        const text = document.querySelector('.interpreters-hero')?.innerText || document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });

    const applyFilters = () => {
        const query = (searchInput?.value || '').trim().toLowerCase();
        const language = filterLang?.value || 'all';
        cards.forEach((card) => {
            const name = (card.dataset.name || '').toLowerCase();
            const langs = (card.dataset.lang || '').toLowerCase();
            card.style.display = (!query || name.includes(query)) && (language === 'all' || langs.includes(language)) ? '' : 'none';
        });
    };

    searchInput?.addEventListener('input', applyFilters);
    filterLang?.addEventListener('change', applyFilters);

    document.querySelectorAll('.fav').forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const icon = button.querySelector('i');
            icon?.classList.toggle('fa-regular');
            icon?.classList.toggle('fa-solid');
        });
    });

    document.querySelectorAll('button.view').forEach((button) => {
        button.addEventListener('click', () => {
            const name = button.dataset.modal || 'Interpreter';
            if (modalTitle) modalTitle.textContent = name;
            if (modalText) modalText.textContent = `${name}'s full profile will be available soon. Steven Amaya already has a complete profile page.`;
            modal?.classList.add('show');
            modal?.setAttribute('aria-hidden', 'false');
        });
    });

    const hideModal = () => {
        modal?.classList.remove('show');
        modal?.setAttribute('aria-hidden', 'true');
    };
    closeModal?.addEventListener('click', hideModal);
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) hideModal();
    });
});

function saveInterpreterFavorite(card) {
    const key = "openRoutesFavorites";
    const name = card?.dataset.name || card?.querySelector("h3")?.textContent?.trim() || "Interpreter";
    const image = card?.querySelector("img")?.src || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac";
    const description = card?.querySelector("p")?.textContent?.trim() || "Saved interpreter from Open Routes.";
    const profileLink = card?.querySelector("a.view")?.getAttribute("href") || "interpreters.html";
    const item = { id: `interpreter-${name.toLowerCase().replace(/\s+/g, "-")}`, type: "interpreter", title: name, description, image, link: profileLink };
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = favorites.filter((favorite) => favorite.id !== item.id);
    filtered.unshift(item);
    localStorage.setItem(key, JSON.stringify(filtered));
}

document.querySelectorAll(".interpreter-card .fav").forEach((button) => {
    button.addEventListener("click", () => {
        saveInterpreterFavorite(button.closest(".interpreter-card"));
        window.location.href = "favorites.html";
    });
});
