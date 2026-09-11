/**
 * main.js — global initialisation, loaded by every page.
 *
 * Owns the three things that are the same everywhere: the header (active nav
 * item, burger menu), the cart drawer and its badge, and the welcome coupon.
 * Page-specific behaviour lives in js/pages/*.js.
 */

import { $, $$, el, render, ready, setBackground } from "./modules/dom.js";
import { currentPage, href } from "./modules/router.js";
import { COUPON } from "./modules/products.js";
import { bgImage } from "./modules/format.js";
import { read, write } from "./modules/storage.js";
import * as cart from "./modules/cart.js";

/* ---- Header ----------------------------------------------------------- */

function initNav() {
  const page = currentPage();
  for (const link of $$(".site-nav__link")) {
    link.classList.toggle("is-active", link.dataset.page === page);
    if (link.dataset.page === page) link.setAttribute("aria-current", "page");
  }
}

function initMenu() {
  const menu = $("#mobile-menu");
  const toggles = $$("[data-menu-toggle]");
  if (!menu || !toggles.length) return;

  const setOpen = (open) => {
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    for (const t of toggles) t.setAttribute("aria-expanded", String(open));
  };

  for (const t of toggles) t.addEventListener("click", () => setOpen(menu.hidden));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setOpen(false);
  });
}

/* ---- Cart drawer ------------------------------------------------------ */

function cartLine(line) {
  return el(
    "div",
    { class: "cart-line" },
    el("div", {
      class: "cart-line__tile",
      style: `background: ${line.img ? bgImage(line.img, "center 18%") : ""}`
    }),
    el(
      "div",
      { style: "flex: 1" },
      el("p", { class: "cart-line__name" }, line.name),
      el("p", { class: "cart-line__meta" }, `${line.size} · ${line.priceLabel}`),
      el(
        "div",
        { style: "display: flex; align-items: center; gap: 12px" },
        el(
          "div",
          { class: "qty" },
          el(
            "button",
            {
              class: "qty__btn",
              type: "button",
              "aria-label": `Remove one ${line.name}`,
              onClick: () => cart.bump(line.key, -1)
            },
            "−"
          ),
          el("span", { class: "qty__value" }, String(line.qty)),
          el(
            "button",
            {
              class: "qty__btn",
              type: "button",
              "aria-label": `Add one ${line.name}`,
              onClick: () => cart.bump(line.key, 1)
            },
            "+"
          )
        ),
        el("span", { style: "margin-left: auto; font-size: 14px" }, line.lineTotal)
      )
    )
  );
}

function initCart() {
  const drawer = $("#cart-drawer");
  const body = $("[data-cart-body]");
  const foot = $("[data-cart-foot]");
  if (!drawer || !body) return;

  const setOpen = (open) => {
    drawer.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };

  const paint = (snap) => {
    for (const badge of $$("[data-cart-count]")) badge.textContent = String(snap.count);

    if (snap.isEmpty) {
      render(
        body,
        el(
          "div",
          { class: "empty" },
          el("p", {}, "Nothing here yet."),
          el("a", { class: "btn btn--outline", href: href("shop") }, "Choose chocolates")
        )
      );
    } else {
      render(body, snap.items.map(cartLine));
    }

    if (foot) {
      foot.hidden = snap.isEmpty;
      const sub = $("[data-cart-subtotal]", foot);
      const ship = $("[data-cart-shipping]", foot);
      if (sub) sub.textContent = snap.subtotalLabel;
      if (ship) ship.textContent = snap.shippingLabel;
    }
  };

  for (const btn of $$("[data-cart-open]")) btn.addEventListener("click", () => setOpen(true));
  for (const btn of $$("[data-cart-close]")) btn.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.hidden) setOpen(false);
  });

  // Adding from anywhere on the page opens the drawer, as it did originally.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-add-to-cart]");
    if (!trigger) return;
    e.preventDefault();
    const size = Number(trigger.dataset.size || 100);
    cart.add(trigger.dataset.addToCart, size);
    setOpen(true);
  });

  cart.subscribe(paint);
  paint(cart.snapshot());
}

/* ---- Welcome coupon --------------------------------------------------- */

const COUPON_SEEN_KEY = "couponSeen";

/**
 * Has the visitor dismissed the offer recently enough to stay suppressed?
 *
 * The stored value is the timestamp of the dismissal, so the offer comes back
 * after COUPON.seenDays rather than being gone for good. Anything unparseable
 * counts as "not seen" — better to show the offer once too often than to
 * suppress it forever because of a bad value.
 */
function couponSuppressed() {
  const seenAt = read(COUPON_SEEN_KEY, null);
  if (typeof seenAt !== "number") return false;
  const days = (Date.now() - seenAt) / 86400000;
  return days >= 0 && days < COUPON.seenDays;
}

function initCoupon() {
  const modal = $("#coupon-modal");
  if (!modal) return;

  for (const [key, value] of Object.entries(COUPON)) {
    const node = $(`[data-coupon="${key}"]`, modal);
    if (node) node.textContent = value;
  }

  const art = $("[data-coupon-art]", modal);
  setBackground(art, bgImage(COUPON.art, "center"));

  const shop = $("[data-coupon-shop]", modal);
  if (shop) shop.href = href("shop");

  const close = () => {
    modal.hidden = true;
    write(COUPON_SEEN_KEY, Date.now());
  };

  for (const btn of $$("[data-coupon-close]", modal)) btn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  const copy = $("[data-coupon-copy]", modal);
  const hint = $("[data-coupon-hint]", modal);
  if (copy) {
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard?.writeText(COUPON.code);
      } catch {
        /* clipboard unavailable — the code is visible on screen regardless */
      }
      if (hint) hint.textContent = "Code copied";
    });
  }

  // index.html?coupon=1 forces the offer open straight away, so the popup can
  // be previewed and styled without clearing storage or waiting out the delay;
  // ?coupon=0 suppresses it for one page view. The modal markup only ships on
  // the home page, so neither switch does anything elsewhere.
  const forced = new URLSearchParams(window.location.search).get("coupon");
  if (forced === "1") {
    modal.hidden = false;
    return;
  }
  if (forced === "0") return;

  // Otherwise: home page only, once every COUPON.seenDays. The original
  // re-armed on every page view because nothing ever reloaded.
  if (currentPage() !== "home" || couponSuppressed()) return;
  setTimeout(() => {
    modal.hidden = false;
  }, COUPON.delayMs);
}

/* ---- Newsletter signup ------------------------------------------------ */

function initSignup() {
  for (const form of $$("[data-signup]")) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      render(
        form,
        el("p", { class: "site-footer__blurb" }, "Thank you — we'll be in touch.")
      );
    });
  }
}

ready(() => {
  initNav();
  initMenu();
  initCart();
  initCoupon();
  initSignup();
});
