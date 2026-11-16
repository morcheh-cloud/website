"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { site } from "@/site"

import { GithubMark } from "./github-mark"
import { Logo } from "./logo"
import { type HeaderCopy, navLinks } from "./nav"

// A floating pill. It sits inside the top frame and keeps its place as the
// page scrolls, gaining a backdrop once it leaves the frame's light.
export function Header({ t }: { t: HeaderCopy }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() ?? ""

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const links = navLinks(t)
  const isCurrent = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-7">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-full border ps-5 pe-2 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-white/10 bg-void/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-white/[0.08] bg-white/[0.04] backdrop-blur-md",
        )}
      >
        <Link href={"/"} aria-label={t.nav.home} className="rounded-lg">
          <Logo name={t.brand} />
        </Link>

        <nav aria-label={t.nav.label} className="mx-auto hidden lg:block">
          <ul className="flex items-center">
            {links.map((link) => {
              const current = isCurrent(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors hover:text-lumen",
                      current ? "bg-white/[0.08] text-lumen" : "text-lumen/70",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
          <a
            href={site.github.org}
            aria-label={t.nav.github}
            title={t.nav.github}
            className="inline-flex size-10 items-center justify-center rounded-full text-lumen/70 transition-colors hover:bg-white/10 hover:text-lumen"
          >
            <GithubMark />
          </a>
          <Link
            href="/install"
            className="hidden h-10 items-center rounded-full bg-lumen px-5 font-medium text-[0.9375rem] text-void transition-colors hover:bg-white sm:inline-flex"
          >
            {t.nav.install}
          </Link>

          <Sheet>
            <SheetTrigger
              aria-label={t.nav.menu}
              className="inline-flex size-10 items-center justify-center rounded-full text-lumen hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              closeLabel={t.nav.close}
              className="w-[min(88vw,22rem)] border-line bg-surface p-0"
            >
              <SheetTitle className="sr-only">{t.nav.label}</SheetTitle>
              <nav className="flex flex-col gap-1 px-4 pt-20 pb-8">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={link.href}
                        aria-current={isCurrent(link.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-4 text-lg text-lumen hover:bg-raised",
                          isCurrent(link.href) && "bg-raised",
                        )}
                      >
                        {link.label}
                      </Link>
                    }
                  />
                ))}
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href="/install"
                      className="mt-6 flex h-12 items-center justify-center rounded-full bg-lumen font-medium text-void"
                    >
                      {t.nav.install}
                    </Link>
                  }
                />
                <a
                  href={site.github.org}
                  className="mt-2 flex h-12 items-center justify-center gap-2.5 rounded-full border border-line font-medium text-lumen hover:bg-raised"
                >
                  <GithubMark className="size-[1.125rem]" />
                  {t.nav.github}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
