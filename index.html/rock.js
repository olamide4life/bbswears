// NAVIGATION MENU TOGGLE
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});
     // DARK AND LIGHT MODAL
const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// SMOOTH SCROLL
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

// MODAL SLIDER (WITH BACK ARROW CLOSE)
let currentIndex = 0;
let activeSlides = [];

const modal = document.querySelector(".modal");
const slider = document.querySelector(".modal-slider");
const dotsContainer = document.querySelector(".modal-dots");
let isTransitioning = false;

// OPEN MODAL WITH ARRAY
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
        
      

        // dots
        let dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    modal.classList.add("active");
    updateSlidePosition();

    setModalTheme(currentTheme);
modal.classList.add("active");

}

// MOVE SLIDER
function updateSlidePosition() {
    slider.style.transition = "transform 0.4s ease";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // dot update
    [...dotsContainer.children].forEach((d, i) => {
        d.classList.toggle("active", i === currentIndex);
    });

    // fade animation
    slider.classList.remove("fade-anim");
    void slider.offsetWidth; 
    slider.classList.add("fade-anim");
}

// Next
function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex + 1) % activeSlides.length;
    updateSlidePosition();

    setTimeout(() => isTransitioning = false, 450);
}

// Prev
function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
    updateSlidePosition();

    setTimeout(() => isTransitioning = false, 450);
}

// Go to dot slide
function goToSlide(i) {
    currentIndex = i;
    updateSlidePosition();
}

// Close modal
function closeModal() {
    modal.classList.remove("active");

    // stop all videos
    document.querySelectorAll("video").forEach(v => v.pause());
}

// Swipe support
let startX = 0;
slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
slider.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
});




// Close modal on ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// CONTACT FORM SUBMIT ANIMATION
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

// Animate collection cards when they enter the viewport (mobile & desktop)
document.addEventListener("DOMContentLoaded", () => {
  try {
    const cards = document.querySelectorAll(".collection-card");
    if (!cards || cards.length === 0) return; // nothing to do

    // If browser doesn't support IntersectionObserver, reveal all cards
    if (!("IntersectionObserver" in window)) {
      cards.forEach(card => {
        // add data-anim class if present so CSS animation can pick it up
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
          // add the data-anim classname (optional) so CSS rules like
          // .collection-card.visible[data-anim="fade-right"] {...} will run
          const anim = el.dataset.anim;
          if (anim) el.classList.add(anim);

          // then add visible to trigger the animation
          el.classList.add("visible");

          // stop observing this element — one-time animation
          obs.unobserve(el);
        }
      });
    }, {
      threshold: 0.18
    });

    // observe each card, but guard against any runtime errors per-card
    cards.forEach(card => {
      try { observer.observe(card); } catch (err) { /* ignore individual observe failures */ }
    });

  } catch (e) {
    // final fallback: reveal everything if something unexpected happens
    const fallbackCards = document.querySelectorAll(".collection-card");
    fallbackCards.forEach(card => {
      const anim = card.dataset.anim;
      if (anim) card.classList.add(anim);
      card.classList.add("visible");
    });
    console.warn("Collection card observer failed; cards revealed as fallback.", e);
  }
});

let activeGlow = null;
let glowTimeout = null;

document.querySelectorAll(".collection-card").forEach(card => {
    card.addEventListener("click", () => {

        // Stop glow on previous card
        if (activeGlow && activeGlow !== card) {
            activeGlow.classList.remove("glow");
            clearTimeout(glowTimeout);
        }

        // Apply new glow
        card.classList.add("glow");
        activeGlow = card;

        // Remove glow after 5 seconds
        glowTimeout = setTimeout(() => {
            card.classList.remove("glow");
            activeGlow = null;
        }, 5000);
    });
});


let currentTheme = "dark"; // default theme

function setModalTheme(mode) {
    modal.classList.remove("light", "dark");
    modal.classList.add(mode);

    // Update icon
    document.getElementById("themeIcon").textContent = 
        mode === "dark" ? "🌙" : "☀️";
}

function toggleModalTheme() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    setModalTheme(currentTheme);
}

