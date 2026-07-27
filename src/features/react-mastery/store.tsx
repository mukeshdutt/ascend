/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedReactTopics } from './data'
import type { ReactTopic } from './types'
type NewTopic = Omit<ReactTopic, 'id'>
type Value = { topics: ReactTopic[]; addTopic: (t: NewTopic) => void; updateTopic: (id: string, t: NewTopic) => void; patchTopic: (id: string, t: Partial<ReactTopic>) => void; deleteTopic: (id: string) => void }
const Context = createContext<Value | null>(null)
let ids = 0
export function ReactMasteryProvider({ children }: { children: ReactNode }) { const [topics, setTopics] = useState(seedReactTopics); const addTopic = useCallback((t: NewTopic) => setTopics(p => [{ ...t, id: `react-${Date.now().toString(36)}-${ids++}` }, ...p]), []); const updateTopic = useCallback((id: string, t: NewTopic) => setTopics(p => p.map(x => x.id === id ? { ...t, id } : x)), []); const patchTopic = useCallback((id: string, t: Partial<ReactTopic>) => setTopics(p => p.map(x => x.id === id ? { ...x, ...t } : x)), []); const deleteTopic = useCallback((id: string) => setTopics(p => p.filter(x => x.id !== id)), []); const value = useMemo(() => ({ topics, addTopic, updateTopic, patchTopic, deleteTopic }), [topics, addTopic, updateTopic, patchTopic, deleteTopic]); return <Context.Provider value={value}>{children}</Context.Provider> }
export function useReactMastery() { const context = useContext(Context); if (!context) throw new Error('useReactMastery must be inside ReactMasteryProvider'); return context }
export function useReactMasterySummary() { const { topics } = useReactMastery(); return useMemo(() => { const done = topics.filter(t => t.status === 'mastered').length; const active = topics.filter(t => t.status === 'learning' || t.status === 'practiced').length; return { progress: topics.length ? Math.round(done / topics.length * 100) : 0, done, active, left: topics.length - done - active } }, [topics]) }
