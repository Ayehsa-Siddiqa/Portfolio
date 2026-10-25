import type { MetadataRoute } from "next";
import { seo } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayesha Siddiqa · Portfolio",
    short_name: "Ayesha",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07060b",
    theme_color: "#07060b",
    icons: [{ src: "/icon.png", sizes: "64x64", type: "image/png" }],
  };
}
