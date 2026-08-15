// Live-ish client stats for /casos. Mirrors the bookings Supabase seam
// (src/lib/bookings.ts): with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set,
// figures come from the `kodable_client_stats` row for the slug (cached via
// ISR for an hour), so refreshed analytics show up WITHOUT a redeploy. Without
// the env vars - or on any fetch/shape problem - the baked snapshot renders,
// so the page can never show an empty or broken stats block.
import "server-only";
import { type ClientStats, VCP_STATS } from "@/content/clientStats";

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SB_TABLE = "kodable_client_stats";
const REVALIDATE_SECONDS = 3600;

// Positive-int / date-string guards: a half-filled DB row must not replace
// real snapshot numbers with 0 or NaN on the public site.
function posInt(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}
function isoDate(v: unknown): string | null {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : null;
}

export async function getClientStats(slug: string): Promise<ClientStats> {
  const fallback = VCP_STATS.slug === slug ? VCP_STATS : null;
  if (!fallback) throw new Error(`unknown client stats slug: ${slug}`);
  if (!SB_URL || !SB_KEY) return fallback;
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/${SB_TABLE}?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!res.ok) return fallback;
    const rows: unknown = await res.json();
    const row = Array.isArray(rows) ? (rows[0] as Record<string, unknown>) : undefined;
    if (!row) return fallback;
    return {
      ...fallback,
      periodDays: posInt(row.period_days) ?? fallback.periodDays,
      updatedAt: isoDate(row.updated_at) ?? fallback.updatedAt,
      visitors: posInt(row.visitors) ?? fallback.visitors,
      pageviews: posInt(row.pageviews) ?? fallback.pageviews,
      avgSessionSec: posInt(row.avg_session_sec) ?? fallback.avgSessionSec,
      mobilePct: posInt(row.mobile_pct) ?? fallback.mobilePct,
    };
  } catch {
    return fallback;
  }
}
