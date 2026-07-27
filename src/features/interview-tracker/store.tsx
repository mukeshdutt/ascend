/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedTopics } from './data'
import type { Topic, TopicStatus } from './types'

type NewTopic = Omit<Topic, 'id'>
type Value = { topics: Topic[]; addTopic: (topic: NewTopic) => void; updateTopic: (id: string, topic: NewTopic) => void; patchTopic: (id: string, patch: Partial<Topic>) => void; deleteTopic: (id: string) => void; bulkDone: (ids: string[]) => void }
const Context = createContext<Value | null>(null)
let count = 0
export function InterviewTrackerProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState(seedTopics)
  const addTopic = useCallback((topic: NewTopic) => setTopics(p => [{ ...topic, id: `topic-${Date.now().toString(36)}-${count++}` }, ...p]), [])
  const updateTopic = useCallback((id: string, topic: NewTopic) => setTopics(p => p.map(t => t.id === id ? { ...topic, id } : t)), [])
  const patchTopic = useCallback((id: string, patch: Partial<Topic>) => setTopics(p => p.map(t => t.id === id ? { ...t, ...patch } : t)), [])
  const deleteTopic = useCallback((id: string) => setTopics(p => p.filter(t => t.id !== id)), [])
  const bulkDone = useCallback((ids: string[]) => setTopics(p => p.map(t => ids.includes(t.id) ? { ...t, status: 'done' as TopicStatus } : t)), [])
  const value = useMemo(() => ({ topics, addTopic, updateTopic, patchTopic, deleteTopic, bulkDone }), [topics, addTopic, updateTopic, patchTopic, deleteTopic, bulkDone])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useInterviewTopics() { const value = useContext(Context); if (!value) throw new Error('useInterviewTopics must be inside InterviewTrackerProvider'); return value }
export function useInterviewTrackerSummary() {
  const { topics } = useInterviewTopics()
  return useMemo(() => { const done = topics.filter(t => t.status === 'done').length; const active = topics.filter(t => t.status === 'in-progress').length; const left = topics.length - done - active; const dates = topics.map(t => t.last_studied_date).filter(Boolean).sort(); return { progress: topics.length ? Math.round(done / topics.length * 100) : 0, done, active, left, updated: dates.at(-1) } }, [topics])
}
