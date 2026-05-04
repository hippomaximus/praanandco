# Praan & Co.

A static, fast, SEO-optimised marketing site for **Praan & Co.** — specifying engineers for the indoor cigar environment, based in Bangkok and operating across Asia and the Middle East.

Built in heritage British engineering style: light cream background, deep British Racing Green primary, oxblood claret accent, aged brass detail. Cormorant Garamond serif. Roman-numeral section markers. Formal editorial voice.

---

## Stack

- **HTML5** — semantic markup, JSON-LD schema
- **CSS3** — single stylesheet, design tokens, mobile-first, no preprocessor
- **Vanilla JS** — one file, < 4 KB minified, handles mobile nav, scroll reveal, and form
- **Fonts** — Cormorant Garamond (display), Inter (body), JetBrains Mono — all from Google Fonts
- **Hosting** — Vercel (zero-config static)
- **Domain** — praanandco.com

---

## File structure

```
praan-site/
├── index.html              ← Home (hero · marquee · problem · two-stage · products · applications · differentiator · process · CTA)
├── technology.html         ← Methodology — three pillars (filtration · ionisation · containment)
├── products.html           ← The product range (5 categories, ~20 SKUs)
├── applications.html       ← Use cases (lounges, hotels, retail, etc.)
├── contact.html            ← Enquiries, dealer programme, technical
├── css/
│   └── styles.css          ← Heritage design system, all tokens
├── js/
│   └── main.js             ← Nav, scroll reveal, form handler
├── images/                 ← Drop product photography here when ready
├── robots.txt
├── sitemap.xml
├── vercel.json             ← Clean URLs, security headers, cache rules
├── .gitignore
└── README.md
```

---

## Design System

### Colour palette

```css
--bg:      #F5EFE0   /* parchment cream — page background */
--bg-elev: #EFE7D2   /* slightly deeper cream for elevated sections */

--ink:     #1A1814   /* near-black for body type */
--ink-soft:#3D3830   /* warm grey-brown for secondary text */

--green:   #0E3A2A   /* British Racing Green — primary brand */
--oxblood: #6E2A2C   /* claret — secondary accent */
--brass:   #A8843E   /* aged brass — line work, ornament */
```

### Typography

- **Display**: Cormorant Garamond, regular and italic, 400/500 weights
- **Body**: Inter, 400/500/600/700
- **Small caps / mono**: JetBrains Mono for engineering data, Cormorant for editorial small caps
- **Section markers**: Roman numerals (i, ii, iii…) in small caps with brass underline

### Voice

Heritage British engineering. Formal but warm. "We shall return…" rather than "We'll get back to you." "Particulars" rather than "details." "By correspondence" rather than "Email." Roman numerals throughout. American spellings ("color", "ionization") have been converted to British ("colour", "ionisation").

---

## Before launching — required edits

There are **three** things to update before this goes live. All are simple find-and-replace.

### 1. Domain

Every page references `https://praanandco.com` already, so no change required if the domain is correct. If you change it later:

```bash
# macOS:
LC_ALL=C find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.md" \) -exec sed -i '' 's|https://praanandco.com|https://yourdomain.com|g' {} +

# Linux:
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.md" \) -exec sed -i 's|https://praanandco.com|https://yourdomain.com|g' {} +
```

### 2. Form handler

The contact form on `contact.html` uses a placeholder JS handler in `main.js` that simply shows a success message and resets the form. **Wire it to a real backend before launch.** Three options:

#### A. Formspree (fastest, free tier)

In `contact.html`, change the `<form>` opening tag:

```html
<form class="contact-form reveal" name="quote" data-form="quote"
      action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Then in `js/main.js`, **delete the entire form-submission block** (the form will submit natively to Formspree).

#### B. Resend / SendGrid via Vercel serverless

Create `api/contact.js` in the project root:

```js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  // POST to Resend / SendGrid / your own SMTP relay here
  return res.status(200).json({ ok: true });
}
```

#### C. n8n webhook

Given your existing n8n stack: have the form `fetch()` a webhook on your n8n instance, then route to Telegram + Airtable + email from there.

### 3. Contact details

In `contact.html`, replace:

- `enquiries@praanandco.com` → real address
- `partners@praanandco.com` → dealer enquiries
- `engineering@praanandco.com` → technical
- `+66 (0) 00 000 0000` → real phone
- `@praanandco` → real LINE ID
- "Bangkok, Thailand" → office location if different

---

## Deployment — GitHub → Vercel

```bash
cd praan-site
git init
git add .
git commit -m "Initial commit: Praan & Co."
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/praan-site.git
git push -u origin main
```

Then at vercel.com/new: import the repo, framework preset "Other", leave build command and output dir blank, click Deploy. Add `praanandco.com` and `www.praanandco.com` in project settings → Domains. Vercel will give you DNS records to set at your registrar (typically an A record and a CNAME). HTTPS auto-provisions.

Subsequent deploys: push to `main`. Vercel auto-deploys.

---

## Thai version (later)

The site is structured for a sister Thai-language tree at `/th/`. When you're ready:

1. Create `/th/index.html`, `/th/technology.html`, etc.
2. hreflang tags on every page already point at `/th/[page].html`
3. Update `sitemap.xml` to include the `/th/*` URLs as full `<url>` entries
4. Add a language switcher to the nav

For typography on the Thai subtree, swap Cormorant Garamond for `Noto Serif Thai` (display) and Inter for `IBM Plex Sans Thai` (body).

---

## Content management

Static HTML — content baked in. To update:

- **Add a product** — open `products.html`, copy a `<article class="product-card">` block in the right section, edit model/name/description/specs/SVG
- **Add a use case** — open `applications.html`, copy an existing `<section>` or an `<article class="app-item">` from the secondary grid
- **Update copy** — edit the relevant `.html` directly
- **Add photography** — drop into `/images/`, reference with `<img src="/images/your-photo.jpg" alt="…" loading="lazy">`. SVG product placeholders can be swapped for real photography one-for-one.

If content load outgrows direct HTML editing, migrate to **Astro** — same static output, content in MDX with frontmatter.

---

## Brandmark

Small heritage roundel in inline SVG: outer brass circle, inner P-monogram in racing green, italic ampersand in oxblood. Sits at 36×36px in header and footer. Search for `class="brand-mark"` in each HTML file (10 occurrences total — 2 per page × 5 pages) to replace with a custom logo. Keep the parent `<a class="brand">` structure.

Favicon is also an inline SVG data URI — search for `<link rel="icon"`.

---

## Customisation

All colour, font, spacing, and shadow tokens are CSS variables in `:root` at the top of `css/styles.css`. To rebrand visually, edit only that block.

---

## Suggested next additions

In priority order:

1. **Project case studies / portfolio page** — once installations worth showcasing exist
2. **Founder / team page** — heritage brands need a face. A brief "Our Practice" page with one or two photos lifts credibility considerably
3. **Technical specification PDFs** — downloadable per-product datasheets, behind email signup
4. **Lead magnet** — a "Cigar Lounge Air Quality Specification Guide" PDF, gated behind email; mirrors the Puros Environmental book play at lower commitment
5. **Photography** — replace SVG product placeholders with proper studio photography
