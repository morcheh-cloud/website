# Morche — Website

Marketing site that introduces Morche (the product lives in `../frontend` + `../backend`). English only (Persian was removed at the user's request). Several pages plus the docs, all static (SSG), no backend.

## Maintaining this file (standing instruction from the user)

- This file is the project's memory: when the user says to remember something, or a change adds a convention/gotcha a future session needs, write it here compactly. Edit outdated lines, don't append duplicates.

Next.js 16 (App Router, `src/`, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui (`base-nova` = Base UI: use `render` + `nativeButton={false}`, not `asChild`) · Biome · pnpm.

## Commands

```bash
pnpm dev          # :3300
pnpm build        # must pass before declaring work done (all pages are SSG)
pnpm start        # prod on :3300 — after a rebuild kill the old one first (ss -ltnp 'sport = :3300'), else EADDRINUSE and stale CSS
pnpm lint         # Biome — use `rtk proxy pnpm lint` (RTK mangles its output)
pnpm lint:fix
```

## Deploy

- `Dockerfile` (standalone output, port 3300, `NEXT_PUBLIC_SITE_URL` build-arg baked at build) → CI `.github/workflows/image.yml` (lint, then multi-arch push to `ghcr.io/morcheh-cloud/website`: `latest`/`edge` on main, semver on `v*` tags; repo variable `SITE_URL` overrides the address). Production: `deploy/compose.yml` pulls that image (`WEBSITE_VERSION`, `WEBSITE_PORT`, bound to 127.0.0.1 behind a reverse proxy).

## Structure

- Routes live directly in `src/app/` (`/`, `/product`, `/security`, `/docs`, `/docs/[slug]`, `/install`); no locale segment, no proxy. 404 = `app/not-found.tsx` → `components/site/lost.tsx`.
- Copy lives only in `src/copy.ts` (`copy`, type `Dictionary`); pages pass it down as `t`.
- Morche is **open source** (github.com/morcheh-cloud: `.github` = deployment Compose files and installer, `backend`, `frontend`; images on ghcr): CTAs are "Install" (→ /install) + GitHub, never "Request a demo". Repo URLs in `site.github`, icon `GithubMark`. Keep install commands and deployment links in `site.install` so the home terminal and `/install` share them. The install page offers local quick start, automatic server setup, setup from Git, and manual Compose.
- `src/site.ts` = untranslated facts. The public origin defaults to `https://morche.cloud`; `NEXT_PUBLIC_SITE_URL` sets it at build time for the sitemap, robots.txt, and canonical metadata. **Placeholder to replace:** `email` (`hello@morche.ir`).
- Pages (`app/…`, no locale segment, no proxy): home (`page.tsx`: Hero (`Tour` wraps it) → Works → Statement → Features → Security → Start → DocsTeaser → Faq → Cta), `product` (per-area text + its vignette, guide chips, more slab), `security` (`<Security heading={false}>` + levels + topics), `install` (requirements, method tabs with `CopyButton`, first admin, after-install, `.env` table and troubleshooting), `docs` + `docs/[slug]`. Every page = `SitePage` (header/main/footer) + `PageHero` (lit frame, h1, lead) and `generateMetadata` via `pageMeta(path, title, description)` (`src/lib/meta.ts`). `MoreLink` = text link with arrow. Sections in `src/components/site/`; fonts in `app/fonts.ts`; page links + `headerCopy` (the copy subset sent to the client header) in `nav.ts`: keep them out of the `"use client"` header, the server can't call client-file functions.
- Docs = the frontend's guides (`../frontend/src/app/help/content`), copied by `pnpm sync:docs` (`scripts/sync-docs.mjs`; rerun after the guides change) into `src/docs/content` + `src/docs/guides.ts` (both generated: don't edit, Biome skips them); `src/docs/prose.tsx` restyles the prose blocks. Search = static `/docs-index.json` (`search-index.ts`) fetched on first open, ranked by `search-engine.ts`, UI `docs/ui/search.tsx` (⌘K / `/`); `toc.tsx` scrollspy + `HashFlash`; links via `docHref(slug, section)`.
- **Tutorials (SEO content)** live in `content.db` (SQLite, repo root, committed): `categories` (topics), `tags`, `articles` (Markdown `body`, status planned|draft|published), `article_tags`. CLI `scripts/content.mjs` (`init`, `plan`, `brief`, `upsert file.md`, `list`, `export`, `check [--strict]`); `check` must report 0 problems (SEO title ≤65, description 90–165, ≥700 words, `## FAQ`, internal links resolve, no orphans). Drafts in `content/drafts/` (gitignored). Writer agent: `.claude/agents/seo-writer.md` (Sonnet; source of truth = `src/docs/content`). Site reads the DB at build time only via `src/content/db.ts` (`node:sqlite`, needs `@types/node` ≥24) and renders with `src/content/markdown.ts` (raw HTML escaped). Routes: `/tutorials` (hub), `/tutorials/[slug]`, `/tutorials/topic/[topic]` (pillars), `/tutorials/tag/[tag]` (noindex under `MIN_INDEXED`), `/tutorials/feed.xml`. Docs guides show "Tutorials for this feature" (`articlesForGuide`); home has `TutorialsTeaser`.
- **SEO plumbing:** `pageMeta(path, title, desc, {type, published, tags, noindex…})` for every page; JSON-LD builders in `src/lib/jsonld.tsx` (Organization/WebSite/SoftwareApplication/FAQ on home, TechArticle+BreadcrumbList on docs and tutorials); `app/sitemap.ts`, `robots.ts`, `manifest.ts`, `llms.txt/route.ts`; OG images via `src/lib/og.tsx` (root, `docs/[slug]`, `tutorials/[slug]`, all prerendered; palette copied from tokens since PNGs can't read CSS); security headers + `poweredByHeader: false` in `next.config.ts`.
- `tour.tsx` = the hero's panel window: tabs (servers, databases, storage, dns, automation, team) auto-advance every 7 s via a CSS `walk` progress line with an ant at its tip (`onAnimationEnd` → next); held on hover/focus, off-screen, hidden tab, pause button, and fully off under reduced motion. `vignettes.tsx` = the fake panel slices it shows (`@container` layouts). They use `.ui-font` (Inter, like the panel); keep them faithful to the real panel.
- `statement.tsx` lights words in reading order as you scroll (one `--p` variable, CSS does the rest); backticks in the copy = mono tool names. `works.tsx` = logos from `simple-icons` (lucide fallback where none exists).

## Design

- Redesigned after the user rejected the first (ant-nest) version; inspired by nuxt.com / nestjs.com (user request). Near-black page with two lit, rounded frames as bookends: `.frame-lit` (hero: indigo/violet from above, honey from below, `--grain` noise) and `.frame-ember` (CTA). The panel window rises out of the hero frame and is cut by its edge; Features = plain icon grid (no cards); Security = one joined slab of cells (`gap-px` on `bg-line`); Start = numbered steps + terminal; CTA = big title + ants walking the frame's floor.
- Tokens in `globals.css`: `void`, `surface`, `raised`, `line`, `dust`, `lumen`, `glow`, `indigo`, `honey` (ants / live signals only), `leaf`, `ember`; never hard-code colors. Primary buttons are white (`bg-lumen text-void`). Type: `.t-mega` (hero/CTA), `.t-title`, `.t-statement`, `.t-heading`, `.t-lead`. Fonts: Onest, Inter for panel slices (`.ui-font`), JetBrains Mono for code.
- Rules: no uppercase eyebrows, no "→" on buttons, numbered markers only for real sequences (Start steps), the hero load (`.rise`) and the tour are the only autonomous motion; everything respects `prefers-reduced-motion` (still ants via `motion-reduce:`). Phones: 16–20px gutters, no horizontal scroll (the tour's tab row scrolls inside itself).
- Visual checks: drive your own headless Chrome over CDP (never the user's Chrome window). Set `scrollBehavior = "auto"` before scrolling (the page uses smooth scroll).
- Keep `SitePage` under one in-flow root so Next.js route scrolling cannot target the footer separately. Keep `data-scroll-behavior="smooth"` on `<html>` so route changes can reset scroll immediately while same-page anchors scroll smoothly.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
