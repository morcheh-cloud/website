import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/en"

import { LangSwitch } from "./lang-switch"
import { Logo } from "./logo"
import { navLinks } from "./nav"

function year(lang: Locale) {
  const locale = lang === "fa" ? "fa-IR-u-ca-persian" : "en-US"
  return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(new Date())
}

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer className="px-5 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo name={t.brand} />
          <p className="mt-3 max-w-[40ch] text-dust text-sm">
            {t.footer.tagline}
          </p>
        </div>
        <nav aria-label={t.nav.label}>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {navLinks(t).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-dust transition-colors hover:text-lumen"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-line border-t pt-6 text-dust text-xs">
        <p>
          © {year(lang)} {t.brand}. {t.footer.rights}
        </p>
        <LangSwitch
          to={lang === "fa" ? "en" : "fa"}
          text={t.nav.switchTo}
          label={t.nav.switchLabel}
        />
      </div>
    </footer>
  )
}
