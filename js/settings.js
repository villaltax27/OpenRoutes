const SETTINGS_KEY = "openRoutesSettings";

document.addEventListener("DOMContentLoaded", () => {
    setupSettingsTabs();
    setupPreferenceChips();
    setupSettingStorage();
    setupAccessibilityMenu();
});

function setupSettingsTabs() {
    const tabs = document.querySelectorAll(".settings-tab");
    const panels = document.querySelectorAll(".settings-panel");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.panel;
            tabs.forEach((item) => item.classList.toggle("active", item === tab));
            panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
        });
    });
}

function setupPreferenceChips() {
    document.querySelectorAll(".preference-chip").forEach((chip) => {
        chip.addEventListener("click", () => chip.classList.toggle("active"));
    });
}

function setupSettingStorage() {
    const saved = readSettings();

    document.querySelectorAll("[data-setting]").forEach((field) => {
        const key = field.dataset.setting;
        if (Object.prototype.hasOwnProperty.call(saved, key)) {
            if (field.type === "checkbox") field.checked = Boolean(saved[key]);
            else field.value = saved[key];
        }
    });

    document.getElementById("saveSettings")?.addEventListener("click", () => {
        const values = {};
        document.querySelectorAll("[data-setting]").forEach((field) => {
            values[field.dataset.setting] = field.type === "checkbox" ? field.checked : field.value;
        });
        values.travelPreferences = Array.from(document.querySelectorAll(".preference-chip.active")).map((chip) => chip.dataset.chip);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(values));
        showSavedState();
    });

    document.getElementById("resetSettings")?.addEventListener("click", () => {
        localStorage.removeItem(SETTINGS_KEY);
        window.location.reload();
    });

    document.getElementById("clearRecent")?.addEventListener("click", () => {
        localStorage.removeItem("openRoutesRecentSearches");
        document.getElementById("clearRecent").textContent = "Cleared";
    });
}

function readSettings() {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (error) {
        return {};
    }
}

function showSavedState() {
    const button = document.getElementById("saveSettings");
    if (!button) return;
    button.innerHTML = `<i class="fa-solid fa-check"></i> Saved`;
    setTimeout(() => {
        button.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Changes`;
    }, 1600);
}

function setupAccessibilityMenu() {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");

    if (!btnDropdownToggle || !accessibilityMenu) return;

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

    chkContrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", chkContrast.checked));
    chkTextSize?.addEventListener("change", () => document.body.classList.toggle("large-text", chkTextSize.checked));
}
