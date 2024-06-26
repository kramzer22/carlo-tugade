let currentSlide = 0;

const hamburgerMenu = document.getElementById("hamburger-menu");
const header = document.getElementById("header");
const navLinks = document.getElementById("nav-links");

document.addEventListener("DOMContentLoaded", function () {
  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Full screen nav indicator animation effect

  const marker = document.querySelector(".marker");
  const navItems = document.querySelectorAll(".nav-item");
  let selectedNav = navItems[0];

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log("wawawee");
      selectedNav = item;
      setMarker(e.target, marker);
    });

    item.addEventListener("mouseover", (e) => {
      setMarker(e.target, marker);
    });

    item.addEventListener("mouseout", () => {
      setMarker(selectedNav, marker);
    });
  });

  setMarker(selectedNav, marker);

  // Animation load or display on screen

  const animatedElements = document.querySelectorAll(
    ".appear, .appearBottom, .appearLeft, .appearRight"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Stop observing after the animation is triggered
      }
    });
  });

  animatedElements.forEach((element) => observer.observe(element));
});

// Function for nav indicator animation
const setMarker = (e, marker) => {
  marker.style.left = e.offsetLeft + "px";
  marker.style.width = e.offsetWidth + "px";
};

document.addEventListener("scroll", function () {
  if (window.scrollY > 5) {
    header.style.opacity = 0.95;
  } else {
    header.style.opacity = 1;
  }

  if (navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
  }
});

// Set an interval to move the slide every 4 seconds (4000 milliseconds)
const slideInterval = setInterval(() => {
  moveSlide(1); // Move to the next slide
}, 4000);

function moveSlide(n) {
  const items = document.querySelectorAll(".carousel-item");
  const totalSlides = items.length;

  const width = window.innerWidth;

  if (width < 1025) {
    // Calculate the new slide index
    currentSlide = (currentSlide + n + totalSlides) % totalSlides;

    // Move the carousel
    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}
