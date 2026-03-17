/* ============================================
   SESTER BRANDS v2 — main.js
   ============================================ */

/* ============================================
   PRODUCT DATA
   Füge hier neue Produkte hinzu.
   cat: Kategorie-Slug (jeans | hoodies | zipper | tshirts | polos | jackets | caps)
   name: Anzeigename auf der Karte
   tag: Kategorie-Label (klein, oben auf der Karte)
   price: Preis als String, z.B. "€ 89,00" — solange noch nicht festgelegt: "— €"
   image: Pfad zum Produktbild, z.B. "images/slim-01.jpg" — weglassen = Platzhalter
   ============================================ */
const products = [
  { cat: 'jeans', name: 'Baggy', tag: 'Outerwear', price: '— €', image: 'images/jeans.jpg' },
  { cat: 'jeans', name: 'Slim Fit', tag: 'Outerwear', price: '— €', image: 'images/jeans1.jpg' },
  { cat: 'hoodies', name: 'Oversize', tag: 'Outerwear', price: '— €', image: 'images/hoodie1.jpg' },
  { cat: 'hoodies', name: 'Oversize', tag: 'Outerwear', price: '— €', image: 'images/hoodie.jpg' },
  { cat: 'zipper', name: 'ZIPPER', tag: 'Outerwear', price: '— €', image: 'images/zipper.jpg' },
  { cat: 'zipper', name: 'ZIPPER', tag: 'Outerwear', price: '— €', image: 'images/zipper1.jpg' },
  { cat: 'tshirts', name: 'OVERSIZED', tag: 'Outerwear', price: '— €', image: 'images/tshirt1.jpg' },
  { cat: 'tshirts', name: 'OVERSIZED', tag: 'Outerwear', price: '— €', image: 'images/tshirt.jpg' },
  { cat: 'polos', name: 'FIT', tag: 'Outerwear', price: '— €', image: 'images/polo.jpg' },
  { cat: 'polos', name: 'FIT', tag: 'Outerwear', price: '— €', image: 'images/polo1.jpg' },
  { cat: 'jackets', name: 'Wide', tag: 'Outerwear', price: '— €', image: 'images/jacket.jpg' },
  { cat: 'caps', name: 'MEDIUM', tag: 'Outerwear', price: '— €', image: 'images/cap.jpg' },
];

/* ============================================
   TICKER — rotes Band oben
   ============================================ */
const TICKER_WORDS = [
  'SESTER BRANDS', 'SS25', 'NEW DROP', 'COMING SOON',
  'STREETWEAR', 'MADE IN DE', 'LIMITED', 'AUTHENTIC'
];

function buildTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  // Dupliziere Inhalt für nahtlose Schleife
  const inner = Array(4).fill(null).map(() =>
    TICKER_WORDS.map(t => `
      <div class="ticker-item">
        <span class="ticker-dot"></span>${t}
      </div>
    `).join('')
  ).join('');
  el.innerHTML = inner;
}

/* ============================================
   MARQUEE — Texttrenner zwischen Hero und Drop
   ============================================ */
const MARQUEE_WORDS = ['SESTER', 'BRANDS', 'SS25', 'DROP', 'AUTHENTIC', 'STREET', 'RAW', 'REAL'];

function buildMarquee() {
  const el = document.getElementById('marquee');
  if (!el) return;
  el.innerHTML = Array(3).fill(null).map(() =>
    MARQUEE_WORDS.map((w, i) =>
      `<div class="marquee-word${i % 3 === 1 ? ' accent' : ''}">${w}</div>`
    ).join('')
  ).join('');
}

/* ============================================
   PRODUCT GRID
   ============================================ */

// SVG Platzhalter (wird ausgeblendet wenn echtes Bild vorhanden)
const PLACEHOLDER_SVG = `
  <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="40" height="56" rx="1" stroke="white" stroke-width="1"/>
    <path d="M4 18L14 8L24 14L34 8L44 18" stroke="white" stroke-width="1" fill="none"/>
  </svg>
`;

function renderGrid(filter) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const items = filter === 'all'
    ? products
    : products.filter(p => p.cat === filter);

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        padding: 4rem 2rem;
        text-align: center;
        color: #333;
        font-size: .7rem;
        letter-spacing: .2em;
        text-transform: uppercase;
        font-weight: 500;
      ">
        Keine Produkte in dieser Kategorie
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="product-card">
      ${p.image
        ? `<img src="${p.image}" alt="${p.name}" class="pc-img" />`
        : `<div class="pc-bg">${PLACEHOLDER_SVG}</div>`
      }
      <p class="pc-tag">${p.tag}</p>
      <p class="pc-name">${p.name}</p>
      <p class="pc-status">Coming Soon</p>
    </div>
  `).join('');
}

/* ============================================
   CATEGORY FILTER
   ============================================ */
function filterCat(el, cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  renderGrid(cat);
}

/* ============================================
   PAGE NAVIGATION
   ============================================ */
function showPage(id, linkEl) {
  // Alle Seiten ausblenden
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Zielseite einblenden
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  // Nav-Link aktiv setzen
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  // Nach oben scrollen
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Clothes-Grid rendern
  if (id === 'clothes') renderGrid('jeans');
}

/* ============================================
   NEWSLETTER
   ============================================ */
function submitNewsletter() {
  const nameEl  = document.getElementById('nl-name');
  const emailEl = document.getElementById('nl-email');
  const msgEl   = document.getElementById('nl-msg');

  const name  = nameEl.value.trim();
  const email = emailEl.value.trim();

  if (!name || !email) {
    msgEl.style.color = '#E8000A';
    msgEl.textContent = 'Bitte beide Felder ausfüllen.';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    msgEl.style.color = '#E8000A';
    msgEl.textContent = 'Ungültige E-Mail-Adresse.';
    return;
  }

  // Erfolg
  msgEl.style.color = '#555';
  msgEl.textContent = `Danke ${name} — du bist dabei. Wir melden uns beim nächsten Drop.`;
  nameEl.value  = '';
  emailEl.value = '';

  // Hier kannst du später einen echten API-Call einfügen, z.B.:
  // fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ name, email }) })
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  buildMarquee();
  renderGrid('jeans'); // Clothes-Grid vorrendern
});
