document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".auth-actions");
    if (!containers.length) return;

    const user = getLoggedUser();
    containers.forEach((container) => {
        if (!user) {
            container.innerHTML = `
                <a class="auth-link" href="login.html">Login</a>
                <a class="auth-link auth-register" href="registrer.html">Register</a>
            `;
            return;
        }

        const displayName = getFirstName(user.name || user.email || "User");
        const avatar = user.photo
            ? `<img src="${user.photo}" alt="${displayName}">`
            : `<i class="fa-solid fa-user" aria-hidden="true"></i>`;
        const avatarClass = user.photo ? "account-avatar" : "account-avatar account-avatar-placeholder";

        container.innerHTML = `
            <div class="account-menu">
                <button class="account-toggle" type="button" aria-expanded="false" aria-haspopup="true">
                    <span class="${avatarClass}" aria-label="${user.photo ? displayName : "Default profile picture"}">${avatar}</span>
                    <span class="account-greeting">Hi, ${displayName}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="account-dropdown">
                    <a href="profile.html" class="account-item"><i class="fa-regular fa-user"></i> My Profile</a>
                    <a href="favorites.html" class="account-item"><i class="fa-regular fa-heart"></i> My Favorites</a>
                    <a href="settings.html" class="account-item"><i class="fa-solid fa-gear"></i> Settings</a>
                    <a href="faq.html" class="account-item"><i class="fa-regular fa-circle-question"></i> Help & FAQ</a>
                    <button type="button" class="account-item logout-item" data-action="logout"><i class="fa-solid fa-right-from-bracket"></i> Log Out</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".account-toggle").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const menu = button.closest(".account-menu");
            const isOpen = menu.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".account-menu.open").forEach((menu) => {
            menu.classList.remove("open");
            menu.querySelector(".account-toggle")?.setAttribute("aria-expanded", "false");
        });
    });

    document.querySelectorAll('[data-action="logout"]').forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("isLogged");
            localStorage.removeItem("rememberSession");
            window.location.href = "index.html";
        });
    });
});

function getLoggedUser() {
    try {
        return JSON.parse(localStorage.getItem("loggedUser") || "null");
    } catch (error) {
        return null;
    }
}

function getFirstName(value) {
    const cleaned = String(value).trim();
    if (!cleaned) return "User";
    if (cleaned.includes("@")) return cleaned.split("@")[0];
    return cleaned.split(/\s+/)[0];
}

function getInitials(name) {
    return String(name).trim().slice(0, 1).toUpperCase() || "U";
}

document.addEventListener("DOMContentLoaded", () => {
    const fallbackImages = [
        {
            keys: ["coatepeque", "lake", "lago"],
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lago_de_Coatepeque.jpg"
        },
        {
            keys: ["tunco", "beach", "surf"],
            src: "https://elsalvadorinfo.net/wp-content/uploads/2023/09/El-Tunco-Beach-El-Salvador-1.jpg"
        },
        {
            keys: ["suchitoto", "historic", "culture", "church"],
            src: "https://tse3.mm.bing.net/th/id/OIP.hW0UJVspMfddhoJFwtLlfQHaEK"
        },
        {
            keys: ["volcano", "santa ana", "crater", "cerro verde"],
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cerro_verde.jpg"
        },
        {
            keys: ["ruta", "flowers", "flores", "tour"],
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruta_de_las_Flores_banner.jpg"
        },
        {
            keys: ["impossible", "imposible", "forest", "nature"],
            src: "https://guanacos.com/wp-content/uploads/2024/01/GUANACOS-PARQUE-NACIONAL-EL-IMPOSIBLE-2-1024x555.jpg"
        }
    ];

    const defaultFallback = "https://commons.wikimedia.org/wiki/Special:FilePath/Conchagua%2C_Golfo_de_Fonseca.jpg";

    function findFallback(img) {
        const text = [
            img.alt,
            img.closest("article, .tour-card, .destination-card")?.textContent,
            img.src
        ].join(" ").toLowerCase();

        return fallbackImages.find((item) => item.keys.some((key) => text.includes(key)))?.src || defaultFallback;
    }

    function useFallback(img) {
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = findFallback(img);
    }

    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => useFallback(img), { once: true });
    });
});

