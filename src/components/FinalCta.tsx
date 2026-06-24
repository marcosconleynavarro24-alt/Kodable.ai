import type { SiteContent } from "@/content/site";
import { contactInfo } from "@/content/contact-info";
import Icon from "./Icon";

// The dark final call-to-action with a contact card. Used at the foot of most
// pages. WhatsApp / call / email are real one-tap links.
export default function FinalCta({
  finalCta,
}: {
  finalCta: SiteContent["finalCta"];
}) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="final reveal">
          <div className="final-grid">
            <div>
              <h2>{finalCta.title}</h2>
              <p>{finalCta.body}</p>
              <div className="final-cta">
                <a
                  href={contactInfo.whatsappUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp"
                >
                  <Icon name="chat" />
                  {finalCta.whatsapp}
                </a>
                <a href={`mailto:${contactInfo.email}`} className="btn btn-ghost" data-track="email">
                  {finalCta.email}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <a className="row" href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" data-track="whatsapp">
                <span className="ci" aria-hidden="true">
                  <Icon name="chat" />
                </span>
                <span>
                  <span className="ct">{finalCta.labels.whatsapp}</span>
                  <br />
                  <span className="cv">{contactInfo.phoneDisplay}</span>
                </span>
              </a>
              <a className="row" href={`tel:${contactInfo.phoneHref}`} data-track="call">
                <span className="ci" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="ct">{finalCta.labels.call}</span>
                  <br />
                  <span className="cv">{contactInfo.phoneDisplay}</span>
                </span>
              </a>
              <a className="row" href={`mailto:${contactInfo.email}`} data-track="email">
                <span className="ci" aria-hidden="true">
                  <Icon name="mail" />
                </span>
                <span>
                  <span className="ct">{finalCta.labels.email}</span>
                  <br />
                  <span className="cv">{contactInfo.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
