// NAVIGATION MENU TOGGLE
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ===============================
// DARK / LIGHT MODE (GLOBAL + MODAL)
// ===============================

// your toggle button element
const toggleBtn = document.querySelector(".theme-toggle");
const themeIcon = document.getElementById("themeIcon");

// default theme
let currentTheme = "light";

// apply theme to body + modal
function applyTheme(mode) {
    document.body.classList.add("fade-theme"); // smooth fade

    if (mode === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.textContent = "☀️"; // sun
    } else {
        document.body.classList.remove("dark-mode");
        themeIcon.textContent = "🌙"; // moon
    }

    // remove fade after animation
    setTimeout(() => {
        document.body.classList.remove("fade-theme");
    }, 400);
}

// toggle theme when clicking button
toggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
});

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// SECTION TITLE ANIMATION
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);
document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

// TESTIMONIAL SLIDER
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ===============================
// MODAL SLIDER (WITH VIDEO SUPPORT)
// ===============================
let currentIndex = 0;
let activeSlides = [];

const modal = document.querySelector(".modal");
const slider = document.querySelector(".modal-slider");
const dotsContainer = document.querySelector(".modal-dots");
let isTransitioning = false;

// OPEN MODAL
function openModal(slides) {
    activeSlides = slides;
    currentIndex = 0;

    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    slides.forEach((src, i) => {
        let ext = src.split(".").pop().toLowerCase();

        let wrapper = document.createElement("div");
        wrapper.style.minWidth = "100%";
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";

        if (["mp4", "mov", "webm"].includes(ext)) {
            let vid = document.createElement("video");
            vid.src = src;
            vid.controls = true;
            vid.style.width = "100%";
            vid.style.maxHeight = "90vh";
            wrapper.appendChild(vid);
        } else {
            let img = document.createElement("img");
            img.src = src;
            wrapper.appendChild(img);
        }

        slider.appendChild(wrapper);

        // dot
        let dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    modal.classList.add("active");
    updateSlidePosition();

    // ensure modal uses same theme as site
    applyTheme(currentTheme);
}

// SLIDER MOVEMENT
function updateSlidePosition() {
    slider.style.transition = "transform 0.4s ease";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    [...dotsContainer.children].forEach((d, i) => {
        d.classList.toggle("active", i === currentIndex);
    });

    slider.classList.remove("fade-anim");
    void slider.offsetWidth;
    slider.classList.add("fade-anim");
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex + 1) % activeSlides.length;
    updateSlidePosition();

    setTimeout(() => isTransitioning = false, 450);
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
    updateSlidePosition();

    setTimeout(() => isTransitioning = false, 450);
}

function goToSlide(i) {
    currentIndex = i;
    updateSlidePosition();
}

// Close modal
function closeModal() {
    modal.classList.remove("active");

    document.querySelectorAll("video").forEach(v => v.pause());
}

// Swipe
let startX = 0;
slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
slider.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
});

// ESC close
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// CONTACT FORM ANIMATION
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.style.background = '#D4AF37';

    setTimeout(() => {
        btn.textContent = 'Message Sent! ✓';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            e.target.reset();
        }, 2000);
    }, 1500);
}

// NAV SCROLL EFFECT
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        nav.style.padding = '1rem 5%';
        nav.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
    lastScroll = currentScroll;
});

// HERO PARALLAX
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// GALLERY HOVER EFFECT
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// COLLECTION CARD ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  try {
    const cards = document.querySelectorAll(".collection-card");
    if (!cards || cards.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(card => {
        const anim = card.dataset.anim;
        if (anim) card.classList.add(anim);
        card.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const anim = el.dataset.anim;
          if (anim) el.classList.add(anim);
          el.classList.add("visible");
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    cards.forEach(card => {
      try { observer.observe(card); } catch (err) {}
    });

  } catch (e) {
    const fallbackCards = document.querySelectorAll(".collection-card");
    fallbackCards.forEach(card => {
      const anim = card.dataset.anim;
      if (anim) card.classList.add(anim);
      card.classList.add("visible");
    });
    console.warn("Collection card observer failed; cards revealed as fallback.", e);
  }
});

// GLOW EFFECT
let activeGlow = null;
let glowTimeout = null;

document.querySelectorAll(".collection-card").forEach(card => {
    card.addEventListener("click", () => {

        if (activeGlow && activeGlow !== card) {
            activeGlow.classList.remove("glow");
            clearTimeout(glowTimeout);
        }

        card.classList.add("glow");
        activeGlow = card;

        glowTimeout = setTimeout(() => {
            card.classList.remove("glow");
            activeGlow = null;
        }, 5000);
    });
});
