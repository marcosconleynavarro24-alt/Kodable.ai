import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { servicesCatalog, getService } from "@/content/servicesCatalog";

// Only the four catalog slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesCatalog.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title} — Kodable.ai`;
  return {
    title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description: service.tagline,
      url: `/services/${service.slug}`,
      type: "article",
      // Re-attach the site OG image — setting openGraph here otherwise drops
      // the auto-injected opengraph-image.tsx image.
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Kodable.ai — bilingual web design for Costa Blanca small businesses",
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = servicesCatalog.filter((s) => s.slug !== service.slug);

  const url = `https://kodable.ai/services/${service.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    serviceType: service.title,
    url,
    areaServed: "Costa Blanca",
    availableLanguage: ["es", "en"],
    provider: { "@id": "https://kodable.ai/#organization" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kodable.ai" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://kodable.ai/#services",
      },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="film-grain" aria-hidden="true" />
      <Nav />
      <main className="pt-32">
        <article className="max-w-[1280px] mx-auto px-5 md:px-20 py-[80px] md:py-[120px]">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1 text-ink-muted hover:text-accent text-[14px] font-medium transition-colors mb-12"
          >
            <span aria-hidden="true">←</span> Back to all services
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-start">
            <div className="col-span-4 md:col-span-8">
              <span
                className="material-symbols-outlined text-accent mb-6 text-5xl block"
                aria-hidden="true"
              >
                {service.icon}
              </span>
              <span
                className="text-accent uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Services
              </span>
              <h1
                className="text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] font-normal text-ink mb-6 text-balance"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {service.title}
              </h1>
              <p className="text-[20px] md:text-[24px] leading-[1.4] text-ink-muted max-w-[640px]">
                {service.tagline}
              </p>
            </div>
          </div>

          <div className="asymmetric-divider my-16" />

          {/* Intro + What's included */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-4 md:col-span-6">
              <p className="text-ink-muted text-[18px] leading-[1.7]">
                {service.intro}
              </p>
              {service.whoFor && (
                <div className="mt-10 border-l-2 border-accent pl-6">
                  <span
                    className="text-accent uppercase tracking-[0.2em] mb-2 block text-[11px] font-medium"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Who it&apos;s for
                  </span>
                  <p className="text-ink text-[17px] leading-[1.6]">
                    {service.whoFor}
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-4 md:col-span-6">
              <h2
                className="text-[28px] leading-[1.3] font-normal text-ink mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                What&apos;s included
              </h2>
              <ul className="space-y-4">
                {service.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink text-[16px] leading-[1.6]"
                  >
                    <span
                      className="material-symbols-outlined text-accent text-[20px] mt-0.5 shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/#contact"
                className="print-shadow inline-block mt-12 bg-ink text-white px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:-translate-y-0.5 hover:bg-accent transition-all duration-300"
              >
                {service.cta}
              </a>

              {service.underTheHood && service.underTheHood.length > 0 && (
                <div className="mt-12 pt-8 border-t border-line">
                  <span
                    className="text-ink-muted uppercase tracking-[0.2em] mb-3 block text-[11px] font-medium"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Under the hood
                  </span>
                  <p className="text-ink-muted text-[13px] leading-[1.6]">
                    {service.underTheHood.join(" · ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="asymmetric-divider my-16" />

          {/* Cross-links to the other services */}
          <div>
            <span
              className="text-accent uppercase tracking-[0.2em] mb-8 block text-[12px] leading-[1.0] font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Explore more services
            </span>
            <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="col-span-4 md:col-span-4 bg-white border border-line p-8 print-shadow group hover:border-accent transition-all duration-500 lift-hover flex flex-col"
                >
                  <span
                    className="material-symbols-outlined text-accent mb-4 text-3xl block"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>
                  <h3
                    className="text-[24px] leading-[1.3] font-normal mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-ink-muted text-[15px] leading-[1.6] mb-6">
                    {s.tagline}
                  </p>
                  <span className="mt-auto text-accent font-medium text-[14px] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
