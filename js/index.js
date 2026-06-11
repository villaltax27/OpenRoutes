document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("accessMenu");
    const accessBtn = document.querySelector(".access-btn");

    const highContrast = document.getElementById("highContrast");
    const largeText = document.getElementById("largeText");

    // ================= MENU =================

    accessBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show-menu");
    });

    document.addEventListener("click", (e) => {
        if (
            !menu.contains(e.target) &&
            !accessBtn.contains(e.target)
        ) {
            menu.classList.remove("show-menu");
        }
    });

    // ================= HIGH CONTRAST =================

    highContrast.addEventListener("change", () => {
        document.body.classList.toggle(
            "contrast-mode",
            highContrast.checked
        );
    });

    // ================= BIGGER TEXT =================

    largeText.addEventListener("change", () => {
        document.body.classList.toggle(
            "large-text",
            largeText.checked
        );
    });

});