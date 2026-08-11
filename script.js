/* =============================================
   PRODESK IT — script.js
   Phase 1 + 2 + 3 (Tailwind Edition)
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
  navbar.classList.toggle('shadow-lg', window.scrollY > 20);
  updateActiveNavLink();
  toggleBackToTop();
}, { passive: true });

// ─── HAMBURGER MENU ───────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ─── DARK / LIGHT MODE TOGGLE (Tailwind class: 'dark') ────
const savedTheme = localStorage.getItem('prodesk-theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
  localStorage.setItem('prodesk-theme', isDark ? 'dark' : 'light');
});

// ─── ACTIVE NAV LINK ON SCROLL ────────────────────────────
function updateActiveNavLink() {
  let currentSection = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) currentSection = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + currentSection;
    link.classList.toggle('active', isActive);
    link.classList.toggle('text-primary', isActive);
    link.classList.toggle('bg-indigo-50', isActive);
    link.classList.toggle('dark:bg-indigo-900/30', isActive);
    if (!isActive) {
      link.classList.remove('text-primary', 'bg-indigo-50');
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

    if (!name || !email || !message) { showToast('Please fill in all fields.', 'error'); return; }
    if (!isValidEmail(email))        { showToast('Please enter a valid email address.', 'error'); return; }

    btnSend.disabled = true;
    btnSend.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';

    setTimeout(() => {
      showToast('Message sent! We will get back to you soon.', 'success');
      contactForm.reset();
      btnSend.disabled = false;
      btnSend.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }, 1800);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── TOAST NOTIFICATION ───────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notif');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notif';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}" aria-hidden="true"></i>
    <span>${message}</span>
  `;

  Object.assign(toast.style, {
    position:    'fixed',
    bottom:      '2rem',
    right:       '2rem',
    display:     'flex',
    alignItems:  'center',
    gap:         '0.6rem',
    padding:     '1rem 1.5rem',
    borderRadius:'12px',
    background:  type === 'success'
      ? 'linear-gradient(135deg, #10b981, #059669)'
      : 'linear-gradient(135deg, #ef4444, #dc2626)',
    color:       '#fff',
    fontSize:    '0.9rem',
    fontWeight:  '600',
    fontFamily:  "'Inter', sans-serif",
    boxShadow:   '0 8px 32px rgba(0,0,0,0.25)',
    zIndex:      '9999',
    transform:   'translateY(80px)',
    opacity:     '0',
    transition:  'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }));
  setTimeout(() => {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─── SCROLL-IN ANIMATIONS (IntersectionObserver) ──────────
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-hidden').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  observer.observe(el);
});

// ─── SMOOTH SCROLL OFFSET ─────────────────────────────────
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

// ─── BACK TO TOP BUTTON ───────────────────────────────────
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── ANIMATED COUNTER (Hero Stats) ───────────────────────
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el      = entry.target;
      const rawText = el.textContent.trim();
      const match   = rawText.match(/^([\d.]+)(.*)$/);
      if (match) animateCounter(el, parseFloat(match[1]), match[2]);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));
