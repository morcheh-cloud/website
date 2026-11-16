import { Lightbulb, TriangleAlert } from "lucide-react"
import { Fragment, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { CodeCopy } from "./code-copy"
import { GuideLink } from "./guide-link"
import { guideFor } from "./guides"

// The website's take on the panel's prose blocks (frontend
// app/help/components/prose.tsx): same names and props, so the synced
// guides render unchanged; styled for the site's dark page.

export type GuideSection = { id: string; title: string; body: ReactNode }

export function P({ children }: { children: ReactNode }) {
  return <p className="text-lumen/85 leading-[1.75]">{children}</p>
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="t-heading mt-3 text-lumen">{children}</h3>
}

// A button, field or menu item as the panel labels it.
export function UI({ children }: { children: ReactNode }) {
  return <span className="font-medium text-lumen">{children}</span>
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-surface px-1.5 py-px font-mono text-[0.84em] text-lumen">
      {children}
    </code>
  )
}

export function Keys({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {children.split("+").map((key, i) => (
        <Fragment key={key}>
          {i > 0 && <span className="text-dust text-xs">+</span>}
          <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-line border-b-2 bg-surface px-1.5 font-mono text-[0.75rem] text-lumen">
            {key}
          </kbd>
        </Fragment>
      ))}
    </span>
  )
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2.5 ps-5 text-lumen/85 marker:text-honey/70">
      {children}
    </ul>
  )
}

// Steps to follow in order: a numbered rail.
export function Steps({ children }: { children: ReactNode[] }) {
  return (
    <ol className="relative flex flex-col gap-5 before:absolute before:inset-y-3 before:start-[0.8125rem] before:w-px before:bg-line">
      {children.map((step, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
        <li key={i} className="relative flex gap-4 text-lumen/85">
          <span className="relative grid size-[1.625rem] shrink-0 place-items-center rounded-full border border-glow/40 bg-void font-medium text-glow text-xs tabular-nums">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-0.5 [&>p]:mt-2">{step}</div>
        </li>
      ))}
    </ol>
  )
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <aside className="flex gap-3.5 rounded-2xl border border-glow/20 bg-indigo/[0.07] px-5 py-4 text-[0.9688rem] text-lumen/85">
      <Lightbulb
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-glow"
      />
      <div className="min-w-0 flex-1 space-y-2">{children}</div>
    </aside>
  )
}

export function Warn({ children }: { children: ReactNode }) {
  return (
    <aside className="flex gap-3.5 rounded-2xl border border-honey/25 bg-honey/[0.06] px-5 py-4 text-[0.9688rem] text-lumen/85">
      <TriangleAlert
        aria-hidden="true"
        className="mt-1 size-4 shrink-0 text-honey"
      />
      <div className="min-w-0 flex-1 space-y-2">{children}</div>
    </aside>
  )
}

// A worked, real-world example.
export function Example({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 p-5 md:p-6">
      <h3 className="flex items-baseline gap-2.5">
        <span className="rounded-full bg-honey/12 px-2 py-0.5 font-medium text-honey text-xs">
          Example
        </span>
        <span className="t-heading text-lumen">{title}</span>
      </h3>
      {children}
    </div>
  )
}

export function Code({ children }: { children: string }) {
  const text = children.trim()
  return (
    <div className="group relative [contain:inline-size]">
      <pre className="overflow-x-auto rounded-2xl border border-line bg-[#090b16] py-3.5 ps-5 pe-14 font-mono text-[0.8438rem] text-lumen leading-6">
        <code>{text}</code>
      </pre>
      <CodeCopy text={text} />
    </div>
  )
}

const head = "text-dust text-xs font-medium"

export function Recommended({
  rows,
}: {
  rows: { setting: ReactNode; value: ReactNode; why: ReactNode }[]
}) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line text-[0.9375rem]">
      <div className="hidden grid-cols-[11rem_10rem_minmax(0,1fr)] gap-4 px-5 py-2.5 md:grid">
        <span className={head}>Setting</span>
        <span className={head}>Recommended</span>
        <span className={head}>Why</span>
      </div>
      {rows.map((row, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
          key={i}
          className="grid gap-1 px-5 py-3.5 md:grid-cols-[11rem_10rem_minmax(0,1fr)] md:gap-4"
        >
          <span className="font-medium text-lumen">{row.setting}</span>
          <span className="text-glow">{row.value}</span>
          <span className="text-dust">{row.why}</span>
        </div>
      ))}
    </div>
  )
}

export function Table({
  head: [a, b],
  rows,
}: {
  head: [string, string]
  rows: [ReactNode, ReactNode][]
}) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line text-[0.9375rem]">
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-5 py-2.5">
        <span className={head}>{a}</span>
        <span className={head}>{b}</span>
      </div>
      {rows.map(([x, y], i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static, never reordered
          key={i}
          className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-5 py-3"
        >
          <span className="text-lumen">{x}</span>
          <span className="text-dust">{y}</span>
        </div>
      ))}
    </div>
  )
}

// A page of the panel. There's no panel here, so it reads as its name.
export function A({ children }: { href: string; children: ReactNode }) {
  return <span className="font-medium text-lumen">{children}</span>
}

// A link to another guide, optionally to one of its sections.
export function See({
  guide,
  section,
  children,
  className,
}: {
  guide: string
  section?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <GuideLink
      guide={guide}
      section={section}
      className={cn(
        "font-medium text-glow underline decoration-glow/30 underline-offset-4 transition-colors hover:decoration-glow",
        className,
      )}
    >
      {children ?? guideFor(guide)?.title}
    </GuideLink>
  )
}
