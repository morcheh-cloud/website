import { copy } from "@/copy"
import { guideFor, guides } from "@/docs/guides"
import { ogImage, ogSize, ogType } from "@/lib/og"

export const alt = copy.meta.title
export const size = ogSize
export const contentType = ogType

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const g = guideFor(slug)
  return ogImage({
    kicker: "Docs",
    title: g?.title ?? copy.meta.title,
    note: g?.group,
  })
}
