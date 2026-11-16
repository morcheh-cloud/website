import { allArticles, articleFor, topicFor } from "@/content/db"
import { copy } from "@/copy"
import { ogImage, ogSize, ogType } from "@/lib/og"

export const alt = copy.tutorials.title
export const size = ogSize
export const contentType = ogType

export function generateStaticParams() {
  return allArticles().map((a) => ({ slug: a.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const a = articleFor(slug)
  return ogImage({
    kicker: topicFor(a?.category ?? "")?.name ?? copy.pages.tutorials,
    title: a?.title ?? copy.tutorials.title,
    note: a
      ? `${a.minutes} ${copy.tutorials.minutes} · Step by step`
      : undefined,
  })
}
