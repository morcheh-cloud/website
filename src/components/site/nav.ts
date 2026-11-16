import type { Dictionary } from "@/copy"

// The site's pages, shared by the header and the footer.
export function navLinks(t: Pick<Dictionary, "pages">) {
  return [
    { href: "/product", label: t.pages.product },
    { href: "/security", label: t.pages.security },
    { href: "/docs", label: t.pages.docs },
    { href: "/install", label: t.pages.install },
    { href: "/#faq", label: t.pages.faq },
  ]
}

// The part of the copy the (client) header needs, so the whole dictionary
// isn't sent to the browser.
export type HeaderCopy = Pick<Dictionary, "nav" | "pages" | "brand">

export function headerCopy(t: Dictionary): HeaderCopy {
  return { nav: t.nav, pages: t.pages, brand: t.brand }
}
