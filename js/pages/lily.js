/**
 * lily.js — the two story treatments.
 *
 * The original exposed this as a `storyTreatment` design-time prop plus a
 * runtime toggle. The prop is gone with dc-runtime, so the toggle is the only
 * control; 'a' (Storybook Spread) stays the default, and the choice is kept in
 * the URL so a treatment can be linked to.
 */

import { $, $$, el, render, ready } from "../modules/dom.js";
import { SPREADS, LILY_QUESTIONS, LILY_BEATS } from "../modules/products.js";
import { bgImage } from "../modules/format.js";

function show(mode) {
  for (const node of $$("[data-variant]")) {
    node.hidden = node.dataset.variant !== mode;
  }
  for (const btn of $$("[data-treatment]")) {
    btn.classList.toggle("is-active", btn.dataset.treatment === mode);
  }
  const params = new URLSearchParams(window.location.search);
  if (mode === "a") params.delete("treatment");
  else params.set("treatment", mode);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    window.location.pathname + (query ? "?" + query : "")
  );
}

ready(() => {
  const spreads = $("[data-lily-spreads]");
  if (!spreads) return;

  render(
    spreads,
    SPREADS.map((sp, i) =>
      el(
        "section",
        { class: "spread" + (i % 2 ? " spread--tinted" : "") },
        el(
          "div",
          { class: "spread__inner" },
          el(
            "div",
            { class: "spread__figure" + (sp.flip ? " is-flipped" : "") },
            el(
              "div",
              { class: "spread__circle" },
              el("div", {
                class: "spread__image",
                role: "img",
                "aria-label": sp.alt,
                style: `background: ${bgImage(sp.img, "center")}`
              })
            )
          ),
          el(
            "div",
            { class: "spread__copy" + (sp.flip ? " is-flipped" : "") },
            el("p", { class: "spread__caption" }, sp.caption),
            el("h2", { class: "spread__title" }, sp.title),
            el("p", { class: "spread__body" }, sp.body)
          )
        )
      )
    )
  );

  render(
    $("[data-lily-questions]"),
    LILY_QUESTIONS.map((q) => el("p", { class: "lily-a__question" }, q))
  );

  render(
    $("[data-lily-beats]"),
    LILY_BEATS.map((b) =>
      el(
        "div",
        { class: "beat" },
        el(
          "div",
          { class: "beat__frame" },
          el("div", {
            class: "beat__image",
            role: "img",
            "aria-label": b.alt,
            style: `background: ${bgImage(b.img, "center")}`
          })
        ),
        el("p", { class: "beat__num" }, b.num),
        el("p", { class: "beat__title" }, b.title),
        el("p", { class: "beat__body" }, b.body)
      )
    )
  );

  for (const btn of $$("[data-treatment]")) {
    btn.addEventListener("click", () => show(btn.dataset.treatment));
  }

  const initial = new URLSearchParams(window.location.search).get("treatment");
  show(initial === "b" ? "b" : "a");
});
