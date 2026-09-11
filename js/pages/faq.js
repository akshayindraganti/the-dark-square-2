/** faq.js — renders the question list from the shared content module. */

import { $, el, render, ready } from "../modules/dom.js";
import { FAQS } from "../modules/products.js";

ready(() => {
  const list = $("[data-faq-list]");
  if (!list) return;

  render(
    list,
    FAQS.map((item) =>
      el(
        "div",
        { class: "faq-item" },
        el("p", { class: "faq-item__q" }, item.q),
        el("p", { class: "faq-item__a" }, item.a)
      )
    )
  );
});
