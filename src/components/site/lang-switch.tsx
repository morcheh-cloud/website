"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LOCALE_COOKIE, type Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

// Links to the same page in the other language and remembers the pick, so
// a later visit to "/" lands there too.
export function LangSwitch({
  to,
  text,
  label,
  className,
}: {
  to: Locale
  text: string
  label: string
  className?: string
}) {
  const pathname = usePathname() ?? "/"
  const href = pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${to}`)
  return (
    <Link
      href={href.startsWith(`/${to}`) ? href : `/${to}`}
      hrefLang={to}
      lang={to}
      aria-label={label}
      onClick={() => {
        // biome-ignore lint/suspicious/noDocumentCookie: a one-line preference cookie
        document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`
      }}
      className={cn(
        "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 font-medium text-dust text-sm transition-colors hover:border-dust hover:text-lumen",
        className,
      )}
    >
      {text}
    </Link>
  )
}
