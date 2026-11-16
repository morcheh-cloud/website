import { notFound } from "next/navigation"

import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { ArticleCard, Crumbs } from "@/components/tutorials/parts"
import { articlesTagged, tagFor, tags, topicFor } from "@/content/db"
import { MIN_INDEXED, tagHref, tutorialsHref } from "@/content/href"
import { copy } from "@/copy"
import { breadcrumbs, collection, JsonLd } from "@/lib/jsonld"
import { pageMeta } from "@/lib/meta"

export const dynamicParams = false

export function generateStaticParams() {
  return tags().map((x) => ({ tag: x.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/tutorials/tag/[tag]">) {
  const { tag } = await params
  const x = tagFor(tag)
  if (!x) return {}
  return pageMeta(
    tagHref(x.slug),
    `${x.name} tutorials`,
    `Step-by-step ${x.name} tutorials: ${x.count} practical guides with commands and the matching steps in the Morche panel.`,
    { noindex: x.count < MIN_INDEXED },
  )
}

export default async function TagPage({
  params,
}: PageProps<"/tutorials/tag/[tag]">) {
  const { tag: slug } = await params
  const tag = tagFor(slug)
  if (!tag) notFound()
  const t = copy
  const tt = t.tutorials
  const list = articlesTagged(tag.slug)
  const path = tagHref(tag.slug)

  return (
    <SitePage t={t}>
      <JsonLd
        data={[
          collection({
            path,
            name: `${tag.name} tutorials`,
            description: `${tt.tagTitle} ${tag.name}`,
            items: list.map((a) => ({
              name: a.title,
              path: tutorialsHref(a.slug),
            })),
          }),
          breadcrumbs([
            { name: t.pages.tutorials, path: tutorialsHref() },
            { name: tag.name, path },
          ]),
        ]}
      />
      <PageHero title={`${tag.name} tutorials`}>
        <Crumbs
          className="mt-6"
          items={[{ name: t.pages.tutorials, href: tutorialsHref() }]}
        />
      </PageHero>
      <div className="px-5 sm:px-8">
        <ul className="mx-auto grid max-w-7xl gap-4 pt-14 sm:grid-cols-2 sm:pt-20 lg:grid-cols-3">
          {list.map((a) => (
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
      <div className="h-24 sm:h-32" />
    </SitePage>
  )
}
