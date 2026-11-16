import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { copy } from "@/copy"

// A wrong turn.
export function Lost() {
  return (
    <main className="min-h-dvh p-2 sm:p-4">
      <div className="frame-lit grid min-h-[calc(100dvh-1rem)] place-items-center rounded-[1.75rem] px-5 py-24 sm:min-h-[calc(100dvh-2rem)] sm:rounded-[2.75rem]">
        <div className="max-w-xl text-center">
          <Logo name="Morche" className="justify-center" />
          <h1 className="t-title mt-10">{copy.notFound.title}</h1>
          <p className="mt-4 text-lumen/70">{copy.notFound.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full bg-lumen px-6 font-medium text-void transition-colors hover:bg-white"
            >
              {copy.notFound.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
