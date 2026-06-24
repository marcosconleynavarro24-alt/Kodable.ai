// POST /api/event — record a privacy-first conversion event (WhatsApp/call/email
// tap, or a lead submit). No cookies, no PII. Fire-and-forget from the client.
import { recordEvent, isEventType } from "@/lib/events";

export const dynamic = "force-dynamic";

function cleanPath(v: unknown): string {
  const s = typeof v === "string" ? v : "";
  return s.split("?")[0].split("#")[0].slice(0, 120) || "/";
}

function cleanLocale(v: unknown): string {
  return v === "es" ? "es" : "en";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  if (!isEventType(b.type)) {
    // Silently accept unknown types so a future client never errors the user.
    return Response.json({ ok: true });
  }

  await recordEvent({
    type: b.type,
    path: cleanPath(b.path),
    locale: cleanLocale(b.locale),
    at: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
