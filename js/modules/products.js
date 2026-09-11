/**
 * products.js — the catalogue and all long-form site copy.
 *
 * Extracted verbatim from the literals that were buried in the original
 * single-file build's logic class. This module is the only owner of product
 * data; nothing else should redefine a bar, a price or a collection.
 */

const PRODUCTS = [
  { slug: 'salted-almond-noir', img: 'assets/bars/p01.png', name: 'Salted Almond Noir',
    pair: 'Dark Chocolate • Roasted Almond • Sea Salt', collection: 'The Classics', pct: 70, occasion: 'Everyday',
    p50: 320, p100: 580, cocoa: 'Roasted', texture: 'Nutty', finish: 'Elegant',
    line: 'A little sweet. A little salty. A little magical.',
    story: 'Deep dark chocolate meets crunchy roasted almonds and a delicate touch of sea salt.',
    story2: 'One square is never quite enough.',
    leoNote: 'Leo says the salt is the best part. Lily says the almond. They eat it anyway.' },

  { slug: 'hazelnut-coffee-affair', img: 'assets/bars/p09.png', name: 'Hazelnut Coffee Affair',
    pair: 'Dark Chocolate • Hazelnut • Coffee', collection: 'The Dark Collection', pct: 70, occasion: 'Gifting',
    p50: 410, p100: 760, cocoa: 'Rich', texture: 'Nutty', finish: 'Bold',
    line: 'For the coffee-and-chocolate kind of person.',
    story: 'Bold coffee. Toasted hazelnuts. Deep dark chocolate. A rich combination for those who believe coffee and chocolate belong together.',
    story2: 'Smooth, nutty and unapologetically grown-up.',
    leoNote: 'Lily holds this one above Leo’s head. Not for children, apparently.' },

  { slug: 'hazelnut-heirloom', img: 'assets/bars/p03.png', name: 'The Hazelnut Heirloom',
    pair: 'Dark Chocolate • Toasted Hazelnut', collection: 'The Classics', pct: 70, occasion: 'Everyday',
    p50: 340, p100: 620, cocoa: 'Toasted', texture: 'Caramel', finish: 'Smooth',
    line: 'The one that tastes like being eight again.',
    story: 'Hazelnuts blistered until the skins lift, rubbed by hand, then set whole into the 70% base while it is still soft.',
    story2: 'Familiar in the best possible way.',
    leoNote: 'Lily calls this the polite one. Leo calls it the one he steals.' },

  { slug: 'cashew-daydream', img: 'assets/bars/p02.png', name: 'Cashew Daydream',
    pair: 'Dark Chocolate • Roasted Cashew', collection: 'The Nut Collection', pct: 70, occasion: 'Gifting',
    p50: 330, p100: 600, cocoa: 'Buttery', texture: 'Toasted', finish: 'Rich',
    line: 'Soft, buttery and quietly convincing.',
    story: 'Cashews from the Konkan coast, roasted just past golden so the butteriness comes forward and the chocolate reads gentler than it is.',
    story2: 'The one most likely to win over someone who says they don’t like dark chocolate.',
    leoNote: 'Approved unanimously, which almost never happens.' },

  { slug: 'pistachio-after-midnight', img: 'assets/bars/p04.png', name: 'Pistachio After Midnight',
    pair: 'Dark Chocolate • Pistachio', collection: 'The Dark Collection', pct: 70, occasion: 'Gifting',
    p50: 390, p100: 720, cocoa: 'Nutty', texture: 'Creamy', finish: 'Intense',
    line: 'Named after the hour it was made.',
    story: 'Chopped pistachios pressed into the surface so the green breaks through the shine.',
    story2: 'Some ideas refuse to wait until morning.',
    leoNote: 'Lily made this at 12:40am. Leo was asleep under the counter.' },

  { slug: 'monsoon-coffee-roast', img: 'assets/bars/p05.png', name: 'Monsoon Coffee Roast',
    pair: 'Dark Chocolate • Cashew • Coffee', collection: 'The Dark Collection', pct: 70, occasion: 'Everyday',
    p50: 400, p100: 740, cocoa: 'Bold', texture: 'Nutty', finish: 'Aromatic',
    line: 'Morning chocolate, and we stand by that.',
    story: 'Coorg coffee ground coarse and cashews roasted alongside it, so the two share the same char.',
    story2: 'The only bar anyone here eats before nine.',
    leoNote: 'Leo tried it once at breakfast and talked for an hour.' },

  { slug: 'whole-nut-parade', img: 'assets/bars/p06.png', name: 'The Whole Nut Parade',
    pair: 'Dark Chocolate • Almond • Cashew • Hazelnut', collection: 'The Nut Collection', pct: 70, occasion: 'Corporate',
    p50: 380, p100: 700, cocoa: 'Rich', texture: 'Nutty', finish: 'Indulgent',
    line: 'Everything, but organised.',
    story: 'An abundant medley with no single nut allowed to win.',
    story2: 'The one we send when we don’t know what someone likes. It has never come back.',
    leoNote: 'Leo’s idea, argued on the grounds that choosing one nut is unnecessary.' },

  { slug: 'walnut-midnight', img: 'assets/bars/p07.png', name: 'Walnut Midnight',
    pair: 'Dark Chocolate • Walnut', collection: 'The Nut Collection', pct: 70, occasion: 'Everyday',
    p50: 360, p100: 660, cocoa: 'Earthy', texture: 'Rich', finish: 'Velvety',
    line: 'Dark, dry and entirely unsentimental.',
    story: 'Kashmiri walnuts keep their edge, so we met them with a base that does not apologise either.',
    story2: 'For people who order their coffee black and mean it.',
    leoNote: 'Leo’s favourite. Lily wrote ‘wrong’ next to it in the notebook.' },

  { slug: 'rose-pistachio-reverie', img: 'assets/bars/p08.png', name: 'Rose & Pistachio Reverie',
    pair: 'Dark Chocolate • Pistachio • Rose', collection: 'The Celebration Collection', pct: 70, occasion: 'Celebration',
    p50: 440, p100: 800, cocoa: 'Floral', texture: 'Nutty', finish: 'Indulgent',
    line: 'A garden, not a perfume counter.',
    story: 'Pistachios and delicate rose petals, dosed carefully so it stays a flavour rather than a fragrance.',
    story2: 'Our most-requested wedding favour.',
    leoNote: 'Leo says it smells like his grandmother’s terrace. That was the target.' }
];

