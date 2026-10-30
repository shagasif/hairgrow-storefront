# HairGrow Storefront

A polished, responsive single-page e-commerce storefront for **HairGrow**, a homemade organic hair-oil brand. It gives buyers an independent catalog and an express one-page checkout, so they can place an order straight away instead of waiting for manual replies on social media.

- Light and dark themes (soft off-white by default, remembered between visits)
- Floating glass navigation bar
- Catalog with concern filters, quantity controls and an ingredients viewer
- Sliding cart drawer with saved cart contents, item quantities and shipping totals
- Saved-products wishlist that persists between visits, with a shortcut to add items to the cart
- One-page checkout (Cash on Delivery or Easypaisa), digital invoice and order confirmation
- Optional WhatsApp order summary, prefilled for the customer to review and send
- Hair-concern quiz, care guide, testimonials, FAQ and an early-access waitlist
- Fully responsive, with accessible controls (keyboard focus, ARIA labels, reduced-motion support)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Hand-written CSS (`src/styles.css` base + `src/theme.css` theme and polish). The Tailwind v4 Vite plugin is installed and available. |
| Icons | `lucide-react` |
| State | React hooks only (`useState`, `useEffect`, `useRef`). No backend and no state library. |
| Persistence | `localStorage` stores the theme (`hairgrow-theme`), cart (`hairgrow-cart`), saved product IDs (`hairgrow-wishlist`), and browser-local orders (`hairgrow-orders`) |

---

## Getting started

Requirements: **Node.js 18 or newer** and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```

### Deploying

`npm run build` produces a static site in `dist/`. Upload that folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, shared hosting).

Track Order opens as a modal over the landing page.

There is no test script in `package.json`; `npm run build` is the available production-build check.

---

## Project structure

```
hairgrow-storefront/
├── .agents/
│   └── skills/
│       └── hairgrow-code-review/
│           └── SKILL.md      Reusable customer-flow code-review checklist
├── .github/
│   └── agents/
│       ├── bug-investigator.agent.md
│       ├── developer.agent.md
│       ├── documentation.agent.md
│       └── qa.agent.md       Four focused specialist-agent definitions
├── AGENT.md              Original product and design brief
├── ASSIGNMENT_PROGRESS.md Task and integration progress notes
├── README.md             This file
├── index.html            App shell (title, meta theme-color, fonts)
├── package.json
├── vite.config.js
├── docs/
│   └── skill-demonstration.md
├── public/
│   └── img/              All photos and the logo (served as /img/...)
└── src/
    ├── main.jsx          React entry point
    ├── App.jsx           All components, product data and app state
    ├── styles.css        Base layout and component styles
    └── theme.css         Design tokens, light/dark theme, glass nav, polish
