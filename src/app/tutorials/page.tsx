import { Rss } from "lucide-react"

import { MoreLink } from "@/components/site/more-link"
import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { ArticleCard, TopicCard, TopicIcon } from "@/components/tutorials/parts"
import { allArticles, articlesIn, topics } from "@/content/db"
import { topicHref, tutorialsHref } from "@/content/href"
import { copy } from "@/copy"
import { breadcrumbs, collection, JsonLd } from "@/lib/jsonld"
import { pageMeta } from "@/lib/meta"

export function generateMetadata() {
  const tt = copy.tutorials
  const meta = pageMeta(tutorialsHref(), tt.title, tt.description)
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { "application/rss+xml": "/tutorials/feed.xml" },
    },
  }
}

// The tutorials hub: every topic, then each topic's tutorials.
export default function Tutorials() {
  const t = copy
  const tt = t.tutorials
  const list = topics().filter((x) => x.count > 0)
  const all = allArticles()

  return (
    <SitePage t={t}>
      <JsonLd
        data={[
          collection({
            path: tutorialsHref(),
            name: tt.title,
            description: tt.description,
            items: all.map((a) => ({
              name: a.title,
              path: tutorialsHref(a.slug),
            })),
          }),
          breadcrumbs([{ name: t.pages.tutorials, path: tutorialsHref() }]),
        ]}
      />
      <PageHero title={tt.title} lead={tt.lead}>
        <a
          href="/tutorials/feed.xml"
          className="mt-8 inline-flex items-center gap-2 text-lumen/60 text-sm hover:text-lumen"
        >
          <Rss aria-hidden="true" className="size-4" />
          RSS
        </a>
      </PageHero>

      <div className="px-5 sm:px-8">
        <section
          aria-labelledby="topics"
          className="mx-auto max-w-7xl pt-16 sm:pt-24"
        >
          <h2 id="topics" className="t-heading text-[1.5rem] text-lumen">
            {tt.topics}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((topic) => (
              <li key={topic.slug}>
                <TopicCard topic={topic} countLabel={tt.tutorials} />
              </li>
            ))}
          </ul>
        </section>

        {list.map((topic) => (
          <section
            key={topic.slug}
            aria-labelledby={`t-${topic.slug}`}
            className="mx-auto max-w-7xl border-line border-t pt-14 mt-16 sm:mt-24"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-[60ch]">
                <h2
                  id={`t-${topic.slug}`}
                  className="t-heading flex items-center gap-3 text-[1.5rem] text-lumen"
                >
                  <TopicIcon name={topic.icon} className="size-5 text-dust" />
                  {topic.name}
                </h2>
                <p className="mt-3 text-dust">{topic.description}</p>
              </div>
              <MoreLink href={topicHref(topic.slug)}>
                {`${tt.all}: ${topic.name}`}
              </MoreLink>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articlesIn(topic.slug)
                .slice(0, 6)
                .map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} minutesLabel={tt.minutes} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="h-24 sm:h-32" />
    </SitePage>
  )
}
