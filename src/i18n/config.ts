export const locales = ["fa", "en"] as const
export type Locale = (typeof locales)[number]

// Most visitors are organisations in Iran, so Persian is the default.
export const defaultLocale: Locale = "fa"

// Remembers a visitor's pick from the language switch.
export const LOCALE_COOKIE = "MORCHEH_LOCALE"

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dirOf(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr"
}

// Numbers in running text follow the page's script.
export function numberOf(locale: Locale, value: number) {
  return value.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")
}
