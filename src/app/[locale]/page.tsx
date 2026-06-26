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
import FinalCta from "@/components/FinalCta";

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

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="hero-h">
              {site.hero.headingPre}
              <span className="hi">{site.hero.headingHi}</span>
              {site.hero.headingMid}
              <span className="hi">{site.hero.headingHi2}</span>
              {site.hero.headingPost}
            </h1>
            <p className="hero-sub">{site.hero.sub}</p>
            <div className="hero-cta">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {site.hero.ctaPrimary}
                <Icon name="arrow" />
              </Link>
              <a href="#services" className="btn btn-ghost">
                {site.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <ChatMockup chat={site.chat} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" id="services">
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

      {/* CONSULTATION (replaces pricing) */}
      <section className="sec sec-warm" id="consultation">
        <div className="wrap">
          <SectionHead
            kicker={site.consultation.kicker}
            kickerIcon="calendar"
            title={site.consultation.title}
            lead={site.consultation.lead}
            center
          />
          <div className="consult-grid">
            {site.consultation.points.map((p, i) => (
              <div key={p.title} className="consult-card reveal">
                <span className="cn" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-cta center">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {site.consultation.cta}
              <Icon name="arrow" />
            </Link>
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
