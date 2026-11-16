import { notFound } from "next/navigation"

import { Cta } from "@/components/site/cta"
import { Faq } from "@/components/site/faq"
import { Features } from "@/components/site/features"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Security } from "@/components/site/security"
import { Start } from "@/components/site/start"
import { Statement } from "@/components/site/statement"
import { Works } from "@/components/site/works"
import { hasLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDictionary(lang)

  return (
    <>
      <Header lang={lang} t={t} />
      <main>
        <Hero t={t} />
        <Works t={t} />
        <Statement text={t.statement} />
        <Features t={t} />
        <Security t={t} />
        <Start lang={lang} t={t} />
        <Faq t={t} />
        <Cta t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  )
}
