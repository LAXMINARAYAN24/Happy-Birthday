// Card UI controller: toggle card, close on outside click or Escape, expose show/hide functions.
// Keep CODED_OPEN_AT here so countdown.js can pick it up.

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('toggleCard');
    const overlay = document.getElementById('cardOverlay');

    if (!btn || !overlay) return;

    function setState(show) {
      const visible = !!show;
      btn.setAttribute('aria-pressed', String(visible));
      btn.classList.toggle('open', visible);
      overlay.classList.toggle('hidden', !visible);
      overlay.classList.toggle('visible', visible);
      if (visible) {
        // focus the card element for keyboard users
        overlay.querySelector('greeting-card')?.focus?.();
      } else {
        btn.focus();
      }
    }

    btn.addEventListener('click', () => setState(overlay.classList.contains('hidden')));

    // close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) setState(false);
    });

    // close when clicking the dim/background (but not inside the card)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) setState(false);
    });

    // // edit this coded-open time as needed; countdown.js will use it if present
    // window.CODED_OPEN_AT = new Date('2025-10-29T15:48:00');
  });
})();

// Add body class when the card overlay becomes visible
(function () {
  const overlay = document.getElementById('cardOverlay');
  if (!overlay) return;

  const update = () => {
    const visible = !overlay.classList.contains('hidden') && overlay.offsetParent !== null;
    document.body.classList.toggle('card-open', visible);
  };

  // Observe class/style changes that toggle visibility
  const mo = new MutationObserver(update);
  mo.observe(overlay, { attributes: true, attributeFilter: ['class', 'style'] });

  // Run once on load
  update();

  // Also clear on Escape if your code closes the card
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('card-open');
  });
})();