# Kodable.ai — session handoff (2026-06-23)

Hand-off for continuing in a fresh Claude Code window. Read this + `BACKEND.md`
first. The live site is the Next.js app in **`kodable-site/`**.

## TL;DR — current state
- `kodable-site/` is a **bilingual (ES/EN) Next.js 16 + React 19** marketing site
  for **Kodable.ai**, a small web studio building websites for small businesses.
- `next build` is **green (31 pages)**. Run it from `kodable-site/`.
- It was rebuilt this session from a chosen design concept (**draft‑08,
  "Conversational / Chat‑native"** — see `../website-drafts/`).
- A real **backend** exists (contact form → validation → anti‑spam → store →
  email). See `BACKEND.md`.
- Several brand pivots were applied (below). **Follow those conventions** — do
  not reintroduce what was deliberately removed.

## Stack & CRITICAL Next.js 16 gotchas
- Next **16.2.6**, React **19.2.4**, TypeScript strict, Tailwind v4 installed but
  **not used** (the design system is hand‑written plain CSS in `globals.css`).
- ⚠️ This Next version differs from training data. **Read
  `node_modules/next/dist/docs/` before writing Next code.** Specifically:
  - `middleware` is renamed to **`proxy`** → the file is `src/proxy.ts`,
    `export function proxy(request)`. It does the locale redirect.
  - **`params` is a `Promise`** in pages/layouts → `const { locale } = await params;`.
  - Global type helpers `PageProps<'/[locale]'>` / `LayoutProps<...>` exist.
- Shell tip: the Bash tool's cwd resets to the repo root each call — use absolute
  paths or `cd kodable-site && …`.

## Architecture
- **i18n routing:** everything lives under `src/app/[locale]/` (locales `en`,`es`,
  default `en`). `src/proxy.ts` redirects un‑prefixed paths. The **root layout**
  is `src/app/[locale]/layout.tsx` (there is no `app/layout.tsx`). Config in
  `src/i18n/config.ts`.
- **Content (bilingual data):** `src/content/` — `site.ts` (hub: nav, hero, chat,
  promises, scenarios, how‑it‑works, trust, consultation, finalCta, footer,
  common), `services.ts` (4 services + per‑slug detail), `faq.ts`,
  `contact-info.ts` (placeholder WhatsApp/phone/email). Each exports
  `getX(locale)`.
- **Pages:** home (`[locale]/page.tsx`), `services` + `services/[slug]`,
  `work`, `about`, `contact`, `faq`, `privacy`, `terms`. Page‑specific prose is a
  local `const copy = { en, es }[locale]` object inside each page.
- **Components:** `src/components/` — `Nav` (client, mobile menu + ES/EN toggle),
  `Footer`, `Logo` (solid bolt), `Reveal` (scroll‑reveal client controller),
  `Icon` (inline SVG set), `SectionHead`, `ServiceCard`, `ChatMockup`,
  `BookingMockup`, `ContactForm` (client), `FinalCta`, `PricingTables` is GONE,
  `ConversionTracker` (client analytics).
- **Design system:** `src/app/globals.css`. Tokens: emerald accent `--accent
  #0e8266`, paper `--paper`, ink, etc. Fonts via `next/font`: **Hanken Grotesk**
  (display) + **Spline Sans** (body). Semantic classes (`.btn`, `.sec`,
  `.svc`, `.msg`, `.you-card`, `.price`/dead, `.consult-card`, etc.). Reveal
  animation = add class `reveal`.

## Brand & copy conventions (decisions made THIS session — keep them)
1. **Team voice, never solo.** "we/us/our", "our team", "a small studio".
   Never "I/me/my/one‑person studio/a real person". EXCEPTION: the **customer's**
   voice stays first person — CTAs "Design my site" / "Get me found", and the
   form placeholder "e.g. I run a café…".
2. **No pricing on the site.** Pricing was removed; the offer is a **"Book a free
   consultation"** (everything routes to `/contact`). No price list anywhere.
   (Terms says prices are quoted individually after a consultation.)
