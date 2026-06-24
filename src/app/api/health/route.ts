// GET /api/health — a tiny uptime/health endpoint. Useful for the monitoring
// Kodable offers clients (point an uptime checker here) and for deploy smoke checks.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "kodable.ai",
      time: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
