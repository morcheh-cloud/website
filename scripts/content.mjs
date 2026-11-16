#!/usr/bin/env node
// The tutorials database (content.db at the project root, committed).
// Every article, topic (category) and tag lives there; the site reads it at
// build time. Writers hand in Markdown files with a small frontmatter.
//
//   node scripts/content.mjs init                 # create the tables
//   node scripts/content.mjs plan plan.json       # add planned articles/topics
//   node scripts/content.mjs brief <slug|topic>   # what to write (JSON)
//   node scripts/content.mjs upsert a.md b.md     # save written articles
//   node scripts/content.mjs export <slug>        # the article back as Markdown
//   node scripts/content.mjs list [status]        # planned / published / all
//   node scripts/content.mjs check                # SEO + link checks
//
// Article file:
//   ---
//   slug: sync-server-files-to-minio
//   title: How to sync server files to MinIO on a schedule
//   seo_title: Sync server files to MinIO automatically   (optional, ≤ 60)
//   description: One or two sentences for search results (120–160 chars).
//   category: storage-sync
//   keyword: sync files to minio
//   tags: minio, s3, backups
//   guides: storage, cronjobs
//   ---
//   Markdown body (no H1; ## sections; a "## FAQ" section with ### questions)

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { DatabaseSync } from "node:sqlite"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const db = new DatabaseSync(join(root, "content.db"))
db.exec("PRAGMA busy_timeout = 15000; PRAGMA foreign_keys = ON;")

const schema = `
CREATE TABLE IF NOT EXISTS categories (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,          -- short name (nav, chips)
  title       TEXT NOT NULL,          -- the topic page's H1 / SEO title
  description TEXT NOT NULL,          -- meta description
  intro       TEXT NOT NULL,          -- Markdown shown above the list
  guides      TEXT NOT NULL DEFAULT '', -- docs slugs, comma separated
  icon        TEXT NOT NULL DEFAULT 'BookOpen', -- lucide icon name
  sort        INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS tags (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS articles (
  slug         TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  seo_title    TEXT,
  description  TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL REFERENCES categories(slug),
  keyword      TEXT NOT NULL DEFAULT '',
  guides       TEXT NOT NULL DEFAULT '',  -- docs slugs, comma separated
  brief        TEXT NOT NULL DEFAULT '',  -- what the article must cover
  body         TEXT NOT NULL DEFAULT '',  -- Markdown
  status       TEXT NOT NULL DEFAULT 'planned'
               CHECK (status IN ('planned', 'draft', 'published')),
  words        INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  updated_at   TEXT
);
CREATE TABLE IF NOT EXISTS article_tags (
  article TEXT NOT NULL REFERENCES articles(slug) ON DELETE CASCADE,
  tag     TEXT NOT NULL REFERENCES tags(slug),
  PRIMARY KEY (article, tag)
);
CREATE INDEX IF NOT EXISTS articles_category ON articles(category, status);
`

const [cmd, ...args] = process.argv.slice(2)
const now = () => new Date().toISOString()
const list = (s) =>
  (s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
const titleCase = (slug) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ")

function parse(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) throw new Error("missing --- frontmatter ---")
  const meta = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":")
    if (i < 1) continue
    meta[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1")
  }
  return { meta, body: m[2].trim() }
}

function addTag(slug, name) {
  db.prepare("INSERT OR IGNORE INTO tags (slug, name) VALUES (?, ?)").run(
    slug,
    name ?? titleCase(slug),
  )
}

function setTags(article, tags) {
  db.prepare("DELETE FROM article_tags WHERE article = ?").run(article)
  for (const tag of tags) {
    addTag(tag)
    db.prepare("INSERT INTO article_tags (article, tag) VALUES (?, ?)").run(
      article,
      tag,
    )
  }
}

const words = (md) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length

