import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Kodable.ai",
  description:
    "How Kodable.ai collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p
            className="text-ink-muted text-[13px] uppercase tracking-widest mb-12"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>

          <P>
            This Privacy Policy explains how Kodable.ai (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and
            protects personal data when you visit kodable.ai (the
            &ldquo;Site&rdquo;) or contact us. The Site is operated from
            Spain, and we process personal data in accordance with the EU
            General Data Protection Regulation (GDPR) and applicable Spanish
            data protection law. You can reach us at any time at{" "}
            <a
              href="mailto:hello@kodable.ai"
              className="text-accent hover:underline"
            >
              hello@kodable.ai
            </a>
            .
          </P>

          <H2>What data we collect</H2>
          <P>
            <strong className="text-ink">Contact form.</strong> When you
            submit our contact form, we collect your name, email address, and
            the contents of your message. Providing this information is
            voluntary, but we need it to respond to your enquiry.
          </P>
          <P>
            <strong className="text-ink">Newsletter.</strong> If you subscribe
            to our newsletter, we collect your email address and use it solely
            to send you occasional updates. You can unsubscribe at any time
            using the link in any email or by writing to us.
          </P>
          <P>
            <strong className="text-ink">Technical data.</strong> Our hosting
            provider automatically processes limited technical information
            (such as IP address, browser type, and pages requested) in server
            logs for security and to deliver the Site reliably.
          </P>
          <P>
            <strong className="text-ink">Cookies.</strong> The Site does not
            currently use advertising or analytics cookies, and we do not
            track you across other websites. If this changes, we will update
            this policy and request your consent where required.
          </P>

          <H2>Why we process your data</H2>
          <P>
            We process contact form data to respond to your enquiry and take
            steps toward a potential engagement (GDPR Art. 6(1)(b)) and on the
            basis of our legitimate interest in operating and promoting our
            business (Art. 6(1)(f)). Newsletter emails are sent only with your
            consent (Art. 6(1)(a)), which you may withdraw at any time.
            Technical log data is processed on the basis of our legitimate
            interest in keeping the Site secure and available.
          </P>

          <H2>Who we share data with</H2>
          <P>
            We do not sell your personal data. We share it only with the
            service providers that make the Site work: our form-handling
            provider, Formspree, Inc. (United States), which receives contact
            form submissions on our behalf, and our hosting provider, Vercel
            Inc. (United States). Where data is transferred outside the
            European Economic Area, these providers rely on safeguards such as
            the EU Standard Contractual Clauses and/or the EU–US Data Privacy
            Framework. We may also disclose data where required by law.
          </P>

          <H2>How long we keep your data</H2>
          <P>
            We keep contact enquiries for as long as needed to handle your
            request and for a reasonable period afterwards (generally no more
            than two years), unless the enquiry leads to a client engagement,
            in which case data is retained as part of that business
            relationship and for any legally required periods. Newsletter data
            is kept until you unsubscribe.
          </P>

          <H2>Your rights</H2>
          <P>
            Under the GDPR you have the right to access, rectify, or erase
            your personal data, to restrict or object to its processing, to
            data portability, and to withdraw consent at any time without
            affecting prior processing. To exercise any of these rights, email
            us at{" "}
            <a
              href="mailto:hello@kodable.ai"
              className="text-accent hover:underline"
            >
              hello@kodable.ai
            </a>
            . You also have the right to lodge a complaint with a supervisory
            authority — in Spain, the Agencia Española de Protección de Datos
            (AEPD), at{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              www.aepd.es
            </a>
            .
          </P>

          <H2>Security</H2>
          <P>
            We take reasonable technical and organisational measures to
            protect your data, including serving the Site over HTTPS and
            limiting access to the data we hold. No method of transmission or
            storage is completely secure, but we work to protect your
            information appropriately for the nature of our activity.
          </P>

          <H2>Children</H2>
          <P>
            The Site is intended for businesses and professionals and is not
            directed at children under 14. We do not knowingly collect
            personal data from children.
          </P>

          <H2>Changes to this policy</H2>
          <P>
            We may update this Privacy Policy from time to time. The
            &ldquo;Last updated&rdquo; date above reflects the most recent
            version, and material changes will be highlighted on this page.
          </P>
        </article>
      </main>
      <Footer />
    </>
  );
}
