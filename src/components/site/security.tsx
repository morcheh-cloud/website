import {
  Eye,
  KeyRound,
  type LucideIcon,
  Plug,
  Server,
  Undo2,
  Users,
} from "lucide-react"

import type { Dictionary } from "@/i18n/en"
import { cn } from "@/lib/utils"

const icons: Record<string, LucideIcon> = {
  server: Server,
  plug: Plug,
  key: KeyRound,
  users: Users,
  eye: Eye,
  undo: Undo2,
}

// One joined slab, cells split by hairlines; faint indigo light pools in a
// few cells so it reads as one lit wall rather than six cards.
export function Security({ t }: { t: Dictionary }) {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="security-title" className="t-title">
            {t.security.title}
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-[52ch] text-dust">
            {t.security.lead}
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {t.security.points.map((point, index) => {
            const Icon = icons[point.icon] ?? Server
            return (
              <li
                key={point.title}
                className={cn(
                  "relative bg-void p-7 sm:p-9",
                  index === 0 &&
                    "bg-[radial-gradient(90%_80%_at_0%_0%,color-mix(in_oklab,var(--indigo)_16%,transparent),transparent_70%)] rtl:bg-[radial-gradient(90%_80%_at_100%_0%,color-mix(in_oklab,var(--indigo)_16%,transparent),transparent_70%)]",
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
      </div>
    </section>
  )
}
