/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedJavaWeeks } from './data'
import type { JavaWeek, JavaWeekStatus } from './types'

type Value = {
  weeks: JavaWeek[]
  patchWeek: (id: string, patch: Partial<JavaWeek>) => void
  toggleTask: (weekId: string, sectionName: string, taskId: string) => void
}

const Context = createContext<Value | null>(null)

export function JavaStudyProvider({ children }: { children: ReactNode }) {
  const [weeks, setWeeks] = useState<JavaWeek[]>(seedJavaWeeks)

  const patchWeek = (id: string, patch: Partial<JavaWeek>) =>
    setWeeks(prev => prev.map(w => w.id === id ? { ...w, ...patch } : w))

  const toggleTask = (weekId: string, sectionName: string, taskId: string) =>
    setWeeks(prev => prev.map(w => {
      if (w.id !== weekId) return w
      return {
        ...w,
        sections: w.sections.map(s =>
          s.name !== sectionName ? s : {
            ...s,
            tasks: s.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t),
          }
        ),
      }
    }))

  const value = useMemo(() => ({ weeks, patchWeek, toggleTask }), [weeks])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useJavaStudy() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useJavaStudy must be used inside JavaStudyProvider')
  return ctx
}

export function useJavaStudySummary() {
  const { weeks } = useJavaStudy()
  return useMemo(() => {
    const totalTasks = weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.tasks.length, 0), 0)
    const doneTasks = weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.tasks.filter(t => t.done).length, 0), 0)
    const weeksDone = weeks.filter(w => w.status === 'done').length
    const weeksActive = weeks.filter(w => w.status === 'in-progress').length
    return {
      progress: totalTasks > 0 ? Math.round(doneTasks / totalTasks * 100) : 0,
      done: weeksDone,
      active: weeksActive,
      left: weeks.length - weeksDone,
    }
  }, [weeks])
}

export function deriveWeekStatus(week: JavaWeek): JavaWeekStatus {
  const total = week.sections.reduce((n, s) => n + s.tasks.length, 0)
  const done = week.sections.reduce((n, s) => n + s.tasks.filter(t => t.done).length, 0)
  if (done === 0) return 'not-started'
  if (done === total) return 'done'
  return 'in-progress'
}
