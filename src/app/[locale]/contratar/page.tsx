// Operational page: contract + payment. Spanish-only, noindex — the owner
// shares this link with a prospect who said yes (add ?fundador=1 for the
// first-5 founding offer). Payment happens on Stripe Checkout; this page's
// job is plan choice + contract acceptance.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import ContratarForm from "@/components/ContratarForm";

export const metadata: Metadata = {
  title: "Contratar tu web",
  description: "Contratación online para clientes de Kodable.ai.",
  robots: { index: false, follow: false },
};

export default async function ContratarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ fundador?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const founding = sp.fundador === "1";

  return (
    <main className="wrap" style={{ maxWidth: 720, padding: "48px 20px 80px" }}>
      <h1 style={{ marginBottom: 10 }}>Contratar tu web</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 28 }}>
        Dos minutos: eliges qué contratas, aceptas las condiciones y pagas de
        forma segura. Después te pedimos los contenidos y en 7 días laborables
        tu web está publicada.
      </p>
      <ContratarForm founding={founding} />
    </main>
  );
}
