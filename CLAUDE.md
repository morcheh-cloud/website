@AGENTS.md

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

## Structure

- Routes live directly in `src/app/` (`/`, `/product`, `/security`, `/docs`, `/docs/[slug]`, `/install`); no locale segment, no proxy. 404 = `app/not-found.tsx` → `components/site/lost.tsx`.
- Copy lives only in `src/copy.ts` (`copy`, type `Dictionary`); pages pass it down as `t`.
- Morche is **open source** (github.com/morcheh-cloud: `morche` = compose + install.sh, `backend`, `frontend`; images on ghcr): CTAs are "Install" (→ /install) + GitHub, never "Request a demo". Repo URLs in `site.github`, icon `GithubMark`.
- `src/site.ts` = untranslated facts. **Placeholders to replace before launch:** `email` (`hello@morche.ir`), `NEXT_PUBLIC_SITE_URL`.
- Pages (`app/…`, no locale segment, no proxy): home (`page.tsx`: Hero (`Tour` wraps it) → Works → Statement → Features → Security → Start → DocsTeaser → Faq → Cta), `product` (per-area text + its vignette, guide chips, more slab), `security` (`<Security heading={false}>` + levels + topics), `install` (needs, steps with `CopyButton`, after-install, `.env` table; mirrors `../deploy/install.sh` + compose), `docs` + `docs/[slug]`. Every page = `SitePage` (header/main/footer) + `PageHero` (lit frame, h1, lead) and `generateMetadata` via `pageMeta(path, title, description)` (`src/lib/meta.ts`). `MoreLink` = text link with arrow. Sections in `src/components/site/`; fonts in `app/fonts.ts`; page links + `headerCopy` (the copy subset sent to the client header) in `nav.ts`: keep them out of the `"use client"` header, the server can't call client-file functions.
- Docs = the frontend's guides (`../frontend/src/app/help/content`), copied by `pnpm sync:docs` (`scripts/sync-docs.mjs`; rerun after the guides change) into `src/docs/content` + `src/docs/guides.ts` (both generated: don't edit, Biome skips them); `src/docs/prose.tsx` restyles the prose blocks. Search = static `/docs-index.json` (`search-index.ts`) fetched on first open, ranked by `search-engine.ts`, UI `docs/ui/search.tsx` (⌘K / `/`); `toc.tsx` scrollspy + `HashFlash`; links via `docHref(slug, section)`.
- `tour.tsx` = the hero's panel window: tabs (servers, databases, storage, dns, automation, team) auto-advance every 7 s via a CSS `walk` progress line with an ant at its tip (`onAnimationEnd` → next); held on hover/focus, off-screen, hidden tab, pause button, and fully off under reduced motion. `vignettes.tsx` = the fake panel slices it shows (`@container` layouts). They use `.ui-font` (Inter, like the panel); keep them faithful to the real panel.
- `statement.tsx` lights words in reading order as you scroll (one `--p` variable, CSS does the rest); backticks in the copy = mono tool names. `works.tsx` = logos from `simple-icons` (lucide fallback where none exists).

## Design

- Redesigned after the user rejected the first (ant-nest) version; inspired by nuxt.com / nestjs.com (user request). Near-black page with two lit, rounded frames as bookends: `.frame-lit` (hero: indigo/violet from above, honey from below, `--grain` noise) and `.frame-ember` (CTA). The panel window rises out of the hero frame and is cut by its edge; Features = plain icon grid (no cards); Security = one joined slab of cells (`gap-px` on `bg-line`); Start = numbered steps + terminal; CTA = big title + ants walking the frame's floor.
- Tokens in `globals.css`: `void`, `surface`, `raised`, `line`, `dust`, `lumen`, `glow`, `indigo`, `honey` (ants / live signals only), `leaf`, `ember`; never hard-code colors. Primary buttons are white (`bg-lumen text-void`). Type: `.t-mega` (hero/CTA), `.t-title`, `.t-statement`, `.t-heading`, `.t-lead`. Fonts: Onest, Inter for panel slices (`.ui-font`), JetBrains Mono for code.
- Rules: no uppercase eyebrows, no "→" on buttons, numbered markers only for real sequences (Start steps), the hero load (`.rise`) and the tour are the only autonomous motion; everything respects `prefers-reduced-motion` (still ants via `motion-reduce:`). Phones: 16–20px gutters, no horizontal scroll (the tour's tab row scrolls inside itself).
- Visual checks: drive your own headless Chrome over CDP (never the user's Chrome window). Set `scrollBehavior = "auto"` before scrolling (the page uses smooth scroll).
