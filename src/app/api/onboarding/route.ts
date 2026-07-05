// POST /api/onboarding — the new-client intake form backend.
// Same defensive shape as /api/lead (honeypot, time-trap, rate limit, last-hop
// IP), lighter validation: the sender is a client, not a cold visitor.
import { isSpam, tooFast, rateLimited, type LeadInput } from "@/lib/leads";
import {
  validateOnboarding,
  saveOnboarding,
  deliverOnboarding,
  type OnboardingInput,
} from "@/lib/onboarding";

export const dynamic = "force-dynamic";

function clientIp(request: Request): string {
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const hops = fwd.split(",").map((x) => x.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

export async function POST(request: Request) {
  let body: OnboardingInput;
  try {
    body = (await request.json()) as OnboardingInput;
  } catch {
    return Response.json(
      { ok: false, errors: { form: "Petición no válida." } },
      { status: 400 },
    );
  }

  // spam traps shared with the lead form (same field names)
  if (isSpam(body as LeadInput) || tooFast(body as LeadInput)) {
    return Response.json({ ok: true });
  }
  if (rateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, errors: { form: "Demasiados intentos — prueba en unos minutos." } },
      { status: 429 },
    );
  }

  const result = validateOnboarding(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  await saveOnboarding(result.onboarding);
  await deliverOnboarding(result.onboarding);
  return Response.json({ ok: true });
}
