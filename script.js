let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
window.onload = function () {
  // Reset the form fields when the page loads
  document.getElementById("form").reset();
};
