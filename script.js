const totalImages = 10;
let currentIndex = 1;
let audioStarted = false;

const slideImg = document.getElementById("activeSlide");
const container = document.getElementById("slideContainer");
const bgSong = document.getElementById("bgSong");
const overlay = document.getElementById("startOverlay");

// Preload remaining images
for (let i = 2; i <= totalImages; i++) {
  const preloadImg = new Image();
  preloadImg.src = `images/${i}.jpg`;
}

// Attempt immediate autoplay on load (works on unmuted browsers/devices that allow it)
window.addEventListener("DOMContentLoaded", () => {
  bgSong.play().then(() => {
    // If browser allowed autoplay without click, hide overlay right away
    audioStarted = true;
    overlay.classList.add("hidden");
  }).catch(() => {
    // Expected on mobile & Chrome: overlay remains visible waiting for the 1st tap
  });
});

// Triggered when entering via overlay
overlay.addEventListener("click", () => {
  if (!audioStarted) {
    bgSong.play().catch(() => {});
    audioStarted = true;
  }
  overlay.classList.add("hidden");
});

// Advance slides on subsequent taps
container.addEventListener("click", () => {
  // Ensure audio plays if it hasn't yet
  if (!audioStarted) {
    bgSong.play().catch(() => {});
    audioStarted = true;
  }

  slideImg.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = currentIndex < totalImages ? currentIndex + 1 : 1;
    slideImg.src = `images/${currentIndex}.jpg`;

    slideImg.onload = () => {
      slideImg.classList.remove("fade-out");
    };
  }, 450);
});