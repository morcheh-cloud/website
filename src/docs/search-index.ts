import "server-only"

import { isValidElement } from "react"

import { content } from "./content"
import { guides } from "./guides"
import type { IndexedGuide } from "./search-engine"

// Plain text of every guide, read from the guide JSX on the server (props
// are walked, nothing is rendered). Served as /docs-index.json.

// Props that hold no reader-facing words.
const skip = new Set(["href", "className", "guide", "section"])

function textOf(node: unknown): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return `${node}`
  if (Array.isArray(node)) return node.map(textOf).join(" ")
  if (isValidElement(node)) {
    return Object.entries(node.props as Record<string, unknown>)
      .filter(([key]) => !skip.has(key))
      .map(([, value]) => textOf(value))
      .join(" ")
  }
  if (typeof node === "object") return Object.values(node).map(textOf).join(" ")
  return ""
}

const clean = (s: string) =>
  s
    .replace(/\s+/g, " ")
    .replace(/ ([.,:;!?)])/g, "$1")
    .trim()

export const docsIndex: IndexedGuide[] = guides.map((guide) => {
  const sections = (content[guide.slug] ?? []).map((s) => ({
    id: s.id,
    title: s.title,
    text: clean(textOf(s.body)),
  }))
  const words = sections.reduce((n, s) => n + s.text.split(" ").length, 0)
  return {
    slug: guide.slug,
    title: guide.title,
    summary: guide.summary,
    group: guide.group,
    keywords: guide.keywords,
    minutes: Math.max(1, Math.round(words / 220)),
    sections,
  }
})

export function indexFor(slug: string) {
  return docsIndex.find((g) => g.slug === slug)
}
