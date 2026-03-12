/* ═══════════════════════════════════════════════════════
   ORQUÍDEA TÉS — Interactions
   Vanilla JS • No dependencies
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll-triggered reveal ──────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  let delay = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings with a small delay
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll(':scope > .reveal'))
            : [];
          const index = siblings.indexOf(entry.target);

          entry.target.style.transitionDelay = `${Math.max(0, index) * 0.1}s`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));

  // ── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Nav background opacity on scroll ─────────────────
  const nav = document.getElementById('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          nav.style.background = 'rgba(43, 74, 66, 0.97)';
        } else {
          nav.style.background = 'rgba(43, 74, 66, 0.92)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();
