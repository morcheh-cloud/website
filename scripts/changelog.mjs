// Lists the commits since the newest changelog entry, across the repos, so
// they can be turned into short entries in src/changelog.ts.
//   pnpm changelog            commits after the newest entry's date
//   pnpm changelog 2026-11-10 commits after that date
import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"

const root = new URL("..", import.meta.url).pathname
const source = readFileSync(`${root}src/changelog.ts`, "utf8")
const newest = [...source.matchAll(/date: "(\d{4}-\d{2}-\d{2})"/g)]
  .map((m) => m[1])
  .sort()
  .pop()
const since = process.argv[2] ?? newest

const repos = ["frontend", "backend", "morche", "website"]
console.log(`Commits after ${since}\n`)
for (const repo of repos) {
  let out = ""
  try {
    out = execFileSync(
      "git",
      [
        "-C",
        `${root}../${repo}`,
        "log",
        `--since=${since} 23:59:59`,
        "--no-merges",
        "--format=%ad  %s",
        "--date=short",
      ],
      { encoding: "utf8" },
    ).trim()
  } catch {
    out = "(repo not found)"
  }
  console.log(`== ${repo}\n${out || "(nothing new)"}\n`)
}
