import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

// An inner page's opening: the home page's lit frame, shorter, with the
// title set at the start edge instead of centred.
export function PageHero({
  id = "page-title",
  title,
  lead,
  children,
  className,
}: {
  id?: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <div className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "frame-lit relative overflow-hidden rounded-[1.75rem] px-5 pt-32 pb-14 sm:rounded-[2.75rem] sm:px-8 sm:pt-44 sm:pb-20",
          className,
        )}
      >
        <div className="mx-auto max-w-7xl">
          <h1 id={id} className="t-title rise max-w-[18ch]">
            {title}
          </h1>
          {lead && (
            <p className="t-lead rise mt-6 max-w-[56ch] text-lumen/70 [animation-delay:120ms]">
              {lead}
            </p>
          )}
          {children && (
            <div className="rise [animation-delay:240ms]">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}
