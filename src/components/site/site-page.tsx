import type { ReactNode } from "react"

import type { Dictionary } from "@/copy"

import { Footer } from "./footer"
import { Header } from "./header"
import { headerCopy } from "./nav"

// Every page: the floating header, the page, the footer.
export function SitePage({
  t,
  children,
}: {
  t: Dictionary
  children: ReactNode
}) {
  return (
    <>
      <Header t={headerCopy(t)} />
      <main>{children}</main>
      <Footer t={t} />
    </>
  )
}
