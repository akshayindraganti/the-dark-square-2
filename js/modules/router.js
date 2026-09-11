/**
 * router.js — page-to-URL mapping.
 *
 * The original was a single-page app switching on a `screen` string. Those
 * screen names survive here as page keys so links can keep reading
 * `href('shop')` rather than hard-coding relative paths that differ between
 * index.html (root) and pages/*.html (one level down).
 */

const PAGES = {
  home: "index.html",
  shop: "pages/shop.html",
  product: "pages/product.html",
  story: "pages/story.html",
  lily: "pages/lily.html",
  gifting: "pages/gifting.html",
  faq: "pages/faq.html",
  contact: "pages/contact.html"
};

/** How many directories deep the current document sits below the site root. */
function depth() {
  return window.location.pathname.includes("/pages/") ? 1 : 0;
}

/**
 * Resolve a path under assets/ to a URL correct for the current document.
 * Product data stores plain "assets/..." paths, which resolve relative to the
 * document — wrong for anything inside pages/. Every generated image URL must
 * go through this.
 */
export function asset(path) {
  return "../".repeat(depth()) + path;
}

/** Resolve a page key to an href correct for the current document. */
export function href(page, params) {
  const target = PAGES[page];
  if (!target) throw new Error(`router: unknown page "${page}"`);
  const prefix = "../".repeat(depth());
  const query = params ? "?" + new URLSearchParams(params) : "";
  return prefix + target + query;
}

/** Link to a single bar's detail page. */
export function productHref(slug) {
  return href("product", { slug });
}

/** The page key for the current document, used to mark the active nav item. */
export function currentPage() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  if (file === "" || file === "index.html") return "home";
  const name = file.replace(/\.html$/, "");
  return name in PAGES ? name : "home";
}

/** Read a query-string parameter from the current URL. */
export function param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export { PAGES };