function upsert(file, status) {
  const { meta, body } = parse(readFileSync(file, "utf8"))
  for (const k of ["slug", "title", "description", "category"])
    if (!meta[k]) throw new Error(`${file}: frontmatter needs "${k}"`)
  if (/^#\s/m.test(body.replace(/```[\s\S]*?```/g, "")))
    throw new Error(`${file}: no H1 in the body`)
  const old = db
    .prepare("SELECT published_at, brief FROM articles WHERE slug = ?")
    .get(meta.slug)
  const published = status === "published" ? (old?.published_at ?? now()) : null
  db.prepare(
    `INSERT INTO articles (slug, title, seo_title, description, category, keyword,
       guides, brief, body, status, words, published_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET title = excluded.title,
       seo_title = excluded.seo_title, description = excluded.description,
       category = excluded.category, keyword = excluded.keyword,
       guides = excluded.guides, body = excluded.body, status = excluded.status,
       words = excluded.words, published_at = excluded.published_at,
       updated_at = excluded.updated_at`,
  ).run(
    meta.slug,
    meta.title,
    meta.seo_title || null,
    meta.description,
    meta.category,
    meta.keyword ?? "",
    list(meta.guides).join(","),
    old?.brief ?? "",
    body,
    status,
    words(body),
    published,
    now(),
  )
  setTags(meta.slug, list(meta.tags))
  console.log(`saved ${meta.slug} (${status}, ${words(body)} words)`)
}

// Planned work: { categories: [...], articles: [...] }
function plan(file) {
  const data = JSON.parse(readFileSync(file, "utf8"))
  for (const [i, c] of (data.categories ?? []).entries())
    db.prepare(
      `INSERT INTO categories (slug, name, title, description, intro, guides, icon, sort)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(slug) DO UPDATE SET name = excluded.name, title = excluded.title,
         description = excluded.description, intro = excluded.intro,
         guides = excluded.guides, icon = excluded.icon, sort = excluded.sort`,
    ).run(
      c.slug,
      c.name,
      c.title,
      c.description,
      c.intro,
      (c.guides ?? []).join(","),
      c.icon ?? "BookOpen",
      c.sort ?? i,
    )
  for (const t of data.tags ?? []) addTag(t.slug, t.name)
  for (const a of data.articles ?? []) {
    const exists = db
      .prepare("SELECT status FROM articles WHERE slug = ?")
      .get(a.slug)
    if (exists) {
      db.prepare(
        "UPDATE articles SET brief = ?, keyword = ?, category = ? WHERE slug = ?",
      ).run(a.brief, a.keyword, a.category, a.slug)
      continue
    }
    db.prepare(
      `INSERT INTO articles (slug, title, category, keyword, guides, brief, status)
       VALUES (?, ?, ?, ?, ?, ?, 'planned')`,
    ).run(
      a.slug,
      a.title,
      a.category,
      a.keyword,
      (a.guides ?? []).join(","),
      a.brief,
    )
    setTags(a.slug, a.tags ?? [])
  }
  console.log(
    `${data.categories?.length ?? 0} topics, ${data.articles?.length ?? 0} articles planned`,
  )
}

function brief(key) {
  const rows = db
    .prepare(
      "SELECT slug, title, category, keyword, guides, brief, status FROM articles WHERE slug = ? OR category = ? ORDER BY slug",
    )
    .all(key, key)
  for (const r of rows)
    r.tags = db
      .prepare("SELECT tag FROM article_tags WHERE article = ?")
      .all(r.slug)
      .map((t) => t.tag)
  // Everything that exists or will exist, so writers can link to it.
  const all = db
    .prepare(
      "SELECT slug, title, category, status FROM articles ORDER BY category, slug",
    )
    .all()
  const topics = db.prepare("SELECT slug, name FROM categories").all()
  console.log(
    JSON.stringify({ assignments: rows, linkable: all, topics }, null, 1),
  )
}

function exportMd(slug) {
  const a = db.prepare("SELECT * FROM articles WHERE slug = ?").get(slug)
  if (!a) throw new Error(`no article ${slug}`)
  const tags = db
    .prepare("SELECT tag FROM article_tags WHERE article = ?")
    .all(slug)
    .map((t) => t.tag)
  const fm = [
    ["slug", a.slug],
    ["title", a.title],
    ["seo_title", a.seo_title],
    ["description", a.description],
    ["category", a.category],
    ["keyword", a.keyword],
    ["tags", tags.join(", ")],
    ["guides", a.guides.split(",").join(", ")],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
  console.log(`---\n${fm.join("\n")}\n---\n\n${a.body}\n`)
}

// Docs slugs and their section ids, read from the synced guides.
function docsMap() {
  const dir = join(root, "src/docs/content")
  const map = new Map()
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
    const text = readFileSync(join(dir, f), "utf8")
    map.set(
      f.replace(/\.tsx$/, ""),
      new Set([...text.matchAll(/^\s{4}id: "([^"]+)"/gm)].map((m) => m[1])),
    )
  }
  return map
}

function check() {
  const docs = docsMap()
  const arts = db.prepare("SELECT * FROM articles").all()
  const published = new Set(
    arts.filter((a) => a.status === "published").map((a) => a.slug),
  )
  const topics = new Set(
    db
      .prepare("SELECT slug FROM categories")
      .all()
      .map((c) => c.slug),
  )
  const tags = new Set(
    db
      .prepare("SELECT tag FROM article_tags")
      .all()
      .map((t) => t.tag),
  )
  const pages = new Set(["/", "/product", "/security", "/install", "/docs"])
  const inbound = new Map()
  let problems = 0
  const warn = (slug, msg) => {
    problems++
    console.log(`${slug}: ${msg}`)
  }
  for (const a of arts.filter((a) => a.status === "published")) {
    const seo = a.seo_title ?? a.title
    if (seo.length > 65) warn(a.slug, `title is ${seo.length} chars (≤ 65)`)
    if (a.description.length < 90 || a.description.length > 165)
      warn(a.slug, `description is ${a.description.length} chars (90–165)`)
    if (a.words < 700) warn(a.slug, `only ${a.words} words`)
    if (!/^## FAQ\s*$/m.test(a.body)) warn(a.slug, "no ## FAQ section")
    for (const g of a.guides.split(",").filter(Boolean))
      if (!docs.has(g)) warn(a.slug, `guides: unknown docs slug ${g}`)
    const links = [...a.body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1])
    let internal = 0
    for (const href of links) {
      const [path, hash] = href.split("#")
      const clean = path.replace(/\/$/, "") || "/"
      let ok = pages.has(clean)
      const topicM = clean.match(/^\/tutorials\/topic\/([^/]+)$/)
      const tagM = clean.match(/^\/tutorials\/tag\/([^/]+)$/)
      const artM = clean.match(/^\/tutorials\/([^/]+)$/)
      const docM = clean.match(/^\/docs\/([^/]+)$/)
      if (topicM) ok = topics.has(topicM[1])
      else if (tagM) ok = tags.has(tagM[1])
      else if (artM) {
        ok = published.has(artM[1])
        if (ok) {
          internal++
          inbound.set(artM[1], (inbound.get(artM[1]) ?? 0) + 1)
        }
      } else if (clean === "/tutorials") ok = true
      else if (docM) {
        ok = docs.has(docM[1]) && (!hash || docs.get(docM[1]).has(hash))
      }
      if (!ok) warn(a.slug, `broken link ${href}`)
    }
    if (internal < 2) warn(a.slug, `links to ${internal} other tutorials (≥ 2)`)
  }
  for (const slug of published)
    if (!inbound.get(slug)) warn(slug, "no other tutorial links here (orphan)")
  const counts = db
    .prepare("SELECT status, COUNT(*) n FROM articles GROUP BY status")
    .all()
  console.log(
    counts.map((c) => `${c.status}: ${c.n}`).join(", "),
    `· ${problems} problem(s)`,
  )
  if (problems && args.includes("--strict")) process.exit(1)
}

db.exec(schema)
switch (cmd) {
  case "init":
    console.log("content.db ready")
    break
  case "plan":
    plan(args[0])
    break
  case "brief":
    brief(args[0])
    break
  case "upsert": {
    const status = args.includes("--draft") ? "draft" : "published"
    for (const f of args.filter((a) => !a.startsWith("--"))) {
      if (!existsSync(f)) throw new Error(`no file ${f}`)
      upsert(f, status)
    }
    break
  }
  case "export":
    exportMd(args[0])
    break
  case "list": {
    const rows = db
      .prepare(
        "SELECT slug, category, status, words FROM articles WHERE ? IS NULL OR status = ? ORDER BY category, slug",
      )
      .all(args[0] ?? null, args[0] ?? null)
    for (const r of rows)
      console.log(
        `${r.status.padEnd(9)} ${r.category.padEnd(16)} ${r.slug} ${r.words || ""}`,
      )
    break
  }
  case "check":
    check()
    break
  default:
    console.log(
      readFileSync(fileURLToPath(import.meta.url), "utf8")
        .split("\n")
        .slice(1, 28)
        .join("\n"),
    )
}
