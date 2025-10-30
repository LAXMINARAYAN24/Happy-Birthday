// Countdown controller (safe, guarded, non-intrusive).
// Only runs if the overlay + countdown elements exist. Does NOT auto-open greeting card.

(function () {
  // guard: DOM elements must exist
  const overlay = document.getElementById('countdownOverlay');
  const elems = {
    days: document.getElementById('ov-days'),
    hours: document.getElementById('ov-hours'),
    minutes: document.getElementById('ov-minutes'),
    seconds: document.getElementById('ov-seconds')
  };
  if (!overlay || !elems.days) return;

  // target: prefer CODED_OPEN_AT if provided by page, otherwise fallback
  const fallbackTarget = new Date('2025-10-30T21:46:00');
  const targetDate = (typeof CODED_OPEN_AT !== 'undefined' && CODED_OPEN_AT instanceof Date && !isNaN(CODED_OPEN_AT))
    ? CODED_OPEN_AT.getTime()
    : fallbackTarget.getTime();

  const completeMsg = document.getElementById('completionMessageOverlay');

  function fmt(n) { return String(n).padStart(2, '0'); }

  let timerId = null;
  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      // final state
      elems.days.textContent = '00';
      elems.hours.textContent = '00';
      elems.minutes.textContent = '00';
      elems.seconds.textContent = '00';
      if (completeMsg) completeMsg.style.display = 'block';

      // short delay so user sees final message then remove overlay
      setTimeout(() => {
        overlay.parentNode && overlay.parentNode.removeChild(overlay);
        // Do NOT auto-open the greeting card. User must interact to open it.
      }, 800);

      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      return;
    }

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    elems.days.textContent = fmt(days);
    elems.hours.textContent = fmt(hours);
    elems.minutes.textContent = fmt(minutes);
    elems.seconds.textContent = fmt(seconds);
  }

  // run once and then every second
  update();
  timerId = setInterval(update, 1000);

  // optional: clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (timerId) clearInterval(timerId);
  });
})();