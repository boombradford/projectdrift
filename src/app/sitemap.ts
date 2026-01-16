import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://drift.fluxninelabs.com/",
      lastModified: new Date(),
    },
  ];
}
