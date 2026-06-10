/* ================================================================
   RAVI PORTFOLIO — script.js
   Features: typing animation, scroll reveal, active nav, dark/light
   mode toggle, skill bar animation, form validation, back-to-top.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   UTILITY
   ---------------------------------------------------------------- */

/** Shorthand querySelector */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ----------------------------------------------------------------
   1. DARK / LIGHT MODE TOGGLE
   ---------------------------------------------------------------- */
const themeToggle = $('#themeToggle');
const themeIcon   = $('#themeIcon');

// Persist preference in localStorage
const savedTheme = localStorage.getItem('ravi-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ravi-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/* ----------------------------------------------------------------
   2. MOBILE HAMBURGER MENU
   ---------------------------------------------------------------- */
const hamburger = $('#hamburger');
const navLinks  = $('#navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a nav link is clicked
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ----------------------------------------------------------------
   3. STICKY NAVBAR — add .scrolled shadow after scrolling 20px
   ---------------------------------------------------------------- */
const navbar = $('#navbar');

function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ----------------------------------------------------------------
   4. ACTIVE NAVIGATION HIGHLIGHTING
   Uses IntersectionObserver on each section to know which is in view.
   ---------------------------------------------------------------- */
const navLinkItems = $$('.nav-link');
const sections = $$('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach(sec => sectionObserver.observe(sec));

/* ----------------------------------------------------------------
   5. SCROLL REVEAL ANIMATION
   Adds .visible when element enters viewport.
   ---------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

$$('.reveal').forEach(el => revealObserver.observe(el));

/* ----------------------------------------------------------------
   6. SKILL BAR ANIMATION
   Triggers when the skill bar enters the viewport.
   ---------------------------------------------------------------- */
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          // --w is set as an inline CSS variable, apply it to actual width
          fill.style.width = fill.style.getPropertyValue('--w') || '0%';
        }
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

$$('.skill-bar').forEach(bar => skillBarObserver.observe(bar));

/* ----------------------------------------------------------------
   7. TYPING ANIMATION (Hero tagline)
   Cycles through an array of phrases with a type-then-erase loop.
   ---------------------------------------------------------------- */
const phrases = [
  'Aspiring Cloud Engineer',
  'Data Analytics Enthusiast',
  'AWS Explorer',
  'Python Developer',
  'Power BI Storyteller',
  'Freelance Problem Solver',
];

const typingEl = $('#typingText');
let phraseIdx   = 0;
let charIdx     = 0;
let isDeleting  = false;
let typingTimer = null;

function type() {
  const phrase = phrases[phraseIdx];

  if (isDeleting) {
    charIdx--;
    typingEl.textContent = phrase.slice(0, charIdx);
  } else {
    charIdx++;
    typingEl.textContent = phrase.slice(0, charIdx);
  }

  let speed = isDeleting ? 55 : 90;

  if (!isDeleting && charIdx === phrase.length) {
    // Finished typing — pause then start deleting
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // Finished deleting — move to next phrase
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    speed = 350;
  }

  typingTimer = setTimeout(type, speed);
}

// Start typing after a short delay
setTimeout(type, 800);

// Stop typing if page is hidden (save CPU)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(typingTimer);
  } else {
    type();
  }
});

/* ----------------------------------------------------------------
   8. BACK-TO-TOP BUTTON
   ---------------------------------------------------------------- */
const backToTopBtn = $('#backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ----------------------------------------------------------------
   9. CONTACT FORM — CLIENT-SIDE VALIDATION
   A static site can't send email server-side.
   Replace the submit handler body with your preferred service
   (Formspree, EmailJS, Netlify Forms, etc.).
   ---------------------------------------------------------------- */
const contactForm  = $('#contactForm');
const formSuccess  = $('#formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormErrors();

    const name    = $('#nameInput').value.trim();
    const email   = $('#emailInput').value.trim();
    const message = $('#messageInput').value.trim();
    let valid = true;

    if (!name) {
      showError('nameInput', 'Please enter your name.');
      valid = false;
    }
    if (!email || !isValidEmail(email)) {
      showError('emailInput', 'Please enter a valid email address.');
      valid = false;
    }
    if (!message) {
      showError('messageInput', 'Please write a message.');
      valid = false;
    }

    if (!valid) return;

    // --------------------------------------------------------
    // OPTION A — Formspree (replace ACTION_URL with yours)
    // Uncomment and update to enable:
    //
    // try {
    //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Accept': 'application/json' },
    //     body: new FormData(contactForm),
    //   });
    //   if (res.ok) {
    //     contactForm.reset();
    //     showSuccessMessage('Thanks! I\'ll get back to you soon. 🎉');
    //   } else {
    //     showSuccessMessage('Something went wrong. Please try again.');
    //   }
    // } catch {
    //   showSuccessMessage('Network error — please email me directly.');
    // }
    //
    // OPTION B — Mailto fallback (works without a backend):
    // --------------------------------------------------------
    const subject = encodeURIComponent($('#subjectInput').value.trim() || 'Portfolio Contact');
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:ravi@example.com?subject=${subject}&body=${body}`;
    showSuccessMessage('Opening your mail client... 🚀 Talk soon!');
    contactForm.reset();
  });
}

function showError(inputId, msg) {
  const input = $(`#${inputId}`);
  const error = input.nextElementSibling;
  input.classList.add('error');
  if (error && error.classList.contains('form-error')) error.textContent = msg;
}

function clearFormErrors() {
  $$('.form-group input, .form-group textarea').forEach(el => {
    el.classList.remove('error');
  });
  $$('.form-error').forEach(el => (el.textContent = ''));
  formSuccess.textContent = '';
}

function showSuccessMessage(msg) {
  formSuccess.textContent = msg;
  setTimeout(() => (formSuccess.textContent = ''), 6000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ----------------------------------------------------------------
   10. SET FOOTER COPYRIGHT YEAR DYNAMICALLY
   ---------------------------------------------------------------- */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ----------------------------------------------------------------
   11. SMOOTH SCROLL POLYFILL for older browsers (Safari <15.4)
   ---------------------------------------------------------------- */
if (!('scrollBehavior' in document.documentElement.style)) {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
