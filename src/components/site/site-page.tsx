import type { ReactNode } from "react"

import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/en"

import { Footer } from "./footer"
import { Header } from "./header"
import { headerCopy } from "./nav"

// Every page: the floating header, the page, the footer.
export function SitePage({
  lang,
  t,
  children,
}: {
  lang: Locale
  t: Dictionary
  children: ReactNode
}) {
  return (
    <>
      <Header lang={lang} t={headerCopy(t)} />
      <main>{children}</main>
      <Footer lang={lang} t={t} />
    </>
  )
}
