import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Turbopack cannot decode .ico metadata images (favicon.ico), which logs
    // "Processing image failed" / "unable to decode image data" in dev.
    disableStaticImages: true,
  },
};

export default nextConfig;
