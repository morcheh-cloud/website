"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import type { ReactNode } from "react"

import { docHref } from "./href"

// Guides don't know the page's language; the URL does.
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
  const { lang } = useParams<{ lang: string }>()
  return (
    <Link href={docHref(lang ?? "en", guide, section)} className={className}>
      {children}
    </Link>
  )
}
