import { copy } from "@/copy"
import { site } from "@/site"

// schema.org structured data. Each page renders the graph that describes it;
// ids tie the pieces together (the organization publishes the website, the
// website contains the article…).

type Thing = Record<string, unknown>

export const abs = (path: string) =>
  new URL(path, site.url).toString().replace(/\/$/, "") || site.url

const ORG = `${site.url}/#organization`
const WEBSITE = `${site.url}/#website`
const APP = `${site.url}/#software`

export function JsonLd({ data }: { data: Thing | Thing[] }) {
  const graph = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD, `<` escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function organization(): Thing {
  return {
    "@type": "Organization",
    "@id": ORG,
    name: site.name,
    url: site.url,
    logo: abs("/icon.svg"),
    email: site.email,
    sameAs: [site.github.org],
  }
}

export function website(): Thing {
  return {
    "@type": "WebSite",
    "@id": WEBSITE,
    url: site.url,
    name: site.name,
    description: copy.meta.description,
    inLanguage: "en",
    publisher: { "@id": ORG },
  }
}

export function software(): Thing {
  return {
    "@type": "SoftwareApplication",
    "@id": APP,
    name: site.name,
    description: copy.meta.description,
    url: site.url,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Server management",
    operatingSystem: "Linux",
    license: `${site.github.morche}`,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: abs("/install"),
    softwareHelp: abs("/docs"),
    codeRepository: site.github.org,
    publisher: { "@id": ORG },
  }
}

export function breadcrumbs(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

export function techArticle(a: {
  path: string
  title: string
  description: string
  published?: string
  modified?: string
  section?: string
  keywords?: string[]
  words?: number
}): Thing {
  const url = abs(a.path)
  return {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: a.title,
    description: a.description,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    datePublished: a.published,
    dateModified: a.modified ?? a.published,
    articleSection: a.section,
    keywords: a.keywords?.join(", "),
    wordCount: a.words,
    author: { "@id": ORG },
    publisher: { "@id": ORG },
    isPartOf: { "@id": WEBSITE },
    about: { "@id": APP },
  }
}

export function faqPage(items: { q: string; a: string }[]): Thing {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

export function collection(a: {
  path: string
  name: string
  description: string
  items: { name: string; path: string }[]
}): Thing {
  const url = abs(a.path)
  return {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: a.name,
    description: a.description,
    isPartOf: { "@id": WEBSITE },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: a.items.length,
      itemListElement: a.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: abs(it.path),
      })),
    },
  }
}
