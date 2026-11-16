import { allArticles, topicFor } from "@/content/db"
import { tutorialsHref } from "@/content/href"
import { copy } from "@/copy"
import { abs } from "@/lib/jsonld"

export const dynamic = "force-static"

const x = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

// RSS 2.0 feed of every tutorial, newest first.
export function GET() {
  const tt = copy.tutorials
  const items = [...allArticles()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((a) => {
      const url = abs(tutorialsHref(a.slug))
      return `<item><title>${x(a.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${x(a.description)}</description><category>${x(topicFor(a.category)?.name ?? a.category)}</category><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate></item>`
    })
    .join("")
  const self = abs("/tutorials/feed.xml")
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${x(tt.title)}</title><link>${abs(tutorialsHref())}</link><description>${x(tt.description)}</description><language>en</language><atom:link href="${self}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
