import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/site";
import Icon from "./Icon";

// The "how it works" visual: a clinic booking widget mockup. Decorative content
// is aria-hidden; the single CTA links to the contact page.
export default function BookingMockup({
  locale,
  booking,
}: {
  locale: Locale;
  booking: SiteContent["how"]["booking"];
}) {
  return (
    <div
      className="booking reveal"
      role="img"
      aria-label={`${booking.title} — ${booking.place}`}
    >
      <div className="booking-head">
        <span className="b-ico" aria-hidden="true">
          <Icon name="calendar" />
        </span>
        <div>
          <h4>{booking.title}</h4>
          <p>{booking.place}</p>
        </div>
      </div>

      <div className="b-label" aria-hidden="true">
        {booking.chooseDay}
      </div>
      <div className="days" aria-hidden="true">
        {booking.days.map((day, i) => (
          <div key={day.dn} className={`day${i === 1 ? " sel" : ""}`}>
            <span className="dn">{day.dn}</span>
            {day.d}
          </div>
        ))}
      </div>

      <div className="b-label" aria-hidden="true">
        {booking.pickTime}
      </div>
      <div className="slots" aria-hidden="true">
        {booking.slots.map((slot) => (
          <div
            key={slot.t}
            className={`slot${slot.state === "taken" ? " taken" : ""}${
              slot.state === "pick" ? " pick" : ""
            }`}
          >
            {slot.t}
          </div>
        ))}
      </div>

      <Link href={`/${locale}/contact`} className="btn btn-primary">
        {booking.cta}
      </Link>
      <div className="confirm">
        <Icon name="check" />
        {booking.confirm}
      </div>
    </div>
  );
}
