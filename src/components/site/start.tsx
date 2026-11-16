import type { Dictionary } from "@/copy"

import { CopyButton } from "./copy-button"
import { MoreLink } from "./more-link"

const commands = [
  "git clone https://github.com/morcheh-cloud/morche.git",
  "cd morche",
  "./install.sh",
]

// The tail of what install.sh prints on a fresh machine (deploy repo).
const output = [
  { text: "Address people will use to reach this machine", tone: "text-dust" },
  { text: "(IP or domain) [10.0.0.4]: panel.example.com", tone: "text-dust" },
  {
    text: "Wrote .env (keep a copy of SECRETS_KEY somewhere safe).",
    tone: "text-dust",
  },
  {
    text: "Morche is starting. Open http://panel.example.com:3200",
    tone: "text-leaf",
  },
  {
    text: "The first-run form asks for the setup token: 4be1…",
    tone: "text-lumen",
  },
]

// A real sequence, so the steps are numbered; the terminal beside them is
// the first step, done.
export function Start({ t }: { t: Dictionary }) {
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
                text={commands.join("\n")}
                copy={t.start.copy}
                copied={t.start.copied}
              />
            </figcaption>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] text-lumen leading-7">
              {commands.map((line) => (
                <code key={line} className="block">
                  <span className="select-none text-honey">$ </span>
                  {line}
                </code>
              ))}
              {output.map((line) => (
                <code
                  key={line.text}
                  className={`block select-none whitespace-pre ${line.tone}`}
                >
                  {line.text}
                </code>
              ))}
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
