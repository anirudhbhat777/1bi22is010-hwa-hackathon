const CATALOG = [
  {
    id: "sniffscape-infinity",
    name: "Sniffscape Infinity",
    price: 149,
    image: "images/hero.jpg",
    description: "A new long-session foraging landscape that keeps a dog engaged for hours while owners are away."
  },
  {
    id: "refill-kit",
    name: "Refill Scent Kit",
    price: 29,
    image: "images/refill.jpg",
    description: "Replacement scent kit for Sniffscape Infinity."
  },
  {
    id: "topper",
    name: "Slow Feed Topper",
    price: 19,
    image: "images/topper.jpg",
    description: "Slow-feed topper to extend foraging time."
  }
];

const CART_KEY = "sniffscape_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  dispatchCartEvent();
}

function findItem(cart, id) {
  return cart.findIndex(i => i.id === id);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const idx = findItem(cart, id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    const product = CATALOG.find(p => p.id === id);
    if (product) {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    }
  }
  saveCart(cart);
  showToast("Added to cart");
  return cart;
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  showToast("Removed from cart");
  return cart;
}

function updateQty(id, qty) {
  const cart = getCart();
  const idx = findItem(cart, id);
  if (idx >= 0) {
    if (qty <= 0) {
      return removeFromCart(id);
    }
    cart[idx].qty = qty;
    saveCart(cart);
  }
  return cart;
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function getSubtotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function clearCart() {
  saveCart([]);
}

function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (el) {
    el.textContent = getCartCount();
  }
}

function dispatchCartEvent() {
  window.dispatchEvent(new CustomEvent("sniffscape-cart-update"));
}

function showToast(message) {
  let toast = document.getElementById("sniffscape-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "sniffscape-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function renderCartBadge() {
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartBadge();
});