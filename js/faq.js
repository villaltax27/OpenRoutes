document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("btnDropdownToggle");
    const menu = document.getElementById("accessibilityMenu");
    const contrast = document.getElementById("chkContrast");
    const textSize = document.getElementById("chkTextSize");

    if (toggle && menu) {
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = menu.classList.toggle("show");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                menu.classList.remove("show");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    contrast?.addEventListener("change", () => {
        document.body.classList.toggle("high-contrast", contrast.checked);
    });

    textSize?.addEventListener("change", () => {
        document.body.classList.toggle("large-text", textSize.checked);
    });
});
