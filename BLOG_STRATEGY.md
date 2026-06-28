# Kodable.ai — Blog content strategy

A data-grounded plan to grow organic + AI-search visibility, built around Kodable's
four service pillars (websites · AI agents · custom tools · automations) and its
audience: owners of small **local** businesses (restaurants, salons/clinics,
tradespeople, shops) in Spain and wider Europe.

Topic and keyword selection was grounded with live Perplexity research (June 2026);
every statistic used in the posts is restricted to a short approved list with named
sources (Google / Think with Google, Meta, the Lead Response Management study), and
each post was adversarially fact-checked before publishing — no fabricated numbers.

## Topical authority map (4 clusters, 3 pillars)

```
AI for small business (PILLAR · /blog/ai-for-small-business-2026-guide)
│   the hub everything links up to — definitional, citation-bait
├── AI Agents cluster
│   ├── PILLAR: Why you lose bookings after hours (ai-agents-after-hours-bookings)
│   ├── WhatsApp AI assistants for restaurants
│   └── Cut no-shows at your salon or clinic
├── Getting Found cluster
│   ├── PILLAR: Local SEO "near me" 2026 (local-seo-near-me-2026)
│   ├── Your website has 3 seconds (speed → conversions)
│   └── Get recommended by ChatGPT / Google AI  (GEO)
└── Automation cluster
    ├── 7 automations every local business should have
    └── Off-the-shelf vs custom (decision guide)

Data magnet (links into AI Agents): The real cost of missed calls
```

## The 10 launch posts

| # | Title | Primary keyword | Intent | Cluster | Priority |
|---|-------|-----------------|--------|---------|----------|
| 1 | Why You Lose Bookings After Hours (and How an AI Agent Fixes It) | AI agent for small business bookings | Commercial | AI Agents (pillar) | Big bet |
| 2 | WhatsApp AI Assistants for Restaurants | WhatsApp AI assistant for restaurants | Commercial | AI Agents | Quick win |
| 3 | How to Cut No-Shows at Your Salon or Clinic | reduce no-shows salon clinic automated reminders | Commercial | AI Agents | Quick win |
| 4 | Local SEO in 2026: How to Show Up When People Search "Near Me" | local SEO near me 2026 | Informational | Getting Found (pillar) | Big bet |
| 5 | Your Website Has 3 Seconds: Why Speed Decides Who Gets the Customer | website speed small business conversions | Informational | Getting Found | Quick win |
| 6 | Getting Found by AI: Make ChatGPT & Google AI Recommend Your Business | how to get recommended by ChatGPT local business | Informational | Getting Found (GEO) | Big bet |
| 7 | Stop Copy-Pasting Between Apps: 7 Automations Every Local Business Should Have | small business automation ideas | Informational | Automation | Quick win |
| 8 | Off-the-Shelf vs Custom: When You Actually Need Your Own Tool | custom software vs off the shelf small business | Commercial | Automation | Fill-in |
| 9 | AI for Small Business in 2026: A Plain-English Guide (No Hype) | AI for small business 2026 guide | Informational | Strategy (master pillar) | Big bet |
| 10 | The Real Cost of Missed Calls for a Small Business | cost of missed calls small business | Informational | Strategy (data) | Quick win |

## Internal linking plan (hub-and-spoke)

- **Master hub** = #9 (AI for small business). It links down to all four pillars; the
  pillars and the homepage/services link back up to it. (#9 carries 7 internal links.)
- **Cluster pillars** (#1, #4) link to their two siblings and to the relevant
  `/services/*` page; siblings link back to the pillar.
- Every post links to **2–3** related posts + its **service page** with natural anchor
  text (rendered inline from `~/blog/...` / `~/services/...` tokens). All links verified
  to resolve.
- Each post's hero CTA points at the single most relevant service; the page foot reuses
  the site-wide consultation CTA.

## Suggested publishing cadence

The 10 are seeded with staggered `datePublished` (Jan–May 2026) so the archive reads as
an established blog. Going forward, **1 post/week** sustains momentum; **2–3/week** if
pushing for authority. Refresh the two pillars (#1, #4, #9) every ~6 months.

## Why this should move the needle

- **Search**: long-tail, low-competition, high-intent local queries the audience
  actually types — plus two informational pillars to build topical authority.
- **AI search / GEO**: posts are structured as clear question→answer explainers with
  `BlogPosting` + `BreadcrumbList` JSON-LD and an FAQ-style shape — the format AI answer
  engines quote. Post #6 directly targets the "get recommended by AI" query.
- **Conversion**: every post ladders to a service + the free 15-minute consultation,
  matching the site's StoryBrand funnel.

## What was shipped (in `kodable-site`)

- `src/content/blog.ts` + `src/content/blog-data.json` — typed content (10 posts).
- `src/app/[locale]/blog/page.tsx` — index (featured + grid).
- `src/app/[locale]/blog/[slug]/page.tsx` — article (block renderer, JSON-LD).
- `src/app/globals.css` — `.blog-*` styles on the existing chat-native tokens.
- Wired into nav + footer (`site.ts`) and `sitemap.ts`.

## Next steps / backlog

1. **Translate** the 10 posts into ES/FR/DE/IT (chrome already localises; bodies are
   English for v1). ES first — it's the primary market. This roughly 5×'s indexable pages.
2. Add **hreflang** per-post once translated (today canonical is per-locale).
3. Publish 2–3 **new** posts/month following the cluster map (candidates: "AI vs hiring a
   receptionist", "Google Business Profile checklist", "WhatsApp Business API explained",
   industry cuts for plumbers/dentists/cafés).
4. Build 1–2 **interactive tools** as link-bait + lead capture: a "missed-call cost
   calculator" (extends post #10) and a "is your site fast enough?" checker (post #5).
5. Connect posts to **Google Search Console**; track the 10 primary keywords + AI-citation
   appearances (ChatGPT/Perplexity/AI Overviews).

## Success metrics

- Organic sessions to `/blog/*` and assisted consultations from blog → contact.
- Rankings for the 10 primary keywords (target: page 1 for the quick-wins within ~90 days).
- AI-engine citations for posts #6 and #9.
- Internal-link CTR from posts → service pages.
