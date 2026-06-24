import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices } from "@/content/services";
import { getFaq } from "@/content/faq";
import Icon, { type IconName } from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import ChatMockup from "@/components/ChatMockup";
import FinalCta from "@/components/FinalCta";

const promiseIcon: Record<string, IconName> = {
  found: "globe",
  answer: "chat",
  tools: "layers",
  automate: "code",
};

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
              {site.hero.headingPost}
            </h1>
            <p className="hero-sub">{site.hero.sub}</p>
            <div className="hero-cta">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {site.hero.ctaPrimary}
                <Icon name="arrow" />
              </Link>
              <a href="#promises" className="btn btn-ghost">
                {site.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <ChatMockup chat={site.chat} />
        </div>
      </section>

      {/* PROMISES */}
      <section className="sec sec-warm" id="promises">
        <div className="wrap">
          <SectionHead
            kicker={site.promises.kicker}
            kickerIcon="chat"
            title={site.promises.title}
            lead={site.promises.lead}
          />
          <div className="thread">
            {site.promises.items.map((item) => (
              <div
                key={item.key}
                className={`msg-row reveal${item.side === "right" ? " right" : ""}`}
              >
                <span className="msg-ava" aria-hidden="true">
                  <Icon name={promiseIcon[item.key] ?? "chat"} />
                </span>
                <div className="msg">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" id="services">
        <div className="wrap">
          <SectionHead
            kicker={locale === "es" ? "Lo que hacemos" : "What we do"}
            kickerIcon="list"
            title={locale === "es" ? "Cuatro formas de hacer crecer tu negocio." : "Four ways we grow your business."}
            lead={
              locale === "es"
                ? "Coge lo que necesitas ahora y añade el resto cuando quieras."
                : "Pick what you need now, then add the rest when you're ready."
            }
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
            kicker={locale === "es" ? "Preguntas frecuentes" : "Common questions"}
            kickerIcon="chat"
            title={locale === "es" ? "Lo que la gente suele preguntar." : "What people usually ask."}
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
              {locale === "es" ? "Ver todas las preguntas" : "See all questions"}
            </Link>
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
