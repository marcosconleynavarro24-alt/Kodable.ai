import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices } from "@/content/services";
import { getFaq } from "@/content/faq";
import Icon from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import BookingWidget from "@/components/BookingWidget";
import FinalCta from "@/components/FinalCta";
import { getBooking } from "@/content/booking";
import { getClientStats } from "@/lib/clientStats";
import { getStatBand } from "@/content/statBand";
import StatBand from "@/components/StatBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const site = getSite(locale);
  const services = getServices(locale);
  const faq = getFaq(locale).slice(0, 4);
  const booking = getBooking(locale);
  const band = getStatBand(locale, await getClientStats("valenciacamperpark"));

  return (
    <>
      {/* HERO, problem-led headline, single CTA (chat mockup removed,
          owner directive 2026-08-12) */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <h1 className="hero-h">
              {site.hero.headingPre}
              <span className="hi">{site.hero.headingHi}</span>
              {site.hero.headingMid}
              {site.hero.headingHi2 ? (
                <span className="hi">{site.hero.headingHi2}</span>
              ) : null}
              {site.hero.headingPost}
            </h1>
            <p className="hero-sub">{site.hero.sub}</p>
            <div className="hero-cta">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {site.hero.ctaPrimary}
                <Icon name="arrow" />
              </Link>
              <Link href={`/${locale}/portfolio`} className="btn btn-ghost">
                {site.hero.ctaSecondary}
              </Link>
            </div>

            {/* REAL RESULTS BAND, count-up figures from client-site analytics
                (anonymous, assembled via getStatBand). Lives inside the hero
                so visitors see the numbers on landing, with no scrolling
                (owner directive 2026-08-15). */}
            <div className="hero-stats" id="resultados">
              <p className="hero-stats-title">{band.title}</p>
              <StatBand items={band.items} numLocale={band.numLocale} compact />
              <p className="hero-stats-src">{band.source}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES, "What we do" first after the results band (owner directive 2026-08-13) */}
      <section className="sec sec-warm" id="services">
        <div className="wrap">
          <SectionHead
            kicker={site.home.servicesKicker}
            kickerIcon="list"
            title={site.home.servicesTitle}
            lead={site.home.servicesLead}
          />
          <div className="svc-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} locale={locale} service={service} />
            ))}
          </div>
          <div className="mt-cta center">
            <Link href={`/${locale}/pricing`} className="btn btn-ghost">
              {site.home.pricingLink}
            </Link>
          </div>
        </div>
      </section>

      {/* THE PLAN, second after the results band */}
      <section className="sec" id="plan">
        <div className="wrap">
          <SectionHead
            kicker={site.plan.kicker}
            kickerIcon="calendar"
            title={site.plan.title}
            lead={site.plan.lead}
          />
          <div className="how-wrap">
            <div>
              <div className="steps">
                {site.plan.steps.map((s) => (
                  <div key={s.n} className="step reveal">
                    <span className="step-n" aria-hidden="true">
                      {s.n}
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-cta">
                <Link href={`/${locale}/contact`} className="btn btn-primary">
                  {site.plan.cta}
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
            <BookingWidget locale={locale} copy={booking} />
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="sec sec-warm" id="problem">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-kicker">
              <Icon name="spark" />
              {site.problem.kicker}
            </span>
            <h2 className="sec-title">{site.problem.title}</h2>
          </div>
          <div className="lede reveal">
            {site.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="problem-stake">
              {site.problem.stakePre}
              <span className="hi">{site.problem.stakeHi}</span>
              {site.problem.stakePost}
            </p>
          </div>
        </div>
      </section>

      {/* THE GUIDE + TRUST CARDS: removed 2026-08-15 (owner, temporary).
          Copy still lives in site.ts under `guide` and `trust` for all 5 locales.
          To restore, re-add the <section id="about"> block from git history. */}

      {/* SUCCESS VISION */}
      <section className="sec sec-warm" id="vision">
        <div className="wrap">
          <div className="vision reveal">
            <span className="sec-kicker">
              <Icon name="star" />
              {site.vision.kicker}
            </span>
            <h2 className="sec-title">{site.vision.title}</h2>
            <div className="vision-body">
              {site.vision.body.map((p, i) => (
                <p key={p} className={i === site.vision.body.length - 1 ? "vision-close" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (compact) */}
      <section className="sec" id="faq">
        <div className="wrap">
          <SectionHead
            kicker={site.home.faqKicker}
            kickerIcon="chat"
            title={site.home.faqTitle}
            center
          />
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.q} className="faq-item reveal">
                <summary>
                  {item.q}
                  <Icon name="chevron" className="chev" />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-cta center">
            <Link href={`/${locale}/faq`} className="btn btn-ghost">
              {site.home.faqSeeAll}
            </Link>
            <Link href={`/${locale}/comparativa`} className="btn btn-ghost">
              {site.home.compareLink}
            </Link>
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
