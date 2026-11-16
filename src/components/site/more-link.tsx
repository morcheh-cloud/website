import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

// A section's way to its own page: quiet text, the arrow drawn as an icon
// that turns with the reading direction.
export function MoreLink({
  href,
  children,
  className,
}: {
  href: string
  children: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-medium text-glow transition-colors hover:text-lumen focus-visible:outline-2 focus-visible:outline-glow focus-visible:outline-offset-4",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
      />
    </Link>
  )
}