```

Load order matters: `theme.css` comes after `styles.css` and intentionally overrides it. When changing a style, check `theme.css` first, because later rules there win.

---

## AI-agent workflow

The main agent coordinates the request: it checks the relevant project context, assigns a bounded task to the appropriate specialist when useful, and combines the results. The four specialists have distinct scopes:

- **Bug Investigator** (`.github/agents/bug-investigator.agent.md`) reproduces and documents a genuine bug; it does not edit files.
- **Developer** (`.github/agents/developer.agent.md`) implements a verified fix or explicitly scoped improvement and runs focused validation.
- **QA** (`.github/agents/qa.agent.md`) independently validates builds and relevant customer flows; it does not edit files.
- **Documentation Agent** (`.github/agents/documentation.agent.md`) maintains README setup, feature, usage, limitation, and workflow guidance.

For customer-flow reviews, investigations and changes, the reusable skill at `.agents/skills/hairgrow-code-review/SKILL.md` provides an evidence-based checklist for state flow, limits, persistence, validation, accessibility and regression risks. During Task 4, the coordinator loaded this skill while tracing and reviewing the cart-cap issue; it guided the investigation and review, rather than implementing a feature itself. Specialists stay within their stated constraints; the main agent remains responsible for coordinating and reporting the complete result.

To use a workspace custom agent, select its name from VS Code's agent picker and verify that the invocation is routed to that definition. A generic subagent/task request, or a matching agent name alone, does not establish that the custom agent ran. If custom-agent routing is unavailable, report the limitation rather than attributing generic work to the custom agent.

### Task 4 workflow and verified outcomes

Task 4 exposed a cart-cap bug: choosing 10 units and adding ten times could put 100 units in the cart, although cart restoration capped the saved quantity at 99. The implementation now caps additions at 99 and animates only the quantity actually added. The coordinator reproduced the issue in the browser, verified the fix and persistence, and ran the production build.

The Bug Investigator was later confirmed to have run as a workspace custom agent and verified the historical root cause. The Developer, QA, and Documentation workspace definitions were created, but the implementation, QA, and README work initially attributed to those roles was performed by generic task subagents, not verified runs of those custom agents. Later requests naming those agents explicitly reported that they were not routed through the custom-agent runtime. Do not count those requests as custom-agent executions.

The reusable HairGrow Code Review Skill guided the cart-flow review. A subsequent QA pass ran `npm.cmd run build` successfully and reviewed the source, but could not complete live browser checks because the local Vite server was unreachable from that test environment. The earlier coordinator-run browser regression passed; it is distinct from that incomplete QA run. There is no automated test script or existing source test suite.

---

## Page sections (in order)

1. **Header**: floating glass nav (Catalog, Ingredients, Care guide, Hair quiz, Stories, Track Order), circular day/night toggle, cart button with item count
2. **Hero**: full-width single-tone photo, headline, Shop now and Take hair quiz buttons
3. **Trust strip**: slim, continuously scrolling ticker (pauses on hover)
4. **Catalog**: concern filters and product cards
5. **Serum teaser**: "Coming soon" banner for the next product
6. **Ingredients, Care guide, Hair quiz, Testimonials, FAQ, Waitlist**
7. **Footer**: social links, navigation, WhatsApp and email contact, payment tags

Floating on every page: the **Need help?** WhatsApp button.

---

## Checkout flow

1. **Add to Cart** adds the chosen quantity and animates toward the cart button. Cart contents are saved in the browser and restored on a later visit.
2. The **cart drawer** lets the buyer change quantities, remove items and see the subtotal, delivery charge and total. Standard delivery is **Rs. 200** below a **Rs. 2,000** subtotal; shipping is free at or above that threshold.
3. **Proceed to express checkout** opens the one-page form:
   - Full name (required)
   - WhatsApp number (required). Digits, `+`, spaces, `(`, `)` and `-` are allowed, 9 to 18 characters.
   - Complete shipping address (required, at least 10 characters)
   - Payment method: **Cash on Delivery** or **Easypaisa** (selection only; no online payment is processed)
   - Itemized subtotal, delivery charge and order total
4. **Place order** validates the form. Invalid fields get a visible red message, the first invalid field is focused, and a notice appears above the button. Errors clear as the buyer types.
5. A valid order shows a digital **invoice** with an order reference in the format `HG-<date>-<random>`, customer and shipping details, and the final totals. The print action opens the browser print dialog, where the buyer can save the invoice as a PDF. The **Send via WhatsApp** link opens a prefilled order summary for the buyer to review and send.
6. **Complete Order** opens the confirmation popup. The cart is cleared when the order is created; the confirmation also offers the WhatsApp summary action.

## Saved items

Tap the heart on a product to add it to the wishlist, then open **Saved Items** in the header to view saved products. The wishlist is stored in the browser and restored across visits. From the wishlist drawer, remove an item or use **Add to Bag** to add it to the cart without removing it from saved items.

## Track an order

Choose **Track Order** in the navbar, then enter the Order ID from the invoice and the checkout phone number. The modal verifies both details against the saved order and displays its saved status across the Pending, Confirmed, Packed, Dispatched, and Delivered stages.

Orders and their current status are stored in the checkout browser only. Only orders placed after this feature is deployed are saved. There is no order-tracking backend or merchant status-update system yet, so tracking is limited to the same browser and new orders remain Pending until backend status updates are implemented.

---

## Customizing

### Products

Products live at the top of `src/App.jsx` in the `products` array.

- The first three entries (Miracle Oil, Mega Volume Pack, Root Ritual Double Pack) are written out in full.
- The six concern-specific oils are generated from a compact list below them. Each row is: `[id, name, filter label, concern, photo, description, ingredients]`.
- Prices are plain numbers in rupees (`price: 1200`).
- Product images are `public/img/p-<id>.jpg`.

The catalog shows the **first 6** products and reveals the rest behind a "View N more products" arrow button. The limit is the constant `INITIAL_PRODUCTS` in `src/App.jsx`. Filtering to a concern with 6 or fewer products hides the button.

### Contact details and social links

Search `src/App.jsx` for these placeholders and replace them with real values:

| What | Current placeholder |
| --- | --- |
| Instagram, Facebook, Twitter | the `socialLinks` array: `instagram.com/hairgrow.pk`, `facebook.com/hairgrow.pk`, `twitter.com/hairgrow_pk` |
| WhatsApp | `https://wa.me/923001234567` (appears in the footer and the Need help? button) |
| Email | `hello@hairgrow.pk` (footer, invoice, privacy dialog) |

