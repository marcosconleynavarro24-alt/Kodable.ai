import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import Icon, { type IconName } from "@/components/Icon";
import FinalCta from "@/components/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  return {
    title: es
      ? "Sobre nosotros — personas reales detrás de tu web"
      : "About us — real people behind your website",
    description: es
      ? "Somos un pequeño estudio que usa IA para hacer crecer pequeños negocios. Trato directo, palabras claras y un equipo que sigue ahí después de lanzar."
      : "We're a small studio that uses AI to grow small businesses. Direct contact, plain words, and a team that's still here after launch.",
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const site = getSite(locale);

  const copy = {
    en: {
      crumbHome: "Home",
      crumbHere: "About",
      h1: "Real people behind the tech.",
      sub: "No agency, no call centre, no account manager you'll never meet. Just us — and your business, built to punch above its size.",
      heading: "Hello — we're the small studio behind your build.",
      paras: [
        "We're a small studio. When you write, we're the ones who read it. When your project needs a change, we're the ones who make it. There's no big team to get lost in and no ticket number — just a straight line between you and the people doing the work.",
        "We build for small businesses because we know them: the restaurant that fills up in season, the salon booked out on a Saturday, the trades who do brilliant work and never get round to the website. You're great at what you do — and AI now lets a small studio like ours give you the website, the always-on assistant and the tools a big company would pay a whole team for, without you ever becoming a tech expert.",
        "Clear, welcoming writing isn't a nice extra — it's the whole point. Your customers search differently, read differently and decide differently. We write and build your site so it feels right to everyone who lands on it, instead of a half-finished afterthought that quietly loses you the people you wanted to reach.",
        "The way we work is simple and we keep it that way. We start with a short chat about your business — no jargon, no homework for you. We build the site and show it to you early, so you're never surprised. We go through your notes together and we get it exactly right. Then we put it live and make sure it actually works on a phone, on Google and for the people you want to reach.",
        "And we don't disappear the day it goes live. That's the part most people get burned on — a site that's perfect on launch day and broken six months later. We're still here: keeping it updated, fixing the small things, changing your hours when the season turns. Your website should keep working as quietly and reliably as you do.",
        "If that sounds like the kind of people you'd actually want to work with, let's talk. No pressure, no sales script — just a real conversation about your business.",
      ],
      valuesKicker: site.trust.kicker,
      valuesTitle:
        locale === "es" ? site.trust.title : "Why people stay with us.",
      cta: "Tell us about your business",
    },
    es: {
      crumbHome: "Inicio",
      crumbHere: "Sobre nosotros",
      h1: "Personas reales detrás de la tecnología.",
      sub: "Sin agencia, sin centralita, sin un gestor de cuentas al que nunca verás. Solo nosotros — y tu negocio, hecho para rendir por encima de su tamaño.",
      heading: "Hola — somos el pequeño estudio detrás de tu proyecto.",
      paras: [
        "Somos un pequeño estudio. Cuando nos escribes, somos nosotros quienes lo leemos. Cuando tu proyecto necesita un cambio, somos nosotros quienes lo hacemos. No hay un gran equipo en el que perderse ni un número de ticket — solo una línea directa entre tú y las personas que hacen el trabajo.",
        "Creamos para pequeños negocios porque los conocemos: el restaurante que se llena en temporada, la peluquería con la agenda completa un sábado, los gremios que trabajan de maravilla y nunca encuentran el momento para la web. Eres muy bueno en lo tuyo — y la IA permite ahora que un pequeño estudio como el nuestro te dé la web, el asistente que nunca duerme y las herramientas por las que una gran empresa pagaría a todo un equipo, sin que tengas que convertirte en experto en tecnología.",
        "Escribir de forma clara y cercana no es un extra bonito — es justo el punto. Tus clientes buscan distinto, leen distinto y deciden distinto. Escribimos y construimos tu web para que le encaje a cualquiera que llegue a ella, en vez de algo a medias que en silencio te hace perder a la gente a la que querías llegar.",
        "Nuestra forma de trabajar es sencilla y la mantenemos así. Empezamos con una charla corta sobre tu negocio — sin tecnicismos, sin deberes para ti. Construimos la web y te la enseñamos pronto, para que nunca te lleves sorpresas. Repasamos juntos tus comentarios y lo dejamos exactamente como quieres. Luego la ponemos en marcha y nos aseguramos de que funcione de verdad en el móvil, en Google y para la gente a la que quieres llegar.",
        "Y no desaparecemos el día que sale online. Esa es la parte donde a la mayoría le va mal — una web perfecta el día del lanzamiento y rota seis meses después. Nosotros seguimos aquí: actualizándola, arreglando las cosas pequeñas, cambiando tu horario cuando cambia la temporada. Tu web debería seguir funcionando con la misma tranquilidad y constancia con la que trabajas tú.",
        "Si te suena al tipo de personas con las que de verdad querrías trabajar, hablemos. Sin presión, sin guion de ventas — solo una conversación real sobre tu negocio.",
      ],
      valuesKicker: site.trust.kicker,
      valuesTitle: site.trust.title,
      cta: "Cuéntanos sobre tu negocio",
    },
  }[locale];

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{copy.crumbHome}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{copy.crumbHere}</span>
          </nav>
          <h1 className="page-h">{copy.h1}</h1>
          <p className="page-sub">{copy.sub}</p>
        </div>
      </section>

      {/* STORY */}
      <section className="sec">
        <div className="wrap">
          <div className="prose">
            <h2>{copy.heading}</h2>
            {copy.paras.map((para, i) => (
              <p key={i} className="reveal">
                {para}
              </p>
            ))}
            <div className="mt-cta">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {copy.cta}
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES / TRUST */}
      <section className="sec sec-warm">
        <div className="wrap">
          <header className="sec-head center">
            <span className="sec-kicker">
              <Icon name="star" />
              {copy.valuesKicker}
            </span>
            <h2>{copy.valuesTitle}</h2>
          </header>
          <div className="trust-grid">
            {site.trust.cards.map((card) => (
              <div key={card.title} className="trust-card reveal">
                <span className="ti" aria-hidden="true">
                  <Icon name={card.icon as IconName} />
                </span>
                {card.stars ? (
                  <div
                    className="trust-stars"
                    aria-label="Five out of five stars"
                  >
                    ★★★★★
                  </div>
                ) : null}
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
