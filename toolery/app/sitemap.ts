import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const SITE_URL = "https://toolery.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = tools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolEntries,
  ];
}
