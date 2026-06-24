import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact-info";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  return {
    title: es
      ? "Términos y condiciones — Kodable.ai"
      : "Terms and conditions — Kodable.ai",
    description: es
      ? "Los términos en lenguaje sencillo para trabajar con Kodable.ai: qué incluyen los servicios, cómo funcionan los presupuestos y proyectos, los planes de cuidado, la propiedad del trabajo y la ley aplicable."
      : "The plain-language terms for working with Kodable.ai: what the services cover, how quotes and projects work, care plans, who owns the work and which law applies.",
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const copy = {
    en: {
      home: "Home",
      terms: "Terms",
      title: "Terms",
      updated: "Last updated: June 2026",
      lead: "Plain words about how working together actually works. No legalese traps — just what you can expect from us, and what we ask of you.",
      whoTitle: "Who Kodable.ai is",
      whoBody:
        "Kodable.ai is a small studio that uses AI to help local businesses grow. When you hire Kodable.ai, you're working directly with our team — start to finish. These terms cover any work we do for you, and by asking us to start a project you're agreeing to them.",
      contactLabel: "You can reach us at",
      scopeTitle: "What we do",
      scopeBody:
        "We help local businesses grow with AI. Our work falls into four areas:",
      scopeItems: [
        "Websites — AI-built, fast sites that get you found and turn visitors into customers.",
        "AI agents — assistants that answer customers and take bookings around the clock.",
        "Custom tools and apps — booking and ordering apps, calculators, dashboards and internal tools built for you.",
        "Automations and integrations — connecting the tools you use so the busywork runs itself.",
      ],
      scopeNote:
        "We'll always be clear about which of these a quote covers. Anything not written into the quote isn't included until we agree it and we confirm the price.",
      quotesTitle: "How quotes and projects work",
      quotesBody:
        "Before any work starts we'll send you a written quote describing what's included, what it costs and roughly how long it'll take. A project is confirmed once you accept that quote and pay any agreed deposit. We'll usually ask for part of the cost up front and the rest on launch — the exact split is in your quote.",
      quotesBody2:
        "If you want to add something partway through, that's no problem — we'll quote the extra separately so there are never surprises on the final bill. If your needs change a lot, we can always pause, re-scope and re-quote.",
      pricesTitle: "About the prices",
      pricesBody:
        "We don't publish a price list, because every project is different. After a free, no-pressure consultation we'll send you a written price based on what your project actually needs — so you only pay for what's genuinely useful to you. Unless we say otherwise, prices are quoted without IVA; IVA is added on the invoice where it applies.",
      careTitle: "Care plans and recurring services",
      careBody:
        "Hosting and the monthly care plan are ongoing services billed on a recurring basis (monthly or yearly, as agreed). They keep your site online, backed up, secure and updated, and include small changes as described in your plan.",
      careItems: [
        "Care plans renew automatically until you cancel.",
        "You can cancel with 30 days' notice, effective at the end of your current billing period. We don't tie you into long contracts.",
        "Recurring fees already paid for the current period aren't refunded, but you keep the service until that period ends.",
        "If a recurring payment fails and isn't resolved, we may pause the service until it's brought up to date.",
      ],
      ipTitle: "Who owns the work",
      ipBody:
        "Once a project is fully paid, the final website and the content you gave us are yours. You're free to keep, move or change them. A few sensible exceptions apply: any third-party tools, fonts, stock images or plugins stay under their own licences, and any reusable building blocks or code we create stay ours to reuse on other projects. We may show your finished site in our portfolio unless you ask us not to.",
      liabilityTitle: "What we can and can't promise",
      liabilityBody:
        "We take real care with your project, but no website can be promised to be perfect, error-free or to deliver a specific business result. SEO in particular depends on Google and your market, so we can't guarantee rankings, traffic or sales.",
      liabilityBody2:
        "We're not responsible for problems outside our control — things like hosting outages from third parties, content you supply, or changes you or someone else makes after launch. If something does go wrong and it's our fault, our responsibility is limited to putting it right or, at most, refunding what you paid us for that piece of work. We're not liable for indirect or knock-on losses such as lost profits.",
      lawTitle: "Which law applies",
      lawBody:
        "These terms are governed by the law of Spain, and any dispute will be handled by the courts of Spain. If any single part of these terms turns out not to hold up, the rest still applies.",
      noteTitle: "A note on this page",
      noteBody:
        "This is a plain-language template written so it's easy to read, not a finished legal contract. It should be reviewed and adapted to your exact project before launch. If anything here is unclear, just ask us — we'd rather explain it than have you sign something you don't follow.",
      back: "Back home",
    },
    es: {
      home: "Inicio",
      terms: "Términos",
      title: "Términos",
      updated: "Última actualización: junio de 2026",
      lead: "En palabras claras, cómo funciona trabajar juntos de verdad. Sin trampas legales: solo lo que puedes esperar de nosotros y lo que te pedimos a ti.",
      whoTitle: "Quién es Kodable.ai",
      whoBody:
        "Kodable.ai es un pequeño estudio que usa IA para ayudar a crecer a negocios locales. Cuando contratas a Kodable.ai, trabajas directamente con nuestro equipo: de principio a fin. Estos términos cubren cualquier trabajo que hagamos para ti, y al pedirnos que empecemos un proyecto los estás aceptando.",
      contactLabel: "Puedes contactarnos en",
      scopeTitle: "Lo que hacemos",
      scopeBody:
        "Ayudamos a negocios locales a crecer con IA. Nuestro trabajo se divide en cuatro áreas:",
      scopeItems: [
        "Webs — sitios rápidos hechos con IA que hacen que te encuentren y convierten visitas en clientes.",
        "Agentes de IA — asistentes que atienden a tus clientes y cogen reservas a todas horas.",
        "Herramientas y apps a medida — apps de reservas y pedidos, calculadoras, paneles y herramientas internas hechas para ti.",
        "Automatizaciones e integraciones — conectar las herramientas que usas para que el trabajo repetitivo se haga solo.",
      ],
      scopeNote:
        "Siempre dejaremos claro cuáles de estas áreas cubre un presupuesto. Todo lo que no esté escrito en el presupuesto no está incluido hasta que lo acordemos y confirmemos el precio.",
      quotesTitle: "Cómo funcionan los presupuestos y los proyectos",
      quotesBody:
        "Antes de empezar cualquier trabajo te enviaremos un presupuesto por escrito con lo que incluye, lo que cuesta y, más o menos, cuánto tardará. El proyecto queda confirmado cuando aceptas ese presupuesto y pagas el anticipo acordado. Normalmente pedimos una parte por adelantado y el resto en el lanzamiento; el reparto exacto está en tu presupuesto.",
      quotesBody2:
        "Si a mitad del proyecto quieres añadir algo, no hay problema: te lo presupuestamos aparte para que nunca haya sorpresas en la factura final. Y si tus necesidades cambian mucho, siempre podemos pausar, replantear y volver a presupuestar.",
      pricesTitle: "Sobre los precios",
      pricesBody:
        "No publicamos una lista de precios, porque cada proyecto es distinto. Tras una consulta gratis y sin compromiso te enviamos un precio por escrito según lo que tu proyecto necesita de verdad, así pagas solo por lo que de verdad te resulta útil. Salvo que indiquemos lo contrario, los precios se presupuestan sin IVA; el IVA se añade en la factura cuando corresponde.",
      careTitle: "Planes de cuidado y servicios recurrentes",
      careBody:
        "El hosting y el plan de cuidado mensual son servicios continuos que se facturan de forma recurrente (mensual o anual, según se acuerde). Mantienen tu web online, con copias de seguridad, segura y actualizada, e incluyen pequeños cambios según lo descrito en tu plan.",
      careItems: [
        "Los planes de cuidado se renuevan automáticamente hasta que los canceles.",
        "Puedes cancelar avisando con 30 días, con efecto al final del periodo de facturación en curso. No te atamos a contratos largos.",
        "Las cuotas recurrentes ya pagadas del periodo en curso no se reembolsan, pero mantienes el servicio hasta que termine ese periodo.",
        "Si un pago recurrente falla y no se resuelve, podemos pausar el servicio hasta que esté al día.",
      ],
      ipTitle: "De quién es el trabajo",
      ipBody:
        "Una vez pagado el proyecto por completo, la web final y el contenido que nos diste son tuyos. Puedes conservarlos, moverlos o cambiarlos con libertad. Hay algunas excepciones razonables: las herramientas, fuentes, imágenes de stock o plugins de terceros se rigen por sus propias licencias, y cualquier bloque reutilizable o código que creemos sigue siendo nuestro para reutilizarlo en otros proyectos. Podemos mostrar tu web terminada en nuestro portfolio salvo que nos pidas que no lo hagamos.",
      liabilityTitle: "Lo que podemos y no podemos prometer",
      liabilityBody:
        "Cuidamos tu proyecto de verdad, pero ninguna web puede prometerse perfecta, sin errores ni con un resultado de negocio concreto. El SEO en especial depende de Google y de tu mercado, así que no podemos garantizar posiciones, tráfico ni ventas.",
      liabilityBody2:
        "No somos responsables de problemas fuera de nuestro control, como caídas de hosting de terceros, el contenido que nos facilitas o cambios que tú u otra persona hagáis tras el lanzamiento. Si algo sale mal y es culpa nuestra, nuestra responsabilidad se limita a arreglarlo o, como máximo, a devolverte lo que nos pagaste por esa parte del trabajo. No respondemos por pérdidas indirectas o derivadas, como el lucro cesante.",
      lawTitle: "Qué ley se aplica",
      lawBody:
        "Estos términos se rigen por la legislación de España, y cualquier disputa se someterá a los tribunales de España. Si alguna parte concreta de estos términos no fuera válida, el resto seguirá aplicándose.",
      noteTitle: "Una nota sobre esta página",
      noteBody:
        "Esto es una plantilla en lenguaje sencillo, escrita para que sea fácil de leer, no un contrato legal terminado. Conviene revisarla y adaptarla a tu proyecto concreto antes del lanzamiento. Si algo aquí no queda claro, pregúntanos: preferimos explicártelo a que firmes algo que no entiendes.",
      back: "Volver al inicio",
    },
  }[locale];

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{copy.home}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{copy.terms}</span>
          </nav>
          <h1 className="page-h">{copy.title}</h1>
          <p className="page-sub">{copy.updated}</p>
        </div>
      </section>

      {/* TERMS */}
      <section className="sec">
        <div className="wrap">
          <div className="prose">
            <p className="reveal">{copy.lead}</p>

            <h2 className="reveal">{copy.whoTitle}</h2>
            <p className="reveal">{copy.whoBody}</p>
            <p className="reveal">
              {copy.contactLabel}{" "}
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
            </p>

            <h2 className="reveal">{copy.scopeTitle}</h2>
            <p className="reveal">{copy.scopeBody}</p>
            <ul className="reveal">
              {copy.scopeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="reveal">{copy.scopeNote}</p>

            <h2 className="reveal">{copy.quotesTitle}</h2>
            <p className="reveal">{copy.quotesBody}</p>
            <p className="reveal">{copy.quotesBody2}</p>

            <h2 className="reveal">{copy.pricesTitle}</h2>
            <p className="reveal">{copy.pricesBody}</p>

            <h2 className="reveal">{copy.careTitle}</h2>
            <p className="reveal">{copy.careBody}</p>
            <ul className="reveal">
              {copy.careItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="reveal">{copy.ipTitle}</h2>
            <p className="reveal">{copy.ipBody}</p>

            <h2 className="reveal">{copy.liabilityTitle}</h2>
            <p className="reveal">{copy.liabilityBody}</p>
            <p className="reveal">{copy.liabilityBody2}</p>

            <h2 className="reveal">{copy.lawTitle}</h2>
            <p className="reveal">{copy.lawBody}</p>

            <h2 className="reveal">{copy.noteTitle}</h2>
            <p className="reveal">
              <strong>{copy.noteBody}</strong>
            </p>

            <div className="mt-cta reveal">
              <Link href={`/${locale}`} className="btn btn-ghost">
                {copy.back}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
