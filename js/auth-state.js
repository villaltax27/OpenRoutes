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
            : `<span>${getInitials(displayName)}</span>`;

        container.innerHTML = `
            <div class="account-menu">
                <button class="account-toggle" type="button" aria-expanded="false" aria-haspopup="true">
                    <span class="account-avatar">${avatar}</span>
                    <span class="account-greeting">Hi, ${displayName}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="account-dropdown">
                    <a href="#" class="account-item"><i class="fa-regular fa-user"></i> My Profile</a>
                    <a href="favorites.html" class="account-item"><i class="fa-regular fa-heart"></i> My Favorites</a>
                    <button type="button" class="account-item" data-action="accessibility"><i class="fa-solid fa-universal-access"></i> Accessibility Preferences</button>
                    <a href="#" class="account-item"><i class="fa-solid fa-gear"></i> Settings</a>
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

    document.querySelectorAll('[data-action="accessibility"]').forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelector(".account-menu.open")?.classList.remove("open");
            document.getElementById("btnDropdownToggle")?.click();
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
