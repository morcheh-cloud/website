import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { en } from "@/i18n/en"
import { fa } from "@/i18n/fa"

// A wrong turn: offered in both languages, since we may not know which.
export function Lost() {
  return (
    <main className="min-h-dvh p-2 sm:p-4">
      <div className="frame-lit grid min-h-[calc(100dvh-1rem)] place-items-center rounded-[1.75rem] px-5 py-24 sm:min-h-[calc(100dvh-2rem)] sm:rounded-[2.75rem]">
        <div className="max-w-xl text-center">
          <Logo name="Morche" className="justify-center" />
          <h1 className="t-title mt-10">{en.notFound.title}</h1>
          <p className="mt-4 text-lumen/70">{en.notFound.body}</p>
          <p lang="fa" dir="rtl" className="mt-8 text-lumen/70">
            {fa.notFound.title} {fa.notFound.body}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/en"
              className="inline-flex h-12 items-center rounded-full bg-lumen px-6 font-medium text-void transition-colors hover:bg-white"
            >
              {en.notFound.back}
            </Link>
            <Link
              href="/fa"
              lang="fa"
              dir="rtl"
              className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 font-medium text-lumen transition-colors hover:border-white/40"
            >
              {fa.notFound.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
