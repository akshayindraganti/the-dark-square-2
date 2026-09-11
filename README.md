# The Dark Square

Static multi-page site for The Dark Square, artisan chocolates.

## Getting started

```bash
npm install       # once — pulls in esbuild, the only dependency
npm run build     # assemble pages and bundle the JS
npm run dev       # build, then serve on http://localhost:8080
```

After a build the site also runs by just opening `index.html` in a browser —
no server needed.

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

and name their page script with:

```html
<!-- @script shop -->
```

`build.js` inlines each include, rewrites `./`-relative URLs to `../` for pages
one directory down, and bundles `js/main.js` plus the named page module into a
single classic script in `js/build/`.

Why a build step rather than loading things at runtime: this site is opened
straight from disk as well as served, and `file://` blocks both `fetch()` and
`<script type="module">`. Runtime partial injection would silently drop the
header and footer, and ES modules would not execute at all. Inlining and
bundling makes the same output work from `file://`, from any static host, and
in the Claude Design preview alike.

### Content

Product data and all repeated site copy live in `js/modules/products.js` — the
nine bars, the four collections, the FAQ, the coupon, the story blocks. Change a
price or a flavour there and every page follows.

### The welcome coupon

The offer is configured in the `COUPON` object in `js/modules/products.js` —
code, headline, artwork, `delayMs` (6s after the loader clears) and `seenDays`
(30 days hidden once dismissed).

It shows on the home page only. To work on it without waiting out the delay or
clearing storage, open **`index.html?coupon=1`** — that forces it open
immediately; `?coupon=0` suppresses it for one page view. To reset the
dismissal, run `localStorage.removeItem('tds:couponSeen')` in the console.

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
Lily & Leo treatment switch, the contact form, and the coupon (`?coupon=1`).

Check at 1440px, at 1080px and at phone width — those are the two breakpoints
plus phone. Worth confirming the pages still work opened directly from disk as
well as served, since `file://` is the stricter of the two.
