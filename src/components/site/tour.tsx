"use client"

import {
  Archive,
  Database,
  Globe,
  HardDrive,
  House,
  type LucideIcon,
  Pause,
  Play,
  Search,
  Server,
  Settings,
  Users,
  Workflow,
} from "lucide-react"
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import type { Dictionary } from "@/copy"
import { cn } from "@/lib/utils"

import { AntShape } from "./logo"
import { vignettes } from "./vignettes"

// How long each area stays up before the ant carries the tour on.
const DURATION = 7000

type AreaId = keyof typeof vignettes

// The window is a faithful copy of the panel's shell.
const sidebar: { label: string; icon: LucideIcon; area?: AreaId }[] = [
  { label: "Home", icon: House },
  { label: "Servers", icon: Server, area: "servers" },
  { label: "Databases", icon: Database, area: "databases" },
  { label: "Storage", icon: HardDrive, area: "storage" },
  { label: "DNS", icon: Globe, area: "dns" },
  { label: "Automation", icon: Workflow, area: "automation" },
  { label: "Backups", icon: Archive },
  { label: "Access", icon: Users, area: "team" },
]

const crumbs: Record<AreaId, [string, string]> = {
  servers: ["Servers", "web-01"],
  databases: ["Databases", "orders-db"],
  storage: ["Storage", "r2-archive"],
  dns: ["DNS", "example.ir"],
  automation: ["Ansible", "harden-ssh.yml"],
  team: ["Settings", "Access"],
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

function Ant({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-4 -2.4 8 4.8"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute end-0 top-1/2 h-3 w-5 translate-x-1/2 -translate-y-1/2",
        className,
      )}
    >
      <AntShape />
    </svg>
  )
}

