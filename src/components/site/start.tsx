import type { Dictionary } from "@/copy"
import { site } from "@/site"

import { CopyButton } from "./copy-button"
import { MoreLink } from "./more-link"

// A real sequence, so the steps are numbered; the terminal beside them is
// the first step, done.
export function Start({ t }: { t: Dictionary }) {
  const output = t.start.output

  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="px-5 py-20 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="start-title" className="t-title max-w-[14ch]">
            {t.start.title}
          </h2>
          <ol className="mt-12 grid gap-9">
            {t.start.steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line font-medium text-lumen text-sm tabular-nums">
                  {(index + 1).toLocaleString("en-US")}
                </span>
                <div>
                  <h3 className="t-heading">{step.title}</h3>
                  <p className="mt-1.5 max-w-[44ch] text-dust leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <MoreLink href={`/install`} className="mt-12 ms-14">
            {t.home.startMore}
          </MoreLink>
        </div>

        <figure className="self-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-1.5 lg:p-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <figcaption className="flex items-center justify-between gap-3 border-line border-b py-2 ps-5 pe-2">
              <span className="text-dust text-xs">{t.start.codeLabel}</span>
              <CopyButton
                text={site.install.server}
                copy={t.start.copy}
                copied={t.start.copied}
              />
            </figcaption>
            <pre className="whitespace-pre-wrap wrap-anywhere px-5 py-5 font-mono text-[0.8125rem] text-lumen leading-7">
              <code className="block">
                <span className="select-none text-honey">$ </span>
                {site.install.server}
              </code>
              <code className="block select-none text-dust">
                {output.prompt}
              </code>
              <code className="mt-2 block select-none text-leaf">
                {output.ready}
              </code>
              <code className="block select-none text-dust">
                {output.panel}
              </code>
              <code className="block select-none text-dust">{output.api}</code>
              <code className="block select-none">{output.token}</code>
              <code className="block select-none text-dust">
                <span className="text-honey">$ </span>
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-lumen/80 motion-safe:animate-pulse" />
              </code>
            </pre>
          </div>
        </figure>
      </div>
    </section>
  )
}
