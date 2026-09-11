/**
 * contact.js — details list, enquiry form and its sent state.
 *
 * The form has no backend, exactly as before: submitting swaps the form for
 * the confirmation panel.
 */

import { $, el, render, ready } from "../modules/dom.js";
import { CONTACT_ROWS, CONTACT_FIELDS } from "../modules/products.js";

ready(() => {
  const form = $("[data-contact-form]");
  if (!form) return;

  render(
    $("[data-contact-rows]"),
    CONTACT_ROWS.map((c) =>
      el(
        "div",
        { class: "contact-row" },
        el("span", { class: "contact-row__label" }, c.label),
        el("span", { class: "contact-row__value" }, c.value)
      )
    )
  );

  render(
    $("[data-contact-fields]"),
    CONTACT_FIELDS.map((f) =>
      el(
        "label",
        { class: "field" },
        el("span", { class: "field__label" }, f.label),
        el("input", {
          class: "field__input",
          type: "text",
          name: f.label.toLowerCase().replace(/\W+/g, "-"),
          placeholder: f.ph
        })
      )
    )
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.hidden = true;
    const sent = $("[data-contact-sent]");
    if (sent) sent.hidden = false;
  });
});
