import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { legalCanonical, legalHreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  const title = "Cookies";
  const description = es
    ? "Esta web no usa cookies. Explicamos qué medimos (de forma anónima y sin identificadores) y por qué no verás un banner de consentimiento."
    : "This site uses no cookies. We explain what we measure (anonymously, with no identifiers) and why you won't see a consent banner.";
  return {
    title,
    description,
    alternates: {
      canonical: legalCanonical(locale, "/cookies"),
      languages: legalHreflangs("/cookies"),
    },
    ...pageOg({
      locale: es ? "es" : "en",
      path: legalCanonical(locale, "/cookies"),
      title,
      description,
      altLocales: ["en", "es"],
    }),
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const copy = {
    en: {
      crumbHome: "Home",
      crumbHere: "Cookies",
      h1: "Cookies",
      updated: "Last updated: August 2026",
      shortTitle: "The short version",
      shortBody:
        "This site sets no cookies. Not for tracking, not for advertising, not even for preferences. The notice you may have seen at the bottom of the page is informational: since there is nothing to consent to, it has no Accept or Reject buttons. The only thing this site ever writes to your browser is a single local-storage flag ('kdl_cookie_notice_ok') that remembers you closed that notice, so it doesn't reappear on every visit. It contains no identifier and is never sent anywhere.",
      measureTitle: "What we do measure",
      measureIntro:
        "We still want to know if the site works, so we use two measurement mechanisms, both cookieless and free of personal identifiers:",
      measureItems: [
        "Vercel Analytics: aggregate page-view counts (which pages are visited, from which country, on what kind of device). It sets no cookies and cannot recognise you across visits or across sites.",
        "Our own click counter: when someone taps the WhatsApp, call or email button, the site sends itself an anonymous ping ('a WhatsApp tap happened on this page'). No name, no identifier, no cookie.",
      ],
      thirdTitle: "Third-party content",
      thirdBody:
        "We avoid embedding third-party widgets that would set their own cookies. If we ever add one (for example an embedded map or video), we will update this page and, where the law requires it, ask for your consent first. One related note: if you pay for a plan online, the payment step happens on Stripe's own website, not on ours; Stripe's cookie and privacy policies apply there.",
      changeTitle: "If this changes",
      changeBody: (
        <>
          If we ever introduce cookies or similar storage, this page will list
          them, say what they are for and how long they live, and a consent
          banner will appear where required. How we handle personal data in
          general is covered by our{" "}
          <Link href={`/${locale}/privacy`}>privacy policy</Link>.
        </>
      ),
      back: "Back home",
    },
    es: {
      crumbHome: "Inicio",
      crumbHere: "Cookies",
      h1: "Cookies",
      updated: "Última actualización: agosto de 2026",
      shortTitle: "La versión corta",
      shortBody:
        "Esta web no instala cookies. Ni de seguimiento, ni de publicidad, ni siquiera de preferencias. El aviso que quizá hayas visto abajo en la página es informativo: como no hay nada que consentir, no tiene botones de aceptar o rechazar. Lo único que esta web escribe en tu navegador es una marca en el almacenamiento local ('kdl_cookie_notice_ok') que recuerda que cerraste ese aviso, para que no reaparezca en cada visita. No contiene ningún identificador y nunca se envía a ningún sitio.",
      measureTitle: "Qué sí medimos",
      measureIntro:
        "Aun así queremos saber si la web funciona, y usamos dos mecanismos de medición, ambos sin cookies y sin identificadores personales:",
      measureItems: [
        "Vercel Analytics: recuentos agregados de visitas (qué páginas se ven, desde qué país, con qué tipo de dispositivo). No instala cookies y no puede reconocerte entre visitas ni entre sitios.",
        "Nuestro propio contador de clics: cuando alguien pulsa el botón de WhatsApp, llamada o email, la web se envía a sí misma un aviso anónimo («ha habido un toque de WhatsApp en esta página»). Sin nombre, sin identificador, sin cookie.",
      ],
      thirdTitle: "Contenido de terceros",
      thirdBody:
        "Evitamos incrustar widgets de terceros que instalarían sus propias cookies. Si algún día añadimos uno (por ejemplo un mapa o un vídeo incrustado), actualizaremos esta página y, cuando la ley lo exija, pediremos tu consentimiento antes. Un apunte relacionado: si pagas un plan online, el paso del pago ocurre en la web de Stripe, no en la nuestra; ahí aplican las políticas de cookies y privacidad de Stripe.",
      changeTitle: "Si esto cambia",
      changeBody: (
        <>
          Si algún día introducimos cookies o almacenamiento similar, esta
          página las enumerará, dirá para qué sirven y cuánto duran, y aparecerá
          un banner de consentimiento donde sea obligatorio. Cómo tratamos los
          datos personales en general se explica en la{" "}
          <Link href={`/${locale}/privacy`}>política de privacidad</Link>.
        </>
      ),
      back: "Volver al inicio",
    },
    // Legal copy is maintained in EN/ES only; other locales fall back to EN.
  }[locale === "es" ? "es" : "en"];

  return (
    <>
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
          <p className="page-sub">{copy.updated}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="prose">
            <h2>{copy.shortTitle}</h2>
            <p>{copy.shortBody}</p>

            <h2>{copy.measureTitle}</h2>
            <p>{copy.measureIntro}</p>
            <ul>
              {copy.measureItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2>{copy.thirdTitle}</h2>
            <p>{copy.thirdBody}</p>

            <h2>{copy.changeTitle}</h2>
            <p>{copy.changeBody}</p>
          </div>

          <div className="mt-cta">
            <Link href={`/${locale}`} className="btn btn-ghost">
              {copy.back}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
