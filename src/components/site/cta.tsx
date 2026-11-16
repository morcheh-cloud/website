import Link from "next/link"
import type { Dictionary } from "@/copy"

import { site } from "@/site"

import { GithubMark } from "./github-mark"

import { AntShape } from "./logo"

// The ants' path along the frame's floor, and where each one starts on it.
const FLOOR = "M-40 0 H1240"
const ants = [
  { begin: "0s", dur: "26s" },
  { begin: "-7s", dur: "26s" },
  { begin: "-11s", dur: "26s" },
  { begin: "-19s", dur: "26s" },
]
// Where they stand when motion is reduced.
const still = [180, 214, 610, 940]

// The closing bookend: the hero's lit frame again, warmer, with a short
// line of ants crossing its floor on their way home.
export function Cta({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="cta-title" className="px-2 pt-10 sm:px-4">
      <div className="frame-ember relative overflow-hidden rounded-[1.75rem] px-5 pt-24 pb-28 text-center sm:rounded-[2.75rem] sm:px-8 sm:pt-36 sm:pb-40">
        <h2 id="cta-title" className="t-mega mx-auto max-w-[13ch]">
          {t.cta.title}
        </h2>
        <p className="t-lead mx-auto mt-7 max-w-[46ch] text-lumen/70">
          {t.cta.body}
        </p>
        <div className="mt-11 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/install"
              className="inline-flex h-13 items-center rounded-full bg-lumen px-8 font-medium text-[1.0625rem] text-void transition-colors hover:bg-white"
            >
              {t.cta.button}
            </Link>
            <a
              href={site.github.morche}
              className="inline-flex h-13 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 font-medium text-[1.0625rem] text-lumen transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              <GithubMark className="size-[1.125rem]" />
              {t.cta.github}
            </a>
          </div>
          <p className="text-lumen/60 text-sm">
            {t.cta.or}{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-lumen underline decoration-lumen/30 underline-offset-4 transition-colors hover:decoration-lumen"
            >
              {site.email}
            </a>
          </p>
        </div>

        <svg
          viewBox="0 -8 1200 16"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-x-0 bottom-6 h-auto w-full overflow-visible sm:bottom-9"
          aria-hidden="true"
        >
          <g className="motion-reduce:hidden">
            {ants.map((ant) => (
              <g key={ant.begin}>
                <g transform="scale(3)">
                  <AntShape />
                </g>
                <animateMotion
                  path={FLOOR}
                  dur={ant.dur}
                  begin={ant.begin}
                  repeatCount="indefinite"
                />
              </g>
            ))}
          </g>
          <g className="hidden motion-reduce:inline">
            {still.map((x) => (
              <g key={x} transform={`translate(${x} 0) scale(3)`}>
                <AntShape />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </section>
  )
}
