/**
 * format.js — value formatting shared across pages.
 */

import { asset } from "./router.js";

/** Rupees, Indian digit grouping. Matches the original `money()`. */
export function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

/**
 * Background shorthand serving AVIF -> WebP -> original.
 *
 * Ported from the original `bg()`. Returns a two-declaration string: a plain
 * `background` shorthand that every browser understands, followed by an
 * `image-set()` override that modern browsers use to pick the better format.
 * Browsers that cannot parse `image-set` simply keep the plain url().
 */
export function bgImage(src, pos = "center") {
  const url = asset(src);
  const base = url.replace(/\.(png|jpe?g)$/i, "");
  const origType = /\.png$/i.test(url) ? "image/png" : "image/jpeg";
  const set =
    `url('${base}.avif') type('image/avif'), ` +
    `url('${base}.webp') type('image/webp'), ` +
    `url('${url}') type('${origType}')`;
  return (
    `url('${url}') ${pos} / cover no-repeat` +
    `; background-image: -webkit-image-set(${set})` +
    `; background-image: image-set(${set})`
  );
}

/** The hatched placeholder used when a bar has no photograph. */
export const NO_IMAGE_FILL =
  "repeating-linear-gradient(135deg, var(--bg3) 0 12px, var(--bg4) 12px 24px)";

/** Tile background for a product, photograph or placeholder. */
export function productTile(product, pos = "center 20%") {
  return product.img ? bgImage(product.img, pos) : NO_IMAGE_FILL;
}
