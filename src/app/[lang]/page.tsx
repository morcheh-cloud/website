import { notFound } from "next/navigation"

import { Cta } from "@/components/site/cta"
import { DocsTeaser } from "@/components/site/docs-teaser"
import { Faq } from "@/components/site/faq"
import { Features } from "@/components/site/features"
import { Hero } from "@/components/site/hero"
import { Security } from "@/components/site/security"
import { SitePage } from "@/components/site/site-page"
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
    <SitePage lang={lang} t={t}>
      <Hero t={t} />
      <Works t={t} />
      <Statement text={t.statement} />
      <Features lang={lang} t={t} />
      <Security
        t={t}
        more={{ href: `/${lang}/security`, label: t.home.securityMore }}
      />
      <Start lang={lang} t={t} />
      <DocsTeaser lang={lang} t={t} />
      <Faq t={t} />
      <Cta t={t} />
    </SitePage>
  )
}
