import {
  Activity,
  Archive,
  Clock,
  Code,
  Database,
  Folder,
  Globe,
  HardDrive,
  LayoutGrid,
  type LucideIcon,
  Network,
  ShieldCheck,
  Smartphone,
  SquareTerminal,
  Users,
  Video,
  Workflow,
} from "lucide-react"

import type { Dictionary } from "@/copy"

import { MoreLink } from "./more-link"

const icons: Record<string, LucideIcon> = {
  terminal: SquareTerminal,
  folder: Folder,
  activity: Activity,
  shield: ShieldCheck,
  database: Database,
  archive: Archive,
  storage: HardDrive,
  globe: Globe,
  workflow: Workflow,
  code: Code,
  clock: Clock,
  network: Network,
  grid: LayoutGrid,
  video: Video,
  users: Users,
  phone: Smartphone,
}

// Nuxt-style: a plain grid of what's in the box, no cards. The order
// follows the panel's menu, so the grid reads like a tour of it.
export function Features({ t }: { t: Dictionary }) {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="features-title" className="t-title max-w-[16ch]">
            {t.features.title}
          </h2>
          <p className="t-lead max-w-[46ch] text-dust lg:justify-self-end">
            {t.features.lead}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-9 border-line border-t pt-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
          {t.features.items.map((item) => {
            const Icon = icons[item.icon] ?? Activity
            return (
              <li
                key={item.title}
                className="grid grid-cols-[auto_1fr] gap-x-4 sm:block"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="mt-1 size-5 text-glow sm:mt-0"
                />
                <div>
                  <h3 className="t-heading sm:mt-4">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-dust leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
        <MoreLink href={`/product`} className="mt-14">
          {t.home.featuresMore}
        </MoreLink>
      </div>
    </section>
  )
}
