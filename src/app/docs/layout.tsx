import { copy } from "@/copy"
import { DocsSearchProvider } from "@/docs/ui/search"

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const { docs } = copy
  return (
    <DocsSearchProvider
      copy={{
        search: docs.search,
        searchShort: docs.searchShort,
        placeholder: docs.placeholder,
        empty: docs.empty,
        loading: docs.loading,
        failed: docs.failed,
        hint: docs.hint,
      }}
    >
      {children}
    </DocsSearchProvider>
  )
}
