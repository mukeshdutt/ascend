// Spaced-repetition scheduling. On each successful solve the next revisit is
// pushed further out: +3 days, then +7, then +21 for subsequent revisits.
export const REVISIT_INTERVALS = [3, 7, 21]

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

/**
 * Suggested next revisit date given how many times the problem has already
 * been solved. `revisitCount` is the count BEFORE this solve.
 */
export function suggestNextRevisit(revisitCount: number, from: string = todayISO()): string {
  const days = REVISIT_INTERVALS[Math.min(revisitCount, REVISIT_INTERVALS.length - 1)]
  return addDays(from, days)
}

export function isDue(iso: string | undefined, ref: string = todayISO()): boolean {
  return !!iso && iso <= ref
}

/** Number of days from `iso` to today (negative = in the past). */
export function daysFromToday(iso: string): number {
  const target = new Date(`${iso}T00:00:00`).getTime()
  const now = new Date(`${todayISO()}T00:00:00`).getTime()
  return Math.round((target - now) / 86_400_000)
}

/** Friendly relative label for a revisit date, e.g. "Today", "in 3d", "2d overdue". */
export function relativeRevisitLabel(iso: string): string {
  const diff = daysFromToday(iso)
  if (diff === 0) return 'Today'
  if (diff > 0) return `in ${diff}d`
  return `${Math.abs(diff)}d overdue`
}
