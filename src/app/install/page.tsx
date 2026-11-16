import {
  Archive,
  KeyRound,
  type LucideIcon,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"

import { CopyButton } from "@/components/site/copy-button"
import { GithubMark } from "@/components/site/github-mark"
import { PageHero } from "@/components/site/page-hero"
import { SitePage } from "@/components/site/site-page"
import { copy } from "@/copy"
import { pageMeta } from "@/lib/meta"
import { cn } from "@/lib/utils"
import { site } from "@/site"

const afterIcons: Record<string, LucideIcon> = {
  secrets: KeyRound,
  https: ShieldCheck,
  update: RefreshCw,
  backup: Archive,
}

function Code({
  text,
  copy,
  copied,
}: {
  text: string
  copy: string
  copied: string
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-[#090b16] [contain:inline-size]">
      <div className="flex items-center justify-end border-line border-b px-2 py-1.5">
        <CopyButton text={text} copy={copy} copied={copied} />
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-start font-mono text-[0.8438rem] text-lumen leading-6">
        <code>
          {text.split("\n").map((line) => (
            <span key={line} className="block">
              <span aria-hidden="true" className="select-none text-dust">
                ${" "}
              </span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export function generateMetadata() {
  const t = copy
  return pageMeta("/install", t.pages.install, t.install.description)
}

export default function Install() {
  const t = copy
  const s = t.install

  return (
    <SitePage t={t}>
      <PageHero title={s.title} lead={s.lead}>
        <div className="mt-10 max-w-3xl">
          <h2 className="font-medium text-lumen">{s.needsTitle}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {s.needs.map((need) => (
              <li
                key={need}
                className="flex gap-3 text-lumen/75 text-sm leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-honey"
                />
                {need}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      <section
        aria-labelledby="steps-title"
        className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <h2
          id="steps-title"
          className="t-title mb-12 text-[2.5rem] sm:text-5xl"
        >
          {s.stepsTitle}
        </h2>
        <ol className="relative flex flex-col gap-12 before:absolute before:inset-y-5 before:start-5 before:w-px before:bg-line">
          {s.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 sm:gap-7">
              <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-glow/40 bg-void font-medium text-glow tabular-nums">
                {(i + 1).toLocaleString("en-US")}
              </span>
              <div className="min-w-0 flex-1 pt-1.5">
                <h3 className="t-heading text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-[60ch] text-dust leading-relaxed">
                  {step.body}
                </p>
                {step.code && (
                  <Code text={step.code} copy={s.copy} copied={s.copied} />
                )}
              </div>
            </li>
          ))}
        </ol>
        <a
          href={site.github.morche}
          className="ms-15 mt-12 inline-flex items-center gap-2.5 font-medium text-glow transition-colors hover:text-lumen sm:ms-17"
        >
          <GithubMark className="size-[1.125rem]" />
          {s.readme}
        </a>
      </section>

      <section
        aria-labelledby="after-title"
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <h2
          id="after-title"
          className="t-title mb-12 text-[2.5rem] sm:text-5xl"
        >
          {s.afterTitle}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {s.after.map((item) => {
            const Icon = afterIcons[item.id] ?? KeyRound
            const warn = item.id === "secrets"
            return (
              <section
                key={item.id}
                id={item.id}
                aria-labelledby={`${item.id}-title`}
                className={cn(
                  "flex scroll-mt-28 flex-col rounded-[1.75rem] border p-6 sm:p-8",
                  warn
                    ? "border-honey/30 bg-honey/[0.05]"
                    : "border-line bg-surface/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-2xl border",
                    warn
                      ? "border-honey/30 bg-honey/10 text-honey"
                      : "border-glow/25 bg-indigo/10 text-glow",
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 id={`${item.id}-title`} className="t-heading mt-6 text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-dust leading-relaxed">{item.body}</p>
                {item.code && (
                  <Code text={item.code} copy={s.copy} copied={s.copied} />
                )}
              </section>
            )
          })}
        </div>
      </section>

      <section
        aria-labelledby="settings-title"
        className="mx-auto max-w-4xl px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <h2
          id="settings-title"
          className="t-title mb-10 text-[2.5rem] sm:text-5xl"
        >
          {s.settingsTitle}
        </h2>
        <table className="w-full overflow-hidden rounded-[1.75rem] border border-line text-start">
          <thead>
            <tr className="border-line border-b">
              {s.settingsHead.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 text-start font-medium text-dust text-sm sm:px-7"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {s.settings.map(([name, what]) => (
              <tr key={name}>
                <th
                  scope="row"
                  className="px-5 py-4 text-start align-top sm:px-7"
                >
                  <code className="font-mono font-normal text-[0.8125rem] text-glow break-all">
                    {name}
                  </code>
                </th>
                <td className="px-5 py-4 text-lumen/80 text-sm leading-relaxed sm:px-7">
                  {what}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mx-auto max-w-4xl px-5 pb-28 text-dust sm:px-8 sm:pb-36">
        {s.help}{" "}
        <a
          href={site.github.issues}
          className="font-medium text-glow underline decoration-glow/30 underline-offset-4 hover:decoration-glow"
        >
          {s.issue}
        </a>{" "}
        {s.helpOr}{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-glow underline decoration-glow/30 underline-offset-4 hover:decoration-glow"
        >
          {site.email}
        </a>
      </p>
    </SitePage>
  )
}
