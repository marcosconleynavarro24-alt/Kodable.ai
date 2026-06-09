export default function CTASection() {
  return (
    <section className="px-5 md:px-20 pt-[80px] pb-[40px]">
      <div className="max-w-[1280px] mx-auto bg-ink rounded-2xl px-8 md:px-20 py-20 md:py-28 text-center relative overflow-hidden">
        <div className="relative z-10">
          <span
            className="text-accent uppercase tracking-[0.2em] mb-6 block text-[12px] leading-[1.0] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Let&apos;s get started
          </span>
          <h2
            className="text-white text-[40px] md:text-[56px] leading-[1.1] font-normal text-balance max-w-[800px] mx-auto"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ready to build something that performs?
          </h2>
          <p className="text-bg/70 text-[18px] leading-[1.6] mt-6 mb-12 max-w-[520px] mx-auto">
            Tell us about your project and we&apos;ll show you what editorial
            precision can do for your business.
          </p>
          <a
            href="#contact"
            className="print-shadow inline-block bg-bg text-ink px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:-translate-y-0.5 hover:bg-accent hover:text-white transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>

        {/* Subtle accent watermark */}
        <div
          className="font-normal opacity-[0.06] text-bg absolute -bottom-10 left-1/2 -translate-x-1/2 leading-none pointer-events-none uppercase text-[140px] md:text-[200px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-serif)" }}
          aria-hidden="true"
        >
          KODABLE
        </div>
      </div>
    </section>
  );
}
