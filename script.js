/* ================================================================
   AI Briefing — Theme Toggle & Interactions
   No localStorage/sessionStorage used.
   ================================================================ */

(function () {
  'use strict';

  // ---- Theme Toggle ----
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = 'dark';

  // Set initial theme
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      toggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    if (currentTheme === 'dark') {
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    } else {
      toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  // ---- Intersection Observer for fade-in animations ----
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll(
      '.summary-card, .deal-card, .stat-card, .top3-card, .regulation-block, .insight-callout, .empty-state'
    );

    // Reset initial state — pause animation until visible
    animatedElements.forEach(function (el) {
      el.style.animationPlayState = 'paused';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
