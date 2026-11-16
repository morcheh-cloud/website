import type { MetadataRoute } from "next"

import { allArticles, tags, topics } from "@/content/db"
import { MIN_INDEXED, tagHref, topicHref, tutorialsHref } from "@/content/href"
import { guides } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { abs } from "@/lib/jsonld"

// Every indexable page. Thin tag pages (noindex) are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = allArticles()
  const newest = articles.reduce(
    (d, a) => (a.updatedAt > d ? a.updatedAt : d),
    "",
  )
  const latest = (list: { updatedAt: string }[]) =>
    list.reduce((d, a) => (a.updatedAt > d ? a.updatedAt : d), "") || newest
  const entry = (
    path: string,
    priority: number,
    lastModified?: string,
  ): MetadataRoute.Sitemap[number] => ({
    url: abs(path),
    priority,
    ...(lastModified ? { lastModified } : {}),
  })

  return [
    entry("/", 1),
    entry("/product", 0.9),
    entry("/install", 0.9),
    entry("/security", 0.8),
    entry("/docs", 0.8),
    ...guides.map((g) => entry(docHref(g.slug), 0.7)),
    entry(tutorialsHref(), 0.9, newest),
    ...topics()
      .filter((x) => x.count > 0)
      .map((x) =>
        entry(
          topicHref(x.slug),
          0.8,
          latest(articles.filter((a) => a.category === x.slug)),
        ),
      ),
    ...articles.map((a) => entry(tutorialsHref(a.slug), 0.7, a.updatedAt)),
    ...tags()
      .filter((x) => x.count >= MIN_INDEXED)
      .map((x) =>
        entry(
          tagHref(x.slug),
          0.5,
          latest(articles.filter((a) => a.tags.includes(x.slug))),
        ),
      ),
  ]
}
