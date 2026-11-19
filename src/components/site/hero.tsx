import Link from "next/link"
import type { Dictionary } from "@/copy"

import { site } from "@/site"

import { GithubMark } from "./github-mark"

import { Tour } from "./tour"

// The opening frame: the promise, then the panel itself rising out of it.
// The page load (.rise) is the only orchestrated motion on the page.
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title">
      <Tour t={t}>
        <div className="mx-auto max-w-5xl px-5 pt-32 text-center sm:px-8 sm:pt-44">
          <a
            href={site.github.org}
            className="rise mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 ps-3 pe-4 text-lumen/75 text-sm transition-colors hover:border-white/20 hover:text-lumen sm:mb-9"
          >
            <GithubMark className="size-4" />
            {t.hero.badge}
          </a>
          <h1 id="hero-title" className="t-mega rise">
            {t.hero.title}
          </h1>
          <p className="t-lead rise mx-auto mt-6 max-w-[54ch] text-lumen/70 [animation-delay:120ms] sm:mt-8">
            {t.hero.lead}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 [animation-delay:240ms]">
            <Link
              href="/install"
              className="inline-flex h-12 items-center rounded-full bg-lumen px-7 font-medium text-void transition-colors hover:bg-white"
            >
              {t.hero.primary}
            </Link>
            <a
              href={site.demo}
              className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/[0.04] px-7 font-medium text-lumen transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              {t.hero.demo}
            </a>
            <a
              href={site.github.morche}
              className="inline-flex h-12 items-center gap-2.5 font-medium text-lumen/80 underline decoration-white/25 underline-offset-[6px] transition-colors hover:text-lumen hover:decoration-white/60"
            >
              <GithubMark className="size-[1.125rem]" />
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </Tour>
    </section>
  )
}
