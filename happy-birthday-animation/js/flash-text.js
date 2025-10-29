// arced SVG text updated to use a wider/lower arc for a large headline near top
(function () {
  const container = document.getElementById('flashText');
  if (!container) return;

  const existing = container.querySelector('.ft-text, span');
  const message = (existing && existing.textContent.trim()) || "It's Nov 2";

  // wider arc path so letters follow a large curve (adjust d for different curvature)
  container.innerHTML = `
    <svg viewBox="0 0 340 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="ft-grad" x1="0%" x2="100%">
          <stop offset="0%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-a') || '#ffd95a'}"/>
          <stop offset="50%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-b') || '#ff8a00'}"/>
          <stop offset="100%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-a') || '#ffd95a'}"/>
        </linearGradient>
        <!-- Wider arc (edit control points to change curve) -->
        <path id="ft-arc" d="M20,180 C90,40 250,40 320,180" fill="none"/>
      </defs>
      <g>
        <text class="ft-text" dominant-baseline="middle" text-anchor="middle" aria-hidden="true">
          <textPath href="#ft-arc" startOffset="50%" text-anchor="middle">${escapeHtml(message)}</textPath>
        </text>
      </g>
    </svg>
  `;

  const svg = container.querySelector('svg');
  const path = svg.querySelector('#ft-arc');

  const SPAWN_INTERVAL = 700;
  const PER_SPAWN = 4;

  function spawnSparkles() {
    if (!path.isConnected) return;
    const total = path.getTotalLength();
    const rect = svg.getBoundingClientRect();

    for (let i = 0; i < PER_SPAWN; i++) {
      const t = Math.random() * total;
      const pt = path.getPointAtLength(t);
      const left = rect.left + (pt.x / svg.viewBox.baseVal.width) * rect.width;
      const top = rect.top + (pt.y / svg.viewBox.baseVal.height) * rect.height;

      const s = document.createElement('span');
      s.className = 'ft-sparkle';
      s.style.left = `${left}px`;
      s.style.top = `${top}px`;
      s.style.animationDuration = `${700 + Math.random() * 600}ms`;
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove(), { once: true });
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!observer._timer) observer._timer = setInterval(spawnSparkles, SPAWN_INTERVAL);
      } else {
        if (observer._timer) { clearInterval(observer._timer); observer._timer = null; }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);

  // initial burst
  for (let i = 0; i < 8; i++) setTimeout(spawnSparkles, i * 70);

  function escapeHtml(s) { return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  window.addEventListener('resize', () => { /* future spawns use updated rect */ }, { passive: true });
})();

// small script to spawn tiny sparkles around the flashy text for a lively effect

(function () {
  const container = document.getElementById('flashText');
  if (!container) return;

  const textEl = container.querySelector('.ft-text');

  // spawn interval (ms)
  const SPAWN_INTERVAL = 700;
  // number of sparkles per spawn
  const PER_SPAWN = 3;

  function spawnSparkle() {
    const rect = textEl.getBoundingClientRect();
    for (let i = 0; i < PER_SPAWN; i++) {
      const s = document.createElement('span');
      s.className = 'ft-sparkle';
      // place within the text element bounds with slight random offset
      const rx = Math.random();
      const ry = Math.random();
      s.style.left = (rx * rect.width + 4) + 'px';
      s.style.top = (ry * rect.height - 6) + 'px';
      // slight variation in animation duration
      s.style.animationDuration = (700 + Math.random() * 500) + 'ms';
      textEl.appendChild(s);
      // cleanup
      s.addEventListener('animationend', () => s.remove(), { once: true });
    }
  }

  // only spawn when text is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        if (!observer._timer) observer._timer = setInterval(spawnSparkle, SPAWN_INTERVAL);
      } else {
        if (observer._timer) { clearInterval(observer._timer); observer._timer = null; }
      }
    });
  }, { threshold: 0.2 });

  observer.observe(textEl);

  // initial spawn for immediate feedback
  spawnSparkle();
})();