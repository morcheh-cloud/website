@AGENTS.md

# Morcheh — Website

Marketing site that introduces Morcheh (the product lives in `../frontend` + `../backend`). One long page per language, no backend.

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

- i18n: fa (default, RTL) + en. `src/proxy.ts` redirects locale-less paths: cookie `MORCHEH_LOCALE` › Accept-Language › fa. Root layout is `app/[lang]/layout.tsx` (`dynamicParams = false`), so unmatched URLs need `experimental.globalNotFound` + `app/global-not-found.tsx`; both 404s render `components/site/lost.tsx`.
- Copy lives only in `src/i18n/en.ts` (defines the `Dictionary` type) and `fa.ts`; components take `t`. Add a string to both.
- `src/site.ts` = untranslated facts. **Placeholders to replace before launch:** `email` (`hello@morcheh.ir`), `NEXT_PUBLIC_SITE_URL`.
- Page = `app/[lang]/page.tsx`: Header → Hero (`Tour` wraps it) → Works → Statement → Features → Security → Start → Faq → Cta → Footer. Sections in `src/components/site/`; fonts in `app/fonts.ts`; section links in `nav.ts` (`navLinks`, shared by header + footer; keep it out of the `"use client"` header so the server footer can call it).
- `tour.tsx` = the hero's panel window: tabs (servers, databases, storage, dns, automation, team) auto-advance every 7 s via a CSS `walk` progress line with an ant at its tip (`onAnimationEnd` → next); held on hover/focus, off-screen, hidden tab, pause button, and fully off under reduced motion. `vignettes.tsx` = the fake panel slices it shows (`@container` layouts). They stay **English + LTR in both languages** (`dir="ltr" lang="en" aria-hidden` + `.ui-font`); keep them faithful to the real panel.
- `statement.tsx` lights words in reading order as you scroll (one `--p` variable, CSS does the rest); backticks in the copy = mono tool names. `works.tsx` = logos from `simple-icons` (lucide fallback where none exists).

## Design

- Redesigned after the user rejected the first (ant-nest) version; inspired by nuxt.com / nestjs.com (user request). Near-black page with two lit, rounded frames as bookends: `.frame-lit` (hero: indigo/violet from above, honey from below, `--grain` noise) and `.frame-ember` (CTA). The panel window rises out of the hero frame and is cut by its edge; Features = plain icon grid (no cards); Security = one joined slab of cells (`gap-px` on `bg-line`); Start = numbered steps + terminal; CTA = big title + ants walking the frame's floor.
- Tokens in `globals.css`: `void`, `surface`, `raised`, `line`, `dust`, `lumen`, `glow`, `indigo`, `honey` (ants / live signals only), `leaf`, `ember`; never hard-code colors. Primary buttons are white (`bg-lumen text-void`). Type: `.t-mega` (hero/CTA), `.t-title`, `.t-statement`, `.t-heading`, `.t-lead`. Fonts: Vazirmatn (fa), Onest (en), Inter for panel slices (`.ui-font`), JetBrains Mono for code.
- Rules: no uppercase eyebrows, no "→" on buttons, numbered markers only for real sequences (Start steps), the hero load (`.rise`) and the tour are the only autonomous motion; everything respects `prefers-reduced-motion` (still ants via `motion-reduce:`). Logical classes (`ms-/ps-/start-`) so fa/en mirror. Phones: 16–20px gutters, no horizontal scroll (the tour's tab row scrolls inside itself).
- Visual checks: drive your own headless Chrome over CDP (never the user's Chrome window). With `captureBeyondViewport` + clip the RTL page renders shifted: scroll and capture the viewport instead. Set `scrollBehavior = "auto"` before scrolling (the page uses smooth scroll).
