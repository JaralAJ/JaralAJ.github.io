const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
