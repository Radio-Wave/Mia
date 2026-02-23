const imageItems = Array.from(document.querySelectorAll(".image-container .image-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.getElementById("lightbox-close");
const prevButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");
let currentIndex = 0;

function getCaptionText(figure) {
  const caption = figure.querySelector("figcaption");
  return caption ? caption.textContent.trim() : "";
}

function renderImage(index) {
  const figure = imageItems[index];
  const img = figure.querySelector("img");
  const captionText = getCaptionText(figure);

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || "";
  lightboxCaption.textContent = captionText;
  lightboxCaption.style.display = captionText ? "block" : "none";
}

function openLightbox(index) {
  currentIndex = index;
  renderImage(currentIndex);
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext() {
  currentIndex = (currentIndex + 1) % imageItems.length;
  renderImage(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imageItems.length) % imageItems.length;
  renderImage(currentIndex);
}

imageItems.forEach((figure, index) => {
  const img = figure.querySelector("img");
  if (!img) return;
  img.addEventListener("click", () => openLightbox(index));
});

closeButton.addEventListener("click", closeLightbox);
nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrev);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});
