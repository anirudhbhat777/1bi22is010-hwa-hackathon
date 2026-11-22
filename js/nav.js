const HEADER_HTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo">sniffscape</a>
    <nav class="nav-links">
      <a href="index.html">Home</a>
      <a href="product.html">Product</a>
      <a href="shop.html">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="cart.html" class="cart-link">Cart <span class="cart-count" id="cart-count">0</span></a>
    </nav>
    <button class="mobile-menu-btn" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="product.html">Product</a>
    <a href="shop.html">Shop</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="cart.html">Cart <span class="cart-count" id="cart-count-mobile">0</span></a>
  </div>
</header>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="logo">sniffscape</a>
      <p>Enrichment landscapes for dogs. Calm, premium, science-led.</p>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="product.html">Sniffscape Infinity</a></li>
        <li><a href="shop.html">Refill Scent Kit</a></li>
        <li><a href="shop.html">Slow Feed Topper</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Support</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="cart.html">Cart</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Refund Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Sniffscape. All rights reserved.</span>
    <span>Designed for calm enrichment.</span>
  </div>
</footer>
`;

function injectShell() {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
}

function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const closeBtn = document.querySelector(".mobile-menu-close");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.add("open"));
  closeBtn.addEventListener("click", () => menu.classList.remove("open"));
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectShell();
  initMobileMenu();
  const badge = document.getElementById("cart-count");
  const badgeMobile = document.getElementById("cart-count-mobile");
  if (badge) badge.textContent = (() => {
    try {
      const cart = JSON.parse(localStorage.getItem("sniffscape_cart") || "[]");
      return cart.reduce((s, i) => s + (i.qty || 0), 0);
    } catch (e) { return 0; }
  })();
  if (badgeMobile) badgeMobile.textContent = badge.textContent;
});