// Small, timezone-safe ISO date helpers (YYYY-MM-DD) shared across features.

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

/** Days from `iso` to today (negative = in the past). */
export function daysFromToday(iso: string): number {
  const target = new Date(`${iso}T00:00:00`).getTime()
  const now = new Date(`${todayISO()}T00:00:00`).getTime()
  return Math.round((target - now) / 86_400_000)
}
