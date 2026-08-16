import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact-info";
import { legalCanonical, legalHreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  const title = es ? "Privacidad" : "Privacy";
  const description = es
    ? "Cómo recogemos, usamos y protegemos tus datos cuando nos escribes a través de esta web. Conforme al RGPD y la LOPDGDD."
    : "How we collect, use and protect your data when you get in touch through this site. GDPR and Spanish data law aware.";
  return {
    title,
    description,
    alternates: {
      canonical: legalCanonical(locale, "/privacy"),
      languages: legalHreflangs("/privacy"),
    },
    ...pageOg({
      locale: es ? "es" : "en",
      path: legalCanonical(locale, "/privacy"),
      title,
      description,
      altLocales: ["en", "es"],
    }),
  };
}

export default async function PrivacyPage({
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
      crumbHere: "Privacy",
      h1: "Privacy",
      updated: "Last updated: August 2026",
      intro:
        "We keep this simple. This site belongs to a small studio. The only way you share personal data with us here is by choosing to contact us, through the contact form, by email, by phone or on WhatsApp. This page explains what we collect, why, and what you can ask us to do with it.",
      whoTitle: "Who is responsible for your data",
      whoBody: (
        <>
          Kodable, a small studio established in Spain. Full legal
          identification is on the{" "}
          <Link href={`/${locale}/legal`}>legal notice</Link>. For anything
          about your data, write to{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. We are
          the ones who read it. There is no big team behind the scenes.
        </>
      ),
      collectTitle: "What we collect",
      collectIntro:
        "We only collect what you choose to send us when you get in touch. Through the contact form on this site, that is:",
      collectItems: [
        "Your name",
        "Your business name (optional)",
        "Your email address and/or phone number, so we can reply",
        "The message you write us about your project",
      ],
      collectNote:
        "If you email, call or message us directly instead of using the form, we receive whatever details you include there. We don't ask for, and you should never send us, sensitive data (health, ID numbers, payment card details) through these channels.",
      whyTitle: "Why we collect it",
      whyBody:
        "For one reason: to reply to you and talk about the work you're asking about. If we go on to work together, we keep your contact details so we can stay in touch about your project and any care plan we agree. We do not use your details to send marketing or newsletters.",
      legalTitle: "The legal basis",
      legalBody: (
        <>
          When you contact us about a possible project, the legal basis is{" "}
          <strong>taking steps at your request before entering a contract</strong>{" "}
          (and your consent in sending the message). Once we work together, the
          basis becomes <strong>performance of our contract</strong>. This
          follows the EU GDPR (RGPD) and Spain&apos;s data protection law
          (LOPDGDD).
        </>
      ),
      storeTitle: "How it's stored and for how long",
      storeBody:
        "Your message reaches us by email and we keep it in our email account and ordinary business records. We keep enquiries that don't turn into work for up to about a year, in case you come back to us, and then delete them. If we do work together, we keep what we need for as long as our relationship lasts and for the period the law requires afterwards (for example, invoicing records). You can ask us to delete your data sooner. See your rights below.",
      sellTitle: "We don't sell your data",
      sellBody:
        "We never sell, rent or trade your personal data. We don't share it with advertisers. The only people who ever touch it are the service providers we use to run the studio, listed next.",
      thirdTitle: "Third parties we rely on",
      thirdIntro:
        "To run this site and reply to you, we use a small number of trusted providers who process data on our behalf:",
      thirdItems: [
        "A web hosting provider (Vercel) that serves this site and passes your contact-form message to us.",
        "An email provider, where we receive and store your message and reply to you.",
        "A database provider (Supabase) that stores consultation-booking slots, so we don't double-book you.",
        "A CRM (HubSpot), where we keep the contact details of people and businesses we're talking to, so follow-ups don't fall through the cracks.",
      ],
      thirdNote:
        "These providers only process your data to provide their service to us, under their own data-protection terms. Some are based in the United States; those transfers are covered by the EU standard contractual clauses or the EU-US Data Privacy Framework. We'll give you the full current list on request.",
      cookiesTitle: "Cookies and analytics",
      cookiesBody: (
        <>
          This site sets no cookies. The banner you see is informational: with
          nothing to consent to, it only stores one anonymous flag so it
          doesn&apos;t reappear once you close it. We measure visits only in
          aggregate, with cookieless tools that can&apos;t recognise you across
          visits. The details are on the{" "}
          <Link href={`/${locale}/cookies`}>cookies page</Link>.
        </>
      ),
      outreachTitle: "If we contacted you first (business outreach)",
      outreachBody:
        "Besides replying to people who write to us, we sometimes reach out to businesses we think we can help. For that we collect business contact details from public sources, such as a business's own website or public listings like Google Maps: trade name, category, address, publicly listed phone and email, and sometimes the owner's name where the business publishes it. We use this only to show the business what we could build for it (often a personalised demo page) and to follow up; we keep it organised in our CRM. When we send a demo link, we can see that the page was opened (time, approximate city and device type), so we know whether to follow up or leave you alone.",
      outreachRights:
        "If you're on the receiving end and want none of this: one email or reply is enough. We'll delete your details from our pipeline and not contact you again.",
      usTitle: "Visitors and clients in the United States",
      usBody:
        "We also work with businesses in the US. Everything above applies to you too: we treat the GDPR standard as our floor for everyone, wherever you are. In US terms: we do not sell or share your personal information (as those words are defined in state privacy laws like the California CPRA), we don't use it for targeted advertising, and we honour access, correction and deletion requests from anyone, in any state, without needing to check whether a local law obliges us to. Our commercial emails always identify us and include a working way to opt out (CAN-SPAM); one reply is enough to never hear from us again.",
      rightsTitle: "Your rights",
      rightsIntro:
        "Under the GDPR you can ask us, at any time, to:",
      rightsItems: [
        "Access: get a copy of the data we hold about you",
        "Rectify: correct anything that's wrong or out of date",
        "Erase: delete your data when we no longer need it",
        "Restrict or object: limit how we use it",
      ],
      rightsContact: (
        <>
          To use any of these, just email{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> and
          we&apos;ll sort it out, usually within a few days. If you think we&apos;ve
          handled your data wrongly, you can also complain to the Spanish data
          protection authority (Agencia Española de Protección de Datos, AEPD).
        </>
      ),
      noteTitle: "A note in plain language",
      noteBody:
        "This is a plain-language privacy notice for a small studio. We wrote it to be read, not to hide behind. If anything here is unclear, or you want the formal version of any point (legal bases, retention tables, provider list), email us and we'll send it.",
      back: "Back home",
    },
    es: {
      crumbHome: "Inicio",
      crumbHere: "Privacidad",
      h1: "Privacidad",
      updated: "Última actualización: agosto de 2026",
      intro:
        "Lo mantenemos sencillo. Esta web es de un pequeño estudio. La única forma de compartir datos personales con nosotros aquí es decidiendo escribirnos: con el formulario de contacto, por correo, por teléfono o por WhatsApp. Esta página explica qué recogemos, por qué, y qué puedes pedirnos que hagamos con ello.",
      whoTitle: "Quién es responsable de tus datos",
      whoBody: (
        <>
          Kodable, un pequeño estudio establecido en España. La identificación
          legal completa está en el{" "}
          <Link href={`/${locale}/legal`}>aviso legal</Link>. Para cualquier
          cosa sobre tus datos, escribe a{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>. Somos
          quienes lo leemos. No hay un gran equipo detrás.
        </>
      ),
      collectTitle: "Qué recogemos",
      collectIntro:
        "Solo recogemos lo que tú decides enviarnos al ponerte en contacto. A través del formulario de esta web, eso es:",
      collectItems: [
        "Tu nombre",
        "El nombre de tu negocio (opcional)",
        "Tu correo electrónico y/o teléfono, para poder responderte",
        "El mensaje que nos escribes sobre tu proyecto",
      ],
      collectNote:
        "Si nos escribes, llamas o mandas un mensaje directamente en vez de usar el formulario, recibimos los datos que incluyas ahí. No te pedimos, y nunca debes enviarnos, datos sensibles (salud, DNI, datos de tarjetas) por estos canales.",
      whyTitle: "Por qué los recogemos",
      whyBody:
        "Por un motivo: responderte y hablar del trabajo que nos planteas. Si acabamos trabajando juntos, guardamos tus datos de contacto para seguir en contacto sobre tu proyecto y el plan de cuidado que acordemos. No usamos tus datos para enviarte publicidad ni boletines.",
      legalTitle: "La base legal",
      legalBody: (
        <>
          Cuando nos escribes por un posible proyecto, la base legal es la{" "}
          <strong>aplicación de medidas a petición tuya antes de un contrato</strong>{" "}
          (y tu consentimiento al enviar el mensaje). Una vez trabajamos juntos,
          la base pasa a ser la <strong>ejecución de nuestro contrato</strong>.
          Todo conforme al RGPD de la UE y a la ley española de protección de
          datos (LOPDGDD).
        </>
      ),
      storeTitle: "Cómo se guardan y durante cuánto tiempo",
      storeBody:
        "Tu mensaje nos llega por correo y lo guardamos en nuestra cuenta de correo y en nuestros registros habituales. Las consultas que no acaban en trabajo las conservamos alrededor de un año, por si vuelves a escribirnos, y luego las borramos. Si trabajamos juntos, guardamos lo necesario mientras dure nuestra relación y el tiempo que la ley exija después (por ejemplo, los registros de facturación). Puedes pedirnos que borremos tus datos antes. Mira tus derechos más abajo.",
      sellTitle: "No vendemos tus datos",
      sellBody:
        "Nunca vendemos, alquilamos ni intercambiamos tus datos personales. No los compartimos con anunciantes. Las únicas personas que los tocan son los proveedores de servicio que usamos para el estudio, que enumeramos a continuación.",
      thirdTitle: "Terceros en los que nos apoyamos",
      thirdIntro:
        "Para mantener esta web y responderte, usamos unos pocos proveedores de confianza que tratan datos por encargo nuestro:",
      thirdItems: [
        "Un proveedor de hosting (Vercel) que sirve esta web y nos hace llegar tu mensaje del formulario.",
        "Un proveedor de correo, donde recibimos y guardamos tu mensaje y te respondemos.",
        "Un proveedor de base de datos (Supabase) que guarda las franjas reservadas de consulta, para no darte una cita duplicada.",
        "Un CRM (HubSpot), donde guardamos los datos de contacto de las personas y negocios con los que hablamos, para que ningún seguimiento se nos pase.",
      ],
      thirdNote:
        "Estos proveedores solo tratan tus datos para darnos su servicio, bajo sus propias condiciones de protección de datos. Algunos tienen sede en Estados Unidos; esas transferencias están cubiertas por las cláusulas contractuales tipo de la UE o por el Marco de Privacidad de Datos UE-EE. UU. Te damos la lista completa y actualizada si nos la pides.",
      cookiesTitle: "Cookies y analítica",
      cookiesBody: (
        <>
          Esta web no instala cookies. El aviso que ves es informativo: como no
          hay nada que consentir, solo guarda una marca anónima para no
          reaparecer cuando lo cierras. Medimos las visitas solo de forma
          agregada, con herramientas sin cookies que no pueden reconocerte entre
          visitas. Los detalles están en la{" "}
          <Link href={`/${locale}/cookies`}>página de cookies</Link>.
        </>
      ),
      outreachTitle: "Si te contactamos nosotros primero (prospección)",
      outreachBody:
        "Además de responder a quien nos escribe, a veces contactamos con negocios a los que creemos que podemos ayudar. Para eso recogemos datos de contacto de fuentes públicas, como la propia web del negocio o los listados públicos tipo Google Maps: nombre comercial, categoría, dirección, teléfono y correo publicados y, a veces, el nombre del titular si el negocio lo publica. Lo usamos solo para enseñarle al negocio lo que podríamos construirle (a menudo una demo personalizada) y hacer seguimiento; lo organizamos en nuestro CRM. Cuando enviamos un enlace de demo, podemos ver que la página se abrió (hora, ciudad aproximada y tipo de dispositivo), para saber si seguir o dejarte en paz.",
      outreachRights:
        "Si estás al otro lado y no quieres nada de esto: basta un correo o una respuesta. Borramos tus datos de nuestro pipeline y no volvemos a contactarte.",
      usTitle: "Visitantes y clientes en Estados Unidos",
      usBody:
        "También trabajamos con negocios en EE. UU. Todo lo anterior te aplica igualmente: tratamos el estándar del RGPD como nuestro mínimo para todo el mundo, estés donde estés. En términos estadounidenses: no vendemos ni compartimos tu información personal (según definen esas palabras leyes estatales como la CPRA de California), no la usamos para publicidad dirigida, y atendemos solicitudes de acceso, corrección y supresión de cualquier persona, en cualquier estado, sin mirar antes si una ley local nos obliga. Nuestros correos comerciales siempre nos identifican e incluyen una forma real de darse de baja (CAN-SPAM); una respuesta basta para no volver a saber de nosotros.",
      rightsTitle: "Tus derechos",
      rightsIntro: "Según el RGPD, puedes pedirnos en cualquier momento:",
      rightsItems: [
        "Acceso: una copia de los datos que tenemos sobre ti",
        "Rectificación: corregir lo que esté mal o desactualizado",
        "Supresión: borrar tus datos cuando ya no los necesitemos",
        "Limitación u oposición: limitar cómo los usamos",
      ],
      rightsContact: (
        <>
          Para ejercer cualquiera de ellos, escríbenos a{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> y lo
          gestionamos, normalmente en unos días. Si crees que hemos tratado mal tus
          datos, también puedes reclamar ante la Agencia Española de Protección
          de Datos (AEPD).
        </>
      ),
      noteTitle: "Una nota en lenguaje claro",
      noteBody:
        "Este es un aviso de privacidad en lenguaje claro para un estudio pequeño. Lo escribimos para que se lea, no para escondernos detrás. Si algo no queda claro, o quieres la versión formal de cualquier punto (bases jurídicas, tablas de conservación, lista de proveedores), escríbenos y te la enviamos.",
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
            <p>{copy.whoBody}</p>

            <h2>{copy.collectTitle}</h2>
            <p>{copy.collectIntro}</p>
            <ul>
              {copy.collectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{copy.collectNote}</p>

            <h2>{copy.whyTitle}</h2>
            <p>{copy.whyBody}</p>

            <h2>{copy.legalTitle}</h2>
            <p>{copy.legalBody}</p>

            <h2>{copy.storeTitle}</h2>
            <p>{copy.storeBody}</p>

            <h2>{copy.sellTitle}</h2>
            <p>{copy.sellBody}</p>

            <h2>{copy.thirdTitle}</h2>
            <p>{copy.thirdIntro}</p>
            <ul>
              {copy.thirdItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{copy.thirdNote}</p>

            <h2>{copy.cookiesTitle}</h2>
            <p>{copy.cookiesBody}</p>

            <h2>{copy.outreachTitle}</h2>
            <p>{copy.outreachBody}</p>
            <p>{copy.outreachRights}</p>

            <h2>{copy.usTitle}</h2>
            <p>{copy.usBody}</p>

            <h2>{copy.rightsTitle}</h2>
            <p>{copy.rightsIntro}</p>
            <ul>
              {copy.rightsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{copy.rightsContact}</p>

            <h2>{copy.noteTitle}</h2>
            <p>{copy.noteBody}</p>
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
