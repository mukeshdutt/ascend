/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedStudyWeeks, seedUseCases } from './data'
import type { StudyWeek, UseCase, AiStatus } from './types'

type Value = {
  studyWeeks: StudyWeek[]
  useCases: UseCase[]
  patchStudyWeek: (id: string, status: AiStatus) => void
  patchUseCase: (id: string, status: AiStatus) => void
  toggleTopicItem: (weekId: string, topicIndex: number) => void
}

const Context = createContext<Value | null>(null)

export function AgenticAiProvider({ children }: { children: ReactNode }) {
  const [studyWeeks, setStudyWeeks] = useState(seedStudyWeeks)
  const [useCases, setUseCases] = useState(seedUseCases)
  const patchStudyWeek = useCallback((id: string, status: AiStatus) =>
    setStudyWeeks(x => x.map(v => v.id === id ? { ...v, status } : v)), [])
  const patchUseCase = useCallback((id: string, status: AiStatus) =>
    setUseCases(x => x.map(v => v.id === id ? { ...v, status } : v)), [])
  const toggleTopicItem = useCallback((weekId: string, topicIndex: number) =>
    setStudyWeeks(x => x.map(v => v.id === weekId
      ? { ...v, topics: v.topics.map((t, i) => i === topicIndex ? { ...t, done: !t.done } : t) }
      : v)), [])
  const value = useMemo(() => ({ studyWeeks, useCases, patchStudyWeek, patchUseCase, toggleTopicItem }), [studyWeeks, useCases, patchStudyWeek, patchUseCase, toggleTopicItem])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAgenticAi() {
  const value = useContext(Context)
  if (!value) throw new Error('useAgenticAi must be used inside AgenticAiProvider')
  return value
}

export function useAgenticAiSummary() {
  const { studyWeeks, useCases } = useAgenticAi()
  return useMemo(() => {
    const all = [...studyWeeks, ...useCases]
    const done = all.filter(t => t.status === 'done').length
    const active = all.filter(t => t.status === 'in-progress').length
    return { progress: all.length ? Math.round(done / all.length * 100) : 0, done, active, left: all.length - done - active }
  }, [studyWeeks, useCases])
}
