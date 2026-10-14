document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => io.observe(el));

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const galleryImages = Array.from(document.querySelectorAll(".project-gallery img"));
  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    const lightboxFigure = document.createElement("figure");
    lightboxFigure.className = "lightbox-figure";

    const lightboxImage = document.createElement("img");
    lightboxImage.className = "lightbox-image";
    lightboxImage.alt = "";

    const lightboxCaption = document.createElement("figcaption");
    lightboxCaption.className = "lightbox-caption";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "lightbox-close";
    closeButton.setAttribute("aria-label", "Close image viewer");
    closeButton.textContent = "Close";

    const prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "lightbox-nav lightbox-prev";
    prevButton.setAttribute("aria-label", "Previous image");
    prevButton.textContent = "Prev";

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "lightbox-nav lightbox-next";
    nextButton.setAttribute("aria-label", "Next image");
    nextButton.textContent = "Next";

    lightboxFigure.appendChild(lightboxImage);
    lightboxFigure.appendChild(lightboxCaption);
    lightboxFigure.appendChild(prevButton);
    lightboxFigure.appendChild(nextButton);
    lightboxFigure.appendChild(closeButton);
    lightbox.appendChild(lightboxFigure);
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    const updateLightbox = (index) => {
      const total = galleryImages.length;
      currentIndex = (index + total) % total;
      const currentImage = galleryImages[currentIndex];
      lightboxImage.src = currentImage.src;
      lightboxImage.alt = currentImage.alt;
      lightboxCaption.textContent = currentImage.alt;
    };

    const openLightbox = (index) => {
      updateLightbox(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      nextButton.focus();
    };

    const showNext = () => {
      updateLightbox(currentIndex + 1);
    };

    const showPrevious = () => {
      updateLightbox(currentIndex - 1);
    };

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      lightboxImage.src = "";
      lightboxImage.alt = "";
      lightboxCaption.textContent = "";
    };

    galleryImages.forEach((img, index) => {
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Open image: ${img.alt}`);

      img.addEventListener("click", () => openLightbox(index));
      img.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(index);
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrevious);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.classList.contains("open")) {
        if (event.key === "Escape") {
          closeLightbox();
        }

        if (event.key === "ArrowRight") {
          showNext();
        }

        if (event.key === "ArrowLeft") {
          showPrevious();
        }
      }
    });
  }
});