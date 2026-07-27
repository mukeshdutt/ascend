import { useMemo } from 'react'
import { addDays, todayISO } from '../../../shared/utils/date'

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function mondayOfWeek(iso: string): string {
  const wd = new Date(`${iso}T00:00:00`).getDay() // 0=Sun..6=Sat
  return addDays(iso, wd === 0 ? -6 : 1 - wd)
}

export function StreakGrid({ practiceLog }: { practiceLog: string[] }) {
  const today = todayISO()
  const logSet = useMemo(() => new Set(practiceLog), [practiceLog])

  // 6 weeks (42 days) ending with the week that contains today.
  const start = addDays(mondayOfWeek(today), -35)
  const days = useMemo(() => Array.from({ length: 42 }, (_, i) => addDays(start, i)), [start])

  // Current speaking-practice streak (consecutive days up to today).
  const streak = useMemo(() => {
    let n = 0
    let cursor = today
    while (logSet.has(cursor)) {
      n += 1
      cursor = addDays(cursor, -1)
    }
    return n
  }, [logSet, today])

  const practicedInWindow = days.filter((d) => logSet.has(d)).length

  return (
    <article className="panel streak-panel">
      <div className="streak-head">
        <h3>6-week practice streak</h3>
        <span className="streak-badge">🔥 {streak}-day streak</span>
      </div>
      <div className="streak-weekdays">
        {WEEKDAYS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div className="streak-grid">
        {days.map((d) => {
          const practiced = logSet.has(d)
          const isToday = d === today
          const future = d > today
          const cls = ['streak-cell', practiced && 'done', isToday && 'today', future && 'future']
            .filter(Boolean)
            .join(' ')
          return <span key={d} className={cls} title={d + (practiced ? ' · practiced' : '')} />
        })}
      </div>
      <p className="streak-foot">{practicedInWindow} days practiced in the last 6 weeks</p>
    </article>
  )
}
