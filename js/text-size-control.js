document.addEventListener("DOMContentLoaded", () => {
    const range = document.getElementById("textSizeRange");
    const value = document.getElementById("textSizeValue");
    const minus = document.getElementById("textSizeMinus");
    const plus = document.getElementById("textSizePlus");
    const legacyToggle = document.getElementById("chkTextSize");

    if (!range || !value) return;

    const TEXT_SIZE_KEY = "openRoutesTextSize";
    const min = Number(range.min) || 90;
    const max = Number(range.max) || 130;
    const step = Number(range.step) || 5;

    function clamp(size) {
        return Math.min(max, Math.max(min, Number(size) || 100));
    }

    function applyTextSize(size) {
        const nextSize = clamp(size);
        range.value = String(nextSize);
        value.textContent = `${nextSize}%`;

        document.documentElement.style.fontSize = `${nextSize}%`;
        document.body.style.setProperty("--base-font-size", `${16 * (nextSize / 100)}px`);

        if (legacyToggle) {
            legacyToggle.checked = nextSize > 100;
        }

        localStorage.setItem(TEXT_SIZE_KEY, String(nextSize));
    }

    const savedSize = localStorage.getItem(TEXT_SIZE_KEY) || "100";
    applyTextSize(savedSize);

    range.addEventListener("input", () => applyTextSize(range.value));
    minus?.addEventListener("click", () => applyTextSize(Number(range.value) - step));
    plus?.addEventListener("click", () => applyTextSize(Number(range.value) + step));
});
