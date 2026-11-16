"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type Item = { id: string; title: string }

// "On this page" with the section being read marked (scrollspy).
export function Toc({ items, label }: { items: Item[]; label: string }) {
  const [current, setCurrent] = useState(items[0]?.id)

  useEffect(() => {
    const seen = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting)
        const first = items.find((i) => seen.get(i.id))
        if (first) setCurrent(first.id)
      },
      { rootMargin: "-96px 0px -55% 0px" },
    )
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={label}>
      <p className="font-medium text-lumen text-sm">{label}</p>
      <ul className="mt-4 flex flex-col border-line border-s">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === current ? "location" : undefined}
              className={cn(
                "-ms-px block border-s py-1.5 ps-4 text-sm leading-snug transition-colors",
                item.id === current
                  ? "border-glow text-lumen"
                  : "border-transparent text-dust hover:text-lumen",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// The section a link jumped to glows once, so the eye finds it.
export function HashFlash() {
  useEffect(() => {
    function flash() {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const el = id && document.getElementById(id)
      if (!el) return
      el.classList.remove("docs-flash")
      void el.offsetWidth
      el.classList.add("docs-flash")
    }
    flash()
    window.addEventListener("hashchange", flash)
    return () => window.removeEventListener("hashchange", flash)
  }, [])
  return null
}
