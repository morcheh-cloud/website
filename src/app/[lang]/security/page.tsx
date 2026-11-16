import {
  KeyRound,
  Lock,
  type LucideIcon,
  ScrollText,
  Undo2,
} from "lucide-react"
import { notFound } from "next/navigation"

import { MoreLink } from "@/components/site/more-link"
import { PageHero } from "@/components/site/page-hero"
import { Security } from "@/components/site/security"
import { SitePage } from "@/components/site/site-page"
import { docHref } from "@/docs/href"
import { hasLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { pageMeta } from "@/lib/meta"

const icons: Record<string, LucideIcon> = {
  lock: Lock,
  scroll: ScrollText,
  key: KeyRound,
  undo: Undo2,
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/security">) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)
  return pageMeta(
    lang,
    "/security",
    t.pages.security,
    t.securityPage.description,
  )
}

export default async function SecurityPage({
  params,
}: PageProps<"/[lang]/security">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDictionary(lang)
  const s = t.securityPage
  const levels = s.levels.items

  return (
    <SitePage lang={lang} t={t}>
      <PageHero title={s.title} lead={s.lead} />

      <Security t={t} heading={false} />

      <section
        aria-labelledby="levels-title"
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-32"
      >
        <div className="mb-10 max-w-3xl sm:mb-14">
          <h2 id="levels-title" className="t-title text-[2.5rem] sm:text-5xl">
            {s.levels.title}
          </h2>
          <p className="t-lead mt-5 max-w-[56ch] text-lumen/70">
            {s.levels.body}
          </p>
        </div>
        {/* Each level holds everything the one before it can do: the bars grow. */}
        <ol className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level, i) => (
            <li
              key={level.name}
              className="flex flex-col gap-4 bg-void p-6 sm:p-8"
            >
              <span aria-hidden="true" className="flex items-end gap-1">
                {levels.map((other, j) => (
                  <span
                    key={other.name}
                    className={
                      j <= i
                        ? "w-2 rounded-full bg-glow"
                        : "w-2 rounded-full bg-line"
                    }
                    style={{ height: `${0.5 + j * 0.375}rem` }}
                  />
                ))}
              </span>
              <h3 className="t-heading text-2xl">{level.name}</h3>
              <p className="text-dust leading-relaxed">{level.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:px-8 sm:pb-36 md:grid-cols-2">
        {s.topics.map((topic) => {
          const Icon = icons[topic.icon] ?? Lock
          return (
            <section
              key={topic.id}
              id={topic.id}
              aria-labelledby={`${topic.id}-title`}
              className="flex scroll-mt-28 flex-col rounded-[1.75rem] border border-line bg-surface/50 p-6 sm:p-9"
            >
              <span className="grid size-11 place-items-center rounded-2xl border border-glow/25 bg-indigo/10 text-glow">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h2 id={`${topic.id}-title`} className="t-heading mt-6 text-2xl">
                {topic.title}
              </h2>
              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {topic.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lumen/85">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-honey"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <MoreLink href={docHref(lang, topic.guide)} className="mt-8">
                {s.readGuide}
              </MoreLink>
            </section>
          )
        })}
      </div>
    </SitePage>
  )
}
