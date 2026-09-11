# The Dark Square — Product Requirements Document

_Artisan chocolate ecommerce website — "Every Square Holds a Story"_

Version 1.0

---

## 1. Elevator Pitch

The Dark Square is an ecommerce website for a contemporary artisan dark chocolate brand that blends premium craft with warmth and storytelling. The site sells four chocolate collections (Classics, Nut, Dark, Celebration) to gift buyers, self-indulgent snackers, and corporate gifting clients across India, wrapped in an immersive "Storybook Grid" experience — split-screen product pages, a sticky buy-box, and a Champagne Gold-on-Deep-Cocoa visual identity. The storytelling layer, led by the characters Lily & Leo, runs through the homepage, a dedicated character section, and "The Dark Journal" blog, turning a chocolate purchase into a small narrative moment rather than a transaction.

## 2. Who Is This App For

- **Primary — Gift buyers**: people purchasing chocolate for birthdays, anniversaries, festivals, weddings, and "just because" moments. They need premium presentation and an easy, trustworthy checkout.
- **Primary — Self-purchasers / premium snackers**: people buying for personal indulgence or discovery of new flavours; they respond to sensory, story-led product descriptions.
- **Secondary — Corporate gifting buyers**: HR/procurement or business contacts sourcing bulk, branded, or custom hampers for clients, employees, or events. They need a distinct enquiry/quote path, not a standard cart flow.
- **Secondary — Custom order clients**: individuals or businesses wanting personalised flavours, packaging, or messages for weddings, events, or celebrations.
- **Secondary — Brand-world followers**: customers who engage with Lily & Leo and The Dark Journal content before or without purchasing — a discovery/retention audience.

All customers are based in India (shipping is India-only at launch).

## 3. Functional Requirements

### 3.1 Storefront & Catalogue

- Home page with hero, brand introduction, and a "Discover Your Square" collection grid (The Classics, The Nut Collection, The Dark Collection, The Celebration Collection).
- Category/collection listing pages with filters (chocolate type — dark/milk/white, collection, size, occasion).
- Product detail pages: name, chocolate type & %, tasting notes (cocoa/texture/finish), available sizes (e.g., 50g/100g), price, imagery, "Add to My Squares" (cart) action, and a sticky buy-box on scroll.
- Global site search ("Search your next indulgence…").

### 3.2 Cart & Checkout

- Cart labelled "Your Squares"; empty-state messaging per brand copy.
- Standard checkout ("Complete Your Order") supporting UPI, cards, and netbanking via a Razorpay-style payment gateway.
- Address capture restricted to Indian shipping addresses/pin codes.
- Order confirmation and transactional email/notification.

### 3.3 Gifting & Corporate

- Consumer gifting landing page (for someone special / celebrations / corporate) with CTAs to Gifting and Corporate Enquiries.
- Corporate Gifting page with use-case list (client gifting, employee appreciation, festive gifting, events & launches, weddings, hampers, custom branding) and a "Request a Corporate Quote" lead-capture form (not a cart checkout).
- Custom Orders page with a "Start a Custom Order" lead-capture form (flavour, packaging, personalised message, occasion type).

### 3.4 Brand & Content

- "Our Story" page (brand narrative).
- "Why The Dark Square?" page (five value pillars: cocoa, ingredients, combinations, small-batch craft, memorability).
- "Ingredient Philosophy" page.
- "Lily & Leo" character page introducing the characters, linking into story content.
- "The Dark Square Experience" page (unboxing/sensory narrative, non-transactional).
- "The Dark Journal" — a blog/content hub listing articles (chocolate education, ingredient stories, Lily & Leo stories, gifting guides), each with its own article page.

### 3.5 Account & Support

- Contact page with routed enquiry types: Customer Support, Corporate Gifting, Collaborations.
- Newsletter signup ("Join The Story") capturing email for marketing.
- Footer navigation: Shop, Discover, Gifting, Help (Contact, Shipping & Delivery, FAQs, Returns & Refunds, Privacy Policy, Terms & Conditions).
- Basic account/order-history capability for repeat customers (assumption — confirm if guest-checkout-only is preferred at launch).

