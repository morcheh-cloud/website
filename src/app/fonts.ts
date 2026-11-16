import { Inter, JetBrains_Mono, Onest } from "next/font/google"

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
})

// Only for the slices of the panel, which is set in Inter.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const fontVariables = `${onest.variable} ${inter.variable} ${jetbrains.variable}`
