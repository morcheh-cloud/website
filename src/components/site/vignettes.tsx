import {
  Archive,
  ChevronRight,
  Eye,
  FileText,
  Folder,
  Package,
} from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

// Small, faithful slices of the panel, one per chamber.

function Dot({ tone }: { tone: "ok" | "warn" | "bad" | "idle" }) {
  return (
    <span
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        tone === "ok" && "bg-leaf",
        tone === "warn" && "bg-honey",
        tone === "bad" && "bg-ember",
        tone === "idle" && "bg-dust/50",
      )}
    />
  )
}

function Pill({
  children,
  tone = "plain",
}: {
  children: ReactNode
  tone?: "plain" | "ok" | "warn" | "bad" | "brand"
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center whitespace-nowrap rounded-full px-2 font-medium text-[0.6875rem]",
        tone === "plain" && "bg-raised text-dust",
        tone === "ok" && "bg-leaf/15 text-leaf",
        tone === "warn" && "bg-honey/15 text-honey",
        tone === "bad" && "bg-ember/15 text-ember",
        tone === "brand" && "bg-glow/15 text-glow",
      )}
    >
      {children}
    </span>
  )
}

function Meter({ value }: { value: number }) {
  return (
    <span className="h-1 w-full overflow-hidden rounded-full bg-line">
      <span
        className={cn(
          "block h-full rounded-full",
          value >= 80 ? "bg-honey" : "bg-glow",
        )}
        style={{ width: `${value}%` }}
      />
    </span>
  )
}

function Panel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface",
        className,
      )}
    >
      {children}
    </div>
  )
}

function Row({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-line border-t px-4 py-2.5 first:border-t-0",
        className,
      )}
    >
      {children}
    </div>
  )
}

const cpu = [22, 18, 26, 31, 24, 38, 46, 41, 35, 29, 33, 27, 21, 25, 19, 16]

