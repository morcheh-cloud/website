import { Database, Globe, type LucideIcon, Package } from "lucide-react"
import {
  type SimpleIcon,
  siAnsible,
  siCloudflare,
  siDebian,
  siDocker,
  siMariadb,
  siMinio,
  siMongodb,
  siMysql,
  siPostgresql,
  siRedis,
  siRockylinux,
  siUbuntu,
} from "simple-icons"

import type { Dictionary } from "@/i18n/en"

// Brands without a Simple Icons glyph get a plain outline icon instead.
const tools: { name: string; icon: SimpleIcon | LucideIcon }[] = [
  { name: "Ubuntu", icon: siUbuntu },
  { name: "Debian", icon: siDebian },
  { name: "Rocky Linux", icon: siRockylinux },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "MariaDB", icon: siMariadb },
  { name: "SQL Server", icon: Database },
  { name: "MongoDB", icon: siMongodb },
  { name: "Redis", icon: siRedis },
  { name: "Amazon S3", icon: Package },
  { name: "MinIO", icon: siMinio },
  { name: "Cloudflare R2", icon: siCloudflare },
  { name: "Technitium", icon: Globe },
  { name: "Ansible", icon: siAnsible },
  { name: "Docker", icon: siDocker },
]

function Glyph({ icon }: { icon: SimpleIcon | LucideIcon }) {
  if ("path" in icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
        className="size-[1.125rem] shrink-0"
      >
        <path d={icon.path} />
      </svg>
    )
  }
  const Icon = icon
  return <Icon aria-hidden="true" className="size-[1.125rem] shrink-0" />
}

export function Works({ t }: { t: Dictionary }) {
  return (
    <section
      aria-labelledby="works-title"
      className="px-5 pt-20 pb-6 sm:px-8 sm:pt-28"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 id="works-title" className="text-dust text-sm">
          {t.works.title}
        </h2>
        <ul
          dir="ltr"
          className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-4 sm:gap-x-9"
        >
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="flex items-center gap-2 text-[0.9375rem] text-lumen/45 transition-colors duration-300 hover:text-lumen"
            >
              <Glyph icon={tool.icon} />
              {tool.name}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-dust text-sm">{t.works.note}</p>
      </div>
    </section>
  )
}
