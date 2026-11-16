"use client"

import { Dialog } from "@base-ui/react/dialog"
import { BookOpen, CornerDownLeft, Hash, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

import { docHref } from "../href"
import {
  escapeRegex,
  type Hit,
  type IndexedGuide,
  searchDocs,
  terms,
} from "../search-engine"

export type SearchCopy = {
  search: string
  searchShort: string
  placeholder: string
  empty: string
  loading: string
  failed: string
  hint: string
}

const SearchContext = createContext<{ open: () => void; copy: SearchCopy }>({
  open: () => {},
  copy: {} as SearchCopy,
})

// One index for the whole visit, fetched the first time search opens.
let loaded: Promise<IndexedGuide[]> | undefined
function loadIndex() {
  loaded ??= fetch("/docs-index.json").then((r) => {
    if (!r.ok) throw new Error(`${r.status}`)
    return r.json() as Promise<IndexedGuide[]>
  })
  loaded.catch(() => {
    loaded = undefined
  })
  return loaded
}

// Search over every guide: ⌘K / Ctrl+K or "/" anywhere in the docs.
export function DocsSearchProvider({
  copy,
  children,
}: {
  copy: SearchCopy
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === "/" && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <SearchContext.Provider value={{ open: () => setOpen(true), copy }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed inset-x-0 top-0 z-[60] flex h-dvh flex-col bg-surface outline-none transition duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:inset-x-4 sm:top-[12vh] sm:mx-auto sm:h-auto sm:max-h-[72vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-line sm:shadow-2xl sm:data-starting-style:scale-[0.98]">
            <Dialog.Title className="sr-only">{copy.search}</Dialog.Title>
            <SearchPanel copy={copy} onDone={() => setOpen(false)} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </SearchContext.Provider>
  )
}

function SearchPanel({
  copy,
  onDone,
}: {
  copy: SearchCopy
  onDone: () => void
}) {
  const router = useRouter()
  const [index, setIndex] = useState<IndexedGuide[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadIndex().then(setIndex, () => setFailed(true))
  }, [])

  const hits = index ? searchDocs(index, query) : []
  const words = terms(query)

  function go(hit: Hit) {
    onDone()
    const href = docHref(hit.slug, hit.kind === "section" ? hit.id : undefined)
    router.push(href)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!hits.length) return
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const next =
        (active + (e.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length
      setActive(next)
      list.current
        ?.querySelector(`[data-index="${next}"]`)
        ?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "Enter") {
      e.preventDefault()
      const hit = hits[active]
      if (hit) go(hit)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-line border-b px-4 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5 sm:pt-0">
        <Search aria-hidden="true" className="size-5 shrink-0 text-dust" />
        <input
          // biome-ignore lint/a11y/noAutofocus: the dialog exists to type into
          autoFocus
          type="search"
          enterKeyHint="go"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          placeholder={copy.placeholder}
          aria-label={copy.search}
          aria-controls="docs-search-results"
          aria-activedescendant={
            hits[active] ? `docs-hit-${active}` : undefined
          }
          className="h-16 min-w-0 flex-1 bg-transparent text-lg text-lumen outline-none placeholder:text-dust/70 [&::-webkit-search-cancel-button]:hidden"
        />
        <Dialog.Close
          className="grid size-10 shrink-0 place-items-center rounded-full text-dust hover:bg-raised hover:text-lumen"
          aria-label="Close"
        >
          <X className="size-5 sm:hidden" />
          <kbd className="hidden rounded-md border border-line px-1.5 font-mono text-[0.7rem] sm:block">
            Esc
          </kbd>
        </Dialog.Close>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {failed ? (
          <Note>{copy.failed}</Note>
        ) : !index ? (
          <Note>{copy.loading}</Note>
        ) : !words.length ? (
          <Note>{copy.hint}</Note>
        ) : !hits.length ? (
          <Note>{copy.empty}</Note>
        ) : (
          <div
            ref={list}
            id="docs-search-results"
            role="listbox"
            aria-label={copy.search}
            className="flex flex-col gap-0.5 p-2"
          >
            {hits.map((hit, i) => (
              <div
                key={hit.key}
                id={`docs-hit-${i}`}
                data-index={i}
                role="option"
                aria-selected={i === active}
                tabIndex={-1}
                onMouseMove={() => setActive(i)}
                onClick={() => go(hit)}
                onKeyDown={() => {}}
                className={cn(
                  "flex cursor-pointer gap-3.5 rounded-2xl px-3.5 py-3",
                  i === active && "bg-raised",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-line",
                    i === active ? "text-glow" : "text-dust",
                  )}
                >
                  {hit.kind === "guide" ? (
                    <BookOpen aria-hidden="true" className="size-4" />
                  ) : (
                    <Hash aria-hidden="true" className="size-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  {hit.kind === "section" && (
                    <span className="block truncate text-dust text-xs">
                      {hit.guide}
                    </span>
                  )}
                  <span className="block truncate font-medium text-[0.9688rem] text-lumen">
                    <Marked text={hit.title} words={words} />
                  </span>
                  <span className="mt-0.5 line-clamp-2 text-dust text-sm leading-relaxed">
                    <Marked
                      text={hit.kind === "guide" ? hit.summary : hit.snippet}
                      words={words}
                    />
                  </span>
                </span>
                {i === active && (
                  <CornerDownLeft
                    aria-hidden="true"
                    className="mt-2 hidden size-4 shrink-0 text-dust sm:block"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Note({ children }: { children: ReactNode }) {
  return <p className="px-6 py-12 text-center text-dust">{children}</p>
}

function Marked({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return text
  const parts = text.split(
    new RegExp(`(${words.map(escapeRegex).join("|")})`, "gi"),
  )
  return parts.map((part, i) =>
    i % 2 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: split parts, static
      <mark key={i} className="rounded-sm bg-glow/20 text-lumen">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

// A button that opens the search. `wide` is the field-like one.
export function SearchButton({
  wide,
  className,
}: {
  wide?: boolean
  className?: string
}) {
  const { open, copy } = useContext(SearchContext)
  const [mac, setMac] = useState(false)
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), [])

  if (!wide) {
    return (
      <button
        type="button"
        onClick={open}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-dust hover:border-white/20 hover:text-lumen",
          className,
        )}
      >
        <Search aria-hidden="true" className="size-4" />
        {copy.searchShort}
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "flex h-14 w-full items-center gap-3 rounded-full border border-white/15 bg-void/40 ps-5 pe-3 text-start text-lumen/60 backdrop-blur transition-colors hover:border-white/30 hover:text-lumen/80",
        className,
      )}
    >
      <Search aria-hidden="true" className="size-5 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{copy.search}</span>
      <kbd className="hidden rounded-md border border-white/15 px-2 py-0.5 font-mono text-xs sm:block">
        {mac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  )
}
