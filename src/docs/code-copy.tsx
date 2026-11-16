"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

// The copy button in a guide's code block.
export function CodeCopy({ text }: { text: string }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setDone(false), 1600)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <button
      type="button"
      aria-label={done ? "Copied" : "Copy"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
        } catch {
          // No clipboard (plain http or denied): the text stays selectable.
        }
      }}
      className="absolute end-2 top-2 grid size-9 place-items-center rounded-lg text-dust transition-colors hover:bg-raised hover:text-lumen"
    >
      {done ? (
        <Check className="size-4 text-leaf" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
