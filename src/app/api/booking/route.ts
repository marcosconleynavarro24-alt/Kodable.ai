// /api/booking - the booking widget backend.
//   GET  → availability (upcoming business days + slot states) for the picker
//   POST → validate → anti-spam → persist → email owner + client (with .ics)
import {
  getAvailability,
  validateBooking,
  isSpam,
  tooFast,
  rateLimited,
  saveBooking,
  deliverBooking,
  bookingMessages,
  SlotTakenError,
  type BookingInput,
  type BookingFailure,
} from "@/lib/bookings";
import { recordEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

// A failure that is not about what the visitor typed answers with a machine
// code, never a field message. These used to ride in errors.slot, which told the
// visitor to change a slot choice that was never the problem (and, since the
// widget reads errors.slot before its own generic copy, hid the real message).
// The widget maps each code to its own copy, which exists in all five locales.
function fail(error: BookingFailure, status: number): Response {
  return Response.json({ ok: false, error }, { status });
}

function clientIp(request: Request): string {
  // Prefer x-real-ip: on Vercel the platform sets it to the true client IP and
  // overwrites any client-supplied value, so it can't be spoofed to dodge the
  // rate limiter. x-forwarded-for's LEFTMOST entry is attacker-controlled, so if
  // we fall back to it we take the LAST hop (the one the proxy appended).
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const hops = fwd.split(",").map((s) => s.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale");
  const availability = await getAvailability(locale);
  return Response.json(availability, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: BookingInput;
  try {
    body = (await request.json()) as BookingInput;
  } catch {
    return fail("bad_request", 400);
  }

  const m = bookingMessages(body.locale);

  // Honeypot + time-trap: pretend success so bots don't learn they were caught.
  if (isSpam(body) || tooFast(body)) {
    return Response.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return fail("rate_limited", 429);
  }

  const result = await validateBooking(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  // Persist first. The UNIQUE(slot_date, slot_time) constraint is the real guard
  // against double-booking: if it fires, tell the user the slot was just taken
  // and send no confirmation.
  try {
    await saveBooking(result.booking);
  } catch (err) {
    if (err instanceof SlotTakenError) {
      return Response.json({ ok: false, errors: { slot: m.taken } }, { status: 409 });
    }
    console.error("[booking] save error:", err);
    return fail("save_failed", 500);
  }

  // The slot is secured - delivery and analytics are best-effort and must never
  // fail the booking now that it is stored.
  try {
    await deliverBooking(result.booking);
    await recordEvent({
      type: "booking_submitted",
      path: `/${result.booking.locale}`,
      locale: result.booking.locale,
      at: result.booking.createdAt,
    });
  } catch (err) {
    console.error("[booking] post-save delivery error:", err);
  }

  return Response.json({
    ok: true,
    booking: { date: result.booking.date, time: result.booking.time },
  });
}
