import { releases } from "@/changelog"
import { MoreLink } from "@/components/site/more-link"
import { formatDate } from "@/components/site/release-card"
import type { Dictionary } from "@/copy"

// The home page's glance at the changelog: the three newest releases.
export function UpdatesTeaser({ t }: { t: Dictionary }) {
  const c = t.changelogPage
  return (
    <section
      aria-labelledby="updates-teaser"
      className="px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[56ch]">
            <h2 id="updates-teaser" className="t-title">
              {c.latest}
            </h2>
            <p className="t-lead mt-5 text-dust">{c.latestLead}</p>
          </div>
          <MoreLink href="/changelog">{c.all}</MoreLink>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {releases.slice(0, 3).map((r) => (
            <li key={r.id}>
              <a
                href={`/changelog#${r.id}`}
                className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface/50 p-6 transition-colors hover:border-glow/40"
              >
                <time dateTime={r.date} className="text-dust text-sm">
                  {formatDate(r.date)}
                </time>
                <h3 className="t-heading mt-2 text-xl">{r.title}</h3>
                <p className="mt-3 text-dust text-sm leading-relaxed">
                  {r.summary}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
