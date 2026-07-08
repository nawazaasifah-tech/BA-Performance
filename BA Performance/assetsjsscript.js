const menu = document.querySelector(".menu");
const links = document.querySelector(".links");

if (menu && links) {
  menu.addEventListener("click", () => links.classList.toggle("open"));
}

const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

function animateCounter(el) {
  const target = Number(el.dataset.count || "0");
  const suffix = el.dataset.suffix || "";
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / 1300, 1);
    el.textContent = Math.floor(target * progress) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const stats = document.querySelector(".stats");
let counted = false;

if (stats) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll("[data-count]").forEach(animateCounter);
    }
  }).observe(stats);
}

document.querySelectorAll(".faq button").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".faq").classList.toggle("open");
  });
});

const track = document.querySelector(".track");
const slides = document.querySelectorAll(".track .testimonial");
let slideIndex = 0;

function showSlide(index) {
  if (!track || !slides.length) return;
  slideIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

document.querySelector("[data-prev]")?.addEventListener("click", () => showSlide(slideIndex - 1));
document.querySelector("[data-next]")?.addEventListener("click", () => showSlide(slideIndex + 1));

if (slides.length) {
  setInterval(() => showSlide(slideIndex + 1), 6500);
}

const form = document.querySelector("[data-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let ok = true;

    form.querySelectorAll("[required]").forEach((field) => {
      const error = field.parentElement.nextElementSibling;

      if (!field.value.trim()) {
        ok = false;
        error.textContent = "Please complete this field.";
      } else {
        error.textContent = "";
      }
    });

    if (ok) {
      form.querySelector(".status").textContent =
        "Thanks. Your enquiry is ready to send once connected to email or a booking tool.";
      form.reset();
    }
  });
}