import Link from "next/link"

import { MoreLink } from "@/components/site/more-link"
import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { vignettes } from "@/components/site/vignettes"
import { copy } from "@/copy"
import { guideFor } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { pageMeta } from "@/lib/meta"
import { cn } from "@/lib/utils"

export function generateMetadata() {
  const t = copy
  return pageMeta("/product", t.pages.product, t.product.description)
}

export default function Product() {
  const t = copy
  const p = t.product

  return (
    <SitePage t={t}>
      <PageHero title={p.title} lead={p.lead}>
        <nav aria-label={t.pages.product} className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {p.areas.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-lumen/80 text-sm transition-colors hover:border-white/40 hover:text-lumen"
                >
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-5 py-20 sm:gap-36 sm:px-8 sm:py-32">
        {p.areas.map((area, i) => {
          const Vignette = vignettes[area.id as keyof typeof vignettes]
          return (
            <section
              key={area.id}
              id={area.id}
              aria-labelledby={`${area.id}-title`}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <h2
                  id={`${area.id}-title`}
                  className="t-title text-[2.5rem] sm:text-5xl"
                >
                  {area.title}
                </h2>
                <p className="t-lead mt-5 max-w-[44ch] text-lumen/70">
                  {area.lead}
                </p>
                <ul className="mt-8 flex flex-col gap-3.5">
                  {area.points.map((point) => (
                    <li key={point} className="flex gap-3 text-lumen/85">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-honey"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="me-1 text-dust text-sm">{p.guides}</span>
                  {area.guides.map((slug) => {
                    const g = guideFor(slug)
                    if (!g) return null
                    return (
                      <Link
                        key={slug}
                        href={docHref(slug)}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-lumen/85 text-sm transition-colors hover:border-glow/50 hover:text-lumen"
                      >
                        <g.icon
                          aria-hidden="true"
                          className="size-3.5 text-glow"
                        />
                        {g.title}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-line bg-raised/40 p-2 sm:p-3">
                <div
                  aria-hidden="true"
                  className="ui-font @container rounded-[1.25rem] border border-line bg-void p-3 text-start sm:p-5"
                >
                  {Vignette && <Vignette />}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <section
        aria-labelledby="more-title"
        className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-36"
      >
        <h2
          id="more-title"
          className="t-title mb-10 text-[2.5rem] sm:mb-14 sm:text-5xl"
        >
          {p.moreTitle}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {p.more.map((item) => {
            const g = guideFor(item.guide)
            const Icon = g?.icon
            return (
              <li key={item.guide} className="bg-void">
                <Link
                  href={docHref(item.guide)}
                  className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-surface sm:p-7"
                >
                  {Icon && (
                    <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-glow">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                  <h3 className="mt-2 font-medium text-lumen">{item.title}</h3>
                  <p className="text-dust text-sm leading-relaxed">
                    {item.body}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
        <MoreLink href={docHref()} className="mt-12">
          {t.home.docs.button}
        </MoreLink>
      </section>
    </SitePage>
  )
}
