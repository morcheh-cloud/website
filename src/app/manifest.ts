import type { MetadataRoute } from "next"

import { copy } from "@/copy"
import { site } from "@/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: copy.meta.description,
    start_url: "/",
    display: "browser",
    // The page colour (token `void`); manifests can't read CSS variables.
    background_color: "#06070d",
    theme_color: "#06070d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}
