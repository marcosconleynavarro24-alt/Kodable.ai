// Post-payment landing: confirm + route straight into onboarding so the
// 7-day clock can start immediately. Kept static and dumb on purpose — the
// payment record lives in Stripe; no session lookup needed to say thanks.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";

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

  return (
    <main className="wrap" style={{ maxWidth: 640, padding: "64px 20px 96px", textAlign: "center" }}>
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
    </main>
  );
}
