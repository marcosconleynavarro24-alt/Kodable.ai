import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices } from "@/content/services";
import { getFaq } from "@/content/faq";
import Icon from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import ChatMockup from "@/components/ChatMockup";
import BookingWidget from "@/components/BookingWidget";
import FinalCta from "@/components/FinalCta";
import { getBooking } from "@/content/booking";

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

  return (
    <>
      {/* HERO — problem-led headline, single CTA */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="hero-h">
              {site.hero.headingPre}
              <span className="hi">{site.hero.headingHi}</span>
              {site.hero.headingMid}
              {site.hero.headingHi2 ? (
                <span className="hi-red">{site.hero.headingHi2}</span>
              ) : null}
              {site.hero.headingPost}
            </h1>
            <p className="hero-sub">{site.hero.sub}</p>
            <div className="hero-cta">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {site.hero.ctaPrimary}
                <Icon name="arrow" />
              </Link>
              <a href="#plan" className="btn btn-ghost">
                {site.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div>
            <ChatMockup chat={site.chat} />
            <p className="hero-cap">
              <Icon name="spark" />
              {site.hero.label}
            </p>
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

      {/* THE GUIDE */}
      <section className="sec" id="about">
        <div className="wrap">
          <SectionHead
            kicker={site.guide.kicker}
            kickerIcon="shield"
            title={site.guide.title}
          />
          <div className="guide-lede reveal">
            {site.guide.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="trust-grid" style={{ marginTop: "clamp(28px, 4vw, 44px)" }}>
            {site.trust.cards.map((c) => (
              <div key={c.title} className="trust-card reveal">
                <span className="ti" aria-hidden="true">
                  <Icon name={c.icon === "star" ? "star" : c.icon === "clock" ? "clock" : "chat"} />
                </span>
                {c.stars ? <div className="trust-stars" aria-hidden="true">★★★★★</div> : null}
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
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
        </div>
      </section>

      {/* THE PLAN */}
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
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
