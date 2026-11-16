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
import { copy } from "@/copy"

export default function Home() {
  const t = copy

  return (
    <SitePage t={t}>
      <Hero t={t} />
      <Works t={t} />
      <Statement text={t.statement} />
      <Features t={t} />
      <Security
        t={t}
        more={{ href: `/security`, label: t.home.securityMore }}
      />
      <Start t={t} />
      <DocsTeaser t={t} />
      <Faq t={t} />
      <Cta t={t} />
    </SitePage>
  )
}
