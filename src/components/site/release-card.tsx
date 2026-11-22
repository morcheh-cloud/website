import { type ChangeKind, kindLabels, type Release } from "@/changelog"
import { MoreLink } from "@/components/site/more-link"
import { guides } from "@/docs/guides"
import { docHref } from "@/docs/href"
import { cn } from "@/lib/utils"

const kindStyle: Record<ChangeKind, string> = {
  new: "border-glow/30 bg-indigo/10 text-glow",
  improved: "border-leaf/30 bg-leaf/10 text-leaf",
  fixed: "border-honey/30 bg-honey/10 text-honey",
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

// One release: its title and summary, then every change with a kind tag and
// a link to the guide that explains it (when that guide exists).
export function ReleaseCard({
  release,
  read,
}: {
  release: Release
  read: string
}) {
  return (
    <article
      id={release.id}
      aria-labelledby={`${release.id}-title`}
      className="scroll-mt-28 rounded-[1.75rem] border border-line bg-surface/50 p-6 sm:p-9"
    >
      <time dateTime={release.date} className="text-dust text-sm">
        {formatDate(release.date)}
      </time>
      <h2
        id={`${release.id}-title`}
        className="t-heading mt-2 text-2xl sm:text-3xl"
      >
        {release.title}
      </h2>
      <p className="mt-3 max-w-[64ch] text-dust leading-relaxed">
        {release.summary}
      </p>
      <ul className="mt-7 grid gap-5">
        {release.changes.map((c) => {
          const has = c.guide && guides.some((g) => g.slug === c.guide)
          return (
            <li
              key={c.text}
              className="grid gap-2 sm:grid-cols-[6.5rem_1fr] sm:gap-5"
            >
              <span
                className={cn(
                  "h-fit w-fit rounded-full border px-2.5 py-0.5 font-medium text-xs",
                  kindStyle[c.kind],
                )}
              >
                {kindLabels[c.kind]}
              </span>
              <div>
                <p className="text-lumen/90 leading-relaxed">{c.text}</p>
                {has && c.guide && (
                  <MoreLink
                    href={docHref(c.guide, c.section)}
                    className="mt-1.5 text-sm"
                  >
                    {read}
                  </MoreLink>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
