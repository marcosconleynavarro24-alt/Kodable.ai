export default function AITeaser() {
  return (
    <section className="py-[80px] max-w-[1280px] mx-auto px-5 md:px-20">
      <div className="bg-gradient-to-br from-[#F5F0FA] to-[#F0F4FA] border border-[#D6D0E5] rounded-xl p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-[600px]">
            <span
              className="inline-block bg-white px-3 py-1 text-[10px] border border-[#D6D0E5] text-[#5B3FA8] rounded-full uppercase mb-6 tracking-widest font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Coming Soon
            </span>
            <h2
              className="text-[42px] leading-tight font-normal mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The next evolution: Intelligent AI Agents for your customer
              service.
            </h2>
            <p className="text-[#444748] text-[18px] leading-[1.6]">
              We&apos;re building custom AI agents that live on your website,
              handle complex customer inquiries, and close sales while you
              sleep.
            </p>
          </div>
          <div>
            <a
              href="#contact"
              className="print-shadow bg-[#5B3FA8] text-white px-12 py-5 rounded-[4px] font-semibold text-[16px] hover:bg-[#0A0A0A] transition-all duration-300 inline-block whitespace-nowrap"
            >
              Join the Waitlist
            </a>
          </div>
        </div>

        {/* Decorative blob */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,89.5,-0.6C88.5,14.5,81.4,29,72.3,42.4C63.2,55.8,52.1,68.1,38.7,75.2C25.3,82.3,9.6,84.2,-6.1,84.7C-21.8,85.2,-37.5,84.3,-51.2,77.2C-64.9,70.1,-76.6,56.8,-83.7,41.4C-90.8,26,-93.3,8.5,-91.1,-8.5C-88.9,-25.5,-82,-42,-70.6,-54.6C-59.2,-67.2,-43.3,-75.9,-28.1,-81.4C-12.9,-86.9,1.6,-89.2,16.6,-86.6C31.6,-84,44.7,-76.4Z"
              fill="#5B3FA8"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
