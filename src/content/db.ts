import "server-only"

import { join } from "node:path"
import { DatabaseSync } from "node:sqlite"

// The tutorials live in content.db at the project root (written by
// scripts/content.mjs). Pages read it at build time; nothing reads it at
// request time, every route is static.

export type Topic = {
  slug: string
  name: string
  title: string
  description: string
  intro: string
  guides: string[]
  icon: string
  sort: number
  count: number
}

export type Tag = { slug: string; name: string; count: number }

export type ArticleMeta = {
  slug: string
  title: string
  seoTitle: string | null
  description: string
  category: string
  keyword: string
  guides: string[]
  words: number
  minutes: number
  publishedAt: string
  updatedAt: string
  tags: string[]
}

export type Article = ArticleMeta & { body: string }

let db: DatabaseSync | undefined
function open() {
  db ??= new DatabaseSync(join(process.cwd(), "content.db"), {
    readOnly: true,
  })
  return db
}

const split = (s: string) => (s ? s.split(",").filter(Boolean) : [])

type Row = Record<string, string | number | null>

function toMeta(r: Row, tags: Map<string, string[]>): ArticleMeta {
  const words = Number(r.words)
  return {
    slug: String(r.slug),
    title: String(r.title),
    seoTitle: (r.seo_title as string | null) ?? null,
    description: String(r.description),
    category: String(r.category),
    keyword: String(r.keyword),
    guides: split(String(r.guides)),
    words,
    minutes: Math.max(1, Math.round(words / 220)),
    publishedAt: String(r.published_at),
    updatedAt: String(r.updated_at ?? r.published_at),
    tags: tags.get(String(r.slug)) ?? [],
  }
}

function tagMap() {
  const map = new Map<string, string[]>()
  const rows = open()
    .prepare("SELECT article, tag FROM article_tags ORDER BY tag")
    .all() as Row[]
  for (const r of rows) {
    const list = map.get(String(r.article)) ?? []
    list.push(String(r.tag))
    map.set(String(r.article), list)
  }
  return map
}

let cache: { articles: ArticleMeta[]; bodies: Map<string, string> } | undefined

function load() {
  if (cache) return cache
  const tags = tagMap()
  const rows = open()
    .prepare(
      "SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC, slug",
    )
    .all() as Row[]
  cache = {
    articles: rows.map((r) => toMeta(r, tags)),
    bodies: new Map(rows.map((r) => [String(r.slug), String(r.body)])),
  }
  return cache
}

export function allArticles(): ArticleMeta[] {
  return load().articles
}

export function articleFor(slug: string): Article | undefined {
  const { articles, bodies } = load()
  const meta = articles.find((a) => a.slug === slug)
  return meta && { ...meta, body: bodies.get(slug) ?? "" }
}

export function topics(): Topic[] {
  const counts = new Map<string, number>()
  for (const a of allArticles())
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1)
  return (
    open().prepare("SELECT * FROM categories ORDER BY sort").all() as Row[]
  ).map((r) => ({
    slug: String(r.slug),
    name: String(r.name),
    title: String(r.title),
    description: String(r.description),
    intro: String(r.intro),
    guides: split(String(r.guides)),
    icon: String(r.icon),
    sort: Number(r.sort),
    count: counts.get(String(r.slug)) ?? 0,
  }))
}

export function topicFor(slug: string) {
  return topics().find((t) => t.slug === slug)
}

export function tags(): Tag[] {
  const counts = new Map<string, number>()
  for (const a of allArticles())
    for (const t of a.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return (open().prepare("SELECT * FROM tags ORDER BY name").all() as Row[])
    .map((r) => ({
      slug: String(r.slug),
      name: String(r.name),
      count: counts.get(String(r.slug)) ?? 0,
    }))
    .filter((t) => t.count > 0)
}

export function tagFor(slug: string) {
  return tags().find((t) => t.slug === slug)
}

export function articlesIn(topic: string) {
  return allArticles().filter((a) => a.category === topic)
}

export function articlesTagged(tag: string) {
  return allArticles().filter((a) => a.tags.includes(tag))
}

// Tutorials that teach a docs guide's feature.
export function articlesForGuide(guide: string) {
  return allArticles().filter((a) => a.guides.includes(guide))
}

// Related reading: shared tags weigh most, then same topic, then a link
// between the two in either direction.
export function relatedTo(article: Article, limit = 4) {
  const { bodies } = load()
  return allArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = a.tags.filter((t) => article.tags.includes(t)).length * 3
      if (a.category === article.category) score += 2
      if (article.body.includes(`/tutorials/${a.slug}`)) score += 1
      if (bodies.get(a.slug)?.includes(`/tutorials/${article.slug}`)) score += 1
      return { a, score }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.a.title.localeCompare(y.a.title))
    .slice(0, limit)
    .map((x) => x.a)
}

// Tutorials whose text links to this one.
export function linkingTo(slug: string) {
  const { articles, bodies } = load()
  return articles.filter(
    (a) =>
      a.slug !== slug && bodies.get(a.slug)?.includes(`/tutorials/${slug}`),
  )
}

export function tagName(slug: string) {
  return tagFor(slug)?.name ?? slug
}
