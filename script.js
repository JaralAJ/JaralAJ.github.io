const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const carousels = Array.from(
  document.querySelectorAll(".about-carousel, .detail-carousel"),
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

carousels.forEach((carousel) => {
  const carouselSlides = Array.from(
    carousel.querySelectorAll(".carousel-slide"),
  );
  const carouselDots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const carouselButtons = Array.from(
    carousel.querySelectorAll(".carousel-button"),
  );
  const carouselCounter = carousel.querySelector(".carousel-counter");

  if (carouselSlides.length === 0) {
    return;
  }

  // Frame each photo over a blurred copy of itself so letterboxing isn't blank.
  if (carousel.hasAttribute("data-backdrop")) {
    carouselSlides.forEach((slide) => {
      const img = slide.querySelector(":scope > img");

      if (!img) {
        return;
      }

      const media = document.createElement("div");
      media.className = "carousel-media";
      media.style.setProperty("--slide-bg", `url("${img.src}")`);
      img.replaceWith(media);
      media.append(img);
    });
  }

  let activeIndex = Math.max(
    0,
    carouselSlides.findIndex((slide) => slide.classList.contains("is-active")),
  );

  const showSlide = (index) => {
    activeIndex = (index + carouselSlides.length) % carouselSlides.length;

    carouselSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });

    if (carouselCounter) {
      carouselCounter.textContent = `${activeIndex + 1} / ${carouselSlides.length}`;
    }
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

  showSlide(activeIndex);

  const shouldAutoplay = carousel.dataset.autoplay !== "false";

  if (shouldAutoplay && carouselSlides.length > 1) {
    setInterval(() => {
      showSlide(activeIndex + 1);
    }, 5000);
  }
});
