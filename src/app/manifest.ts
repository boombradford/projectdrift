import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Drift",
    short_name: "Drift",
    description: "Real-data drift tracking for PSI, CrUX, and on-page SEO changes.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#f06c5b",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "256x256",
        type: "image/svg+xml",
      },
      {
        src: "/brand/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
