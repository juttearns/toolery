import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blog";

const SITE_URL = "https://fyxia.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = tools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogEntries = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...toolEntries,
    ...blogEntries,
  ];
}
