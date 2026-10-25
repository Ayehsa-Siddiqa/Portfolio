import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { portfolioData } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/opengraph-image.png`, ...portfolioData.featuredProjects.map((p) => `${siteUrl}${p.image}`)],
    },
  ];
}
