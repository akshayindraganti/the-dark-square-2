/**
 * home.js — loader, hero video, collection cards and the moments list.
 */

import { $, el, render, ready } from "../modules/dom.js";
import { COLS, PRODUCTS, MOMENTS } from "../modules/products.js";
import { bgImage, NO_IMAGE_FILL } from "../modules/format.js";
import { href, asset } from "../modules/router.js";

const PHONE = 768; // `phone` in the original: portrait hero video below this

/**
 * The intro progress bar. Purely decorative — it counts up in random steps and
 * clears, exactly as before. Home page only; a bar on every navigation would
 * be worse than the single-page original.
 */
function runLoader() {
  const loader = $("#loader");
  const bar = $("[data-loader-bar]");
  if (!loader || !bar) return;

  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(100, pct + 4 + Math.random() * 9);
    bar.style.width = Math.round(pct) + "%";
    if (pct < 100) return;

    clearInterval(tick);
    setTimeout(() => {
      loader.classList.add("is-done");
      setTimeout(() => {
        loader.hidden = true;
      }, 500);
    }, 480);
  }, 90);
}

/** Portrait crop on phones, landscape above. */
function initHeroVideo() {
  const video = $("[data-hero-video]");
  if (!video) return;
  const phone = window.innerWidth < PHONE;
  video.src = asset(
    phone ? "assets/hero-splash-mobile.mp4" : "assets/hero-splash.mp4"
  );
  video.poster = asset(
    phone
      ? "assets/hero-splash-mobile-poster.jpg"
      : "assets/hero-splash-poster.jpg"
  );
}

/** Cover art for a collection: the first bar in it that has a photograph. */
function collectionArt(name) {
  const withImage = PRODUCTS.find((p) => p.collection === name && p.img);
  return withImage ? bgImage(withImage.img, "center 20%") : NO_IMAGE_FILL;
}

ready(() => {
  runLoader();
  initHeroVideo();

  const grid = $("[data-collections]");
  if (grid) {
    render(
      grid,
      COLS.map((c) =>
        el(
          "a",
          {
            class: "collection-card",
            href: href("shop", { collection: c.name })
          },
          el("div", {
            class: "collection-card__tile",
            style: `background: ${collectionArt(c.name)}`
          }),
          el(
            "div",
            { class: "collection-card__body" },
            el("p", { class: "collection-card__name" }, c.name),
            el("p", { class: "collection-card__line" }, c.line),
            el(
              "p",
              { class: "collection-card__count" },
              PRODUCTS.filter((p) => p.collection === c.name).length + " chocolates"
            )
          )
        )
      )
    );
  }

  const moments = $("[data-moments]");
  if (moments) {
    render(moments, MOMENTS.map((m) => el("p", { class: "moment" }, m)));
  }
});