### 3.6 Non-Functional

- Fully responsive (mobile-first, given India's mobile-commerce usage).
- Fast image-heavy page loads (editorial photography is central to brand positioning) — implies image optimisation/CDN.
- SEO-friendly URLs and metadata, particularly for Dark Journal content.

## 4. User Stories

**Gift buyer**

- As a gift buyer, I want to browse by occasion or collection so I can quickly find something appropriate to gift.
- As a gift buyer, I want to see clear tasting notes and packaging quality so I feel confident the gift will impress.
- As a gift buyer, I want a smooth, trustworthy checkout with familiar Indian payment methods (UPI/cards/netbanking).

**Self-purchaser**

- As a self-purchaser, I want sensory, story-led descriptions of each chocolate so I know what to expect before buying.
- As a self-purchaser, I want to explore Lily & Leo content and The Dark Journal so I feel connected to the brand, not just a product.

**Corporate buyer**

- As a corporate buyer, I want a dedicated page listing corporate gifting use-cases so I can quickly assess fit for my need (client gifting, events, etc.).
- As a corporate buyer, I want to submit a quote request with my requirements rather than add items to a standard cart, since my order is customised and bulk.

**Custom order client**

- As a customer planning a wedding/event, I want to submit a custom order request (flavours, packaging, messaging) so I can get a personalised chocolate experience.

**Returning/loyal customer**

- As a returning customer, I want to sign up for the newsletter so I hear about new flavours and limited collections first.
- As a customer, I want to read about how the chocolate is made (Bean to Square, ingredient sourcing) so I trust the "artisan" and "premium" claims.

## 5. User Interface

Direction: **"The Storybook Grid"** — the site should feel like a luxury chocolate house first, an online store second.

- **Layout style**: immersive, editorial layouts; split-screen product pages (imagery on one side, story/tasting notes on the other); generous whitespace; restrained animation.
- **Colour palette**: Deep Cocoa (#1A120D / #21140F) and Dark Chocolate (#2B1B13) backgrounds; Champagne Gold (#D6B98C) as primary accent; Mocha Gold (#B7956B) as secondary accent; Soft Ivory (#F7EFE6) for light backgrounds and text-on-dark; Cocoa Taupe/Copper (#D49B84 / #80594A) as supporting neutrals. Copper/gold used as accent only — never a flood colour.
- **Typography**: Playfair Display for headings (elegant, editorial, premium); Lato for body copy; Lato with increased letter-spacing for navigation/labels.
- **Product pages**: sticky buy-box that persists on scroll; large photography; tasting-note breakdown (Cocoa / Texture / Finish).
- **Homepage**: hero with brand statement and dual CTA (Explore Collection / Our Story), collection cards for the four product lines, and an introduction to Lily & Leo.
- **Character & story sections**: warm, illustrated treatment for Lily & Leo distinct from the clean product-photography style used elsewhere, without breaking the overall premium tone.
- **Microcopy tone**: elegant, sensory, and story-led throughout (cart = "Your Squares," add-to-cart = "Add to My Squares," checkout = "Complete Your Order," etc. — see brand copy doc for full list).
- **Corporate/custom pages**: calmer, more information-dense layout suited to B2B enquiry forms, while retaining brand typography and colour.

---

### Open Questions / Assumptions to Confirm

- Tech stack not yet finalised — given prior conversations, Next.js/React (frontend), Node.js/Express (backend), and a Razorpay-style gateway are the likely default stack unless otherwise decided.
- Accounts: assumed guest checkout + optional account/order history; confirm if login is required.
- Corporate/custom order forms are assumed to route to email/CRM rather than complete a live checkout — confirm the intended lead pipeline (e.g., email, WhatsApp, CRM integration).
