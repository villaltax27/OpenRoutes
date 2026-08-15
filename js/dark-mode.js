(function () {
    const DARK_MODE_KEY = "openRoutesDarkMode";

    function setDarkModeState(isEnabled) {
        document.documentElement.classList.toggle("dark-mode", isEnabled);
        document.body?.classList.toggle("dark-mode", isEnabled);
    }

    setDarkModeState(localStorage.getItem(DARK_MODE_KEY) === "true");

    document.addEventListener("DOMContentLoaded", () => {
        const darkToggle = document.getElementById("chkDarkMode");
        const savedState = localStorage.getItem(DARK_MODE_KEY) === "true";

        setDarkModeState(savedState);

        if (darkToggle) {
            darkToggle.checked = savedState;
            darkToggle.addEventListener("change", () => {
                const isEnabled = darkToggle.checked;
                localStorage.setItem(DARK_MODE_KEY, isEnabled ? "true" : "false");
                setDarkModeState(isEnabled);
            });
        }
    });
})();
