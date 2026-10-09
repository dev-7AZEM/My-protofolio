const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("hazem-theme");
if (savedTheme === "light") body.classList.add("light");

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("hazem-theme", body.classList.contains("light") ? "light" : "dark");
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
});

document.querySelectorAll(".thumb").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    const main = card.querySelector(".project-main-img");
    main.src = btn.dataset.src;
    card.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
  });
});

function openModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(modal){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.open));
});
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if(e.target === modal) closeModal(modal);
  });
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape") document.querySelectorAll(".modal.show").forEach(closeModal);
});
document.getElementById("certificateBtn")?.addEventListener("click", () => openModal("certificateModal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("in-view");
  });
},{threshold:.12});
document.querySelectorAll(".section,.project-card,.glass-wide").forEach(el=>observer.observe(el));

const booklyGalleryImages = [
  "assets/bookly-home.png",
  "assets/bookly-browse.png",
  "assets/bookly-cart.png",
  "assets/bookly-quote.png"
];
let booklyGalleryIndex = 0;
const booklyModalImage = document.getElementById("booklyModalImage");
const booklyModal = document.getElementById("booklyModal");

function setBooklyGallery(index){
  booklyGalleryIndex = (index + booklyGalleryImages.length) % booklyGalleryImages.length;
  if(booklyModalImage) booklyModalImage.src = booklyGalleryImages[booklyGalleryIndex];
  document.querySelectorAll(".modal-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === booklyGalleryIndex);
  });
}

document.querySelectorAll(".modal-thumb").forEach((thumb, index) => {
  thumb.addEventListener("click", () => setBooklyGallery(index));
});
document.querySelector(".gallery-arrow.prev")?.addEventListener("click", () => setBooklyGallery(booklyGalleryIndex - 1));
document.querySelector(".gallery-arrow.next")?.addEventListener("click", () => setBooklyGallery(booklyGalleryIndex + 1));

booklyModal?.addEventListener("keydown", (e) => {
  if(e.key === "ArrowLeft") setBooklyGallery(booklyGalleryIndex - 1);
  if(e.key === "ArrowRight") setBooklyGallery(booklyGalleryIndex + 1);
});
