# The Dark Square

Static multi-page site for The Dark Square, artisan chocolates.

## Getting started

```bash
npm run build     # assemble src/pages + components -> index.html, pages/*.html
npm run dev       # build, then serve on http://localhost:8080
```

There are no dependencies to install — `build.js` uses only the Node standard
library, and `npm run dev` serves with Python's built-in HTTP server.

## Structure

```
index.html            generated — the home page
pages/*.html          generated — one file per screen
src/pages/*.html      AUTHORED page sources
components/*.html     shared partials, inlined at build time
css/                  variables, reset, layout, components, pages/*
js/modules/           products (data), cart, storage, router, format, dom, quick-view
js/pages/             one module per page
js/main.js            runs on every page: nav, cart drawer, coupon, signup
assets/               images and video
build.js              the build
```

### Editing

**Edit `src/pages/*.html`, never `index.html` or `pages/*.html`** — those are
generated and overwritten by every build. Each source page pulls in shared
markup with include markers:

```html
<!-- @include components/header.html -->
```

`build.js` replaces each marker with that file's contents, then rewrites
`./`-relative URLs to `../` for pages that live one directory down.

Why a build step rather than fetching partials at runtime: the site is opened
straight from disk as well as served, and `fetch()` is blocked on `file://`, so
runtime injection would silently drop the header and footer.

### Content

Product data and all repeated site copy live in `js/modules/products.js` — the
nine bars, the four collections, the FAQ, the coupon, the story blocks. Change a
price or a flavour there and every page follows.

### CSS

`css/main.css` imports everything in order: tokens, reset, layout, components,
then the per-page sheets. All colour, type and spacing values come from the
custom properties in `css/variables.css`; nothing below it should hard-code a
hex.

Two breakpoints, inherited from the original design:

| Width      | Meaning                                    |
| ---------- | ------------------------------------------ |
| `< 1080px` | sidebars stack, desktop nav becomes burger |
| `< 768px`  | hero video switches to the portrait cut    |

## Testing

`npm run dev`, then check each page: the shop filters, the cart drawer (add,
quantity, free shipping over ₹1500), quick view, the product size toggle, the
Lily & Leo treatment switch, the contact form, and the coupon that appears six
seconds into a first visit to the home page.
