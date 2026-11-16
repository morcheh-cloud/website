import { BookOpen, CalendarDays, ChevronDown, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GithubMark } from "@/components/site/github-mark"
import { SitePage } from "@/components/site/site-page"
import {
  ArticleCard,
  Crumbs,
  formatDate,
  TopicIcon,
} from "@/components/tutorials/parts"
import {
  allArticles,
  articleFor,
  linkingTo,
  relatedTo,
  tagName,
  topicFor,
} from "@/content/db"
import { tagHref, topicHref, tutorialsHref } from "@/content/href"
import { renderArticle } from "@/content/markdown"
import { copy } from "@/copy"
import { guideFor } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { HashFlash, Toc } from "@/docs/ui/toc"
import { breadcrumbs, faqPage, JsonLd, techArticle } from "@/lib/jsonld"
import { pageMeta } from "@/lib/meta"
import { site } from "@/site"

export const dynamicParams = false

export function generateStaticParams() {
  return allArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/tutorials/[slug]">) {
  const { slug } = await params
  const a = articleFor(slug)
  if (!a) return {}
  return pageMeta(tutorialsHref(slug), a.seoTitle ?? a.title, a.description, {
    type: "article",
    published: a.publishedAt,
    modified: a.updatedAt,
    section: topicFor(a.category)?.name,
    tags: a.tags.map(tagName),
    keywords: [a.keyword, ...a.tags.map(tagName)],
  })
}

// One tutorial: the article, its table of contents, the docs behind it and
// the tutorials around it (same tags, same topic, links in either direction).
export default async function Tutorial({
  params,
}: PageProps<"/tutorials/[slug]">) {
  const { slug } = await params
  const a = articleFor(slug)
  if (!a) notFound()
  const t = copy
  const tt = t.tutorials
  const topic = topicFor(a.category)
  const { html, headings, faq } = renderArticle(a.body)
  const toc = headings.filter((h) => h.depth === 2)
  const related = relatedTo(a, 4)
  const seen = new Set([a.slug, ...related.map((r) => r.slug)])
  const backlinks = linkingTo(a.slug)
    .filter((b) => !seen.has(b.slug))
    .slice(0, 6)
  const docs = a.guides.map(guideFor).filter((g) => g !== undefined)
  const path = tutorialsHref(a.slug)

  const trail = [
    { name: t.pages.tutorials, href: tutorialsHref() },
    ...(topic ? [{ name: topic.name, href: topicHref(topic.slug) }] : []),
  ]

  return (
    <SitePage t={t}>
      <JsonLd
        data={[
          techArticle({
            path,
            title: a.title,
            description: a.description,
            published: a.publishedAt,
            modified: a.updatedAt,
            section: topic?.name,
            keywords: [a.keyword, ...a.tags.map(tagName)],
            words: a.words,
          }),
          breadcrumbs([
            ...trail.map((c) => ({ name: c.name, path: c.href })),
            { name: a.title, path },
          ]),
          ...(faq.length ? [faqPage(faq)] : []),
        ]}
      />
      <HashFlash />
      <div className="px-5 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto grid max-w-[80rem] gap-10 xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
          <article className="min-w-0">
            <header className="frame-lit relative overflow-hidden rounded-[1.75rem] px-6 py-9 sm:rounded-[2.25rem] sm:px-10 sm:py-12">
              <Crumbs items={trail} />
              <h1 className="t-title mt-7 max-w-[24ch] text-[clamp(2rem,1.4rem+2vw,3.25rem)]">
                {a.title}
              </h1>
              <p className="t-lead mt-4 max-w-[62ch] text-lumen/70">
                {a.description}
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-lumen/60 text-sm">
                {topic && (
                  <Link
                    href={topicHref(topic.slug)}
                    className="flex items-center gap-2 hover:text-lumen"
                  >
                    <TopicIcon name={topic.icon} className="size-4" />
                    {topic.name}
                  </Link>
                )}
                <span className="flex items-center gap-2">
                  <Clock aria-hidden="true" className="size-4" />
                  {a.minutes} {tt.minutes}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  {tt.updated}{" "}
                  <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
                </span>
              </p>
            </header>

            {toc.length > 1 && (
              <details className="group mt-6 rounded-2xl border border-line xl:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-medium text-lumen text-sm [&::-webkit-details-marker]:hidden">
                  {tt.onThisPage}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-dust transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="flex flex-col border-line border-t px-2 py-2">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block rounded-lg px-3 py-2 text-dust text-sm hover:bg-raised hover:text-lumen"
                      >
                        {h.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div
              className="article-prose mt-10 max-w-[72ch] sm:mt-14"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: our own Markdown from content.db, rendered at build time
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {docs.length > 0 && (
              <aside className="mt-14 max-w-[72ch] rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <h2 className="flex items-center gap-2 font-medium text-lumen">
                  <BookOpen aria-hidden="true" className="size-4" />
                  {tt.inDocs}
                </h2>
                <p className="mt-2 text-dust text-sm">{tt.inDocsBody}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {docs.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={docHref(g.slug)}
                        className="block rounded-xl border border-line px-4 py-3 transition-colors hover:border-glow/40 hover:bg-raised"
                      >
                        <span className="block font-medium text-lumen text-sm">
                          {g.title}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-dust text-xs leading-relaxed">
                          {g.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {a.tags.length > 0 && (
              <div className="mt-10 flex max-w-[72ch] flex-wrap items-center gap-2">
                <span className="me-1 flex items-center gap-1.5 text-dust text-sm">
                  <Tag aria-hidden="true" className="size-4" />
                  {tt.tagged}
                </span>
                {a.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={tagHref(tag)}
                    className="inline-flex h-8 items-center rounded-full border border-line px-3 text-dust text-sm transition-colors hover:border-glow/40 hover:text-lumen"
                  >
                    {tagName(tag)}
                  </Link>
                ))}
              </div>
            )}
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28">
              {toc.length > 1 && (
                <Toc
                  items={toc.map((h) => ({ id: h.id, title: h.title }))}
                  label={tt.onThisPage}
                />
              )}
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section
            aria-labelledby="related"
            className="mx-auto mt-20 max-w-[80rem] border-line border-t pt-14"
          >
            <h2 id="related" className="t-heading text-[1.5rem] text-lumen">
              {tt.related}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard
                    article={r}
                    topic={topicFor(r.category)}
                    minutesLabel={tt.minutes}
                  />
                </li>
              ))}
            </ul>
            {backlinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {backlinks.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={tutorialsHref(b.slug)}
                      className="text-dust underline decoration-line underline-offset-4 hover:text-lumen hover:decoration-lumen"
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="mx-auto mt-20 max-w-[80rem]">
          <div className="frame-ember relative overflow-hidden rounded-[1.75rem] px-6 py-12 sm:rounded-[2.25rem] sm:px-12 sm:py-16">
            <h2 className="t-title max-w-[20ch] text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)]">
              {tt.tryIt}
            </h2>
            <p className="t-lead mt-4 max-w-[52ch] text-lumen/70">
              {tt.tryItBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/install"
                className="inline-flex h-12 items-center rounded-full bg-lumen px-7 font-medium text-void transition-colors hover:bg-white"
              >
                {tt.install}
              </Link>
              <a
                href={site.github.morche}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 font-medium text-lumen transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <GithubMark className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="h-20 sm:h-28" />
    </SitePage>
  )
}
