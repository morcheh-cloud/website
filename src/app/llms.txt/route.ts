import { allArticles, topics } from "@/content/db"
import { topicHref, tutorialsHref } from "@/content/href"
import { copy } from "@/copy"
import { guides } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { abs } from "@/lib/jsonld"
import { site } from "@/site"

export const dynamic = "force-static"

// llms.txt (llmstxt.org): a plain map of the site for language models.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${copy.meta.description}`,
    "",
    `- [Install](${abs("/install")}): local quick start, automatic server setup and manual Docker Compose`,
    `- [Product](${abs("/product")})`,
    `- [Security](${abs("/security")})`,
    `- [Source code](${site.github.org})`,
    "",
    "## Docs",
    "",
    ...guides.map(
      (g) => `- [${g.title}](${abs(docHref(g.slug))}): ${g.summary}`,
    ),
  ]
  const articles = allArticles()
  for (const x of topics().filter((t) => t.count > 0)) {
    lines.push(
      "",
      `## Tutorials: ${x.name}`,
      "",
      `${abs(topicHref(x.slug))}`,
      "",
    )
    for (const a of articles.filter((a) => a.category === x.slug))
      lines.push(
        `- [${a.title}](${abs(tutorialsHref(a.slug))}): ${a.description}`,
      )
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
