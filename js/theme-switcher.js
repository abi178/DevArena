const welcomeText = document.getElementById("welcome-text");

const changeTextBtn = document.getElementById("changeTextBtn");

const darkModeToggle = document.getElementById("darkModeToggle");

const contactForm = document.getElementById("contactForm");

const emailInput = document.getElementById("email");



window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {

        document.body.classList.add("dark-mode");

        darkModeToggle.textContent = "Light Mode";
    }
});


// change welcome text 

changeTextBtn.addEventListener("click", () => {

    if (welcomeText.textContent.includes("Welcome")) {

        welcomeText.textContent =
            "Thanks for visiting my portfolio.";

    } else {

        welcomeText.textContent =
            "Welcome to my Portfolio";
    }
});


// dark mode 

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDarkMode =
        document.body.classList.contains("dark-mode");


    darkModeToggle.textContent =
        isDarkMode ? "Light Mode" : "Dark Mode";


    localStorage.setItem("darkMode", isDarkMode);
}


darkModeToggle.addEventListener("click", toggleDarkMode);


// strict email validation 

emailInput.addEventListener("input", () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(emailInput.value)) {

        showError("emailError", "Enter valid email");

    } else {

        clearField(emailInput, "emailError");

        emailInput.classList.add("success");
    }
});


// form validation 

contactForm.addEventListener("submit", validateForm);


function validateForm(event) {

    event.preventDefault();

    clearErrors();


    let valid = true;


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // name validation 

    if (name === "") {

        showError(
            "nameError",
            "Name is required"
        );

        valid = false;
    }


    // email validation 

    if (!emailPattern.test(email)) {

        showError(
            "emailError",
            "Enter valid email"
        );

        valid = false;
    }


    // message validation 

    if (message.length < 10) {

        showError(
            "messageError",
            "Message must be at least 10 characters"
        );

        valid = false;
    }


    // success 

    if (valid) {

        document.getElementById("formMessage").textContent =
            "Message sent successfully!";


        contactForm.reset();


        document
            .querySelectorAll("input, textarea")
            .forEach((field) => {

                field.classList.remove("success");
            });
    }
}

// show errors 

function showError(id, message) {

    const errorElement =
        document.getElementById(id);


    errorElement.textContent = message;


    const inputField =
        errorElement.previousElementSibling;


    inputField.classList.add("error");

    inputField.classList.remove("success");
}

// clear all errors 

function clearErrors() {

    document
        .querySelectorAll(".contact-form__error")
        .forEach((element) => {

            element.textContent = "";
        });


    document
        .querySelectorAll("input, textarea")
        .forEach((field) => {

            field.classList.remove(
                "error",
                "success"
            );
        });


    document.getElementById("formMessage").textContent = "";
}

// clear single field 

function clearField(field, errorId) {

    document.getElementById(errorId).textContent = "";

    field.classList.remove("error");
}