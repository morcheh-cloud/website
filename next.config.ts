import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The root layout is app/[lang], so unmatched URLs need their own 404.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
}

export default nextConfig
