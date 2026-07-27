import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Story } from './types'
import { seedPracticeLog, seedStories } from './data'
import { computeSummary } from './stats'
import { todayISO } from '../../shared/utils/date'

type BehavioralContextValue = {
  stories: Story[]
  practiceLog: string[]
  updateStory: (id: string, patch: Partial<Story>) => void
  /** Record a practice: bumps count, sets last-practiced to today, logs the day,
   *  optionally re-rates confidence, and nudges status forward. */
  practiceStory: (id: string, newConfidence?: number) => void
}

const BehavioralContext = createContext<BehavioralContextValue | null>(null)

export function BehavioralProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>(seedStories)
  const [practiceLog, setPracticeLog] = useState<string[]>(seedPracticeLog)

  const updateStory = useCallback((id: string, patch: Partial<Story>) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }, [])

  const practiceStory = useCallback((id: string, newConfidence?: number) => {
    const today = todayISO()
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const status =
          s.status === 'not-started' || s.status === 'drafted' ? 'practiced' : s.status
        return {
          ...s,
          practiced_count: s.practiced_count + 1,
          last_practiced_date: today,
          confidence_rating: newConfidence ?? s.confidence_rating,
          status,
        }
      }),
    )
    setPracticeLog((prev) => (prev.includes(today) ? prev : [...prev, today]))
  }, [])

  const value = useMemo(
    () => ({ stories, practiceLog, updateStory, practiceStory }),
    [stories, practiceLog, updateStory, practiceStory],
  )

  return <BehavioralContext.Provider value={value}>{children}</BehavioralContext.Provider>
}

export function useBehavioral(): BehavioralContextValue {
  const ctx = useContext(BehavioralContext)
  if (!ctx) throw new Error('useBehavioral must be used within a BehavioralProvider')
  return ctx
}

/** Figures for the shared dashboard's Behavioral Interview card. */
export function useBehavioralSummary() {
  const { stories } = useBehavioral()
  return useMemo(() => {
    const s = computeSummary(stories)
    return {
      total: s.total,
      ready: s.interviewReady,
      inProgress: s.inProgress,
      notStarted: s.notStarted,
      progress: s.total ? Math.round((s.interviewReady / s.total) * 100) : 0,
    }
  }, [stories])
}
