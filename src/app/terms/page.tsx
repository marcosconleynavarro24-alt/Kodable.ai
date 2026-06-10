import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Kodable.ai",
  description: "The terms that govern your use of the Kodable.ai website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 10, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[28px] md:text-[32px] leading-[1.3] font-normal text-ink mt-16 mb-6"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink-muted text-[17px] leading-[1.7] mb-5">{children}</p>
  );
}

export default function TermsPage() {
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <Nav />
      <main className="pt-32">
        <article className="max-w-[820px] mx-auto px-5 md:px-20 py-[80px] md:py-[120px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-ink-muted hover:text-accent text-[14px] font-medium transition-colors mb-12"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <h1
            className="text-[44px] md:text-[56px] leading-[1.15] font-normal text-ink mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Terms of Service
          </h1>
          <p
            className="text-ink-muted text-[13px] uppercase tracking-widest mb-12"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>

          <P>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of kodable.ai (the &ldquo;Site&rdquo;), operated by
            Kodable.ai (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) from Spain. By using the Site, you agree to
            these Terms. If you do not agree, please do not use the Site. You
            can contact us at{" "}
            <a
              href="mailto:hello@kodable.ai"
              className="text-accent hover:underline"
            >
              hello@kodable.ai
            </a>
            .
          </P>

          <H2>1. The Site and our services</H2>
          <P>
            The Site presents the web design, web development, SEO, and
            hosting and maintenance services we offer. The Site itself is
            informational: nothing on it constitutes a binding offer, and no
            services are purchased directly through the Site. Any engagement
            is governed by a separate written proposal or agreement between
            you and us, which will prevail over these Terms in case of
            conflict.
          </P>

          <H2>2. Quotes and pricing</H2>
          <P>
            Prices shown on the Site are indicative starting points only.
            Final pricing depends on the scope of each project and is
            confirmed in a written quote or proposal. We may change the
            indicative prices on the Site at any time without notice.
          </P>

          <H2>3. Acceptable use</H2>
          <P>
            You agree to use the Site lawfully and not to interfere with its
            operation, attempt to gain unauthorised access to it or its
            infrastructure, scrape it at disruptive volumes, or use the
            contact form to send unlawful, abusive, or unsolicited commercial
            content.
          </P>

          <H2>4. Intellectual property</H2>
          <P>
            The Site and its content — including text, design, graphics,
            logos, and code — are owned by us or our licensors and are
            protected by intellectual property laws. You may not reproduce,
            distribute, or create derivative works from the Site&apos;s
            content without our prior written permission, except as permitted
            by law. Intellectual property terms for client work are set out
            in the applicable project agreement.
          </P>

          <H2>5. Third-party links and services</H2>
          <P>
            The Site may contain links to third-party websites or rely on
            third-party services (such as form handling and hosting). We are
            not responsible for the content or practices of third parties,
            and linking does not imply endorsement.
          </P>

          <H2>6. Disclaimer</H2>
          <P>
            The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. While we aim to keep the information on
            the Site accurate and up to date, we make no warranties, express
            or implied, about its completeness, accuracy, or availability,
            and we may modify or discontinue any part of the Site at any
            time.
          </P>

          <H2>7. Limitation of liability</H2>
          <P>
            To the maximum extent permitted by law, we will not be liable for
            any indirect, incidental, or consequential damages, or any loss
            of profits, data, or business, arising from your use of or
            inability to use the Site. Nothing in these Terms excludes or
            limits liability that cannot be excluded under applicable law,
            including liability for wilful misconduct or gross negligence, or
            any rights you have as a consumer under Spanish and EU law.
          </P>

          <H2>8. Privacy</H2>
          <P>
            Our handling of personal data is described in our{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            , which forms part of these Terms.
          </P>

          <H2>9. Changes to these Terms</H2>
          <P>
            We may update these Terms from time to time. The updated version
            will be posted on this page with a revised &ldquo;Last
            updated&rdquo; date, and your continued use of the Site after
            changes take effect constitutes acceptance of the revised Terms.
          </P>

          <H2>10. Governing law and jurisdiction</H2>
          <P>
            These Terms are governed by the laws of Spain. Any dispute
            arising from these Terms or your use of the Site will be subject
            to the courts of Spain, without prejudice to any mandatory
            consumer protection rules that entitle you to bring proceedings
            in another forum.
          </P>

          <H2>11. Severability</H2>
          <P>
            If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions will continue in full
            force and effect.
          </P>
        </article>
      </main>
      <Footer />
    </>
  );
}
