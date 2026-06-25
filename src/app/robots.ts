import type { MetadataRoute } from "next";

// The wildcard already allows every crawler. We additionally name the major AI
// answer-engine and search crawlers explicitly: it's a clear, positive signal
// that this site WANTS to be read and cited by them (and documents intent if a
// future edit ever tightens the wildcard).
const AI_AND_SEARCH_BOTS = [
  "GPTBot", // OpenAI training/crawl
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on user request
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended", // Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Bing index → Copilot & ChatGPT search retrieval
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://kodable.ai/sitemap.xml",
    host: "https://kodable.ai",
  };
}
