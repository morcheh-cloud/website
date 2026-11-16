// Copies the panel's guides (../frontend) into the website, so the docs
// pages show exactly what the panel's help center shows.
//
//   pnpm sync:docs                       # from ../frontend
//   FRONTEND_DIR=/path/to/frontend pnpm sync:docs
//
// Guides are written only with the prose blocks (P, Steps, Tip…), so the
// website renders the same files with its own src/docs/prose.tsx. The
// copies are committed: the site builds without the frontend next to it.

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const frontend = resolve(root, process.env.FRONTEND_DIR ?? "../frontend")
const from = join(frontend, "src/app/help/content")
const to = join(root, "src/docs/content")

const banner =
  "// Synced from ../frontend by `pnpm sync:docs`. Edit it there, not here.\n"

const files = (await readdir(from)).filter((f) => /\.tsx?$/.test(f))
if (!files.length) throw new Error(`No guides found in ${from}`)

await rm(to, { recursive: true, force: true })
await mkdir(to, { recursive: true })

for (const file of files) {
  const text = await readFile(join(from, file), "utf8")
  const out = text.replaceAll('"../components/prose"', '"../prose"')
  const stray = out.match(/from "(?!\.\.\/prose"|\.\/)[^"]+"/)
  if (stray)
    throw new Error(`${file} imports ${stray[0]}: only prose is supported`)
  await writeFile(join(to, file), banner + out)
}

// The registry (titles, summaries, icons, groups). It imports only lucide.
const guides = await readFile(
  join(frontend, "src/components/help/guides.ts"),
  "utf8",
)
await writeFile(join(root, "src/docs/guides.ts"), banner + guides)

console.log(`Synced ${files.length - 1} guides from ${frontend}`)
