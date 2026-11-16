import "server-only"

import { Marked, type Token, type Tokens } from "marked"

export type Heading = { id: string; title: string; depth: number }
export type Faq = { q: string; a: string }

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

const plain = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim()

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

// Markdown → HTML for a tutorial, with heading ids (for the table of
// contents and deep links), callouts, wrapped tables and safe outbound links.
export function renderArticle(md: string) {
  const headings: Heading[] = []
  const used = new Map<string, number>()
  const marked = new Marked({ gfm: true })

  marked.use({
    renderer: {
      heading({ tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens)
        let id = slugify(text) || "section"
        const n = used.get(id) ?? 0
        used.set(id, n + 1)
        if (n) id = `${id}-${n}`
        if (depth <= 3) headings.push({ id, title: plain(text), depth })
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>`
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens)
        const t = title ? ` title="${esc(title)}"` : ""
        // Only web, site-relative, anchor and mail links; anything else is dropped.
        const safe = /^(https?:\/\/|\/|#|mailto:)/i.test(href) ? esc(href) : "#"
        if (/^https?:\/\//i.test(href))
          return `<a href="${safe}"${t} rel="noopener" target="_blank">${inner}</a>`
        return `<a href="${safe}"${t}>${inner}</a>`
      },
      blockquote({ tokens }: Tokens.Blockquote) {
        const inner = this.parser.parse(tokens)
        const kind = inner.match(
          /^<p><strong>(Tip|Note|Warning|Important):?<\/strong>/,
        )?.[1]
        const cls = kind
          ? kind === "Warning" || kind === "Important"
            ? "callout callout-warn"
            : "callout callout-tip"
          : ""
        return `<blockquote${cls ? ` class="${cls}"` : ""}>${inner}</blockquote>`
      },
      table(token: Tokens.Table) {
        const head = token.header
          .map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`)
          .join("")
        const rows = token.rows
          .map(
            (r) =>
              `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`,
          )
          .join("")
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`
      },
      // Raw HTML in an article is shown as text, never injected.
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return esc(text)
      },
      code({ text, lang }: Tokens.Code) {
        const l = (lang ?? "").split(/\s/)[0]
        return `<pre${l ? ` data-lang="${esc(l)}"` : ""}><code>${esc(text)}</code></pre>`
      },
    },
  })

  const html = marked.parse(md, { async: false }) as string
  return { html, headings, faq: faqOf(md) }
}

// The "## FAQ" section's "### Question" + answer pairs, for FAQPage data.
export function faqOf(md: string): Faq[] {
  const tokens = new Marked().lexer(md)
  const out: Faq[] = []
  let inFaq = false
  let current: Faq | undefined
  for (const t of tokens as Token[]) {
    if (t.type === "heading") {
      const h = t as Tokens.Heading
      if (h.depth <= 2) {
        inFaq = /^faq|frequently asked/i.test(h.text.trim())
        current = undefined
        continue
      }
      if (inFaq && h.depth === 3) {
        current = { q: plain(h.text), a: "" }
        out.push(current)
        continue
      }
    }
    if (inFaq && current && t.type !== "space")
      current.a = `${current.a} ${plain(t.raw)}`.trim()
  }
  return out.filter((f) => f.a)
}

// A short plain-text excerpt (first paragraph) for cards and feeds.
export function excerpt(md: string, max = 200) {
  const first =
    md.split(/\n{2,}/).find((p) => p.trim() && !/^[#>|`-]/.test(p.trim())) ?? ""
  const text = plain(first).replace(/\s+/g, " ")
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

// A short Markdown paragraph (a topic's intro) → inline HTML, raw HTML escaped.
export function renderIntro(md: string) {
  return new Marked({ gfm: true })
    .use({ renderer: { html: ({ text }) => esc(text) } })
    .parse(md, { async: false }) as string
}
