// The four plain promises we lead with — written for a non-technical owner who
// has never built a website. Each bucket translates real capabilities into a
// worry they already have, in words they'd use themselves. No tech terms.
// (Owner may edit any line later.)

export type Bucket = {
  icon: string; // Material Symbols name, matching the existing icon system
  title: string;
  promise: string; // the headline promise, plain language
  points: string[]; // 2–4 owner-facing supporting lines
};

export const whatYouGet: Bucket[] = [
  {
    icon: "search",
    title: "Get found",
    promise:
      "When someone nearby searches for a business like yours, you show up — not just your competitors. Fast, and perfect on a phone.",
    points: [
      "When someone Googles a business like yours nearby, you come up.",
      "Loads instantly — people don't wait around for a slow site.",
      "Looks perfect on a phone, where almost all your customers will see it.",
    ],
  },
  {
    icon: "auto_awesome",
    title: "Look the part",
    promise:
      "A site that makes you look established and trustworthy, so people choose you over the next option.",
    points: [
      "Looks established and professional from the first second.",
      "Your happy customers' reviews, front and centre, so new ones trust you.",
      "Works in Spanish and English, so you don't lose the locals or the expats.",
    ],
  },
  {
    icon: "touch_app",
    title: "Win the customer",
    promise:
      "Customers can book, order, call or message you in one tap — in English or Spanish, even when you're closed.",
    points: [
      "Customers book themselves from their phone — even when you're closed. No more phone tag.",
      "One tap to message or call you — the way people here actually get in touch.",
      "Take orders straight from your site — and keep what the delivery apps take.",
    ],
  },
  {
    icon: "shield",
    title: "Forget about it",
    promise:
      "We keep it online, safe and up to date, and we actually answer. You run your business; we run the website.",
    points: [
      "We keep it online, safe and updated. You never think about it.",
      "Change your hours, prices or photos yourself in seconds — no developer needed.",
      "We actually answer — within 24 hours, in English and Spanish.",
    ],
  },
];

export const whatYouGetHeadline = "What you get";
export const whatYouGetIntro =
  "Four plain promises. No jargon — just what a website should do for your business.";
