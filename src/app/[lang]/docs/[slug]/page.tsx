import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  Languages,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SitePage } from "@/components/site/site-page"
import { content } from "@/docs/content"
import { guideGroups } from "@/docs/groups"
import { guideFor, guides } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { indexFor } from "@/docs/search-index"
import { SearchButton } from "@/docs/ui/search"
import { SectionAnchor } from "@/docs/ui/section-anchor"
import { HashFlash, Toc } from "@/docs/ui/toc"
import { hasLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { pageMeta } from "@/lib/meta"
import { cn } from "@/lib/utils"

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/docs/[slug]">) {
  const { lang, slug } = await params
  const guide = guideFor(slug)
  if (!hasLocale(lang) || !guide) return {}
  return pageMeta(lang, `/docs/${slug}`, guide.title, guide.summary)
}

// A guide. Its words are English on both languages, so the article (and
// the guides list around it) is an English, left-to-right island; only the
// site's frame follows the visitor's language.
export default async function Guide({
  params,
}: PageProps<"/[lang]/docs/[slug]">) {
  const { lang, slug } = await params
  const guide = guideFor(slug)
  if (!hasLocale(lang) || !guide) notFound()
  const t = getDictionary(lang)
  const d = getDictionary("en").docs
  const sections = content[slug] ?? []
  const indexed = indexFor(slug)
  const at = guides.indexOf(guide)
  const prev = guides[at - 1]
  const next = guides[at + 1]
  const toc = sections.map((s) => ({ id: s.id, title: s.title }))
  const Icon = guide.icon

  return (
    <SitePage lang={lang} t={t}>
      <HashFlash />
      <div className="px-5 pt-28 sm:px-8 sm:pt-36">
        {lang === "fa" && (
          <p className="mx-auto mb-6 flex max-w-[88rem] items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3 text-dust text-sm">
            <Languages
              aria-hidden="true"
              className="size-4 shrink-0 text-honey"
            />
            {t.docs.englishOnly}
          </p>
        )}
        <div
          dir="ltr"
          lang="en"
          className="docs-en mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)_13rem]"
        >
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex max-h-[calc(100dvh-8rem)] flex-col gap-6">
              <SearchButton className="w-full justify-start" />
              <nav
                aria-label={d.allGuides}
                className="-me-3 flex flex-col gap-7 overflow-y-auto pe-3 pb-10 [scrollbar-width:thin]"
              >
                {guideGroups().map((group) => (
                  <div key={group.name}>
                    <p className="font-medium text-lumen text-sm">
                      {group.name}
                    </p>
                    <ul className="mt-2.5 flex flex-col gap-0.5">
                      {group.items.map((g) => (
                        <li key={g.slug}>
                          <Link
                            href={docHref(lang, g.slug)}
                            aria-current={g.slug === slug ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-1.5 text-sm leading-snug transition-colors",
                              g.slug === slug
                                ? "bg-raised text-lumen"
                                : "text-dust hover:text-lumen",
                            )}
                          >
                            {g.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <header className="frame-lit relative overflow-hidden rounded-[1.75rem] px-6 py-9 sm:rounded-[2.25rem] sm:px-10 sm:py-12">
              <nav aria-label="Breadcrumb" className="text-lumen/60 text-sm">
                <Link href={docHref(lang)} className="hover:text-lumen">
                  Docs
                </Link>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <span>{guide.group}</span>
              </nav>
              <div className="mt-7 flex items-start gap-5">
                <span className="hidden size-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-void/40 backdrop-blur sm:grid">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-6 text-lumen"
                  />
                </span>
                <div className="min-w-0">
                  <h1 className="t-title text-[clamp(2rem,1.4rem+2vw,3.25rem)]">
                    {guide.title}
                  </h1>
                  <p className="t-lead mt-4 max-w-[58ch] text-lumen/70">
                    {guide.summary}
                  </p>
                  {indexed && (
                    <p className="mt-6 flex items-center gap-2 text-lumen/60 text-sm">
                      <Clock aria-hidden="true" className="size-4" />
                      {indexed.minutes} {d.minutes}
                    </p>
                  )}
                </div>
              </div>
            </header>

            <div className="mt-6 flex flex-wrap items-center gap-3 lg:hidden">
              <Link
                href={docHref(lang)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-dust hover:text-lumen"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                {d.allGuides}
              </Link>
              <SearchButton />
            </div>
            {toc.length > 1 && (
              <details className="group mt-4 rounded-2xl border border-line xl:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-medium text-lumen text-sm [&::-webkit-details-marker]:hidden">
                  {d.onThisPage}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-dust transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="flex flex-col border-line border-t px-2 py-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-lg px-3 py-2 text-dust text-sm hover:bg-raised hover:text-lumen"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="mt-10 flex flex-col sm:mt-14">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className={cn(
                    "-mx-4 scroll-mt-28 rounded-3xl px-4 pb-12 sm:-mx-6 sm:px-6",
                    i > 0 && "pt-4",
                  )}
                >
                  {i > 0 && <hr className="mb-10 border-line" />}
                  <h2
                    id={`${s.id}-title`}
                    className="group t-heading text-[1.5rem] text-lumen tracking-[-0.02em] sm:text-[1.75rem]"
                  >
                    {s.title}
                    <SectionAnchor id={s.id} label={d.copyLink} />
                  </h2>
                  <div className="mt-6 flex max-w-[72ch] flex-col gap-5 text-[1.0313rem]">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            <nav
              aria-label="Guides"
              className="mt-6 grid gap-3 border-line border-t pt-10 sm:grid-cols-2"
            >
              {prev ? (
                <PagerLink
                  href={docHref(lang, prev.slug)}
                  label={d.previous}
                  title={prev.title}
                  back
                />
              ) : (
                <span />
              )}
              {next && (
                <PagerLink
                  href={docHref(lang, next.slug)}
                  label={d.next}
                  title={next.title}
                />
              )}
            </nav>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28">
              {toc.length > 1 && <Toc items={toc} label={d.onThisPage} />}
            </div>
          </aside>
        </div>
      </div>
      <div className="h-20 sm:h-28" />
    </SitePage>
  )
}

function PagerLink({
  href,
  label,
  title,
  back,
}: {
  href: string
  label: string
  title: string
  back?: boolean
}) {
  const Arrow = back ? ArrowLeft : ArrowRight
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-1 rounded-2xl border border-line px-6 py-5 transition-colors hover:border-glow/40 hover:bg-surface",
        !back && "items-end text-end sm:col-start-2",
      )}
    >
      <span className="flex items-center gap-2 text-dust text-sm">
        {back && <Arrow aria-hidden="true" className="size-4" />}
        {label}
        {!back && <Arrow aria-hidden="true" className="size-4" />}
      </span>
      <span className="font-medium text-lumen">{title}</span>
    </Link>
  )
}