const COLS = [
  { name: 'The Classics', line: 'Where everyone starts. One nut, one bar, no cleverness.' },
  { name: 'The Nut Collection', line: 'Whole nuts, generously dosed, texture first.' },
  { name: 'The Dark Collection', line: 'The deepest of the nine, for people who like the bitter part.' },
  { name: 'The Celebration Collection', line: 'Rose, pistachio, sea salt. For the days worth marking.' }
];


// ── Welcome coupon popup: edit these to change the offer ──
const COUPON = {
  delayMs: 6000,                       // appears this long after the loader clears
  seenDays: 30,                        // hidden for this many days once dismissed
  brand: 'THE DARK SQUARE',
  brandSub: 'ARTISAN CHOCOLATES',
  headline: 'Your first bite is on us!',
  enjoy: 'ENJOY',
  offer: '10% OFF',
  offerSub: 'ON YOUR FIRST ORDER',
  codeLabel: 'USE CODE:',
  code: 'SWEETSTART',
  cta: 'SHOP NOW',
  tagline: 'EVERY SQUARE HOLDS A STORY.',
  art: 'assets/coupon-lilyleo.jpg',
  terms: 'Valid on your first order · Minimum ₹500 · One use per customer'
};

// ── Lily & Leo storybook spreads ──
const SPREADS = [
  { img: 'assets/lily-new.png', alt: 'Lily reading aloud from a glowing book', caption: 'Lily, chief question-asker',
    title: 'She wants to know everything', flip: false,
    body: 'Where the cocoa grew, why the almonds are roasted twice, who decided salt belonged anywhere near chocolate. Most of her questions end up on the back of a pack.' },
  { img: 'assets/leo-new.png', alt: 'Leo lying on a cushion, chin on his hands, listening', caption: 'Leo, chief taster',
    title: 'He is here for the tasting', flip: true,
    body: 'Leo listens to exactly as much of the story as it takes for the chocolate to arrive. He has opinions, and he is right more often than anyone expected.' },
  { img: 'assets/lilyleo-scene.jpg', alt: 'Lily reading to Leo, cocoa farms and a globe drawn in light above them', caption: 'Together, one flavour at a time',
    title: 'Every square is an adventure', flip: false,
    body: 'They discover the world of The Dark Square one chocolate at a time — a new flavour, a new story, and sometimes a little bit of chocolate-covered mischief.' }
];

