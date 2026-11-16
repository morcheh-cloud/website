// Links into the docs. Guides are English in both languages; the page
// around them follows the visitor's language.
export function docHref(lang: string, slug?: string, section?: string) {
  const base = slug ? `/${lang}/docs/${slug}` : `/${lang}/docs`
  return section ? `${base}#${section}` : base
}
