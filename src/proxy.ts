import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import {
  defaultLocale,
  hasLocale,
  LOCALE_COOKIE,
  type Locale,
  locales,
} from "@/i18n/config"

// The visitor's earlier pick wins, then the browser's language order.
function preferred(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  if (saved && hasLocale(saved)) return saved

  const header = request.headers.get("accept-language") ?? ""
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split("-")[0]
    if (hasLocale(base)) return base
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localized = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (localized) return

  request.nextUrl.pathname = `/${preferred(request)}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip Next's internals and any file with an extension (icons, images).
  matcher: ["/((?!_next|.*\\..*).*)"],
}
