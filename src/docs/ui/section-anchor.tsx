"use client"

import { Check, Link2 } from "lucide-react"
import { useEffect, useState } from "react"

// Beside a section's heading: copies the link to it.
export function SectionAnchor({ id, label }: { id: string; label: string }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setDone(false), 1600)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`
        history.replaceState(null, "", `#${id}`)
        try {
          await navigator.clipboard.writeText(url)
          setDone(true)
        } catch {}
      }}
      className="ms-2 inline-grid size-8 translate-y-[-0.1em] place-items-center rounded-lg align-middle text-dust opacity-0 transition hover:bg-raised hover:text-lumen focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
    >
      {done ? (
        <Check aria-hidden="true" className="size-4 text-leaf" />
      ) : (
        <Link2 aria-hidden="true" className="size-4" />
      )}
    </button>
  )
}
