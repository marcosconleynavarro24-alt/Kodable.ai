// Single source of truth for contact details — the live production number and
// email. Also emitted in public JSON-LD (Organization / ProfessionalService
// telephone + contactPoint), so keep these accurate. Used by the contact card,
// final CTA, footer, and the lead API confirmation copy.
export const contactInfo = {
  whatsappNumber: "34690689260", // digits only, for wa.me links
  phoneDisplay: "+34 690 68 92 60",
  phoneHref: "+34690689260",
  email: "info@kodable.ai",
  whatsappUrl: "https://wa.me/34690689260",
} as const;
