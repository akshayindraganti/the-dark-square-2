/**
 * cart.js — cart state, persisted.
 *
 * In the original single-page build the cart lived in component state and was
 * lost on reload; nothing ever reloaded, so that was invisible. Every link is
 * a real navigation now, so the cart has to survive one — it is persisted to
 * localStorage via storage.js.
 *
 * Line items are keyed `<slug>-<size>`, exactly as before, so the same bar in
 * 50 g and 100 g are two lines.
 */

import { read, write } from "./storage.js";
import { PRODUCTS, FREE_SHIPPING_OVER, FLAT_SHIPPING } from "./products.js";
import { money } from "./format.js";

const KEY = "cart";
const listeners = new Set();

/** @type {{key: string, slug: string, size: number, qty: number}[]} */
let items = sanitise(read(KEY, []));

/** Drop anything that no longer matches a real product or a real size. */
function sanitise(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (i) =>
      i &&
      typeof i.slug === "string" &&
      PRODUCTS.some((p) => p.slug === i.slug) &&
      (i.size === 50 || i.size === 100) &&
      Number.isFinite(i.qty) &&
      i.qty > 0
  );
}

function commit() {
  write(KEY, items);
  for (const fn of listeners) fn(snapshot());
}

/** Unit price for a bar at a given size. */
function unitPrice(product, size) {
  return size === 50 ? product.p50 : product.p100;
}

export function add(slug, size) {
  const key = `${slug}-${size}`;
  const found = items.find((i) => i.key === key);
  items = found
    ? items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
    : [...items, { key, slug, size, qty: 1 }];
  commit();
}

/** Nudge a line's quantity by `delta`; lines dropping to 0 are removed. */
export function bump(key, delta) {
  items = items
    .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
    .filter((i) => i.qty > 0);
  commit();
}

export function clear() {
  items = [];
  commit();
}

export function count() {
  return items.reduce((total, i) => total + i.qty, 0);
}

export function subtotal() {
  return items.reduce((total, i) => {
    const product = PRODUCTS.find((p) => p.slug === i.slug);
    return total + unitPrice(product, i.size) * i.qty;
  }, 0);
}

/** Everything a cart view needs, resolved against the catalogue. */
export function snapshot() {
  const lines = items.map((i) => {
    const product = PRODUCTS.find((p) => p.slug === i.slug);
    const unit = unitPrice(product, i.size);
    return {
      key: i.key,
      slug: i.slug,
      name: product.name,
      img: product.img,
      size: `${i.size}g`,
      qty: i.qty,
      priceLabel: money(unit),
      lineTotal: money(unit * i.qty)
    };
  });
  const total = subtotal();
  return {
    items: lines,
    isEmpty: lines.length === 0,
    count: count(),
    subtotal: total,
    subtotalLabel: money(total),
    shippingLabel:
      total >= FREE_SHIPPING_OVER ? "Free across India" : money(FLAT_SHIPPING)
  };
}

/** Subscribe to cart changes. Returns an unsubscribe function. */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
