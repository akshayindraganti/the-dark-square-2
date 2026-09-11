/**
 * product.js — the detail page for one bar.
 *
 * The bar is chosen by the `slug` query parameter. An absent or unknown slug
 * falls back to the first product, matching the original's `|| PRODUCTS[0]`.
 */

import { $, $$, el, render, ready, setBackground } from "../modules/dom.js";
import { PRODUCTS, findProduct } from "../modules/products.js";
import { money, productTile } from "../modules/format.js";
import { productHref, param } from "../modules/router.js";

let size = 100;

function paintPrice(product) {
  const price = $("[data-pdp-price]");
  if (price) price.textContent = money(size === 50 ? product.p50 : product.p100);

  const add = $("[data-pdp-add]");
  if (add) {
    add.dataset.addToCart = product.slug;
    add.dataset.size = String(size);
  }

  for (const chip of $$("[data-size-chip]")) {
    chip.classList.toggle("is-active", Number(chip.dataset.sizeChip) === size);
  }
}

ready(() => {
  const hero = $("[data-pdp-hero]");
  if (!hero) return;

  const product = findProduct(param("slug"));

  document.title = `${product.name} · The Dark Square`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = product.story;

  for (const node of $$("[data-pdp]")) {
    node.textContent = product[node.dataset.pdp];
  }

  setBackground(hero, productTile(product));

  render(
    $("[data-pdp-notes]"),
    [
      ["Cocoa", product.cocoa],
      ["Texture", product.texture],
      ["Finish", product.finish]
    ].map(([label, value]) =>
      el(
        "div",
        {},
        el("p", { class: "pdp__note-label" }, label),
        el("p", { class: "pdp__note-value" }, value)
      )
    )
  );

  render(
    $("[data-pdp-sizes]"),
    [50, 100].map((n) =>
      el(
        "button",
        {
          class: "chip",
          type: "button",
          "data-size-chip": String(n),
          onClick: () => {
            size = n;
            paintPrice(product);
          }
        },
        n + "g"
      )
    )
  );

  const related = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.slug !== product.slug
  ).slice(0, 3);

  render(
    $("[data-pdp-related]"),
    related.map((p) =>
      el(
        "a",
        { class: "pdp__related-card", href: productHref(p.slug) },
        el("div", {
          class: "pdp__related-tile",
          style: `background: ${productTile(p)}`
        }),
        el("p", { class: "pdp__related-name" }, p.name),
        el("p", { class: "pdp__related-price" }, "from " + money(p.p50))
      )
    )
  );

  paintPrice(product);
});
