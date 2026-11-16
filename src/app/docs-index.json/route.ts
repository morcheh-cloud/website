import { docsIndex } from "@/docs/search-index"

// The docs search loads this once, on first open, instead of every docs page
// carrying the whole text.
export const dynamic = "force-static"

export function GET() {
  return Response.json(docsIndex)
}
