import { faqItems } from "@/content/faq";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-[160px] bg-white border-y border-[#E8E5DD]/30"
    >
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
              className="group border-b border-[#E8E5DD]/50 pb-4"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none py-4 font-semibold text-lg text-[#0A0A0A]">
                {item.question}
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform flex-shrink-0 ml-4">
                  expand_more
                </span>
              </summary>
              <p className="text-[#444748] leading-relaxed pb-4 text-[16px]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
