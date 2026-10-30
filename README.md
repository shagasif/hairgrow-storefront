# HairGrow Storefront

A polished, responsive single-page e-commerce storefront for **HairGrow**, a homemade organic hair-oil brand. It gives buyers an independent catalog and an express one-page checkout, so they can place an order straight away instead of waiting for manual replies on social media.

- Light and dark themes (soft off-white by default, remembered between visits)
- Floating glass navigation bar
- Catalog with concern filters, quantity controls and an ingredients viewer
- Sliding cart drawer and a one-page checkout (Cash on Delivery or Easypaisa)
- Order invoice and confirmation popup
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
| Persistence | `localStorage` stores only the chosen theme (`hairgrow-theme`) |

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

### Single-file HTML version

For sharing or quick previews, the project can also be packed into one self-contained `hairgrow-storefront.html`: CSS and JS are inlined, and every image is embedded as base64 (about 3 MB). It opens with a double-click and needs no server. Only the Google Fonts load from the internet; without a connection the system fonts are used.

---

## Project structure

```
hairgrow-storefront/
├── AGENT.md              Original product and design brief
├── README.md             This file
├── index.html            App shell (title, meta theme-color, fonts)
├── package.json
├── vite.config.js
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

## Page sections (in order)

1. **Header**: floating glass nav (Catalog, Ingredients, Care guide, Hair quiz, Stories, Order now), circular day/night toggle, cart button with item count
2. **Hero**: full-width single-tone photo, headline, Shop now and Take hair quiz buttons
3. **Trust strip**: slim, continuously scrolling ticker (pauses on hover)
4. **Catalog**: concern filters and product cards
5. **Serum teaser**: "Coming soon" banner for the next product
6. **Ingredients, Care guide, Hair quiz, Testimonials, FAQ, Waitlist**
7. **Footer**: social links, navigation, WhatsApp and email contact, payment tags

Floating on every page: the **Need help?** WhatsApp button.

---

## Checkout flow

1. **Add to Cart** adds the chosen quantity (1 to 10) and animates toward the cart button.
2. The **cart drawer** lets the buyer change quantities, remove items and see the subtotal.
3. **Proceed to express checkout** opens the one-page form:
   - Full name (required)
   - WhatsApp number (required). Digits, `+`, spaces, `(`, `)` and `-` are allowed, 9 to 18 characters.
   - Complete shipping address (required, at least 10 characters)
   - Payment method: **Cash on Delivery** or **Easypaisa**
4. **Place order** validates the form. Invalid fields get a visible red message, the first invalid field is focused, and a notice appears above the button. Errors clear as the buyer types.
5. A valid order shows an **invoice** with an order reference in the format `HG-<date>-<random>`. **Complete Order** then opens the confirmation popup, which resets the cart.

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

- **Orders are not sent anywhere yet.** The checkout validates, shows the invoice and confirmation, and resets the cart, but everything happens in the browser. To actually receive orders, connect the submit handler to a backend, a form service, email, or a WhatsApp Business API. The message "We will message you on WhatsApp shortly" is currently a promise the owner fulfills manually.
- No online payment is processed. Easypaisa is a selectable option only.
- Social links, the WhatsApp number and the email address are placeholders (see Customizing).
- Privacy Policy and Terms open a short placeholder dialog; replace the text with real policies before launch.
- Testimonials and the 5.0 ratings are hard-coded in the code. Make sure they reflect genuine customer feedback before launch.
- The product catalog is hard-coded in `App.jsx`; there is no admin panel or database.

---

© 2026 HairGrow Organic. All rights reserved.
