/**
 * quick-view.js — the product peek opened from a shop card.
 *
 * Kept as a module rather than a page module because the shop grid and the
 * home page's featured row both open it.
 */

import { $, el, render } from "./dom.js";
import { findProduct } from "./products.js";
import { money, productTile } from "./format.js";
import { productHref } from "./router.js";

let size = 100;
let slug = null;

function sizeChips(onPick) {
  return [50, 100].map((n) =>
    el(
      "button",
      {
        class: "chip" + (size === n ? " is-active" : ""),
        type: "button",
        onClick: () => onPick(n)
      },
      n + "g"
    )
  );
}

function paint() {
  const grid = $("[data-quick-grid]");
  if (!grid || !slug) return;
  const p = findProduct(slug);

  render(
    grid,
    el("div", {
      class: "quick__media",
      style: `background: ${productTile(p)}`
    }),
    el(
      "div",
      { class: "quick__body" },
      el("p", { class: "quick__eyebrow" }, `${p.collection} · ${p.pct}% cacao`),
      el("p", { class: "quick__name" }, p.name),
      el("p", { class: "quick__pair" }, p.pair),
      el("p", { class: "quick__line" }, p.line),
      el("p", { class: "quick__story" }, p.story),
      el(
        "div",
        { class: "quick__notes" },
        [
          ["Cocoa", p.cocoa],
          ["Texture", p.texture],
          ["Finish", p.finish]
        ].map(([label, value]) =>
          el(
            "div",
            { class: "note" },
            el("p", { class: "note__label" }, label),
            el("p", { class: "note__value" }, value)
          )
        )
      ),
      el(
        "div",
        { class: "quick__sizes" },
        sizeChips((n) => {
          size = n;
          paint();
        }),
        el(
          "span",
          { class: "quick__price" },
          money(size === 50 ? p.p50 : p.p100)
        )
      ),
      el(
        "div",
        { class: "quick__actions" },
        el(
          "button",
          {
            class: "quick__add",
            type: "button",
            "data-add-to-cart": p.slug,
            "data-size": String(size),
            onClick: close
          },
          "Add to my squares"
        ),
        el("a", { class: "quick__details", href: productHref(p.slug) }, "Full details")
      ),
      el("p", { class: "quick__note" }, p.leoNote)
    )
  );
}

export function openQuickView(nextSlug) {
  const modal = $("#quick-view");
  if (!modal) return;
  slug = nextSlug;
  size = 100;
  paint();
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

export function close() {
  const modal = $("#quick-view");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-quick-close]")) close();
});
document.addEventListener("keydown", (e) => {
  const modal = $("#quick-view");
  if (e.key === "Escape" && modal && !modal.hidden) close();
});
