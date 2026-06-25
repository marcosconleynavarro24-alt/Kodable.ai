import type { MetadataRoute } from "next";

// Web app manifest. Next emits <link rel="manifest" href="/manifest.webmanifest">
// automatically. The proxy matcher already excludes `manifest` from locale
// rewriting. Icons: the SVG mark scales to any size; logo.png is the raster
// fallback (also the Organization logo Google consumes).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kodable.ai",
    short_name: "Kodable.ai",
    description: "AI websites, agents & automations for small businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcfb",
    theme_color: "#0e8266",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