// ── Our Story blocks ──
const STORY_BLOCKS = [
  { kicker: 'Why “The Dark Square”', title: 'A small square with a story waiting to be discovered', flip: false,
    img: 'assets/story/story-01.jpg', alt: 'Lily and Leo gazing up at a ribbon of chocolate carrying cocoa farms, blossoms and far-off coastlines',
    body: 'Because chocolate begins with the square. Simple. Familiar. Iconic. But inside that little square can be an entire world of flavours, textures, memories and moments.' },
  { kicker: 'What we believe', title: 'Chocolate should make you pause', flip: true,
    img: 'assets/story/story-02.jpg', alt: 'Lily and Leo pausing over a plate of dark squares, eyes closed in quiet delight',
    body: 'Good chocolate doesn\u2019t need to shout. It should invite you in. A beautiful flavour. A satisfying texture. A moment of quiet happiness. That\u2019s our idea of indulgence.' },
  { kicker: 'How we work', title: 'Thoughtful over complicated', flip: false,
    img: 'assets/story/story-03.jpg', alt: 'Lily and Leo finishing a tray of chocolates beside a notebook reading test, refine, perfect, make with care',
    body: 'We don\u2019t make chocolates simply to fill a box. Every flavour begins with an idea. Every recipe is tested. Every piece is crafted with care.' }
];

// ── FAQ ──
const FAQS = [
  { q: 'Are The Dark Square chocolates handmade?', a: 'Yes. Our chocolates are crafted in small batches with attention to flavour, texture and presentation.' },
  { q: 'Do you take custom orders?', a: 'Yes. Depending on the quantity and requirement, we can explore customised chocolate and gifting options.' },
  { q: 'Do you offer corporate gifting?', a: 'Yes. We offer corporate and bulk gifting options for businesses and events.' },
  { q: 'Can I order chocolates as gifts?', a: 'Absolutely. Our chocolates are designed to be gifted, shared and enjoyed.' },
  { q: 'How should I store my chocolates?', a: 'Store chocolates in a cool, dry place away from direct sunlight, heat and strong odours. Follow the storage instructions provided with your chocolates.' },
  { q: 'Do you have more flavours coming?', a: 'Oh, definitely. The Dark Square is only getting started.' }
];

// ── Corporate gifting list ──
const CORP_LIST = [
  'Client gifts', 'Employee appreciation', 'Festive gifting', 'Milestones',
  'Events', 'Weddings & celebrations', 'Special occasions'
];

// ── Contact details and enquiry form fields ──
const CONTACT_ROWS = [
  { label: 'Email', value: '[your email]' },
  { label: 'Instagram', value: '[Instagram handle]' },
  { label: 'WhatsApp', value: '[WhatsApp number]' }
];

const CONTACT_FIELDS = [
  { label: 'Name', ph: 'Your name' },
  { label: 'Email', ph: 'you@example.in' },
  { label: 'Phone', ph: '+91' },
  { label: 'What is this about?', ph: 'Gifting, corporate, custom, or just hello' }
];

