// Links into the docs.
export function docHref(slug?: string, section?: string) {
  const base = slug ? `/docs/${slug}` : "/docs"
  return section ? `${base}#${section}` : base
}
