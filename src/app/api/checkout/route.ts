// POST /api/checkout — creates a Stripe Checkout Session (subscription mode:
// monthly quota as recurring line items + setup as a one-time line item on the
// first invoice). Card + SEPA Direct Debit, Spanish checkout.
//
// Stripe is called over its REST API with fetch (no SDK dep, same pattern as
// every other external call in this codebase). Without STRIPE_SECRET_KEY the
// route answers 503 and the page shows a "not yet enabled" message — see
// cloud-ops/STRIPE_SETUP_RUNBOOK.md in the ops repo.
import { rateLimited } from "@/lib/leads";
import { PLANS, planLines, CONTRACT_VERSION } from "@/lib/checkoutPlans";

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

interface CheckoutInput {
  plan?: unknown;
  founding?: unknown;
  business?: unknown;
  email?: unknown;
  accepted?: unknown;
}

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json(
      { ok: false, error: "Los pagos online aún no están activados — escríbenos por WhatsApp y lo hacemos en persona." },
      { status: 503 },
    );
  }
  if (rateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, error: "Demasiados intentos — prueba en unos minutos." },
      { status: 429 },
    );
  }

  let body: CheckoutInput;
  try {
    body = (await request.json()) as CheckoutInput;
  } catch {
    return Response.json({ ok: false, error: "Petición no válida." }, { status: 400 });
  }

  const plan = body.plan === "web-agente" ? "web-agente" : "web";
  const founding = body.founding === true;
  const business = typeof body.business === "string" ? body.business.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (body.accepted !== true) {
    return Response.json(
      { ok: false, error: "Tienes que aceptar las condiciones para continuar." },
      { status: 400 },
    );
  }
  if (!business) {
    return Response.json(
      { ok: false, error: "Dinos el nombre del negocio." },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  const p = new URLSearchParams();
  p.set("mode", "subscription");
  p.set("locale", "es");
  p.set("payment_method_types[0]", "card");
  p.set("payment_method_types[1]", "sepa_debit");
  p.set("success_url", `${origin}/es/contratar/gracias?session_id={CHECKOUT_SESSION_ID}`);
  p.set("cancel_url", `${origin}/es/contratar`);
  if (email) p.set("customer_email", email);

  let i = 0;
  for (const line of planLines(plan, founding)) {
    // recurring quota
    p.set(`line_items[${i}][price_data][currency]`, "eur");
    p.set(`line_items[${i}][price_data][product_data][name]`, `${line.name} — cuota mensual`);
    p.set(`line_items[${i}][price_data][recurring][interval]`, "month");
    p.set(`line_items[${i}][price_data][unit_amount]`, String(line.monthlyCents));
    p.set(`line_items[${i}][quantity]`, "1");
    i++;
    // one-time setup, charged on the first invoice
    p.set(`line_items[${i}][price_data][currency]`, "eur");
    p.set(`line_items[${i}][price_data][product_data][name]`, `${line.name} — puesta en marcha`);
    p.set(`line_items[${i}][price_data][unit_amount]`, String(line.setupCents));
    p.set(`line_items[${i}][quantity]`, "1");
    i++;
  }

  // Contract acceptance travels with the subscription for the paper trail.
  const meta: Record<string, string> = {
    business,
    plan,
    founding: String(founding),
    contract_version: CONTRACT_VERSION,
    accepted_at: new Date().toISOString(),
  };
  for (const [k, v] of Object.entries(meta)) {
    p.set(`metadata[${k}]`, v);
    p.set(`subscription_data[metadata][${k}]`, v);
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: p.toString(),
    });
    const json = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      console.error("[checkout] stripe refused:", json.error?.message);
      return Response.json(
        { ok: false, error: "No hemos podido iniciar el pago — inténtalo de nuevo o escríbenos." },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, url: json.url });
  } catch (err) {
    console.error("[checkout] stripe error:", err);
    return Response.json(
      { ok: false, error: "No hemos podido iniciar el pago — inténtalo de nuevo o escríbenos." },
      { status: 502 },
    );
  }
}
