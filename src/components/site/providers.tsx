"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import type { ReactNode } from "react"

export function Providers({
  dir,
  children,
}: {
  dir: "rtl" | "ltr"
  children: ReactNode
}) {
  return <DirectionProvider direction={dir}>{children}</DirectionProvider>
}
