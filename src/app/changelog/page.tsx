import Link from "next/link"

import { releases } from "@/changelog"
import { GithubMark } from "@/components/site/github-mark"
import { PageHero } from "@/components/site/page-hero"
import { formatDate, ReleaseCard } from "@/components/site/release-card"
import { SitePage } from "@/components/site/site-page"
import { copy } from "@/copy"
import { pageMeta } from "@/lib/meta"
import { site } from "@/site"

export function generateMetadata() {
  const t = copy
  return pageMeta(
    "/changelog",
    t.pages.changelog,
    t.changelogPage.description,
    { modified: releases[0]?.date },
  )
}

export default function ChangelogPage() {
  const t = copy
  const c = t.changelogPage

  return (
    <SitePage t={t}>
      <PageHero title={c.title} lead={c.lead}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a
            href="/changelog/feed.xml"
            className="font-medium text-glow underline decoration-glow/30 underline-offset-4 hover:text-lumen"
          >
            {c.feed}
          </a>
          <a
            href={site.github.frontend}
            className="inline-flex items-center gap-2 font-medium text-lumen/80 hover:text-lumen"
          >
            <GithubMark className="size-4" />
            {c.github}
          </a>
        </div>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label={c.jump} className="hidden lg:block">
          <div className="sticky top-28">
            <h2 className="font-medium text-lumen text-sm">{c.jump}</h2>
            <ol className="mt-4 grid gap-2 border-line border-s">
              {releases.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`#${r.id}`}
                    className="-ms-px block border-transparent border-s ps-4 text-dust text-sm transition-colors hover:border-glow hover:text-lumen"
                  >
                    {formatDate(r.date)}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="grid gap-5">
          {releases.length === 0 && <p className="text-dust">{c.empty}</p>}
          {releases.map((r) => (
            <ReleaseCard key={r.id} release={r} read={c.read} />
          ))}
        </div>
      </div>
    </SitePage>
  )
}
