import { siGithub } from "simple-icons"

import { cn } from "@/lib/utils"

export function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={cn("size-5 shrink-0", className)}
    >
      <path d={siGithub.path} />
    </svg>
  )
}
