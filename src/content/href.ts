// Links into the tutorials.
export const tutorialsHref = (slug?: string) =>
  slug ? `/tutorials/${slug}` : "/tutorials"
export const topicHref = (slug: string) => `/tutorials/topic/${slug}`
export const tagHref = (slug: string) => `/tutorials/tag/${slug}`

// Below this many tutorials a tag page is thin: crawled, not indexed.
export const MIN_INDEXED = 3
