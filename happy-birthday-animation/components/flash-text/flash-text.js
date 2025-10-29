(function (global) {
  function mountFlashText(target, options = {}) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return null;

    const existing = el.querySelector('.ft-text, span');
    const raw = options.message ?? (existing && existing.textContent.trim()) ?? "It's Nov 2";
    const message = options.uppercase === false ? raw : String(raw).toUpperCase();

    el.classList.add('flash-text');

    el.innerHTML = `
      <svg viewBox="0 0 340 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="ft-grad" x1="0%" x2="100%">
            <stop offset="0%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-a') || '#ffd95a'}"/>
            <stop offset="50%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-b') || '#ff8a00'}"/>
            <stop offset="100%" stop-color="${getComputedStyle(document.documentElement).getPropertyValue('--ft-color-a') || '#ffd95a'}"/>
          </linearGradient>
          <path id="ft-arc" d="M20,180 C90,40 250,40 320,180" fill="none"/>
        </defs>
        <g>
          <text class="ft-text" dominant-baseline="middle" text-anchor="middle">
            <textPath href="#ft-arc" startOffset="50%" text-anchor="middle">${escapeHtml(message)}</textPath>
          </text>
        </g>
      </svg>
    `;

    const svg = el.querySelector('svg');
    const path = svg.querySelector('#ft-arc');
    const SPAWN_INTERVAL = options.sparkleInterval ?? 700;
    const PER_SPAWN = options.sparklesPerTick ?? 4;

    function spawnSparkles() {
      if (!path.isConnected) return;
      const total = path.getTotalLength();
      const rect = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;

      for (let i = 0; i < PER_SPAWN; i++) {
        const t = Math.random() * total;
        const pt = path.getPointAtLength(t);
        const left = rect.left + (pt.x / vb.width) * rect.width;
        const top  = rect.top  + (pt.y / vb.height) * rect.height;

        const s = document.createElement('span');
        s.className = 'ft-sparkle';
        s.style.left = `${left}px`;
        s.style.top  = `${top}px`;
        s.style.position = 'fixed';
        s.style.animationDuration = `${700 + Math.random() * 600}ms`;
        document.body.appendChild(s);
        s.addEventListener('animationend', () => s.remove(), { once: true });
      }
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!io._timer) io._timer = setInterval(spawnSparkles, SPAWN_INTERVAL);
        } else {
          if (io._timer) { clearInterval(io._timer); io._timer = null; }
        }
      });
    }, { threshold: 0.05 });
    io.observe(el);

    // initial burst
    for (let i = 0; i < 8; i++) setTimeout(spawnSparkles, i * 70);

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    return {
      setMessage(newMsg) {
        const tp = el.querySelector('textPath');
        if (tp) tp.textContent = String(newMsg);
      }
    };
  }

  // auto-mount: [data-flash-text] or #flashText
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-flash-text], #flashText').forEach(node => {
      const msg = node.getAttribute('data-message');
      mountFlashText(node, { message: msg });
    });
  });

  global.mountFlashText = mountFlashText;
})(window);