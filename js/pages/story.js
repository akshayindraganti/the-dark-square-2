/**
 * story.js — the hero image and the three alternating story blocks.
 *
 * `flip` on a block swaps the figure and copy columns; in the original that
 * was a computed `order` style, here it is an `is-flipped` modifier.
 */

import { $, el, render, ready } from "../modules/dom.js";
import { STORY_BLOCKS } from "../modules/products.js";
import { bgImage } from "../modules/format.js";

ready(() => {
  const hero = $("[data-story-hero]");
  if (hero) hero.style.background = bgImage("assets/story/story-hero.jpg", "center");

  const blocks = $("[data-story-blocks]");
  if (!blocks) return;

  render(
    blocks,
    STORY_BLOCKS.map((b) =>
      el(
        "section",
        { class: "story-block" + (b.flip ? " is-flipped" : "") },
        el(
          "div",
          { class: "story-block__figure" },
          el("div", {
            class: "story-block__tile",
            role: "img",
            "aria-label": b.alt,
            style: `background: ${bgImage(b.img, "center")}`
          })
        ),
        el(
          "div",
          { class: "story-block__copy" },
          el("p", { class: "story-block__kicker" }, b.kicker),
          el("h2", { class: "story-block__title" }, b.title),
          el("p", { class: "story-block__body" }, b.body)
        )
      )
    )
  );
});
