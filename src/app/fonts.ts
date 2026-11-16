import { Inter, JetBrains_Mono, Onest, Vazirmatn } from "next/font/google"

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
})

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

export const fontVariables = `${vazir.variable} ${onest.variable} ${inter.variable} ${jetbrains.variable}`