function Sparkline() {
  const max = 48
  const step = 100 / (cpu.length - 1)
  const points = cpu.map((v, i) => `${i * step},${30 - (v / max) * 28}`)
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="mt-1 h-16 w-full"
      aria-hidden="true"
    >
      <polyline
        points={`0,30 ${points.join(" ")} 100,30`}
        className="fill-glow/10"
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        className="stroke-glow"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function ServersVignette() {
  const servers = [
    { name: "web-01", os: "Ubuntu 24.04", cpu: 16, mem: 48, tone: "ok" },
    { name: "db-primary", os: "Debian 12", cpu: 41, mem: 72, tone: "ok" },
    { name: "mail", os: "Rocky 9", cpu: 9, mem: 86, tone: "warn" },
  ] as const
  return (
    <div className="grid gap-3 @2xl:grid-cols-[1fr_1.15fr]">
      <Panel>
        <div className="flex items-end justify-between gap-4 px-4 pt-3.5">
          <div>
            <p className="text-dust text-xs">CPU, web-01</p>
            <p className="font-semibold text-2xl text-lumen tabular-nums">
              16%
            </p>
          </div>
          <Pill tone="ok">Live</Pill>
        </div>
        <Sparkline />
      </Panel>
      <Panel className="@2xl:row-span-2">
        {servers.map((s) => (
          <Row key={s.name}>
            <Dot tone={s.tone} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-lumen text-sm">
                {s.name}
              </span>
              <span className="block text-dust text-xs">{s.os}</span>
            </span>
            <span className="grid w-24 gap-1.5 text-[0.6875rem] text-dust tabular-nums">
              <span className="flex items-center gap-2">
                <span className="w-8">CPU</span>
                <Meter value={s.cpu} />
              </span>
              <span className="flex items-center gap-2">
                <span className="w-8">RAM</span>
                <Meter value={s.mem} />
              </span>
            </span>
          </Row>
        ))}
      </Panel>
      <Panel className="bg-void px-4 py-3 font-mono text-[0.75rem] leading-relaxed">
        <p className="text-dust">
          <span className="text-leaf">deploy@web-01</span>:
          <span className="text-glow">~</span>$ sudo systemctl reload nginx
        </p>
        <p className="text-dust">
          <span className="text-leaf">deploy@web-01</span>:
          <span className="text-glow">~</span>${" "}
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-honey motion-safe:animate-pulse" />
        </p>
      </Panel>
    </div>
  )
}

export function DatabasesVignette() {
  const sessions = [
    { pid: 48211, user: "app", state: "active", time: "0.4s", tone: "ok" },
    {
      pid: 48190,
      user: "report",
      state: "waiting on 48177",
      time: "12s",
      tone: "warn",
    },
    {
      pid: 48177,
      user: "migrate",
      state: "blocking 1",
      time: "41s",
      tone: "bad",
    },
    { pid: 48102, user: "app", state: "idle", time: "2m", tone: "idle" },
  ] as const
  return (
    <div className="grid gap-3 @2xl:grid-cols-[1.5fr_1fr]">
      <Panel className="@2xl:row-span-2">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-medium text-lumen text-sm">
            orders-db <span className="text-dust">PostgreSQL 17</span>
          </span>
          <Pill tone="ok">Healthy</Pill>
        </div>
        <div className="grid grid-cols-[4rem_4.5rem_1fr_3rem] gap-x-3 border-line border-t px-4 py-2 text-[0.6875rem] text-dust">
          <span>PID</span>
          <span>User</span>
          <span>State</span>
          <span className="text-end">Time</span>
        </div>
        {sessions.map((s) => (
          <div
            key={s.pid}
            className={cn(
              "grid grid-cols-[4rem_4.5rem_1fr_3rem] items-center gap-x-3 border-line border-t px-4 py-2 text-xs tabular-nums",
              s.tone === "bad" && "bg-ember/[0.07]",
            )}
          >
            <span className="text-dust">{s.pid}</span>
            <span className="text-lumen">{s.user}</span>
            <span className="flex min-w-0 items-center gap-2 text-lumen">
              <Dot tone={s.tone} />
              <span className="truncate">{s.state}</span>
            </span>
            <span className="text-end text-dust">{s.time}</span>
          </div>
        ))}
      </Panel>
      <Panel className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
        <Archive className="size-4 text-honey" aria-hidden="true" />
        <span className="font-medium text-lumen text-sm">Nightly backup</span>
        <span className="text-dust text-xs">Every day at 03:00</span>
        <span className="ms-auto flex gap-1.5">
          <Pill>Incremental</Pill>
          <Pill tone="ok">Done in 4 min</Pill>
        </span>
      </Panel>
      <Panel className="hidden @2xl:block">
        {[
          ["Connections", "42 of 200"],
          ["Cache hit rate", "99.2%"],
          ["Replication lag", "0.3 s"],
        ].map(([label, value]) => (
          <Row key={label}>
            <span className="flex-1 text-dust text-xs">{label}</span>
            <span className="text-lumen text-sm tabular-nums">{value}</span>
          </Row>
        ))}
      </Panel>
    </div>
  )
}

export function StorageVignette() {
  const files = [
    { name: "backups", kind: "folder", size: "214 GB", when: "Today" },
    { name: "media", kind: "folder", size: "1.2 TB", when: "Yesterday" },
    {
      name: "site-2026-11.tar.zst",
      kind: "archive",
      size: "3.8 GB",
      when: "Nov 1",
    },
    { name: "README.md", kind: "file", size: "2 KB", when: "Oct 12" },
  ] as const
  return (
    <div className="grid gap-3 @2xl:grid-cols-[1.5fr_1fr]">
      <Panel className="@2xl:row-span-2">
        <div className="flex items-center gap-1.5 px-4 py-3 text-sm">
          <Package className="size-4 text-glow" aria-hidden="true" />
          <span className="text-dust">r2-archive</span>
          <ChevronRight className="size-3.5 text-dust/60" aria-hidden="true" />
          <span className="font-medium text-lumen">company-files</span>
          <span className="ms-auto">
            <Pill tone="brand">Bucket</Pill>
          </span>
        </div>
        {files.map((f) => (
          <Row key={f.name}>
            {f.kind === "folder" ? (
              <Folder className="size-4 text-honey" aria-hidden="true" />
            ) : f.kind === "archive" ? (
              <Archive className="size-4 text-dust" aria-hidden="true" />
            ) : (
              <FileText className="size-4 text-dust" aria-hidden="true" />
            )}
            <span className="min-w-0 flex-1 truncate text-lumen text-sm">
              {f.name}
            </span>
            <span className="w-16 text-end text-dust text-xs tabular-nums">
              {f.size}
            </span>
            <span className="hidden w-16 text-end text-dust text-xs sm:block">
              {f.when}
            </span>
          </Row>
        ))}
      </Panel>
      <Panel className="px-4 py-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="truncate text-lumen">
            Copying backups/ from web-01
          </span>
          <span className="text-dust text-xs tabular-nums">64%</span>
        </div>
        <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-line">
          <span className="block h-full w-[64%] rounded-full bg-honey" />
        </span>
      </Panel>
      <Panel className="hidden px-4 py-3 @2xl:block">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-dust text-xs">Space used, 30 days</span>
          <span className="font-medium text-lumen text-sm tabular-nums">
            1.4 TB
          </span>
        </div>
        <span className="mt-3 flex h-14 items-end gap-1">
          {[38, 40, 41, 45, 44, 48, 52, 55, 54, 58, 63, 66, 70, 74].map(
            (h, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: a fixed, decorative series
                key={i}
                className="flex-1 rounded-sm bg-glow/50"
                style={{ height: `${h}%` }}
              />
            ),
          )}
        </span>
      </Panel>
    </div>
  )
}

export function DnsVignette() {
  const records = [
    { type: "A", name: "@", value: "185.143.232.10" },
    { type: "A", name: "panel", value: "10.0.4.12" },
    { type: "CNAME", name: "www", value: "example.ir." },
    { type: "MX", name: "@", value: "10 mail.example.ir." },
    { type: "TXT", name: "@", value: "v=spf1 mx -all" },
  ]
  return (
    <div className="grid gap-3 @2xl:grid-cols-[1.6fr_1fr]">
      <Panel className="hidden @2xl:order-last @2xl:block">
        <div className="px-4 py-3 font-medium text-lumen text-sm">
          DNS servers
        </div>
        {[
          { name: "dns-1", zones: 14, tone: "ok" },
          { name: "dns-2", zones: 14, tone: "warn" },
          { name: "dns-branch", zones: 3, tone: "ok" },
        ].map((s) => (
          <Row key={s.name}>
            <Dot tone={s.tone as "ok" | "warn"} />
            <span className="flex-1 text-lumen text-sm">{s.name}</span>
            <span className="text-dust text-xs tabular-nums">
              {s.zones} zones
            </span>
          </Row>
        ))}
      </Panel>
      <Panel>
        <div className="flex flex-wrap items-center gap-2 px-4 py-3">
          <span className="me-auto font-medium text-lumen text-sm">
            example.ir
          </span>
          <Pill tone="ok">dns-1 in sync</Pill>
          <Pill tone="warn">dns-2 out of sync</Pill>
        </div>
        {records.map((r) => (
          <div
            key={`${r.type}-${r.name}-${r.value}`}
            className="grid grid-cols-[3.5rem_4rem_1fr] items-center gap-x-3 border-line border-t px-4 py-2 text-xs"
          >
            <span>
              <Pill>{r.type}</Pill>
            </span>
            <span className="text-lumen">{r.name}</span>
            <span className="truncate font-mono text-dust">{r.value}</span>
          </div>
        ))}
      </Panel>
    </div>
  )
}

export function AutomationVignette() {
  const hosts = [
    { name: "web-01", ok: 12, changed: 3, failed: 0 },
    { name: "web-02", ok: 12, changed: 3, failed: 0 },
    { name: "ci-runner", ok: 11, changed: 0, failed: 1 },
  ]
  return (
    <div className="grid items-start gap-3 @2xl:grid-cols-2">
      <Panel>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-medium text-lumen text-sm">harden-ssh.yml</span>
          <Pill tone="warn">Finished with 1 failure</Pill>
        </div>
        {["Disable password login", "Set MaxAuthTries to 3", "Reload sshd"].map(
          (task, index) => (
            <Row key={task}>
              <span className="grid size-5 place-items-center rounded-md bg-line text-[0.625rem] text-dust tabular-nums">
                {index + 1}
              </span>
              <span className="flex-1 text-lumen text-sm">{task}</span>
              <span className="text-dust text-xs">
                {index === 2 ? "changed" : "ok"}
              </span>
            </Row>
          ),
        )}
      </Panel>
      <Panel className="px-4 py-3 font-mono text-[0.75rem] leading-relaxed">
        <p className="mb-1 text-dust">PLAY RECAP</p>
        {hosts.map((h) => (
          <p key={h.name} className="flex gap-4 tabular-nums">
            <span
              className={cn(
                "w-20",
                h.failed
                  ? "text-ember"
                  : h.changed
                    ? "text-honey"
                    : "text-leaf",
              )}
            >
              {h.name}
            </span>
            <span className="text-leaf">ok={h.ok}</span>
            <span className="text-honey">changed={h.changed}</span>
            <span className={h.failed ? "text-ember" : "text-dust"}>
              failed={h.failed}
            </span>
          </p>
        ))}
      </Panel>
    </div>
  )
}

export function TeamVignette() {
  const people = [
    { name: "Sara Ahmadi", initial: "S", role: "Owner", tone: "brand" },
    { name: "Reza Karimi", initial: "R", role: "Engineer", tone: "plain" },
    { name: "Nazanin Moradi", initial: "N", role: "Operator", tone: "plain" },
    { name: "Support team", initial: "ST", role: "Viewer", tone: "plain" },
  ] as const
  return (
    <div className="grid gap-3 @2xl:grid-cols-[1.5fr_1fr]">
      <Panel className="@2xl:row-span-2">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-medium text-lumen text-sm">
            Access to db-primary
          </span>
          <span className="text-dust text-xs">4 people and groups</span>
        </div>
        {people.map((p) => (
          <Row key={p.name}>
            <span className="grid size-7 place-items-center rounded-full bg-line font-medium text-[0.6875rem] text-lumen">
              {p.initial}
            </span>
            <span className="flex-1 text-lumen text-sm">{p.name}</span>
            <Pill tone={p.tone}>{p.role}</Pill>
          </Row>
        ))}
      </Panel>
      <Panel className="flex items-center gap-3 px-4 py-3">
        <Eye className="size-4 shrink-0 text-honey" aria-hidden="true" />
        <span className="flex-1 text-dust text-sm">
          <span className="text-lumen">Reza</span> revealed the Grafana password
        </span>
        <span className="text-dust text-xs">2 min ago</span>
      </Panel>
      <Panel className="hidden px-4 py-3 @2xl:block">
        <p className="text-lumen text-sm">Mina Rahimi wants to join</p>
        <p className="mt-0.5 text-dust text-xs">Waiting for an admin</p>
        <span className="mt-3 flex gap-2">
          <span className="inline-flex h-7 items-center rounded-md bg-indigo px-3 font-medium text-white text-xs">
            Approve
          </span>
          <span className="inline-flex h-7 items-center rounded-md border border-line px-3 text-dust text-xs">
            Decline
          </span>
        </span>
      </Panel>
    </div>
  )
}

export const vignettes = {
  servers: ServersVignette,
  databases: DatabasesVignette,
  storage: StorageVignette,
  dns: DnsVignette,
  automation: AutomationVignette,
  team: TeamVignette,
} as const
