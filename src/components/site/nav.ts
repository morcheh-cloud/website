import type { Dictionary } from "@/i18n/en"

// The page's sections, shared by the header and the footer.
export function navLinks(t: Dictionary) {
  return [
    { href: "#tour", label: t.nav.tour },
    { href: "#features", label: t.nav.features },
    { href: "#security", label: t.nav.security },
    { href: "#start", label: t.nav.start },
    { href: "#faq", label: t.nav.faq },
  ]
}
