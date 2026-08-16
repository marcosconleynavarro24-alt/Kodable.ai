import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { legalInfo } from "@/content/legal-info";
import { legalCanonical, legalHreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  const title = es ? "Aviso legal" : "Legal notice";
  const description = es
    ? "Identificación del titular de kodable.ai conforme al artículo 10 de la LSSI-CE, condiciones de uso del sitio y propiedad intelectual."
    : "Operator identification for kodable.ai under Spain's LSSI-CE (art. 10), site terms of use and intellectual property.";
  return {
    title,
    description,
    alternates: {
      canonical: legalCanonical(locale, "/legal"),
      languages: legalHreflangs("/legal"),
    },
    ...pageOg({
      locale: es ? "es" : "en",
      path: legalCanonical(locale, "/legal"),
      title,
      description,
      altLocales: ["en", "es"],
    }),
  };
}

export default async function LegalPage({
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
      crumbHere: "Legal notice",
      h1: "Legal notice",
      updated: "Last updated: August 2026",
      intro:
        "Spanish law (Ley 34/2002, LSSI-CE, art. 10) requires every website offering services from Spain to say clearly who is behind it. Here it is.",
      whoTitle: "Who operates this site",
      whoRows: [
        ["Trade name", legalInfo.tradeName],
        ["Operator", legalInfo.legalName],
        ["Tax ID (NIF)", legalInfo.nif],
        ["Address", legalInfo.address],
        ["Email", legalInfo.email],
        ["Website", `https://${legalInfo.domain}`],
      ] as [string, string][],
      whoNote:
        "The operator is a sole trader (autónomo) established in Spain. Services are offered to businesses and professionals, in Spain, the rest of the EU and internationally (including the United States).",
      useTitle: "Use of this site",
      useBody:
        "You may browse this site freely. You agree not to use it in a way that damages it, other users, or the operator, including attempting to break its security, scraping it for spam lists, or passing its content off as your own. The information on this site is general and informative; proposals and contracts we sign individually with each client prevail over anything published here.",
      ipTitle: "Intellectual property",
      ipBody:
        "Unless stated otherwise, the content of this site (text, design, graphics, logos, code) belongs to the operator or is used under licence. You may not reproduce or exploit it commercially without permission. Client names and marks shown in our portfolio belong to their owners and appear with their consent.",
      linksTitle: "Links",
      linksBody:
        "This site may link to third-party sites. We do not control them and are not responsible for their content or their privacy practices.",
      lawTitle: "Applicable law",
      lawBody:
        "This site and this notice are governed by Spanish law. For disputes with businesses or professionals, the courts of the operator's domicile in Spain are competent, unless a mandatory rule says otherwise. Nothing here limits rights that the law of your own country grants you and that cannot be waived.",
      moreTitle: "Related pages",
      more: (
        <>
          How we handle personal data is explained in our{" "}
          <Link href={`/${locale}/privacy`}>privacy policy</Link>; what this
          site stores in your browser, in the{" "}
          <Link href={`/${locale}/cookies`}>cookies page</Link>.
        </>
      ),
      back: "Back home",
    },
    es: {
      crumbHome: "Inicio",
      crumbHere: "Aviso legal",
      h1: "Aviso legal",
      updated: "Última actualización: agosto de 2026",
      intro:
        "La ley española (Ley 34/2002, LSSI-CE, art. 10) exige que toda web que ofrece servicios desde España diga claramente quién está detrás. Aquí está.",
      whoTitle: "Quién opera esta web",
      whoRows: [
        ["Nombre comercial", legalInfo.tradeName],
        ["Titular", legalInfo.legalName],
        ["NIF", legalInfo.nif],
        ["Domicilio", legalInfo.address],
        ["Correo electrónico", legalInfo.email],
        ["Sitio web", `https://${legalInfo.domain}`],
      ] as [string, string][],
      whoNote:
        "El titular es un trabajador autónomo establecido en España. Los servicios se dirigen a empresas y profesionales, en España, el resto de la UE e internacionalmente (incluido Estados Unidos).",
      useTitle: "Uso de esta web",
      useBody:
        "Puedes navegar por esta web libremente. Te comprometes a no usarla de forma que la dañe, dañe a otros usuarios o al titular: intentar vulnerar su seguridad, extraer contenido para listas de spam o hacer pasar su contenido como propio. La información de esta web es general e informativa; las propuestas y contratos que firmamos individualmente con cada cliente prevalecen sobre lo publicado aquí.",
      ipTitle: "Propiedad intelectual",
      ipBody:
        "Salvo indicación en contrario, el contenido de esta web (textos, diseño, gráficos, logotipos, código) pertenece al titular o se usa bajo licencia. No puedes reproducirlo ni explotarlo comercialmente sin permiso. Los nombres y marcas de clientes que aparecen en nuestro porfolio pertenecen a sus dueños y aparecen con su consentimiento.",
      linksTitle: "Enlaces",
      linksBody:
        "Esta web puede enlazar a sitios de terceros. No los controlamos y no respondemos de su contenido ni de sus prácticas de privacidad.",
      lawTitle: "Ley aplicable",
      lawBody:
        "Esta web y este aviso se rigen por la ley española. Para disputas con empresas o profesionales son competentes los juzgados del domicilio del titular en España, salvo norma imperativa en contrario. Nada de lo aquí dicho limita derechos irrenunciables que te reconozca la ley de tu país.",
      moreTitle: "Páginas relacionadas",
      more: (
        <>
          Cómo tratamos los datos personales se explica en la{" "}
          <Link href={`/${locale}/privacy`}>política de privacidad</Link>; qué
          guarda esta web en tu navegador, en la{" "}
          <Link href={`/${locale}/cookies`}>página de cookies</Link>.
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
            <p>{copy.intro}</p>

            <h2>{copy.whoTitle}</h2>
            <ul>
              {copy.whoRows.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {v}
                </li>
              ))}
            </ul>
            <p>{copy.whoNote}</p>

            <h2>{copy.useTitle}</h2>
            <p>{copy.useBody}</p>

            <h2>{copy.ipTitle}</h2>
            <p>{copy.ipBody}</p>

            <h2>{copy.linksTitle}</h2>
            <p>{copy.linksBody}</p>

            <h2>{copy.lawTitle}</h2>
            <p>{copy.lawBody}</p>

            <h2>{copy.moreTitle}</h2>
            <p>{copy.more}</p>
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
