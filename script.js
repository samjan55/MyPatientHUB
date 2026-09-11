const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        emailError.textContent = "";
        passwordError.textContent = "";

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            return;
        }

        if (!email.includes("@")) {
            emailError.textContent = "Please enter a valid email.";
            return;
        }

        if (password === "") {
            passwordError.textContent = "Please enter your password.";
            return;
        }

        window.location.href = "dashboard.html";
    });
}
/* LOG OUT */

const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function() {

        window.location.href = "index.html";

    });

}