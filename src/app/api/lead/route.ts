// POST /api/lead — the contact form backend.
// Validates, rate-limits, persists, and best-effort notifies. Returns plain JSON
// the client form renders into a friendly success / error state.
import {
  validateLead,
  isSpam,
  tooFast,
  saveLead,
  deliverLead,
  rateLimited,
  localeFromInput,
  errorMessages,
  type LeadInput,
} from "@/lib/leads";
import { recordEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: LeadInput;
  try {
    body = (await request.json()) as LeadInput;
  } catch {
    return Response.json(
      { ok: false, errors: { message: "Invalid request." } },
      { status: 400 },
    );
  }

  const locale = localeFromInput(body.locale);
  const m = errorMessages(locale);

  // Honeypot + time-trap: pretend success so bots don't learn they were caught.
  if (isSpam(body) || tooFast(body)) {
    return Response.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return Response.json({ ok: false, errors: { form: m.rate } }, { status: 429 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    await saveLead(result.lead);
    await deliverLead(result.lead);
    await recordEvent({
      type: "lead_submitted",
      path: `/${result.lead.locale}/contact`,
      locale: result.lead.locale,
      at: result.lead.receivedAt,
    });
  } catch (err) {
    console.error("[lead] handler error:", err);
    return Response.json({ ok: false, errors: { form: m.server } }, { status: 500 });
  }

  return Response.json({ ok: true });
}

// A friendly GET so hitting the URL in a browser doesn't 405-confuse anyone.
export async function GET() {
  return Response.json({ ok: true, hint: "POST a lead to this endpoint." });
}
