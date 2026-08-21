// Site-wide content switches.
//
// SHOW_PRICING: public price display. OFF since 2026-08-21 (owner directive):
// no figures anywhere on the public site, the quote is confirmed on the free
// consultation instead. Nothing is deleted, only gated, so flipping this back
// to true restores every surface at once: the /pricing page and its Offer
// schema, the nav entry, the sitemap URL, the home and service-card price
// links, the per-service price block, the priced FAQ answers, and the
// priceRange on the organisation schema.
//
// Deliberately NOT gated: /contratar and /contratar/gracias. Those are the
// unlinked checkout flow (never in the nav or the sitemap), and a checkout has
// to state what the customer is about to pay.
export const SHOW_PRICING = false;
