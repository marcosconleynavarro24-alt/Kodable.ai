import { processSteps } from "@/content/process";

export default function Process() {
  return (
    <section
      id="process"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-end mb-24">
        <div className="col-span-4 md:col-span-6">
          <span
            className="text-[#5B3FA8] uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Methodology
          </span>
          <h2
            className="text-[42px] leading-[1.2] font-normal text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            A disciplined approach to creation.
          </h2>
        </div>
        <div className="col-span-4 md:col-span-6 md:text-right">
          <p className="text-[#444748] max-w-[400px] ml-auto text-[16px] leading-[1.6]">
            We don&apos;t guess. We research, iterate, and deploy with surgical
            precision to ensure every pixel serves your business goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 border-t border-[#E8E5DD] pt-12">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="col-span-4 md:col-span-3 relative group py-8"
          >
            <span
              className="absolute -top-12 left-0 text-[120px] font-normal text-[#E8E5DD]/30 -z-10 transition-colors duration-500 group-hover:text-[#5B3FA8]/10 leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {step.number}
            </span>
            <h4
              className="text-[32px] leading-[1.3] font-normal mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {step.title}
            </h4>
            <p className="text-[#444748] text-[16px] leading-[1.6]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
