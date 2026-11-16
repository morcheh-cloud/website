import Link from "next/link"

import { guideFor } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { docsIndex } from "@/docs/search-index"
import { type Locale, numberOf } from "@/i18n/config"
import type { Dictionary } from "@/i18n/en"

// Guides a newcomer opens first.
const picks = [
  "getting-started",
  "servers",
  "terminal",
  "containers",
  "databases",
  "alerts",
]

// The docs, in short: how much there is, and a shelf of first reads.
export function DocsTeaser({ lang, t }: { lang: Locale; t: Dictionary }) {
  const d = t.home.docs
  const sections = docsIndex.reduce((n, g) => n + g.sections.length, 0)
  const minutes = docsIndex.reduce((n, g) => n + g.minutes, 0)
  const shelf = picks.map(guideFor).filter((g) => g !== undefined)

  return (
    <section
      id="docs"
      aria-labelledby="docs-title"
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20">
        <div>
          <h2 id="docs-title" className="t-title max-w-[14ch]">
            {d.title}
          </h2>
          <p className="t-lead mt-6 max-w-[46ch] text-dust">{d.body}</p>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: docsIndex.length, label: d.count },
              { value: sections, label: d.sections },
              { value: minutes, label: d.minutes },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-dust text-sm">{s.label}</dt>
                <dd className="font-light text-3xl text-lumen tabular-nums">
                  {numberOf(lang, s.value)}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href={docHref(lang)}
            className="mt-10 inline-flex h-12 items-center rounded-full bg-lumen px-7 font-medium text-void transition-colors hover:bg-white"
          >
            {d.button}
          </Link>
        </div>

        <ul
          dir="ltr"
          lang="en"
          className="docs-en grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2"
        >
          {shelf.map((guide) => {
            const Icon = guide.icon
            return (
              <li key={guide.slug} className="flex bg-void">
                <Link
                  href={docHref(lang, guide.slug)}
                  className="group flex flex-1 gap-4 p-6 transition-colors hover:bg-surface focus-visible:-outline-offset-2"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface transition-colors group-hover:border-glow/40">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.6}
                      className="size-[1.125rem] text-glow"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="t-heading block text-lumen">
                      {guide.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-dust text-sm leading-relaxed">
                      {guide.summary}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
