import { faqItems } from "@/content/faq";

// FAQPage structured data — built from the same content shown on the page, so
// the rich result can never drift from what visitors actually read.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-[160px] bg-white border-y border-line/30"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[800px] mx-auto px-5">
        <h2
          className="text-[42px] leading-[1.2] font-normal text-center mb-16"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Common Enquiries
        </h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-line/50 pb-4"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none py-4 font-semibold text-lg text-ink hover:text-accent transition-colors">
                {item.question}
                <span className="material-symbols-outlined group-open:rotate-180 group-open:text-accent transition-all flex-shrink-0 ml-4">
                  expand_more
                </span>
              </summary>
              <p className="text-ink-muted leading-relaxed pb-4 text-[16px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
