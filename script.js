/* =============================================
   PRODESK IT — script.js
   Phase 1 + Phase 2 JavaScript Logic
   ============================================= */

// ─── DOM REFERENCES ───────────────────────────────────────
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const footerYear  = document.getElementById('footer-year');
const navLinks    = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

// ─── FOOTER YEAR ──────────────────────────────────────────
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ─── STICKY NAVBAR (scroll shadow) ────────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

// ─── HAMBURGER MENU ───────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ─── DARK / LIGHT MODE TOGGLE ─────────────────────────────
// Load saved preference
const savedTheme = localStorage.getItem('prodesk-theme');
if (savedTheme === 'dark') {
  document.body.classList.replace('light-mode', 'dark-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode', !isDark);

  if (isDark) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('prodesk-theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('prodesk-theme', 'light');
  }
});

// ─── ACTIVE NAV LINK ON SCROLL ────────────────────────────
function updateActiveNavLink() {
  let currentSection = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// ─── CONTACT FORM ─────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const btnSend = document.getElementById('btn-send');

    if (!name || !email || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending
    btnSend.disabled = true;
    btnSend.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      showToast('Message sent! We will get back to you soon.', 'success');
      contactForm.reset();
      btnSend.disabled = false;
      btnSend.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
    }, 1800);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── TOAST NOTIFICATION ───────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  // Inline styles for toast (self-contained)
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    background: type === 'success'
      ? 'linear-gradient(135deg, #10b981, #059669)'
      : 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    zIndex: '9999',
    transform: 'translateY(80px)',
    opacity: '0',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
  });

  // Animate out and remove
  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─── SCROLL-IN ANIMATIONS (IntersectionObserver) ──────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate on scroll
document.querySelectorAll('.service-card, .visual-card, .about-text, .contact-form').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  observer.observe(el);
});

// Add in-view CSS class support
const style = document.createElement('style');
style.textContent = `.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ─── SMOOTH SCROLL OFFSET (compensate for fixed navbar) ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});
