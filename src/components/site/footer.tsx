import Link from "next/link"

import { docHref } from "@/docs/href"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/en"
import { demoHref, site } from "@/site"

import { LangSwitch } from "./lang-switch"
import { Logo } from "./logo"

function year(lang: Locale) {
  const locale = lang === "fa" ? "fa-IR-u-ca-persian" : "en-US"
  return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(new Date())
}

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const columns = [
    {
      title: t.footerCols.product,
      links: [
        { href: `/${lang}/product`, label: t.pages.product },
        { href: `/${lang}/security`, label: t.pages.security },
        { href: `/${lang}#faq`, label: t.pages.faq },
      ],
    },
    {
      title: t.footerCols.resources,
      links: [
        { href: docHref(lang), label: t.pages.docs },
        {
          href: docHref(lang, "getting-started"),
          label: t.footerCols.gettingStarted,
        },
        { href: `/${lang}/install`, label: t.pages.install },
      ],
    },
    {
      title: t.footerCols.contact,
      links: [
        { href: demoHref(t.cta.subject), label: t.nav.demo },
        { href: `mailto:${site.email}`, label: site.email, ltr: true },
      ],
    },
  ]

  return (
    <footer className="px-5 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 border-line border-t pt-14 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Logo name={t.brand} />
          <p className="mt-3 max-w-[34ch] text-dust text-sm">
            {t.footer.tagline}
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-medium text-lumen text-sm">{col.title}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-dust transition-colors hover:text-lumen"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      dir={"ltr" in link ? "ltr" : undefined}
                      className="text-dust transition-colors hover:text-lumen"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
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
