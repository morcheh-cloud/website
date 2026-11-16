import Link from "next/link"
import { topics } from "@/content/db"
import { topicHref, tutorialsHref } from "@/content/href"
import type { Dictionary } from "@/copy"
import { docHref } from "@/docs/href"
import { site } from "@/site"

import { GithubMark } from "./github-mark"

import { Logo } from "./logo"

function year() {
  return new Date().getFullYear()
}

export function Footer({ t }: { t: Dictionary }) {
  const columns = [
    {
      title: t.footerCols.product,
      links: [
        { href: `/product`, label: t.pages.product },
        { href: `/security`, label: t.pages.security },
        { href: `/#faq`, label: t.pages.faq },
      ],
    },
    {
      title: t.footerCols.resources,
      links: [
        { href: docHref(), label: t.pages.docs },
        {
          href: docHref("getting-started"),
          label: t.footerCols.gettingStarted,
        },
        { href: `/install`, label: t.pages.install },
      ],
    },
    {
      title: t.footerCols.tutorials,
      links: [
        ...topics()
          .filter((topic) => topic.count > 0)
          .slice(0, 7)
          .map((topic) => ({ href: topicHref(topic.slug), label: topic.name })),
        { href: tutorialsHref(), label: t.footerCols.allTutorials },
      ],
    },
    {
      title: t.footerCols.source,
      links: [
        { href: site.github.morche, label: t.footerCols.repos.morche },
        { href: site.github.backend, label: t.footerCols.repos.backend },
        { href: site.github.frontend, label: t.footerCols.repos.frontend },
        { href: site.github.issues, label: t.footerCols.issues },
      ],
    },
    {
      title: t.footerCols.contact,
      links: [{ href: `mailto:${site.email}`, label: site.email }],
    },
  ]

  return (
    <footer className="px-5 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 border-line border-t pt-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))]">
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
          © {year()} {t.brand}. {t.footer.built}
        </p>
        <a
          href={site.github.org}
          className="inline-flex items-center gap-2 transition-colors hover:text-lumen"
        >
          <GithubMark className="size-4" />
          github.com/morcheh-cloud
        </a>
      </div>
    </footer>
  )
}
