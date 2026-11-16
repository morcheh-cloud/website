import {
  Code,
  Eye,
  KeyRound,
  type LucideIcon,
  Plug,
  Server,
  Undo2,
  Users,
} from "lucide-react"

import type { Dictionary } from "@/copy"
import { cn } from "@/lib/utils"

import { MoreLink } from "./more-link"

const icons: Record<string, LucideIcon> = {
  server: Server,
  plug: Plug,
  key: KeyRound,
  users: Users,
  eye: Eye,
  undo: Undo2,
  code: Code,
}

// One joined slab, cells split by hairlines; faint indigo light pools in a
// few cells so it reads as one lit wall rather than six cards.
export function Security({
  t,
  more,
  heading = true,
}: {
  t: Dictionary
  more?: { href: string; label: string }
  heading?: boolean
}) {
  return (
    <section
      id={heading ? "security" : undefined}
      aria-labelledby={heading ? "security-title" : undefined}
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {heading && (
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
            <h2 id="security-title" className="t-title">
              {t.security.title}
            </h2>
            <p className="t-lead mx-auto mt-6 max-w-[52ch] text-dust">
              {t.security.lead}
            </p>
          </div>
        )}

        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.security.points.map((point, index) => {
            const Icon = icons[point.icon] ?? Server
            return (
              <li
                key={point.title}
                className={cn(
                  "relative bg-void p-7 sm:p-9",
                  index === 0 &&
                    "bg-[radial-gradient(90%_80%_at_0%_0%,color-mix(in_oklab,var(--indigo)_16%,transparent),transparent_70%)]",
                  index === 4 &&
                    "bg-[radial-gradient(80%_80%_at_50%_100%,color-mix(in_oklab,var(--indigo)_14%,transparent),transparent_70%)]",
                )}
              >
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="size-[1.125rem] text-glow"
                  />
                </span>
                <h3 className="t-heading mt-6">{point.title}</h3>
                <p className="mt-2 max-w-[38ch] text-dust leading-relaxed">
                  {point.body}
                </p>
              </li>
            )
          })}
        </ul>
        {more && (
          <div className="mt-12 text-center">
            <MoreLink href={more.href}>{more.label}</MoreLink>
          </div>
        )}
      </div>
    </section>
  )
}
