import type { Metadata } from "next"

import { site } from "@/site"

// Metadata for an inner page: "Title | Morche".
export function pageMeta(
  path: string,
  title: string,
  description: string,
): Metadata {
  const full = `${title} | ${site.name}`
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      url: path,
    },
  }
}
