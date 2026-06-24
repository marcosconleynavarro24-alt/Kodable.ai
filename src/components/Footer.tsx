import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/site";
import { contactInfo } from "@/content/contact-info";
import Logo from "./Logo";

export default function Footer({
  locale,
  site,
}: {
  locale: Locale;
  site: SiteContent;
}) {
  const { footer, nav } = site;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo locale={locale} />
            <p className="fdesc">{footer.desc}</p>
          </div>
          <div className="footer-col">
            <h4>{footer.exploreTitle}</h4>
            {nav.links.map((l) => (
              <Link key={l.key} href={`/${locale}${l.href}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>{footer.contactTitle}</h4>
            <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" data-track="whatsapp">
              WhatsApp
            </a>
            <a href={`tel:${contactInfo.phoneHref}`} data-track="call">{`${locale === "es" ? "Llamar" : "Call"} ${contactInfo.phoneDisplay}`}</a>
            <a href={`mailto:${contactInfo.email}`} data-track="email">{contactInfo.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <span>
            <Link href={`/${locale}/privacy`}>{footer.privacy}</Link>
            {" · "}
            <Link href={`/${locale}/terms`}>{footer.terms}</Link>
          </span>
        </div>
        <p className="footnote">{footer.footnote}</p>
      </div>
    </footer>
  );
}
