import "./globals.css"

import type { Metadata, Viewport } from "next"

import { fontVariables } from "@/app/fonts"
import { copy } from "@/copy"
import { site } from "@/site"

export const viewport: Viewport = {
  themeColor: "#06070d",
  colorScheme: "dark",
  viewportFit: "cover",
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    url: "/",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
