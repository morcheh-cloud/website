"use client"

import { type CSSProperties, Fragment, useEffect, useRef } from "react"

type Word = { text: string; code: boolean; tail?: string }

// Splits the statement into words; `backticked` runs are tool names and
// stay whole, set in mono. Punctuation right after one ("`PuTTY`،")
// rides along as its tail, so it never wraps or floats apart.
function wordsOf(text: string) {
  const words: Word[] = []
  for (const part of text.split(/(`[^`]+`)/)) {
    if (part.startsWith("`")) {
      words.push({ text: part.slice(1, -1), code: true })
      continue
    }
    const tokens = part.split(/(\s+)/).filter(Boolean)
    const last = words.at(-1)
    if (last?.code && tokens[0] && !/^\s/.test(tokens[0])) {
      last.tail = tokens.shift()
    }
    for (const token of tokens) {
      if (!/^\s/.test(token)) words.push({ text: token, code: false })
    }
  }
  return words
}

// A sentence that lights up word by word as it's read down the screen.
// Scroll only sets one variable, --p (0 → 1); each word's opacity is pure
// CSS from its index. Under reduced motion every word is lit at once.
export function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = wordsOf(text)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const { top, height } = el.getBoundingClientRect()
      const p = (vh * 0.85 - top) / (vh * 0.4 + height)
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-40">
      <p
        ref={ref}
        className="t-statement mx-auto max-w-5xl"
        style={{ "--n": words.length + 6 } as CSSProperties}
      >
        {words.map((word, i) => (
          <Fragment key={`${i}-${word.text}`}>
            <span
              className="lit-word whitespace-nowrap"
              style={{ "--i": i } as CSSProperties}
            >
              {word.code ? (
                <span className="rounded-lg bg-white/[0.07] px-2 font-mono text-[0.72em] tracking-normal">
                  {word.text}
                </span>
              ) : (
                word.text
              )}
              {word.tail}
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </section>
  )
}
