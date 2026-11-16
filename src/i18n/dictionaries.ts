import "server-only"

import type { Locale } from "./config"
import { en } from "./en"
import { fa } from "./fa"

const dictionaries = { en, fa }

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}

export type { Dictionary } from "./en"
