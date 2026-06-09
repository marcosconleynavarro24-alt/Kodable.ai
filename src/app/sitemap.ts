import type { MetadataRoute } from "next";
import { servicesCatalog } from "@/content/servicesCatalog";

const BASE_URL = "https://kodable.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicesCatalog.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
