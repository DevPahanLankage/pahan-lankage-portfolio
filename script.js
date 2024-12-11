// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  // Wait for a minimum time to show loading animation
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    // Remove from DOM after transition
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500); // Show loading screen for 1.5 seconds minimum
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Form Handling
const form = document.querySelector("form");
const formMessage = document.createElement("div");
formMessage.className = "form-message";
document.body.appendChild(formMessage);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Basic validation
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 500);
      isValid = false;
    }
  });

  if (!isValid) {
    showMessage("Please fill in all required fields", "error");
    return;
  }

  // Form submission
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const data = await response.json();

    if (response.status === 200) {
      showMessage("Message sent successfully!", "success");
      form.reset();
    } else {
      showMessage("Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    showMessage("Failed to send message. Please try again.", "error");
  }
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;

  setTimeout(() => {
    formMessage.className = "form-message";
  }, 3000);
}

// Input validation styling
const inputs = document.querySelectorAll("input[required], textarea[required]");
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim()) {
      input.classList.add("valid");
    } else {
      input.classList.remove("valid");
    }
  });
});
