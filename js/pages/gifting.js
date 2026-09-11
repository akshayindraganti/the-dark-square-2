/** gifting.js — the three gift routes and the corporate list. */

import { $, el, render, ready } from "../modules/dom.js";
import { GIFT_ROUTES, CORP_LIST } from "../modules/products.js";
import { bgImage } from "../modules/format.js";
import { href } from "../modules/router.js";

ready(() => {
  const routes = $("[data-gift-routes]");
  if (!routes) return;

  render(
    routes,
    GIFT_ROUTES.map((g) =>
      el(
        "div",
        { class: "gift-card" },
        el("div", {
          class: "gift-card__tile",
          style: `background: ${bgImage(g.img, "center 20%")}`
        }),
        el(
          "div",
          { class: "gift-card__body" },
          el("p", { class: "gift-card__title" }, g.title),
          el("p", { class: "gift-card__text" }, g.body),
          el("a", { class: "gift-card__cta", href: href(g.href) }, g.cta)
        )
      )
    )
  );

  render(
    $("[data-corp-list]"),
    CORP_LIST.map((item) => el("p", { class: "corp__item" }, item))
  );
});
