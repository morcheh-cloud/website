import {
  Boxes,
  Database,
  HardDrive,
  type LucideIcon,
  RotateCcw,
  Server,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react"

import { GithubMark } from "@/components/site/github-mark"
import { MoreLink } from "@/components/site/more-link"
import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { copy } from "@/copy"
import { docHref } from "@/docs/href"
import { pageMeta } from "@/lib/meta"
import { site } from "@/site"

const labIcons: LucideIcon[] = [Server, Boxes, Database, HardDrive]
const ruleIcons: LucideIcon[] = [RotateCcw, Users, ShieldCheck, Wrench]

export function generateMetadata() {
  const t = copy
  return pageMeta("/demo", t.pages.demo, t.demoPage.description)
}

export default function DemoPage() {
  const t = copy
  const d = t.demoPage

  return (
    <SitePage t={t}>
      <PageHero title={d.title} lead={d.lead}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={site.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-13 items-center rounded-full bg-lumen px-8 font-medium text-[1.0625rem] text-void transition-colors hover:bg-white"
          >
            {d.enter}
          </a>
          <a
            href="/install"
            className="inline-flex h-13 items-center rounded-full border border-white/15 bg-white/[0.04] px-7 font-medium text-[1.0625rem] text-lumen transition-colors hover:border-white/30 hover:bg-white/[0.08]"
          >
            {d.install}
          </a>
        </div>
        <p className="mt-4 text-lumen/60 text-sm">{d.note}</p>
      </PageHero>

      <section
        aria-labelledby="lab-title"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mb-10 max-w-3xl sm:mb-14">
          <h2 id="lab-title" className="t-title text-[2.5rem] sm:text-5xl">
            {d.lab.title}
          </h2>
          <p className="t-lead mt-5 max-w-[56ch] text-lumen/70">{d.lab.body}</p>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {d.lab.items.map((item, i) => {
            const Icon = labIcons[i] ?? Server
            return (
              <li
                key={item.title}
                className="flex flex-col gap-4 bg-void p-6 sm:p-8"
              >
                <span className="grid size-11 place-items-center rounded-2xl border border-glow/25 bg-indigo/10 text-glow">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="t-heading text-2xl">{item.title}</h3>
                <p className="flex-1 text-dust leading-relaxed">{item.body}</p>
                <MoreLink href={docHref(item.guide)}>
                  {t.changelogPage.read}
                </MoreLink>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        aria-labelledby="try-title"
        className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
      >
        <h2 id="try-title" className="t-title text-[2.5rem] sm:text-5xl">
          {d.try.title}
        </h2>
        <ol className="grid gap-3">
          {d.try.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-4 rounded-2xl border border-line bg-surface/50 p-5 text-lumen/90"
            >
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-indigo/15 font-medium text-glow text-sm"
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="rules-title"
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <h2
          id="rules-title"
          className="t-title mb-10 text-[2.5rem] sm:text-5xl"
        >
          {d.rules.title}
        </h2>
        <ul className="grid gap-5 md:grid-cols-2">
          {d.rules.items.map((item, i) => {
            const Icon = ruleIcons[i] ?? ShieldCheck
            return (
              <li
                key={item.title}
                className="rounded-[1.75rem] border border-line bg-surface/50 p-6 sm:p-9"
              >
                <Icon aria-hidden="true" className="size-5 text-honey" />
                <h3 className="t-heading mt-5 text-2xl">{item.title}</h3>
                <p className="mt-3 text-dust leading-relaxed">{item.body}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        aria-labelledby="ready-title"
        className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-36"
      >
        <div className="frame-ember rounded-[1.75rem] px-6 py-14 text-center sm:rounded-[2.75rem] sm:py-20">
          <h2 id="ready-title" className="t-title">
            {d.ready.title}
          </h2>
          <p className="t-lead mx-auto mt-5 max-w-[46ch] text-lumen/70">
            {d.ready.body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/install"
              className="inline-flex h-13 items-center rounded-full bg-lumen px-8 font-medium text-[1.0625rem] text-void transition-colors hover:bg-white"
            >
              {d.install}
            </a>
            <a
              href={site.github.morche}
              className="inline-flex h-13 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 font-medium text-[1.0625rem] text-lumen transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              <GithubMark className="size-[1.125rem]" />
              {t.cta.github}
            </a>
          </div>
        </div>
      </section>
    </SitePage>
  )
}
