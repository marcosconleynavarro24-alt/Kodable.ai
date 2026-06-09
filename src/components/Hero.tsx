export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-20 pb-24 md:pb-32 md:min-h-[calc(100vh-128px)] flex items-center">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
        <div className="col-span-4 md:col-span-7 flex flex-col items-start">
          <span
            className="text-accent uppercase tracking-[0.2em] text-[12px] leading-none font-medium mb-8 flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Available for projects
          </span>
          <h1
            className="text-[48px] md:text-[84px] leading-[1.05] md:leading-[1.0] tracking-[-0.03em] font-normal text-ink mb-6 text-balance"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your ideas,{" "}
            <span className="italic-accent italic">our reality</span>
          </h1>
          <div className="w-[60px] h-[2px] bg-ink mb-8" />
          <p className="text-[18px] leading-[1.6] tracking-[-0.01em] text-ink-muted max-w-[560px] mb-10">
            Kodable.ai merges architectural precision with editorial aesthetics
            to build digital platforms that don&apos;t just exist—they perform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="print-shadow bg-ink text-white px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-center"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="border border-ink text-ink px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:bg-ink hover:text-white transition-all duration-300 text-center"
            >
              View Our Services
            </a>
          </div>
        </div>

        <div className="col-span-4 md:col-span-5 flex justify-end relative">
          {/* Designed editorial preview — a stylized product/browser frame */}
          <div className="w-full bg-white rounded-lg p-2 print-shadow transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-line">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-line" />
              <span className="w-2.5 h-2.5 rounded-full bg-line" />
              <span
                className="ml-3 text-[10px] text-ink-muted tracking-wide truncate"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                yourbrand.com
              </span>
            </div>
            {/* Mock page */}
            <div className="bg-bg rounded-b-md p-7">
              <span
                className="text-accent uppercase tracking-[0.2em] text-[9px] font-medium block mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Studio
              </span>
              <div
                className="text-[26px] leading-[1.1] text-ink mb-5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Built to{" "}
                <span className="italic" style={{ color: "var(--color-accent)" }}>
                  perform
                </span>
              </div>
              <div className="space-y-2.5 mb-6">
                <div className="h-2 w-full bg-line rounded-full" />
                <div className="h-2 w-4/5 bg-line rounded-full" />
                <div className="h-2 w-2/3 bg-line rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-block h-7 w-24 rounded-[3px] bg-ink" />
                <span className="inline-block h-7 w-20 rounded-[3px] border border-ink" />
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="aspect-square rounded-md bg-white border border-line" />
                <div className="aspect-square rounded-md bg-accent-soft border border-line" />
                <div className="aspect-square rounded-md bg-white border border-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
