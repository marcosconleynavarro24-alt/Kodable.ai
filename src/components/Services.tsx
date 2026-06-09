import Link from "next/link";
import { servicesCatalog } from "@/content/servicesCatalog";

export default function Services() {
  return (
    <section
      id="services"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 mb-24">
        <div className="col-span-4 md:col-span-6">
          <span
            className="text-accent uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Our Capabilities
          </span>
          <h2
            className="text-[42px] leading-[1.2] font-normal text-ink"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Everything your site needs, under one roof.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
        {servicesCatalog.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="col-span-4 md:col-span-6 bg-white border border-line p-10 print-shadow group hover:border-accent transition-all duration-500 lift-hover flex flex-col"
          >
            <span className="material-symbols-outlined text-accent mb-6 text-4xl block">
              {s.icon}
            </span>
            <h3
              className="text-[32px] leading-[1.3] font-normal mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {s.title}
            </h3>
            <p className="text-ink-muted text-[16px] leading-[1.6] mb-8">
              {s.tagline}
            </p>
            <ul className="space-y-3 mb-8">
              {s.included.slice(0, 2).map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="text-accent font-bold">+</span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="mt-auto text-accent font-medium text-[15px] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
