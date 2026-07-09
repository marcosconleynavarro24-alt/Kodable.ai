// Post-payment landing: confirm + route straight into onboarding so the
// 7-day clock can start immediately. Kept static and dumb on purpose — the
// payment record lives in Stripe; no session lookup needed to say thanks.
// Also the only place care plans are pitched (removed from public service
// pages 2026-07-10): checkout already bundles Care Básico, so this is the
// Plus/Pro upgrade prompt.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCareGroup } from "@/content/pricing";
import PriceGroupList from "@/components/PriceGroupList";

export const metadata: Metadata = {
  title: "¡Bienvenido a bordo!",
  robots: { index: false, follow: false },
};

export default async function GraciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const care = getCareGroup(locale);

  return (
    <main className="wrap" style={{ maxWidth: 960, padding: "64px 20px 96px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ marginBottom: 12 }}>¡Pago recibido — bienvenido! 🎉</h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: 8 }}>
          Te llega el recibo de Stripe por email. Ahora, el único paso que queda
          para que empecemos a construir:
        </p>
        <p style={{ color: "var(--ink-soft)", marginBottom: 28 }}>
          <b>Rellena el formulario de puesta en marcha</b> (10 minutos) y mándanos
          las fotos por WhatsApp. El plazo de 7 días laborables empieza ahí.
        </p>
        <Link href={`/${locale}/onboarding`} className="btn btn-primary">
          Empezar la puesta en marcha →
        </Link>
      </div>

      {/* Care plan upsell — Care Básico ya viene incluido en tu cuota. */}
      <div style={{ marginTop: 72 }}>
        <div style={{ maxWidth: 640, margin: "0 auto 28px", textAlign: "center" }}>
          <h2 style={{ marginBottom: 10 }}>Protege tu inversión</h2>
          <p style={{ color: "var(--ink-soft)" }}>
            Tu cuota ya incluye el <b>Cuidado Básico</b>. Si quieres cambios de
            contenido cada mes o soporte prioritario, mejora tu plan cuando
            quieras — escríbenos y lo activamos.
          </p>
        </div>
        <PriceGroupList groups={[care]} contactHref={`/${locale}/contact`} />
      </div>
    </main>
  );
}
