/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedClaudeWeeks } from './data'
import type { ClaudeWeek, ClaudeWeekStatus } from './types'

type Value = {
  weeks: ClaudeWeek[]
  patchWeek: (id: string, p: Partial<ClaudeWeek>) => void
}

const Context = createContext<Value | null>(null)

export function ClaudeMasteryProvider({ children }: { children: ReactNode }) {
  const [weeks, setWeeks] = useState(seedClaudeWeeks)
  const patchWeek = useCallback((id: string, p: Partial<ClaudeWeek>) =>
    setWeeks(ws => ws.map(w => w.id === id ? { ...w, ...p } : w)), [])
  const value = useMemo(() => ({ weeks, patchWeek }), [weeks, patchWeek])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useClaudeMastery() {
  const c = useContext(Context)
  if (!c) throw new Error('useClaudeMastery must be used inside ClaudeMasteryProvider')
  return c
}

export function useClaudeMasterySummary() {
  const { weeks } = useClaudeMastery()
  return useMemo(() => {
    const done = weeks.filter(w => w.status === 'done').length
    const active = weeks.filter(w => w.status === 'in-progress').length
    return {
      progress: weeks.length ? Math.round(done / weeks.length * 100) : 0,
      done,
      active,
      left: weeks.length - done - active,
    }
  }, [weeks])
}

export type { ClaudeWeekStatus }