### Colors and theme

All colors are CSS variables at the top of `src/theme.css`.

| Token | Light | Purpose |
| --- | --- | --- |
| `--bg` | `#f5f5f3` | Page background (soft off-white, not pure white) |
| `--bg-soft` | `#ecece9` | Alternate sections |
| `--surface` | `#fafaf8` | Cards and panels |
| `--forest` / `--forest-2` | `#0f3d2e` / `#1b5a43` | Brand green |
| `--gold` | `#c9a24b` | Accent (matches the oil drop) |

Dark-mode values are defined under `:root[data-theme="dark"]`. The glass effect uses `--glass-bg`, `--glass-border` and `--glass-shadow`.

### Hero image

`public/img/hero-bg.jpg` is a pre-processed 2000 × 1139 image (about 150 KB): one consistent tone, products on the right and ingredients along the bottom-left, so the left side stays clean behind the headline. The hero background color is `#d5d0c1`, which matches the image tone. If you replace the image, keep the left half calm so the heading stays readable, and update the `.hero` background color in `src/theme.css` to match.

---

## Design notes

- **Glass nav**: floating pill with `backdrop-filter` blur; the hero photo shows through it. The hero has extra top padding and the header a negative bottom margin to make that overlap work.
- **Trust strip**: a CSS-only marquee (`@keyframes trust-scroll`). The list is rendered twice so the loop is seamless. Under `prefers-reduced-motion` it stops and wraps.
- **Scroll reveal**: cards and headings fade up using CSS `animation-timeline: view()`. It is progressive enhancement; browsers without support simply show everything.
- **Day/night toggle**: a circular button with a sun icon in light mode and a moon in dark mode. It is exposed to assistive tech as a switch (`role="switch"`).
- **Mobile**: below 680 px the nav becomes a glass dropdown, the cart and checkout go full-screen, and form inputs use 16 px text so iOS does not zoom.

---

## Change log

| Version | Changes |
| --- | --- |
| v15 | Fixed the Place Order experience: errors were only 9 px text and easy to miss. Now clearly visible, with focus on the first invalid field and a notice above the button. Light theme changed to soft off-white. |
| v16 | Floating glass navigation; modern polish (radii, shadows, hover lift, scroll reveal, frosted overlays); larger checkout text; single-file HTML build. |
| v17 | Day/night pill switch; trust section turned into a scrolling marquee of glass cards. |
| v18 | Day/night toggle simplified to a circular sun/moon button; trust strip made about half as tall; hero trust line removed. |
| v19 | Top announcement bar removed; hero image rebuilt as a single tone across the whole hero with ingredients on the left; footer redesigned with Instagram, Facebook and Twitter links, WhatsApp call-to-action and payment tags. |
| v20 | "Carefully batch-made / Made in Pakistan" line removed from product cards; catalog shows 6 products with an arrow button for the rest. |

---

## Known limitations

- **There is no order backend or automatic order submission.** Checkout creates the invoice and confirmation in the browser and clears the cart. The optional WhatsApp action opens a prefilled message for the customer to review and send; it does not submit the order automatically. The confirmation's promise that the team will share tracking details must be fulfilled manually.
- Order tracking currently reads orders saved in the same browser's `localStorage`. It cannot verify orders from another device or receive merchant updates; orders placed before this feature was deployed are not available, and new orders remain Pending until a backend is added.
- No online payment is processed. Easypaisa is a selectable option only.
- Social links, the WhatsApp number and the email address are placeholders (see Customizing).
- Privacy Policy and Terms open a short placeholder dialog; replace the text with real policies before launch.
- Testimonials and the 5.0 ratings are hard-coded in the code. Make sure they reflect genuine customer feedback before launch.
- The product catalog is hard-coded in `App.jsx`; there is no admin panel or database.

---

© 2026 HairGrow Organic. All rights reserved.
