import "../globals.css"

import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import { fontVariables } from "@/app/fonts"
import { Providers } from "@/components/site/providers"
import { dirOf, hasLocale, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { site } from "@/site"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: "#06070d",
  colorScheme: "dark",
  viewportFit: "cover",
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = getDictionary(lang)
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fa: "/fa", en: "/en", "x-default": "/fa" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      siteName: site.name,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
      url: `/${lang}`,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dir = dirOf(lang)

  return (
    <html lang={lang} dir={dir} className={fontVariables}>
      <body className="min-h-dvh">
        <Providers dir={dir}>{children}</Providers>
      </body>
    </html>
  )
}
