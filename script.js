/* =========================================================
   Ganesh Ram P S – Portfolio scripts
   Features: mobile menu, active nav, scroll reveal, counters,
   back-to-top, contact form validation.
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  const toggle = $('#navToggle');
  const menu = $('#navMenu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  // Close the menu after choosing a link, or when pressing Escape
  $$('.nav-link').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Navbar background, back-to-top ---------- */
  const navbar = $('#navbar');
  const toTop = $('#toTop');
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    toTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Active nav link (highlights the section in view) ---------- */
  const sections = $$('main section[id]');
  const links = $$('.nav-link');
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => {
            const active = l.getAttribute('href') === '#' + entry.target.id;
            l.classList.toggle('active', active);
            if (active) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navObserver.observe(s));

    /* ---------- Scroll reveal + stat counters ---------- */
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        $$('.num', entry.target).forEach(countUp);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 80 + 'ms'; // small stagger
      revealObserver.observe(el);
    });
  } else {
    $$('.reveal').forEach(el => el.classList.add('visible'));
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (isNaN(target)) return;
    const duration = 1200, start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  const rules = {
    name:    v => v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    subject: v => v.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters).',
    message: v => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  function validateField(input) {
    const msg = rules[input.name](input.value);
    const field = input.closest('.field');
    field.classList.toggle('invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $('.error', field).textContent = msg;
    return !msg;
  }

  $$('input, textarea', form).forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => { if (input.closest('.field').classList.contains('invalid')) validateField(input); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = '';
    const fields = $$('input, textarea', form);
    const results = fields.map(validateField);
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus();
      return;
    }
    /* A static site cannot send email. To enable real delivery, replace this block
       with a fetch() call to a form service (Formspree, Netlify Forms, EmailJS...).
       Until then we open the visitor's email app with the message pre-filled. */
    const data = Object.fromEntries(new FormData(form));
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    window.location.href = 'mailto:psganeshram029@gmail.com?subject=' +
      encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Thanks! Your email app should open with the message ready to send.';
    form.reset();
  });
})();
