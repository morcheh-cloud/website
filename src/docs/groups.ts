import { type GuideMeta, guides } from "./guides"

// The guides by group, groups in the order they first appear.
export function guideGroups() {
  const groups = new Map<string, GuideMeta[]>()
  for (const guide of guides) {
    const list = groups.get(guide.group) ?? []
    list.push(guide)
    groups.set(guide.group, list)
  }
  return [...groups].map(([name, items]) => ({ name, items }))
}
