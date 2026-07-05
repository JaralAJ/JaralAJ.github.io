const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const carouselSlides = Array.from(document.querySelectorAll(".carousel-slide"));
const carouselDots = Array.from(document.querySelectorAll(".carousel-dot"));
const carouselButtons = Array.from(
  document.querySelectorAll(".carousel-button"),
);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
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
}

if (carouselSlides.length > 0) {
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + carouselSlides.length) % carouselSlides.length;

    carouselSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  carouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction === "next" ? 1 : -1;
      showSlide(activeIndex + direction);
    });
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
    });
  });

  setInterval(() => {
    showSlide(activeIndex + 1);
  }, 5000);
}
