// GET /api/leads — owner-only export of stored leads + the conversion summary.
// Guarded by ADMIN_TOKEN (env). Send it in the header (NOT the query string,
// which leaks into logs/history):  Authorization: Bearer <ADMIN_TOKEN>
// Add ?format=csv for a spreadsheet download.
//
// Note: on serverless hosts the data/ files are per-instance and ephemeral, so
// email (Resend) is the durable delivery channel; this endpoint is most useful on
// a long-running host or in local dev.
import { timingSafeEqual } from "node:crypto";
import { readLeads, leadsToCsv } from "@/lib/leads";
import { readEvents, summarise } from "@/lib/events";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function authorized(request: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  // Header-only. A token in the query string (?token=) leaks into server/proxy/
  // CDN access logs, browser history and Referer headers, so we require it in the
  // Authorization header instead:  Authorization: Bearer <ADMIN_TOKEN>
  const auth = request.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  return provided.length > 0 && safeEqual(provided, expected);
}

export async function GET(request: Request) {
  if (!process.env.ADMIN_TOKEN) {
    return Response.json(
      { ok: false, error: "Admin export is not configured. Set ADMIN_TOKEN." },
      { status: 503 },
    );
  }
  if (!authorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const leads = await readLeads();
  const url = new URL(request.url);

  if (url.searchParams.get("format") === "csv") {
    return new Response(leadsToCsv(leads), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="kodable-leads.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const events = summarise(await readEvents());
  return Response.json(
    { ok: true, count: leads.length, leads, conversions: events },
    { headers: { "Cache-Control": "no-store" } },
  );
}