// ── Gifting routes (tile art is resolved at render time) ──
const GIFT_ROUTES = [
  { title: 'Gifts that tell a story', body: 'Our chocolates can be curated into thoughtful gifts for personal celebrations and special occasions. Beautifully presented, thoughtfully crafted, made to be remembered.',
    cta: 'Enquire for gifting', href: 'contact', img: PRODUCTS[8].img },
  { title: 'For someone you love', body: 'Pick your squares, add a note in your own words, and we tie the box before it leaves the kitchen.',
    cta: 'Choose chocolates', href: 'shop', img: PRODUCTS[0].img },
  { title: 'Celebrations & weddings', body: 'Favours at scale with a consistent finish across every box, from a handful of guests to a few hundred.',
    cta: 'Talk to us', href: 'contact', img: PRODUCTS[1].img }
];

// ── Nav ──
const NAV_LINKS = [
  { label: 'Chocolates', page: 'shop' },
  { label: 'Our Story', page: 'story' },
  { label: 'Gifting', page: 'gifting' },
  { label: 'Contact', page: 'contact' }
];

// ── Footer ──
const FOOTER_COLS = [
  { title: 'Chocolate', links: [['All chocolates', 'shop'], ['The Classics', 'shop'], ['The Dark Collection', 'shop'], ['The Celebration Collection', 'shop']] },
  { title: 'Stories', links: [['Our Story', 'story'], ['Lily & Leo', 'lily'], ['What we believe', 'story']] },
  { title: 'Gifting', links: [['Gift boxes', 'gifting'], ['Corporate gifting', 'gifting'], ['Weddings & events', 'gifting']] },
  { title: 'Contact', links: [['Get in touch', 'contact'], ['FAQ', 'faq'], ['Instagram', 'contact']] }
];


// ── Lily's questions ──
const LILY_QUESTIONS = [
  'Why is dark chocolate dark?',
  'Who decided almonds belong with chocolate?',
  'Why does sea salt make chocolate taste better?'
];

// ── Lily & Leo story beats (Midnight Kitchen treatment) ──
const LILY_BEATS = [
  { num: '01', img: 'assets/lily-new.png', alt: 'Lily reading aloud from a glowing book', title: 'A question',
    body: 'Why is dark chocolate dark? Lily has asked four more before anyone answers the first.' },
  { num: '02', img: 'assets/leo-new.png', alt: 'Leo listening, chin resting on his hands', title: 'A taste',
    body: 'Leo volunteers immediately. He is, he insists, only being helpful.' },
  { num: '03', img: 'assets/lilyleo-scene.jpg', alt: 'Lily and Leo together, cocoa farms drawn in light above them', title: 'A story',
    body: 'Where the cocoa grew, who grew it, and how it travelled all the way here.' },
  { num: '04', img: 'assets/leo-new.png', alt: 'Leo daydreaming on a cushion', title: 'A favourite',
    body: 'They never agree. Their rule: there are no rules when choosing your square.' }
];

// ── Moments (home) ──
const MOMENTS = [
  'A square after a long day.',
  'A box for someone you love.',
  'A little surprise on a Tuesday.',
  'A celebration.',
  'A thank-you.',
  'Or simply… because chocolate.'
];

/**
 * Shop-card titles are split across two lines. Mirrors the original `SHOT`
 * derivation: drop a leading "The", then break near the middle.
 */
const SHOT = PRODUCTS.filter((p) => p.img).map((p) => {
  const w = p.name.replace(/^The /, '').split(' ');
  const cut = w.length > 2 ? Math.ceil(w.length / 2) : 1;
  return { ...p, t1: w.slice(0, cut).join(' '), t2: w.slice(cut).join(' ') };
});

/** Look a bar up by slug, falling back to the first (matches the original). */
export function findProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
}

/** Free shipping above this subtotal, in rupees. */
export const FREE_SHIPPING_OVER = 1500;
export const FLAT_SHIPPING = 90;

export {
  PRODUCTS, COLS, COUPON, SPREADS, STORY_BLOCKS, FAQS,
  CORP_LIST, CONTACT_ROWS, CONTACT_FIELDS, GIFT_ROUTES,
  NAV_LINKS, FOOTER_COLS, SHOT,
  LILY_QUESTIONS, LILY_BEATS, MOMENTS
};
