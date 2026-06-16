import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-ink py-20 mt-12">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 px-5 md:px-20 max-w-[1280px] mx-auto text-bg">
        {/* Brand */}
        <div className="col-span-4 md:col-span-4">
          <h3
            className="text-white mb-6 text-[32px] font-normal leading-[1.3]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Kodable.ai
          </h3>
          <p className="text-bg/60 text-[16px] leading-[1.6] mb-4 max-w-[280px]">
            Building high-conversion digital experiences for companies that
            demand excellence.
          </p>
          <p
            className="text-white/40 text-[10px] uppercase tracking-widest mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Hablamos español &amp; English
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-bg/60 hover:text-white transition-colors"
              aria-label="Twitter/X"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-bg/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-bg/60 hover:text-white transition-colors"
              aria-label="Clutch"
            >
              Clutch
            </a>
          </div>
        </div>

        {/* Nav */}
        <div className="col-span-2 md:col-span-2">
          <h4
            className="text-white/40 uppercase mb-6 text-[10px] tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Navigation
          </h4>
          <ul className="space-y-4 text-bg/80">
            <li>
              <a
                href="#services"
                className="hover:text-white transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#process"
                className="hover:text-white transition-colors"
              >
                Process
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-2 md:col-span-2">
          <h4
            className="text-white/40 uppercase mb-6 text-[10px] tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Legal
          </h4>
          <ul className="space-y-4 text-bg/80">
            <li>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-4 md:col-span-4 md:text-right flex flex-col justify-between">
          <div>
            <h4
              className="text-white/40 uppercase mb-6 text-[10px] tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Newsletter
            </h4>
            <div className="flex border-b border-bg/20 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Newsletter email address"
                className="bg-transparent border-none outline-none p-0 text-white placeholder:text-white/20 w-full"
              />
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                className="text-white material-symbols-outlined ml-2"
              >
                arrow_forward
              </button>
            </div>
          </div>
          <p
            className="text-bg/60 text-[10px] mt-12 md:mt-0"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} Kodable.ai. All rights reserved.
            Built with precision.
          </p>
        </div>
      </div>

      {/* Large watermark text */}
      <div
        className="font-normal opacity-5 text-bg absolute bottom-0 left-0 -mb-8 leading-none pointer-events-none uppercase text-[88px]"
        style={{ fontFamily: "var(--font-serif)" }}
        aria-hidden="true"
      >
        KODABLE
      </div>
    </footer>
  );
}
