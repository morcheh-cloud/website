import type { Dictionary } from "@/i18n/en"
import { demoHref } from "@/site"

import { Tour } from "./tour"

// The opening frame: the promise, then the panel itself rising out of it.
// The page load (.rise) is the only orchestrated motion on the page.
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title">
      <Tour t={t}>
        <div className="mx-auto max-w-5xl px-5 pt-32 text-center sm:px-8 sm:pt-44">
          <h1 id="hero-title" className="t-mega rise">
            {t.hero.title}
          </h1>
          <p className="t-lead rise mx-auto mt-6 max-w-[54ch] text-lumen/70 [animation-delay:120ms] sm:mt-8">
            {t.hero.lead}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 [animation-delay:240ms]">
            <a
              href={demoHref(t.cta.subject)}
              className="inline-flex h-12 items-center rounded-full bg-lumen px-7 font-medium text-void transition-colors hover:bg-white"
            >
              {t.hero.primary}
            </a>
            <a
              href="#tour"
              className="inline-flex h-12 items-center font-medium text-lumen/80 underline decoration-white/25 underline-offset-[6px] transition-colors hover:text-lumen hover:decoration-white/60"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </Tour>
    </section>
  )
}
