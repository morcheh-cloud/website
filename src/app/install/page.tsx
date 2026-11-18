import { Tabs } from "@base-ui/react/tabs"
import {
  Archive,
  ChevronDown,
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
  https: ShieldCheck,
  update: RefreshCw,
  backup: Archive,
}

const composeUp = "docker compose up -d"
const referenceLink =
  "rounded-sm font-medium text-glow underline decoration-glow/30 underline-offset-4 hover:text-lumen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"

function Code({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "mt-4 overflow-hidden rounded-2xl border border-line bg-void",
        className,
      )}
    >
      <div className="flex items-center justify-end border-line border-b px-2 py-1.5">
        <CopyButton
          text={text}
          copy={copy.install.copy}
          copied={copy.install.copied}
        />
      </div>
      <pre className="whitespace-pre-wrap wrap-anywhere px-4 py-4 text-start font-mono text-[0.8125rem] text-lumen leading-6 sm:px-5">
        <code>{text}</code>
      </pre>
    </div>
  )
}

function InstallMethods() {
  const s = copy.install
  const panelClass =
    "mt-3 rounded-[1.5rem] border border-line bg-surface/60 p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow sm:p-7"

  return (
    <section
      aria-labelledby="methods-title"
      className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <h2 id="methods-title" className="t-title mb-7 text-[2.5rem] sm:text-5xl">
        {s.methodsTitle}
      </h2>
      <Tabs.Root defaultValue="quick">
        <Tabs.List
          aria-labelledby="methods-title"
          activateOnFocus
          className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-surface p-1 sm:grid-cols-4"
        >
          {Object.entries(s.methods).map(([id, method]) => (
            <Tabs.Tab
              key={id}
              value={id}
              className="min-h-11 rounded-xl px-2 font-medium text-dust text-sm transition-colors hover:bg-raised hover:text-lumen focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-glow data-active:bg-lumen data-active:text-void"
            >
              {method.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="quick" keepMounted className={panelClass}>
          <h3 className="t-heading text-2xl">{s.methods.quick.title}</h3>
          <p className="mt-2 max-w-[64ch] text-dust leading-relaxed">
            {s.methods.quick.body}
          </p>
          <Code text={site.install.quickStart} />
          <p className="mt-4 text-dust text-sm leading-relaxed">
            {s.methods.quick.note}
          </p>
        </Tabs.Panel>

        <Tabs.Panel value="automatic" keepMounted className={panelClass}>
          <h3 className="t-heading text-2xl">{s.methods.automatic.title}</h3>
          <p className="mt-2 max-w-[64ch] text-dust leading-relaxed">
            {s.methods.automatic.body}
          </p>
          <Code text={site.install.server} />
          <details className="group mt-5 border-line border-t">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm py-4 font-medium text-lumen focus-visible:outline-2 focus-visible:outline-glow">
              {s.methods.automatic.optionsTitle}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-dust group-open:rotate-180"
              />
            </summary>
            <dl className="grid gap-3 text-dust text-sm leading-relaxed">
              {s.methods.automatic.options.map(([option, meaning]) => (
                <div
                  key={option}
                  className="grid gap-1 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="font-mono text-glow">{option}</dt>
                  <dd>{meaning}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-dust text-sm leading-relaxed">
              {s.methods.automatic.optionsNote}
            </p>
            <p className="mt-4 text-dust text-sm leading-relaxed">
              {s.methods.automatic.hostExample}
            </p>
            <Code text={site.install.withHost} />
          </details>
        </Tabs.Panel>

        <Tabs.Panel value="clone" keepMounted className={panelClass}>
          <h3 className="t-heading text-2xl">{s.methods.clone.title}</h3>
          <p className="mt-2 max-w-[64ch] text-dust leading-relaxed">
            {s.methods.clone.body}
          </p>
          <Code text={`${site.install.clone}\n./install.sh`} />
        </Tabs.Panel>

        <Tabs.Panel value="manual" keepMounted className={panelClass}>
          <h3 className="t-heading text-2xl">{s.methods.manual.title}</h3>
          <p className="mt-2 max-w-[64ch] text-dust leading-relaxed">
            {s.methods.manual.body}
          </p>
          <ol className="mt-5 list-decimal space-y-5 ps-5 text-lumen/85 marker:text-glow">
            <li>
              {s.methods.manual.download}
              <Code text={site.install.clone} />
            </li>
            <li>
              {s.methods.manual.configure}
              <Code text={s.methods.manual.envCode} />
              <p className="mt-3 text-dust text-sm leading-relaxed">
                {s.methods.manual.secrets}
              </p>
            </li>
            <li>
              {s.methods.manual.start}
              <Code text={composeUp} />
            </li>
          </ol>
        </Tabs.Panel>
      </Tabs.Root>

      <div className="mt-8 border-line border-s-2 ps-4 sm:ps-5">
        <h3 className="t-heading text-xl">{s.setupTitle}</h3>
        <p className="mt-2 max-w-[64ch] text-dust leading-relaxed">{s.setup}</p>
      </div>
      <a
        href={site.install.readme}
        className="mt-6 inline-flex items-center gap-2.5 rounded-sm font-medium text-glow transition-colors hover:text-lumen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"
      >
        <GithubMark className="size-[1.125rem]" />
        {s.readme}
      </a>
    </section>
  )
}

function AfterInstalling() {
  const s = copy.install

  return (
    <section
      aria-labelledby="after-title"
      className="mx-auto max-w-4xl px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <h2 id="after-title" className="t-title text-[2.5rem] sm:text-5xl">
        {s.afterTitle}
      </h2>
      <p className="mt-3 max-w-[65ch] text-dust leading-relaxed">
        {s.directory}
      </p>

      <div
        id="secrets"
        className="mt-7 flex scroll-mt-28 items-start gap-4 rounded-2xl border border-honey/25 bg-honey/5 p-4 sm:p-5"
      >
        <KeyRound
          aria-hidden="true"
          className="mt-1 size-5 shrink-0 text-honey"
        />
        <div>
          <h3 className="t-heading text-xl">{s.secrets.title}</h3>
          <p className="mt-1.5 max-w-[65ch] text-lumen/75 text-sm leading-relaxed">
            {s.secrets.body}
          </p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-line rounded-[1.5rem] border border-line bg-surface/50">
        {s.after.map((item) => {
          const Icon = afterIcons[item.id]

          return (
            <section
              key={item.id}
              id={item.id}
              aria-labelledby={`${item.id}-title`}
              className="grid min-w-0 scroll-mt-28 gap-4 p-4 sm:p-6 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] md:items-start md:gap-6"
            >
              <div className="flex min-w-0 items-start gap-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-glow/20 bg-indigo/10 text-glow">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 id={`${item.id}-title`} className="t-heading text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 wrap-anywhere text-dust text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
              {item.id === "https" ? (
                <details className="group min-w-0 rounded-2xl border border-line bg-void">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-2.5 font-medium text-lumen text-sm hover:text-glow focus-visible:outline-2 focus-visible:outline-glow">
                    {s.httpsExample}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 shrink-0 text-dust group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-3 pb-3">
                    <Code text={item.code} className="mt-0 rounded-xl" />
                    <p className="mt-3 px-1 text-dust text-sm leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </details>
              ) : (
                <Code text={item.code} className="mt-0 min-w-0" />
              )}
            </section>
          )
        })}
      </div>
    </section>
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

      <InstallMethods />

      <AfterInstalling />

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
        <div className="overflow-hidden rounded-[1.5rem] border border-line">
          <table className="w-full text-start">
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
              {s.settings.map(([names, what]) => (
                <tr key={names}>
                  <th
                    scope="row"
                    className="px-5 py-4 text-start align-top sm:px-7"
                  >
                    {names.split(", ").map((name) => (
                      <code
                        key={name}
                        className="block wrap-anywhere font-mono font-normal text-[0.8125rem] text-glow"
                      >
                        {name}
                      </code>
                    ))}
                  </th>
                  <td className="px-5 py-4 text-lumen/80 text-sm leading-relaxed sm:px-7">
                    {what}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-dust leading-relaxed">{s.applySettings}</p>
        <Code text={composeUp} />
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          <a href={site.install.compose} className={referenceLink}>
            {s.composeLink}
          </a>
          <a
            href={`${site.install.readme}#configuration`}
            className={referenceLink}
          >
            {s.environmentLink}
          </a>
        </div>
      </section>

      <section
        aria-labelledby="troubleshooting-title"
        className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <h2
          id="troubleshooting-title"
          className="t-title mb-7 text-[2.5rem] sm:text-5xl"
        >
          {s.troubleshootingTitle}
        </h2>
        <div className="divide-y divide-line rounded-[1.5rem] border border-line bg-surface/50 px-4 sm:px-6">
          {s.troubleshooting.map((item) => (
            <details key={item.title} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm py-4 font-medium text-lumen focus-visible:outline-2 focus-visible:outline-glow">
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-dust group-open:rotate-180"
                />
              </summary>
              <div className="pb-4">
                <p className="text-dust leading-relaxed">{item.body}</p>
                {item.code && <Code text={item.code} />}
              </div>
            </details>
          ))}
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-5 pb-28 text-dust sm:px-8 sm:pb-36">
        {s.help}{" "}
        <a href={site.github.issues} className={referenceLink}>
          {s.issue}
        </a>{" "}
        {s.helpOr}{" "}
        <a href={`mailto:${site.email}`} className={referenceLink}>
          {site.email}
        </a>
      </p>
    </SitePage>
  )
}
