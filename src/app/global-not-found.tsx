import "./globals.css"

import type { Metadata } from "next"

import { Lost } from "@/components/site/lost"

import { fontVariables } from "./fonts"

export const metadata: Metadata = {
  title: "Morcheh: page not found",
}

// URLs that match no route skip the [lang] layout and land here.
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="min-h-dvh">
        <Lost />
      </body>
    </html>
  )
}
