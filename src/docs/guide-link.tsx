"use client"

import Link from "next/link"
import type { ReactNode } from "react"

import { docHref } from "./href"

export function GuideLink({
  guide,
  section,
  className,
  children,
}: {
  guide: string
  section?: string
  className?: string
  children: ReactNode
}) {
  return (
    <Link href={docHref(guide, section)} className={className}>
      {children}
    </Link>
  )
}
