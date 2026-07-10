// Operational page: new-client intake. Spanish-only content (clients are
// Spanish SMBs), noindex (linked from the post-close welcome message, never
// from nav/sitemap), same locale-prefixed routing as the rest of the site so
// the shared layout/header/footer just work.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import OnboardingForm from "@/components/OnboardingForm";

export const metadata: Metadata = {
  title: "Puesta en marcha de tu web",
  description: "Formulario de alta para nuevos clientes de Kodable.ai.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main className="wrap" style={{ maxWidth: 720, padding: "48px 20px 80px" }}>
      <h1 style={{ marginBottom: 10 }}>Ponemos tu web en marcha 🚀</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 8 }}>
        Con esto que nos pases construimos tu web. Son 10 minutos ahora y nos
        ahorra días de idas y venidas: <b>el plazo de 7 días empieza cuando
        tengamos este formulario y las fotos.</b>
      </p>
      <p style={{ color: "var(--ink-mute)", fontSize: ".9rem", marginBottom: 28 }}>
        No hace falta que quede perfecto: escribe rápido y natural, nosotros
        lo pulimos. Lo que no tengas, déjalo en blanco.
      </p>
      <OnboardingForm />
    </main>
  );
}
