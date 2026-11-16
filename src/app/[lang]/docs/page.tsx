import Link from "next/link"
import { notFound } from "next/navigation"

import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { guideGroups } from "@/docs/groups"
import { docHref } from "@/docs/href"
import { docsIndex, indexFor } from "@/docs/search-index"
import { SearchButton } from "@/docs/ui/search"
import { hasLocale, numberOf } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { pageMeta } from "@/lib/meta"

export async function generateMetadata({ params }: PageProps<"/[lang]/docs">) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)
  return pageMeta(lang, "/docs", t.docs.title, t.docs.description)
}

export default async function Docs({ params }: PageProps<"/[lang]/docs">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDictionary(lang)
  const d = t.docs

  const sections = docsIndex.reduce((n, g) => n + g.sections.length, 0)
  const minutes = docsIndex.reduce((n, g) => n + g.minutes, 0)
  const stats = [
    { value: docsIndex.length, label: d.guides },
    { value: sections, label: d.sections },
    { value: minutes, label: t.home.docs.minutes },
  ]

  return (
    <SitePage lang={lang} t={t}>
      <PageHero title={d.title} lead={d.lead}>
        <div className="mt-10 max-w-xl">
          <SearchButton wide />
        </div>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-lumen/60 text-sm">{s.label}</dt>
              <dd className="font-light text-3xl text-lumen tabular-nums">
                {numberOf(lang, s.value)}
              </dd>
            </div>
          ))}
        </dl>
        {lang === "fa" && (
          <p className="mt-8 max-w-[56ch] text-lumen/60 text-sm">
            {d.englishOnly}
          </p>
        )}
      </PageHero>

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 py-20 sm:gap-24 sm:px-8 sm:py-28">
        {guideGroups().map((group) => (
          <section
            key={group.name}
            aria-labelledby={`group-${group.name}`}
            className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id={`group-${group.name}`} className="t-heading text-xl">
                {d.groups[group.name] ?? group.name}
              </h2>
              <p className="mt-1 text-dust text-sm">
                {numberOf(lang, group.items.length)} {d.guides}
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((guide) => {
                const Icon = guide.icon
                const indexed = indexFor(guide.slug)
                return (
                  <li key={guide.slug} className="flex bg-void">
                    <Link
                      href={docHref(lang, guide.slug)}
                      dir="ltr"
                      lang="en"
                      className="docs-en group flex flex-1 flex-col p-6 transition-colors hover:bg-surface focus-visible:-outline-offset-2 sm:p-7"
                    >
                      <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface transition-colors group-hover:border-glow/40">
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="size-[1.125rem] text-glow"
                        />
                      </span>
                      <span className="t-heading mt-5 text-lumen">
                        {guide.title}
                      </span>
                      <span className="mt-1.5 line-clamp-3 text-[0.9375rem] text-dust leading-relaxed">
                        {guide.summary}
                      </span>
                      {indexed && (
                        <span className="mt-auto flex gap-4 pt-5 text-dust/80 text-xs">
                          <span>{indexed.minutes} min read</span>
                          <span>{indexed.sections.length} sections</span>
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </SitePage>
  )
}
