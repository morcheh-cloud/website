import {
  Activity,
  Archive,
  Bell,
  BookOpen,
  Clock,
  Container,
  Database,
  FolderSync,
  Globe,
  type LucideIcon,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import type { ArticleMeta, Topic } from "@/content/db"
import { topicHref, tutorialsHref } from "@/content/href"
import { cn } from "@/lib/utils"

const icons: Record<string, LucideIcon> = {
  Activity,
  Archive,
  Bell,
  BookOpen,
  Container,
  Database,
  FolderSync,
  Globe,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Workflow,
}

export function TopicIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = icons[name] ?? BookOpen
  return <Icon aria-hidden="true" strokeWidth={1.5} className={className} />
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

// The visible trail; the same items go into BreadcrumbList data.
export function Crumbs({
  items,
  className,
}: {
  items: { name: string; href?: string }[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-y-1 text-lumen/60">
        {items.map((it, i) => (
          <Fragment key={it.name}>
            {i > 0 && (
              <li aria-hidden="true" className="mx-2">
                /
              </li>
            )}
            <li>
              {it.href ? (
                <Link href={it.href} className="hover:text-lumen">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-lumen/80">
                  {it.name}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

export function ArticleCard({
  article,
  topic,
  minutesLabel,
}: {
  article: ArticleMeta
  topic?: Topic
  minutesLabel: string
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line p-5 transition-colors hover:border-glow/40 hover:bg-surface sm:p-6">
      {topic && (
        <p className="flex items-center gap-2 text-dust text-xs">
          <TopicIcon name={topic.icon} className="size-3.5" />
          {topic.name}
        </p>
      )}
      <h3 className="t-heading mt-3 text-[1.0625rem] text-lumen leading-snug">
        <Link
          href={tutorialsHref(article.slug)}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2.5 line-clamp-3 text-dust text-sm leading-relaxed">
        {article.description}
      </p>
      <p className="mt-auto flex items-center gap-1.5 pt-4 text-dust text-xs">
        <Clock aria-hidden="true" className="size-3.5" />
        {article.minutes} {minutesLabel}
      </p>
    </article>
  )
}

export function TopicCard({
  topic,
  countLabel,
}: {
  topic: Topic
  countLabel: string
}) {
  return (
    <Link
      href={topicHref(topic.slug)}
      className="group flex items-start gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-glow/40 hover:bg-surface"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-lumen">
        <TopicIcon name={topic.icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-lumen">{topic.name}</span>
        <span className="mt-1 block text-dust text-sm">
          {topic.count} {countLabel}
        </span>
      </span>
    </Link>
  )
}

export function backToAll(label: string) {
  return { name: label, href: tutorialsHref() }
}
