// simple greeting-card web component (drop-in)
class GreetingCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const name = this.getAttribute('name') || '';
    const message = (this.getAttribute('message') || 'HAPPY BIRTHDAY').toUpperCase();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family: Verdana, Tahoma, sans-serif; }
        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.03));
          border-radius: 16px;
          padding: 28px;
          color: #fff3d9;
          box-shadow: 0 18px 50px rgba(0,0,0,0.6);
          transform-origin: center;
          animation: floatIn 360ms ease-out;
          position: relative;
          min-width: 320px;
        }
        .header { font-size: 18px; color: #ffdca8; margin: 0 0 6px 0; }
        .sub { font-size: 13px; margin: 0 0 18px 0; opacity:0.95; }
        .message {
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          align-items:flex-end;
          justify-content:center;
          padding-top:4px;
        }
        .letter {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
          min-width: 48px;
        }
        .oval {
          width:64px;height:64px;border-radius:50%;
          background: linear-gradient(180deg,#ffd24d,#ffb84d);
          display:flex;align-items:center;justify-content:center;
          color:#4b2a00;font-weight:800;font-size:24px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.25);
        }
        .string { width:2px;height:22px;background:linear-gradient(#ffd77a,#ffb86a); border-radius:1px; }
        @keyframes floatIn { from { transform: translateY(8px) scale(0.98); opacity:0 } to { transform: none; opacity:1 } }
        @media (max-width:520px) {
          .oval { width:46px;height:46px;font-size:16px }
          .letter { min-width: 36px }
        }
      </style>

      <div class="card" role="region" aria-label="Greeting card">
        <div>
          <div class="header">${this._escape(name)}</div>
          <div class="sub">Warm wishes to you</div>
        </div>
        <div class="message" aria-hidden="false">
          ${this._lettersHTML(message)}
        </div>
      </div>
    `;

    // Prevent clicks inside the card from closing an outer overlay
    const cardEl = this.shadowRoot.querySelector('.card');
    cardEl.addEventListener('click', (e) => e.stopPropagation());
  }

  _lettersHTML(msg) {
    return Array.from(msg).map(ch => {
      if (ch === ' ') {
        return `<div class="letter" aria-hidden="true"><div class="string" style="visibility:hidden"></div><div class="oval" style="background:transparent; box-shadow:none;"></div></div>`;
      }
      const safe = this._escape(ch);
      return `<div class="letter"><div class="string" aria-hidden="true"></div><div class="oval">${safe}</div></div>`;
    }).join('');
  }

  _escape(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
}

customElements.define('greeting-card', GreetingCard);