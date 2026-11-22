import { releases } from "@/changelog"
import { copy } from "@/copy"
import { abs } from "@/lib/jsonld"

export const dynamic = "force-static"

const x = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

// RSS 2.0 feed of the changelog, newest first.
export function GET() {
  const c = copy.changelogPage
  const items = releases
    .map((r) => {
      const url = abs(`/changelog#${r.id}`)
      const body = `<p>${x(r.summary)}</p><ul>${r.changes.map((ch) => `<li>${x(ch.text)}</li>`).join("")}</ul>`
      return `<item><title>${x(r.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${x(body)}</description><pubDate>${new Date(`${r.date}T12:00:00Z`).toUTCString()}</pubDate></item>`
    })
    .join("")
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${x(c.title)}</title><link>${abs("/changelog")}</link><description>${x(c.description)}</description><language>en</language><atom:link href="${abs("/changelog/feed.xml")}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
