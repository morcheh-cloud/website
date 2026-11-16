import { notFound } from "next/navigation"

import { DocsSearchProvider } from "@/docs/ui/search"
import { hasLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

export default async function DocsLayout({
  params,
  children,
}: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { docs } = getDictionary(lang)
  // Guides are English, so their search speaks English on both languages.
  const en = getDictionary("en").docs
  return (
    <DocsSearchProvider
      copy={{
        search: docs.search,
        searchShort: docs.searchShort,
        placeholder: en.placeholder,
        empty: en.empty,
        loading: en.loading,
        failed: en.failed,
        hint: en.hint,
      }}
    >
      {children}
    </DocsSearchProvider>
  )
}
