import { MoreLink } from "@/components/site/more-link"
import { ArticleCard } from "@/components/tutorials/parts"
import { allArticles, topicFor } from "@/content/db"
import { tutorialsHref } from "@/content/href"
import type { Dictionary } from "@/copy"

// The home page's way into the tutorials: the newest few, one per topic.
export function TutorialsTeaser({ t }: { t: Dictionary }) {
  const tt = t.tutorials
  const seen = new Set<string>()
  const picks = [...allArticles()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((a) => !seen.has(a.category) && seen.add(a.category))
    .slice(0, 6)
  if (!picks.length) return null

  return (
    <section
      aria-labelledby="tutorials-teaser"
      className="px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[56ch]">
            <h2 id="tutorials-teaser" className="t-title">
              {tt.latest}
            </h2>
            <p className="t-lead mt-5 text-dust">{tt.lead}</p>
          </div>
          <MoreLink href={tutorialsHref()}>{tt.browse}</MoreLink>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((a) => (
            <li key={a.slug}>
              <ArticleCard
                article={a}
                topic={topicFor(a.category)}
                minutesLabel={tt.minutes}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
