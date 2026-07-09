document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    const toggleVisibility = (input, button) => {
        if (!input || !button) return;
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        button.innerHTML = isPassword ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
    };

    togglePassword?.addEventListener("click", () => toggleVisibility(passwordInput, togglePassword));
    toggleConfirmPassword?.addEventListener("click", () => toggleVisibility(confirmPasswordInput, toggleConfirmPassword));

    registerForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim().toLowerCase() || "";
        const password = passwordInput?.value || "";
        const confirmPassword = confirmPasswordInput?.value || "";
        const terms = document.getElementById("terms")?.checked;

        if (!name) return showMessage("Please enter your full name.", "error");
        if (!email) return showMessage("Please enter your email.", "error");
        if (password.length < 8) return showMessage("Password must contain at least 8 characters.", "error");
        if (password !== confirmPassword) return showMessage("Passwords do not match.", "error");
        if (!terms) return showMessage("You must accept the Terms & Conditions.", "error");

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some((user) => user.email?.toLowerCase() === email)) {
            return showMessage("This email is already registered.", "error");
        }

        users.push({ name, email, password, photo: "" });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedUser", JSON.stringify({ name, email, photo: "" }));
        localStorage.setItem("isLogged", "true");

        showMessage("Account created successfully! Redirecting...", "success");
        registerForm.reset();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });

    function showMessage(message, type) {
        if (!registerMessage) return;
        registerMessage.textContent = message;
        registerMessage.className = type;
    }
});
