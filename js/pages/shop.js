/**
 * shop.js — filter sidebar and product grid.
 *
 * Filters live in the URL query so a filtered view is linkable, which the
 * original single-page build could not do. The filtering itself is unchanged:
 * a bar matches when its collection and occasion both match, with 'All'
 * matching everything.
 */

import { $, el, render, ready } from "../modules/dom.js";
import { PRODUCTS, COLS } from "../modules/products.js";
import { money, productTile } from "../modules/format.js";
import { productHref } from "../modules/router.js";
import { openQuickView } from "../modules/quick-view.js";

const OCCASIONS = ["All", "Everyday", "Gifting", "Celebration", "Corporate"];
const COLLECTIONS = ["All", ...COLS.map((c) => c.name)];

const state = { collection: "All", occasion: "All" };

function readUrl() {
  const params = new URLSearchParams(window.location.search);
  const collection = params.get("collection");
  const occasion = params.get("occasion");
  if (COLLECTIONS.includes(collection)) state.collection = collection;
  if (OCCASIONS.includes(occasion)) state.occasion = occasion;
}

/** Reflect the current filters into the URL without adding history entries. */
function syncUrl() {
  const params = new URLSearchParams();
  if (state.collection !== "All") params.set("collection", state.collection);
  if (state.occasion !== "All") params.set("occasion", state.occasion);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    window.location.pathname + (query ? "?" + query : "")
  );
}

function matches(p) {
  return (
    (state.collection === "All" || p.collection === state.collection) &&
    (state.occasion === "All" || p.occasion === state.occasion)
  );
}

function card(p) {
  return el(
    "div",
    { class: "shop-card" },
    el(
      "div",
      { class: "shop-card__figure" },
      el("a", {
        class: "shop-card__tile",
        href: productHref(p.slug),
        style: `background: ${productTile(p)}`,
        "aria-label": p.name
      }),
      el(
        "button",
        {
          class: "shop-card__quick",
          type: "button",
          onClick: () => openQuickView(p.slug)
        },
        "Quick view"
      )
    ),
    el("a", { class: "shop-card__name", href: productHref(p.slug) }, p.name),
    el("p", { class: "shop-card__pair" }, p.pair),
    el(
      "div",
      { class: "shop-card__foot" },
      el("span", { class: "shop-card__price" }, "from " + money(p.p50)),
      el(
        "button",
        {
          class: "shop-card__add",
          type: "button",
          "data-add-to-cart": p.slug,
          "data-size": "100"
        },
        "Add"
      )
    )
  );
}

function paint() {
  const filtered = PRODUCTS.filter(matches);

  const title = $("[data-shop-title]");
  const blurb = $("[data-shop-blurb]");
  if (title) {
    title.textContent =
      state.collection === "All" ? "Find Your Square" : state.collection;
  }
  if (blurb && state.collection !== "All") {
    blurb.textContent = (COLS.find((c) => c.name === state.collection) || {}).line;
  }

  const count = $("[data-result-count]");
  if (count) {
    count.textContent =
      filtered.length + (filtered.length === 1 ? " chocolate" : " chocolates");
  }

  const grid = $("[data-product-grid]");
  if (grid) {
    render(
      grid,
      filtered.length
        ? filtered.map(card)
        : el("p", { class: "empty" }, "Nothing matches those filters yet.")
    );
  }

  for (const btn of document.querySelectorAll("[data-filter]")) {
    const [kind, value] = btn.dataset.filter.split("|");
    btn.classList.toggle("is-active", state[kind] === value);
  }
}

function filterButton(kind, value, label, className) {
  return el(
    "button",
    {
      class: className,
      type: "button",
      "data-filter": `${kind}|${value}`,
      onClick: () => {
        state[kind] = value;
        syncUrl();
        paint();
      }
    },
    label
  );
}

ready(() => {
  if (!$("[data-product-grid]")) return;
  readUrl();

  render(
    $("[data-collection-filters]"),
    COLLECTIONS.map((n) =>
      filterButton("collection", n, n === "All" ? "All chocolates" : n, "filter-row")
    )
  );
  render(
    $("[data-occasion-filters]"),
    OCCASIONS.map((n) => filterButton("occasion", n, n === "All" ? "Any" : n, "chip"))
  );

  paint();
});
