document.addEventListener("DOMContentLoaded", () => {
    const btnDropdownToggle = document.getElementById("btnDropdownToggle");
    const accessibilityMenu = document.getElementById("accessibilityMenu");
    const chkVoiceReader = document.getElementById("chkVoiceReader");
    const chkContrast = document.getElementById("chkContrast");
    const chkTextSize = document.getElementById("chkTextSize");
    const synth = window.speechSynthesis;

    function speakText(text) {
        if (!chkVoiceReader || !chkVoiceReader.checked || !text || !synth) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        synth.speak(utterance);
    }

    function stopSpeaking() {
        if (synth) synth.cancel();
    }

    if (btnDropdownToggle && accessibilityMenu) {
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
    }

    if (chkContrast) {
        chkContrast.addEventListener("change", () => {
            document.body.classList.toggle("high-contrast", chkContrast.checked);
            speakText(chkContrast.checked ? "High contrast activated" : "High contrast deactivated");
        });
    }

    if (chkTextSize) {
        chkTextSize.addEventListener("change", () => {
            document.body.classList.toggle("large-text", chkTextSize.checked);
            speakText(chkTextSize.checked ? "Bigger text activated" : "Text size returned to normal");
        });
    }

    if (chkVoiceReader) {
        chkVoiceReader.addEventListener("change", () => {
            if (chkVoiceReader.checked) speakText("Audio guide enabled");
            else stopSpeaking();
        });
    }

    const map = L.map("map").setView([13.7942, -88.8965], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    let currentLocation = null;
    let routingControl = null;
    let currentMarker = null;

    function setMarker(latLng, popupText) {
        if (currentMarker) map.removeLayer(currentMarker);
        currentMarker = L.marker(latLng).addTo(map).bindPopup(popupText).openPopup();
    }

    function getLocation() {
        if (!navigator.geolocation) {
            alert("Your browser does not support geolocation.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);
                map.setView(currentLocation, 14);
                setMarker(currentLocation, "You are here");
                speakText("Your location was found");
            },
            () => alert("We could not get your location.")
        );
    }

    async function searchDestination() {
        const input = document.getElementById("destination");
        const destination = input.value.trim();

        if (!destination) {
            alert("Please enter a destination.");
            return;
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination + ", El Salvador")}`);
            const data = await response.json();

            if (!data.length) {
                alert("Destination not found.");
                return;
            }

            const destinationLatLng = L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
            map.setView(destinationLatLng, 15);

            if (routingControl) map.removeControl(routingControl);

            if (currentLocation) {
                routingControl = L.Routing.control({
                    waypoints: [currentLocation, destinationLatLng],
                    routeWhileDragging: false,
                    addWaypoints: false,
                    draggableWaypoints: false,
                    fitSelectedRoutes: true,
                    show: false,
                    createMarker: (index, waypoint) => {
                        const text = index === 0 ? "Your location" : destination;
                        return L.marker(waypoint.latLng).bindPopup(text);
                    }
                }).addTo(map);
            } else {
                setMarker(destinationLatLng, destination);
                alert("Press 'My Location' first if you want to generate a route.");
            }

            speakText(`Showing ${destination} on the map`);
        } catch (error) {
            alert("An error occurred while searching.");
        }
    }

    document.getElementById("locationBtn").addEventListener("click", getLocation);
    document.getElementById("searchBtn").addEventListener("click", searchDestination);
    document.getElementById("destination").addEventListener("keydown", (event) => {
        if (event.key === "Enter") searchDestination();
    });

    document.querySelectorAll(".place").forEach((button) => {
        button.addEventListener("click", () => {
            document.getElementById("destination").value = button.textContent.trim();
            searchDestination();
        });
    });
});
