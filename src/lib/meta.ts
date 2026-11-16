import type { Metadata } from "next"

import type { Locale } from "@/i18n/config"
import { site } from "@/site"

// Metadata for an inner page: "Title | Morche", with links to the page in
// both languages.
export function pageMeta(
  lang: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const full = `${title} | ${site.name}`
  return {
    title: full,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        fa: `/fa${path}`,
        en: `/en${path}`,
        "x-default": `/fa${path}`,
      },
    },
    openGraph: {
      title: full,
      description,
      siteName: site.name,
      locale: lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
      url: `/${lang}${path}`,
    },
  }
}
