// /api/booking — the booking widget backend.
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
  type BookingInput,
} from "@/lib/bookings";
import { recordEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
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
    return Response.json({ ok: false, errors: { slot: "Invalid request." } }, { status: 400 });
  }

  const m = bookingMessages(body.locale);

  // Honeypot + time-trap: pretend success so bots don't learn they were caught.
  if (isSpam(body) || tooFast(body)) {
    return Response.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, errors: { slot: m.slot } },
      { status: 429 },
    );
  }

  const result = await validateBooking(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    await saveBooking(result.booking);
    await deliverBooking(result.booking);
    await recordEvent({
      type: "booking_submitted",
      path: `/${result.booking.locale}`,
      locale: result.booking.locale,
      at: result.booking.createdAt,
    });
  } catch (err) {
    console.error("[booking] handler error:", err);
    return Response.json(
      { ok: false, errors: { slot: m.slot } },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    booking: { date: result.booking.date, time: result.booking.time },
  });
}
