import { copy } from "@/copy"
import { ogImage, ogSize, ogType } from "@/lib/og"

export const alt = copy.meta.title
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return ogImage({ kicker: "", title: copy.meta.title })
}
