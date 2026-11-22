# Sniffscape Infinity

Premium e-commerce website for Sniffscape Infinity — a long-session foraging landscape for dogs.

## Stack
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (no build step, no npm, no React)
- localStorage cart persistence

## How to open the site

Open any HTML file directly in your browser:

- `index.html` — Home page
- `product.html` — Sniffscape Infinity product page
- `shop.html` — Shop / all products
- `about.html` — About page
- `contact.html` — Contact page
- `cart.html` — Shopping cart (persists in localStorage)
- `checkout.html` — Checkout

No server required. All files work as static files.

## Product catalog

| ID | Name | Price |
|---|---|---|
| sniffscape-infinity | Sniffscape Infinity | $149 |
| refill-kit | Refill Scent Kit | $29 |
| topper | Slow Feed Topper | $19 |

## Images

Image paths:
- `images/hero.jpg`
- `images/refill.jpg`
- `images/topper.jpg`

If an image is missing, a tasteful sage placeholder block is shown instead of a broken icon.

## Cart

The cart persists in `localStorage` under the key `sniffscape_cart`. Add, remove, and update quantities work across all pages.

## Deploy

Deployed on Vercel at: https://1bi22is010-hwa-hackathon.vercel.app