3. **Location‑agnostic.** All **Costa Blanca / Valencia / Alicante / coastal**
   branding was removed. Don't reintroduce a place. Demo business names like
   "Casa del Mar" / "Clínica Bella" are kept (they're example clients).
4. **Bilingual is NOT a selling point.** The site still works in ES + EN (toggle,
   `/es` routes, full Spanish content — keep that), but copy must **not pitch**
   "bilingual / Spanish & English / in both languages". The hero chat demo is
   **monolingual per locale**. The studio is "abstract / applies to all"; specific
   needs are left for the consultation conversation.
5. **No emojis** in UI — use the stroke icons in `Icon.tsx` (added restaurant /
   salon / trades / shop). The ★ star‑rating glyph is allowed (it's a rating).
6. **Logo = solid emerald bolt** (`Logo.tsx`) + matching favicon `app/icon.svg`.
   No outline/sparks.
7. Voice is plain, warm, owner‑facing; tech terms only in an "under the hood"
   footnote. `../PRODUCT.md` is the impeccable design‑context doc (kept current).

## Backend (full details in `BACKEND.md`)
- `POST /api/lead` — validate → honeypot + time‑trap + rate‑limit → `saveLead`
  (`data/leads.ndjson`) → `deliverLead` (owner email + bilingual customer
  auto‑reply). `src/lib/leads.ts`.
- **Email is turnkey via Resend** but not yet active: set `RESEND_API_KEY` in
  `.env.local` (already has `LEAD_NOTIFY_EMAIL=marcosconleynavarro24@gmail.com`).
  Until a key is set, emails are previewed to `data/outbox/*.txt`.
- `POST /api/event` + `ConversionTracker` — cookieless WhatsApp/call/email tap
  analytics (`data/events.ndjson`). `GET /api/health`. `GET /api/leads?token=…`
  (admin export, needs `ADMIN_TOKEN`; supports `&format=csv`).
- Security headers (CSP etc.) in `next.config.ts`.
- `data/` is gitignored (contains lead PII). On serverless (Vercel) `data/` is
  ephemeral → email is the durable channel; wire a DB to the seams if needed.

## Run / build / verify
- Dev: `cd kodable-site && npm run dev` (a preview config exists in
  `../.claude/launch.json` as **"kodable"**, port **3100**).
- Build/typecheck: `cd kodable-site && npx next build`.
- A "drafts" launch config serves the static design drafts (`../website-drafts/`).
- Placeholder contact details to replace before launch: `wa.me/34600000000`,
  `+34 600 000 000`, `hola@kodable.ai` (in `src/content/contact-info.ts`).

## Other artifacts in the repo root (`../`)
- `website-drafts/` — the **10 standalone HTML design drafts** + an `index.html`
  gallery. Draft‑08 (`draft-08-conversational-chat.html`) is the one built out.
- `PRODUCT.md` — design context (register=brand, audience, services, voice,
  anti‑references). Location‑agnostic now.
- The **"impeccable" design skill** is installed (`.claude/skills/impeccable/`)
  with a design‑detector hook. Use `/impeccable <command>` (audit, polish,
  critique, etc.). It flags AI‑slop patterns on edits.
- **Real estate was fully removed** from the lead‑gen materials this session
  (CSV/XLSX/scripts/Gemini prompts/market‑research docx). Don't re‑add it.

## Open items / TODO / known issues
- [ ] Add a real `RESEND_API_KEY` (+ verify the kodable.ai domain) to turn on
      live email; confirm a real send end‑to‑end.
- [ ] Replace placeholder contact details (`contact-info.ts`).
- [ ] Real client reviews/testimonials are intentionally absent (honest copy
      says "examples coming"); fill when available.
- [ ] Hero subhead still says "people nearby find you" — mildly local; user was
      asked, left as‑is (ties to local‑SEO service). Revisit if desired.
- [ ] The Next dev overlay shows a "1 Issue" badge in dev; `next build` is clean,
      so it's a dev‑only notice (user declined investigating it — leave unless asked).
- [ ] Optional polish offered, not done: carry the solid bolt into the OG image;
      possible "scaling business through AI" positioning (user hasn't confirmed).
- [ ] About page still renders a `trust` strip from `site.trust` (home trust
      section was removed; data kept for About).

## File quick‑reference
- Routing/i18n: `src/proxy.ts`, `src/i18n/config.ts`, `src/app/[locale]/layout.tsx`
- Content: `src/content/{site,services,faq,contact-info}.ts`
- Backend: `src/lib/{leads,events}.ts`, `src/app/api/{lead,event,health,leads}/route.ts`
- Design system: `src/app/globals.css`; components in `src/components/`
- Config/SEO: `next.config.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`,
  `src/app/opengraph-image.tsx`, `src/app/icon.svg`
