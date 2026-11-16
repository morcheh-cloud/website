import type { Metadata } from "next"

import { site } from "@/site"

type Options = {
  // "Title | Morche" unless false (the title already says Morche).
  suffix?: boolean
  type?: "website" | "article"
  published?: string
  modified?: string
  section?: string
  tags?: string[]
  keywords?: string[]
  // Thin pages (a tag with one tutorial): crawl the links, don't index.
  noindex?: boolean
}

// Metadata for an inner page: title, description, canonical and the social
// preview (its image comes from the nearest opengraph-image file).
export function pageMeta(
  path: string,
  title: string,
  description: string,
  o: Options = {},
): Metadata {
  const full = o.suffix === false ? title : `${title} | ${site.name}`
  return {
    title: { absolute: full },
    description,
    keywords: o.keywords,
    alternates: { canonical: path },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: full,
      description,
      siteName: site.name,
      locale: "en_US",
      url: path,
      ...(o.type === "article"
        ? {
            type: "article",
            publishedTime: o.published,
            modifiedTime: o.modified,
            section: o.section,
            tags: o.tags,
          }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: full, description },
  }
}
