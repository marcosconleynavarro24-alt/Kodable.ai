/* ============================================================================
   Real, checkable analytics figures for client sites we build and run.

   Source of truth: the client site's own Lovable analytics (owner workspace,
   project `valencia-camp-revamp` → valenciacamperpark.com). NO-FABRICATION
   RULE: every number here must be copied verbatim from that dashboard — never
   estimated, never rounded up. Percentages may round to the nearest integer.

   This snapshot is the baked fallback. When SUPABASE_URL +
   SUPABASE_SERVICE_ROLE_KEY are set, src/lib/clientStats.ts overlays a fresher
   row from the `kodable_client_stats` table, so ops can refresh the public
   numbers without a redeploy (refresh runbook: leads/CLIENT_STATS_REFRESH.md
   in the ops repo).
   ========================================================================== */

export interface ClientStats {
  slug: string;
  name: string;
  url: string;
  /** Rolling window the counters cover, in days. */
  periodDays: number;
  /** ISO date (YYYY-MM-DD) the figures were last pulled from analytics. */
  updatedAt: string;
  visitors: number;
  pageviews: number;
  avgSessionSec: number;
  mobilePct: number;
}

// Pulled 2026-08-12 from Lovable analytics, window 2026-07-13 → 2026-08-12:
// visitors 10,333 · pageviews 26,338 · avg session 148 s · devices mobile
// 7,651 / desktop 3,197 / tablet 46 → 70% mobile.
export const VCP_STATS: ClientStats = {
  slug: "valenciacamperpark",
  name: "Valencia Camper Park",
  url: "https://valenciacamperpark.com",
  periodDays: 30,
  updatedAt: "2026-08-12",
  visitors: 10333,
  pageviews: 26338,
  avgSessionSec: 148,
  mobilePct: 70,
};
