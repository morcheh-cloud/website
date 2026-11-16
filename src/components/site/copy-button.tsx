"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

export function CopyButton({
  text,
  copy,
  copied,
}: {
  text: string
  copy: string
  copied: string
}) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setDone(false), 1800)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
        } catch {
          // No clipboard (plain http or denied): the commands stay selectable.
        }
      }}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-dust text-xs transition-colors hover:border-dust hover:text-lumen"
    >
      {done ? (
        <Check className="size-3.5 text-leaf" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  )
}
