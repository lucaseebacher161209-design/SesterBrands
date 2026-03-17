# SESTER BRANDS v2 — Website
Raw Streetwear Aesthetic / SS25

## Dateistruktur

```
sester-brands-v2/
├── index.html          ← Alle 3 Seiten (Home, Clothes, Impressum)
├── css/
│   └── style.css       ← Komplettes Styling
├── js/
│   └── main.js         ← Navigation, Ticker, Produkte, Newsletter
├── images/             ← Erstelle diesen Ordner und lege Bilder rein
│   ├── hero-1.jpg
│   ├── hero-2.jpg
│   └── ...
└── README.md
```

## Starten in VS Code

1. Ordner öffnen: `Datei → Ordner öffnen → sester-brands-v2`
2. Extension **"Live Server"** installieren (Ritwick Dey)
3. Rechtsklick auf `index.html` → **"Open with Live Server"**
4. → Öffnet sich unter `http://127.0.0.1:5500`

## Bilder hinzufügen

### Hero-Bilder (rechte Seite der Startseite)
In `index.html` die Kommentare im `.hero-right`-Bereich ersetzen:
```html
<!-- Vorher (Platzhalter): -->
<div class="placeholder-shape"></div>

<!-- Nachher (echtes Bild): -->
<img src="images/hero-1.jpg" alt="Sester SS25" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.8;" />
```

### Lookbook-Hauptbild
```html
<!-- In .lb-main: -->
<img src="images/lookbook-main.jpg" class="lb-img" />
```

### Produktbilder (Drop-Karten & Clothes-Grid)
In `js/main.js` das `image`-Feld beim jeweiligen Produkt ergänzen:
```js
{ cat: 'jeans', name: 'SLIM 01', tag: 'Denim', price: '€ 89,00', image: 'images/slim-01.jpg' },
```

### Preise eintragen
Ebenfalls in `js/main.js`:
```js
{ cat: 'jeans', name: 'SLIM 01', tag: 'Denim', price: '€ 89,00' },
```

## Neue Produkte hinzufügen
In `js/main.js` → `products`-Array erweitern:
```js
const products = [
  { cat: 'jeans', name: 'SLIM 01', tag: 'Denim', price: '€ 89,00', image: 'images/slim-01.jpg' },
  { cat: 'jeans', name: 'SLIM 03', tag: 'Denim', price: '— €' },  // neues Produkt
];
```

Kategorien: `jeans` `hoodies` `zipper` `tshirts` `polos` `jackets` `caps`

## Ticker-Band anpassen
In `js/main.js` → `TICKER_WORDS`:
```js
const TICKER_WORDS = ['SESTER BRANDS', 'SS25', 'NEW DROP', 'COMING SOON', ...];
```

## Farben ändern
In `css/style.css`:
```css
:root {
  --ink:   #080808;   /* Hintergrund */
  --paper: #F2F0EB;   /* Text & Elemente */
  --red:   #E8000A;   /* Akzentfarbe (Rot) */
  --dim:   #666666;   /* Gedämpfter Text */
}
```

## Impressum anpassen
In `index.html` die Platzhalter ersetzen:
- `Musterstraße 1` → echte Adresse
- `12345 Musterstadt` → echte PLZ + Ort
- `info@sesterbrands.de` → echte E-Mail
- `+49 (0) 000 000 00 00` → echte Telefonnummer

## Newsletter Backend (optional)
In `js/main.js` → `submitNewsletter()` ist bereits vorbereitet:
```js
// Zeile am Ende der Funktion einkommentieren:
fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email })
});
```

---
© 2025 Sester Brands — Made in Germany
