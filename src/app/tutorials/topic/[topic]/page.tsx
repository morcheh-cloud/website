import Link from "next/link"
import { notFound } from "next/navigation"

import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { ArticleCard, Crumbs, TopicCard } from "@/components/tutorials/parts"
import { articlesIn, topicFor, topics } from "@/content/db"
import { topicHref, tutorialsHref } from "@/content/href"
import { renderIntro } from "@/content/markdown"
import { copy } from "@/copy"
import { guideFor } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { breadcrumbs, collection, JsonLd } from "@/lib/jsonld"
import { pageMeta } from "@/lib/meta"

export const dynamicParams = false

export function generateStaticParams() {
  return topics()
    .filter((x) => x.count > 0)
    .map((x) => ({ topic: x.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/tutorials/topic/[topic]">) {
  const { topic } = await params
  const x = topicFor(topic)
  if (!x) return {}
  return pageMeta(topicHref(x.slug), x.title, x.description)
}

// A topic (pillar) page: what the topic covers, every tutorial in it, the
// reference guides behind it and the other topics.
export default async function TopicPage({
  params,
}: PageProps<"/tutorials/topic/[topic]">) {
  const { topic: slug } = await params
  const topic = topicFor(slug)
  if (!topic || !topic.count) notFound()
  const t = copy
  const tt = t.tutorials
  const list = articlesIn(topic.slug)
  const docs = topic.guides.map(guideFor).filter((g) => g !== undefined)
  const others = topics().filter((x) => x.count > 0 && x.slug !== topic.slug)
  const path = topicHref(topic.slug)

  return (
    <SitePage t={t}>
      <JsonLd
        data={[
          collection({
            path,
            name: topic.title,
            description: topic.description,
            items: list.map((a) => ({
              name: a.title,
              path: tutorialsHref(a.slug),
            })),
          }),
          breadcrumbs([
            { name: t.pages.tutorials, path: tutorialsHref() },
            { name: topic.name, path },
          ]),
        ]}
      />
      <PageHero title={topic.title}>
        <Crumbs
          className="mt-6"
          items={[{ name: t.pages.tutorials, href: tutorialsHref() }]}
        />
      </PageHero>

      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl pt-14 sm:pt-20">
          <div
            className="article-prose max-w-[68ch] text-[1.0625rem]"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: our own Markdown from content.db, raw HTML escaped
            dangerouslySetInnerHTML={{ __html: renderIntro(topic.intro) }}
          />
        </div>

        <section
          aria-label={topic.name}
          className="mx-auto max-w-7xl pt-12 sm:pt-16"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} minutesLabel={tt.minutes} />
              </li>
            ))}
          </ul>
        </section>

        {docs.length > 0 && (
          <section
            aria-labelledby="topic-docs"
            className="mx-auto mt-20 max-w-7xl border-line border-t pt-14"
          >
            <h2 id="topic-docs" className="t-heading text-[1.5rem] text-lumen">
              {tt.topicDocs}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={docHref(g.slug)}
                    className="block h-full rounded-2xl border border-line p-5 transition-colors hover:border-glow/40 hover:bg-surface"
                  >
                    <span className="block font-medium text-lumen">
                      {g.title}
                    </span>
                    <span className="mt-1.5 line-clamp-2 block text-dust text-sm leading-relaxed">
                      {g.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section
          aria-labelledby="other-topics"
          className="mx-auto mt-20 max-w-7xl border-line border-t pt-14"
        >
          <h2 id="other-topics" className="t-heading text-[1.5rem] text-lumen">
            {tt.topics}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((x) => (
              <li key={x.slug}>
                <TopicCard topic={x} countLabel={tt.tutorials} />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="h-24 sm:h-32" />
    </SitePage>
  )
}
