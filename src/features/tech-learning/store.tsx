/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { trackerAreas } from './data'
import { NEXT_STATE } from './types'
import type { ItemState, TrackerId } from './types'

// One three-state map per tracker. Missing id ⇒ 'todo'. The two trackers share
// the same curriculum but track progress independently.
type TrackerState = Record<string, ItemState>

type Value = {
  states: Record<TrackerId, TrackerState>
  cycleItem: (tracker: TrackerId, itemId: string) => void
}

const Context = createContext<Value | null>(null)

export function TechLearningProvider({ children }: { children: ReactNode }) {
  const [states, setStates] = useState<Record<TrackerId, TrackerState>>({
    interview: {},
    learning: {},
  })

  const cycleItem = useCallback((tracker: TrackerId, itemId: string) =>
    setStates((prev) => {
      const current = prev[tracker][itemId] ?? 'todo'
      return { ...prev, [tracker]: { ...prev[tracker], [itemId]: NEXT_STATE[current] } }
    }), [])

  const value = useMemo(() => ({ states, cycleItem }), [states, cycleItem])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useTechLearning() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useTechLearning must be inside TechLearningProvider')
  return ctx
}

export function countStates(tracker: TrackerId, state: TrackerState) {
  let total = 0
  let done = 0
  let wip = 0
  for (const area of trackerAreas[tracker])
    for (const phase of area.phases)
      for (const item of phase.items) {
        total += 1
        const s = state[item.id] ?? 'todo'
        if (s === 'done') done += 1
        else if (s === 'wip') wip += 1
      }
  return { total, done, wip, todo: total - done - wip }
}

export function useTechLearningSummary() {
  const { states } = useTechLearning()
  return useMemo(() => {
    const i = countStates('interview', states.interview)
    const l = countStates('learning', states.learning)
    const total = i.total + l.total
    const done = i.done + l.done
    const active = i.wip + l.wip
    return { progress: total ? Math.round((done / total) * 100) : 0, done, active, left: total - done - active }
  }, [states])
}
