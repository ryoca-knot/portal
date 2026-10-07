// Helpers for the data-driven pages (links.md / events.md frontmatter).
import { QuartzPluginData } from "../plugins/vfile"

export interface SiteLink {
  label: string
  url?: string // omit for entries without a page (e.g. a Discord username)
  icon?: string
  note?: string
}

export interface SiteEvent {
  date: string // YYYY-MM-DD
  title: string
  role?: string
  venue?: string
  url?: string
  note?: string
}

export const LINKS_SLUG = "links"
export const EVENTS_SLUG = "events"

// YAML may parse unquoted dates into Date objects; normalize everything to "YYYY-MM-DD"
function toDateString(d: unknown): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10)
  return String(d ?? "").trim()
}

export function todayString(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function readLinks(data: QuartzPluginData | undefined): SiteLink[] {
  const raw = data?.frontmatter?.links
  if (!Array.isArray(raw)) return []
  return raw.filter((l) => l && l.label) as SiteLink[]
}

export function readEvents(data: QuartzPluginData | undefined): SiteEvent[] {
  const raw = data?.frontmatter?.events
  if (!Array.isArray(raw)) return []
  return raw
    .filter((e) => e && e.title && e.date)
    .map((e) => ({ ...e, date: toDateString(e.date) }) as SiteEvent)
}

export function findPage(allFiles: QuartzPluginData[], slug: string) {
  return allFiles.find((f) => f.slug === slug)
}

// upcoming: ascending (nearest first), past: descending (latest first)
export function splitEvents(events: SiteEvent[]) {
  const today = todayString()
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}

export function formatEventDate(date: string): string {
  const [y, m, d] = date.split("-")
  if (!y || !m || !d) return date
  return `${y}.${m}.${d}`
}