// The hero's frame and the panel tour inside it. The text above the window
// comes in as children; the tabs sit below the frame, Nest-style, each with
// a line an ant walks to the end before the next area opens.
export function Tour({ t, children }: { t: Dictionary; children: ReactNode }) {
  const areas = t.tour.areas as { id: AreaId; title: string; blurb: string }[]
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false) // pointer over or focus inside
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId()

  const auto = playing && !reduced
  const running = auto && !held && visible

  // Only walk while the tour is on screen and the tab is in front.
  useEffect(() => {
    const el = root.current
    if (!el) return
    let onScreen = false
    const update = () =>
      setVisible(onScreen && document.visibilityState === "visible")
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        update()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    document.addEventListener("visibilitychange", update)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", update)
    }
  }, [])

  // Keep the active chip in view on phones, where the tabs scroll sideways.
  // scrollBy with a measured delta works the same in both directions.
  useEffect(() => {
    const strip = list.current
    const tab = tabs.current[active]
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return
    const a = tab.getBoundingClientRect()
    const b = strip.getBoundingClientRect()
    const delta = a.left + a.width / 2 - (b.left + b.width / 2)
    strip.scrollBy({ left: delta, behavior: reduced ? "auto" : "smooth" })
  }, [active, reduced])

  const select = (index: number, focus = false) => {
    const next = (index + areas.length) % areas.length
    setActive(next)
    if (focus) tabs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") select(active + 1, true)
    else if (event.key === "ArrowLeft") select(active - 1, true)
    else if (event.key === "Home") select(0, true)
    else if (event.key === "End") select(areas.length - 1, true)
    else return
    event.preventDefault()
  }

  const area = areas[active]
  const Vignette = vignettes[area.id]
  const [section, page] = crumbs[area.id]
  const panelId = `${base}-panel`

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover/focus only hold the auto-advance; nothing is activated
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
      }}
    >
      <div className="px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="frame-lit relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.75rem]">
          {children}

          {/* The window rises out of the frame and is cut by its edge. */}
          <div
            id="tour"
            className="rise relative mx-auto mt-14 h-[25rem] max-w-6xl px-3 [animation-delay:450ms] sm:mt-20 sm:h-[30rem] sm:px-8 lg:h-[33rem]"
          >
            <div className="h-full rounded-t-[1.4rem] border border-white/12 border-b-0 bg-white/[0.05] p-1.5 pb-0 shadow-[0_-30px_80px_-30px_rgb(62_99_221/0.55)] backdrop-blur-sm sm:p-2.5 sm:pb-0">
              <div
                aria-hidden="true"
                className="ui-font flex h-[44rem] overflow-hidden rounded-t-2xl border border-line border-b-0 bg-surface text-start"
              >
                <aside className="hidden w-52 shrink-0 flex-col gap-0.5 border-line border-e bg-[#0a0c16] p-3 md:flex">
                  <div className="mb-3 flex items-center gap-2.5 rounded-lg p-1.5">
                    <span className="grid size-7 place-items-center rounded-md bg-indigo font-semibold text-white text-xs">
                      P
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-lumen text-sm leading-tight">
                        Production
                      </span>
                      <span className="block text-[0.6875rem] text-dust leading-tight">
                        Workspace
                      </span>
                    </span>
                  </div>
                  {sidebar.map((item) => {
                    const on = item.area === area.id
                    return (
                      <span
                        key={item.label}
                        className={cn(
                          "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[0.8125rem] transition-colors duration-300",
                          on ? "bg-raised text-lumen" : "text-dust",
                        )}
                      >
                        <item.icon
                          className={cn("size-4", on && "text-glow")}
                          strokeWidth={1.75}
                        />
                        {item.label}
                      </span>
                    )
                  })}
                  <span className="mt-auto flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[0.8125rem] text-dust">
                    <Settings className="size-4" strokeWidth={1.75} />
                    Settings
                  </span>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex h-12 shrink-0 items-center gap-2 border-line border-b px-4 text-[0.8125rem]">
                    <span className="text-dust">{section}</span>
                    <span className="text-dust/50">/</span>
                    <span className="truncate text-lumen">{page}</span>
                    <span className="ms-auto hidden h-8 w-56 items-center gap-2 rounded-lg border border-line bg-void/60 px-2.5 text-dust sm:flex">
                      <Search className="size-3.5" />
                      Search
                      <kbd className="ms-auto rounded border border-line px-1 font-sans text-[0.625rem]">
                        ⌘K
                      </kbd>
                    </span>
                    <span className="ms-auto grid size-7 place-items-center rounded-full bg-raised font-medium text-[0.6875rem] text-lumen sm:ms-1">
                      SA
                    </span>
                  </div>
                  <div className="@container min-h-0 flex-1 p-3 sm:p-5">
                    <div key={area.id} className="swap-in">
                      <Vignette />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p id={panelId} role="tabpanel" className="sr-only" aria-live="polite">
        {area.title}: {area.blurb}
      </p>

      <div className="mx-auto mt-6 flex max-w-6xl items-start gap-3 px-5 sm:mt-8 sm:px-8">
        <div
          ref={list}
          role="tablist"
          aria-label={t.tour.label}
          onKeyDown={onKeyDown}
          className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-5 sm:overflow-visible xl:grid-cols-6"
        >
          {areas.map((item, index) => {
            const on = index === active
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[index] = el
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${item.id}`}
                aria-selected={on}
                aria-controls={panelId}
                tabIndex={on ? 0 : -1}
                onClick={() => select(index)}
                className={cn(
                  "group relative shrink-0 rounded-full border px-4 py-2 text-start text-sm transition-colors",
                  "sm:rounded-none sm:border-0 sm:px-0 sm:pt-5 sm:pb-1",
                  on
                    ? "border-white/15 bg-white/[0.06] text-lumen sm:bg-transparent"
                    : "border-line text-dust hover:text-lumen",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-1 h-px rounded-full sm:inset-x-0 sm:top-0 sm:bottom-auto sm:h-0.5 sm:bg-white/[0.08]"
                >
                  {on && (
                    <span
                      key={`${item.id}-${auto}`}
                      onAnimationEnd={() => select(active + 1)}
                      className="relative block h-full rounded-full bg-honey"
                      style={
                        auto
                          ? {
                              animation: `walk ${DURATION}ms linear forwards`,
                              animationPlayState: running
                                ? "running"
                                : "paused",
                            }
                          : { width: "100%" }
                      }
                    >
                      <Ant
                        className={cn("hidden sm:block", !auto && "sm:hidden")}
                      />
                    </span>
                  )}
                </span>
                <span className="block whitespace-nowrap font-medium sm:text-[0.9375rem]">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "mt-1.5 hidden text-sm leading-relaxed transition-colors sm:block",
                    on ? "text-dust" : "text-dust/60 group-hover:text-dust",
                  )}
                >
                  {item.blurb}
                </span>
              </button>
            )
          })}
        </div>

        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? t.tour.pause : t.tour.play}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-dust transition-colors hover:border-dust hover:text-lumen sm:mt-4"
          >
            {playing ? (
              <Pause className="size-3.5" aria-hidden="true" />
            ) : (
              <Play className="size-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Phones: the chips carry the titles; the active blurb sits below. */}
      <p className="mx-auto mt-3 min-h-[3.4em] max-w-6xl px-5 text-dust text-sm sm:hidden">
        {area.blurb}
      </p>
    </div>
  )
}
