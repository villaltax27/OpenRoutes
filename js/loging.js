document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");
    const loginMessage = document.getElementById("loginMessage");
    const togglePassword = document.getElementById("togglePassword");

    // SHOW / HIDE PASSWORD

    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                password.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }

    // LOGIN

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();


        loginMessage.innerHTML = "";



        const userEmail = email.value.trim().toLowerCase();

        const userPassword = password.value.trim();

        // Validar campos

        if (userEmail === "" || userPassword === "") {

            showMessage(
                "Please complete all fields.",
                false
            );

            return;

        }

        // Obtener usuarios

        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        // Buscar usuario

        const user = users.find(u => {

            const savedEmail = u.email
                ? u.email.trim().toLowerCase()
                : "";

            const savedPassword = u.password
                ? String(u.password).trim()
                : "";


            return (
                savedEmail === userEmail &&
                savedPassword === userPassword
            );

        });

        // Usuario no encontrado

        if (!user) {

            showMessage(
                "Incorrect email or password.",
                false
            );

            return;

        }

        // Guardar sesiÃ³n

        localStorage.setItem(

            "loggedUser",

            JSON.stringify({

                name: user.name,

                email: user.email,

                photo: user.photo || ""

            })

        );

        // Recordar sesiÃ³n

        if (rememberMe && rememberMe.checked) {

            localStorage.setItem(
                "rememberSession",
                "true"
            );

        } else {

            localStorage.removeItem(
                "rememberSession"
            );

        }

        // Mensaje exitoso

        showMessage(
            "Login successful! Redirecting...",
            true
        );

        // Ir al index

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);



    });

    // MESSAGE FUNCTION

    function showMessage(message, success) {

        loginMessage.innerHTML = message;


        loginMessage.className = success
            ? "success"
            : "error";

    }

});

function initFloatingAccessibility() {
    const toggle = document.getElementById("btnDropdownToggle");
    const menu = document.getElementById("accessibilityMenu");
    const contrast = document.getElementById("chkContrast");
    const textSize = document.getElementById("chkTextSize");
    const voice = document.getElementById("chkVoiceReader");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.toggle("show");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".accessibility-dropdown")) {
            menu.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    contrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", contrast.checked));
    textSize?.addEventListener("change", () => document.body.classList.toggle("large-text", textSize.checked));
    voice?.addEventListener("change", () => {
        if (!voice.checked || !("speechSynthesis" in window)) {
            window.speechSynthesis?.cancel();
            return;
        }
        const utterance = new SpeechSynthesisUtterance(document.querySelector("main")?.innerText || document.body.innerText);
        utterance.lang = "en-US";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
}

document.addEventListener("DOMContentLoaded", initFloatingAccessibility);
