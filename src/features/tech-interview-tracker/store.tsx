import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Problem } from './types'
import { seedProblems } from './data'
import { computeStats } from './stats'

export type NewProblem = Omit<Problem, 'id'>

type ProblemsContextValue = {
  problems: Problem[]
  addProblem: (problem: NewProblem) => void
  updateProblem: (id: string, problem: NewProblem) => void
  deleteProblem: (id: string) => void
}

const ProblemsContext = createContext<ProblemsContextValue | null>(null)

let idCounter = 0
const nextId = () => `p-${Date.now().toString(36)}-${(idCounter++).toString(36)}`

export function ProblemsProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(seedProblems)

  const addProblem = useCallback((problem: NewProblem) => {
    setProblems((prev) => [{ ...problem, id: nextId() }, ...prev])
  }, [])

  const updateProblem = useCallback((id: string, problem: NewProblem) => {
    setProblems((prev) => prev.map((p) => (p.id === id ? { ...problem, id } : p)))
  }, [])

  const deleteProblem = useCallback((id: string) => {
    setProblems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const value = useMemo(
    () => ({ problems, addProblem, updateProblem, deleteProblem }),
    [problems, addProblem, updateProblem, deleteProblem],
  )

  return <ProblemsContext.Provider value={value}>{children}</ProblemsContext.Provider>
}

export function useProblems(): ProblemsContextValue {
  const ctx = useContext(ProblemsContext)
  if (!ctx) throw new Error('useProblems must be used within a ProblemsProvider')
  return ctx
}

/** Aggregate figures for the shared dashboard's Technical Learning card. */
export function useTechTrackerSummary() {
  const { problems } = useProblems()
  return useMemo(() => {
    const s = computeStats(problems)
    return {
      total: s.total,
      solved: s.solved,
      attempted: s.attempted + s.needsRevisit,
      left: s.notStarted,
      progress: s.progress,
    }
  }, [problems])
}
