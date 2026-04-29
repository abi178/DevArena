const welcomeText = document.getElementById("welcome-text");
const button = document.getElementById("changeTextBtn");
const darkMode = document.getElementById("darkModeToggle");
const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");


window.addEventListener("load", () => {
    const savedMode  = localStorage.getItem("darkMode");

    if(savedMode === "true") {
        document.body.classList.add("dark-mode");

        if (darkMode) {
            darkMode.textContent = "Light Mode";
        }
    }
});

// event listeners
if (button) {
    button.addEventListener("click", changeText);
}
if (darkMode) {
    darkMode.addEventListener("click", darkModeOn);
}
if (form) {
    form.addEventListener("submit", validateForm);
}

if (emailInput) {
    emailInput.addEventListener("input", () => {
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errorEl = document.getElementById("emailError");

        if (!emailPattern.test(email)) {
            showError("emailError", "Enter valid email");
        } else {
            if (errorEl) errorEl.textContent = "";
            emailInput.classList.remove("error");
            emailInput.classList.add("success");
        }
    });
}

function changeText() {
    if (!welcomeText) return;

    if (welcomeText.textContent.includes("Welcome")) {
        welcomeText.textContent = "Thanks for visiting my portfolio.";
    } else {
        welcomeText.textContent = "Welcome to my Portfolio";
    }
    
}

function darkModeOn() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (darkMode) {
        darkMode.textContent = isDark ? "Light Mode" : "Dark Mode";
    }

    localStorage.setItem("darkMode", isDark);
}

// form validation
function validateForm(event) {
    event.preventDefault();

    let valid = true;

    clearErrors();    

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        showError("nameError", "Name is required");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("emailError", "Enter valid email");
        valid = false;
    }
    
    if (message.length < 10) {
        showError("messageError", "Message must be at least 10 characters");
        valid = false;
    }

    if (name !== "") {
        document.getElementById("name").classList.add("success");
    }
    if (emailPattern.test(email)) {
        document.getElementById("email").classList.add("success");
    }
    if (message.length >= 10) {
        document.getElementById("message").classList.add("success");
    }

    // success
    if (valid) {
        const formMessage = document.getElementById("formMessage");
        if (formMessage) {
            formMessage.textContent = "Message sent successfully!";
        }
        
        form.reset();
        document.querySelectorAll("input, textarea").forEach(el => {
            el.classList.remove("success");
        });
    }
}    


    // show error
    function showError(id, message) {
        const element = document.getElementById(id);

        if (element) {
             element.textContent = message;

             const input = element.previousElementSibling;
             if (input) {
                input.classList.add("error");
                input.classList.remove("success");
            }
        }
    }

// clear error
    function clearErrors() {
        document.querySelectorAll("p.error").forEach(el => {
            el.textContent = "";
    });

    document.querySelectorAll("input, textarea").forEach(el => {
        el.classList.remove("error", "success");
    });

    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
        formMessage.textContent = "";
    }
}



