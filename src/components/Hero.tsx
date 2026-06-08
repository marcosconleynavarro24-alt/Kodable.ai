export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-20 mb-[160px]">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-center">
        <div className="col-span-4 md:col-span-8 flex flex-col items-start">
          <h1
            className="text-[48px] md:text-[88px] leading-[1.1] md:leading-[1.0] tracking-[-0.02em] font-normal text-[#0A0A0A] mb-8 max-w-[90%] md:max-w-full"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your ideas,{" "}
            <span className="italic-accent italic">our reality</span>
          </h1>
          <div className="w-[60px] h-[2px] bg-[#0A0A0A] mb-12" />
          <p className="text-[18px] leading-[1.6] tracking-[-0.01em] text-[#444748] max-w-[600px] mb-10">
            Kodable.ai merges architectural precision with editorial aesthetics
            to build digital platforms that don&apos;t just exist—they perform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="print-shadow bg-[#0A0A0A] text-white px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:-translate-y-0.5 transition-transform duration-300 text-center"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="border border-[#0A0A0A] text-[#0A0A0A] px-10 py-5 rounded-[4px] font-semibold text-[16px] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 text-center"
            >
              View Our Services
            </a>
          </div>
        </div>

        <div className="col-span-4 md:col-span-4 flex justify-end relative h-full min-h-[400px]">
          <div className="w-full h-full bg-white rounded-lg p-2 print-shadow overflow-hidden transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="w-full h-full min-h-[360px] bg-gradient-to-br from-[#F5F0FA] to-[#E8E5DD] rounded-md flex items-center justify-center">
              <div className="text-center p-8">
                <div
                  className="text-[24px] font-normal text-[#3D1F4E] italic mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Your next website
                </div>
                <div className="w-full h-2 bg-[#E8E5DD] rounded mb-3" />
                <div className="w-3/4 h-2 bg-[#E8E5DD] rounded mb-3" />
                <div className="w-5/6 h-2 bg-[#E8E5DD] rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
