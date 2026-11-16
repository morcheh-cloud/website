import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/en"

// The site's pages, shared by the header and the footer.
export function navLinks(lang: Locale, t: Pick<Dictionary, "pages">) {
  return [
    { href: `/${lang}/product`, label: t.pages.product },
    { href: `/${lang}/security`, label: t.pages.security },
    { href: `/${lang}/docs`, label: t.pages.docs },
    { href: `/${lang}/install`, label: t.pages.install },
    { href: `/${lang}#faq`, label: t.pages.faq },
  ]
}

// The part of the copy the (client) header needs, so the whole dictionary
// isn't sent to the browser.
export type HeaderCopy = Pick<Dictionary, "nav" | "pages" | "brand"> & {
  subject: string
}

export function headerCopy(t: Dictionary): HeaderCopy {
  return { nav: t.nav, pages: t.pages, brand: t.brand, subject: t.cta.subject }
}
