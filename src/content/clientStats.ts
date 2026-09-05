/* ============================================================================
   Real, checkable analytics figures for client sites we build and run.

   Source of truth: the client site's own Lovable analytics (owner workspace,
   project `valencia-camp-revamp` → valenciacamperpark.com). NO-FABRICATION
   RULE: every number here must be copied verbatim from that dashboard, never
   estimated, never rounded up. Percentages may round to the nearest integer.

   This snapshot is the baked fallback. src/lib/clientStats.ts overlays a
   fresher row from the `kodable_client_stats` table (read-only publishable
   key, or service-role env vars when set), so ops can refresh the public
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

// Pulled 2026-09-05 from Lovable analytics, window 2026-08-06 -> 2026-09-05
// (get_project_analytics, project 1f6fdca9-41fd-412b-96e9-9664fda3b30e, start
// 2026-08-06T00:00:00Z, end 2026-09-05T23:59:59Z): visitors 10,140 · pageviews
// 25,575 · avg session 145 s · devices mobile 7,648 / desktop 3,687 / tablet 64
// -> 67% mobile.
export const VCP_STATS: ClientStats = {
  slug: "valenciacamperpark",
  name: "Valencia Camper Park",
  url: "https://valenciacamperpark.com",
  periodDays: 30,
  updatedAt: "2026-09-05",
  visitors: 10140,
  pageviews: 25575,
  avgSessionSec: 145,
  mobilePct: 67,
};
