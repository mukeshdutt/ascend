/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedGoTopics } from './data'
import type { GoTopic } from './types'
type NewTopic = Omit<GoTopic, 'id'>
type Value = { topics: GoTopic[]; addTopic: (t: NewTopic) => void; updateTopic: (id: string, t: NewTopic) => void; patchTopic: (id: string, p: Partial<GoTopic>) => void; deleteTopic: (id: string) => void }
const Context = createContext<Value | null>(null); let ids = 0
export function GolangMasteryProvider({ children }: { children: ReactNode }) { const [topics, setTopics] = useState(seedGoTopics); const addTopic = useCallback((t: NewTopic) => setTopics(p => [{ ...t, id: `go-${Date.now().toString(36)}-${ids++}` }, ...p]), []); const updateTopic = useCallback((id: string, t: NewTopic) => setTopics(p => p.map(x => x.id === id ? { ...t, id } : x)), []); const patchTopic = useCallback((id: string, p: Partial<GoTopic>) => setTopics(x => x.map(t => t.id === id ? { ...t, ...p } : t)), []); const deleteTopic = useCallback((id: string) => setTopics(x => x.filter(t => t.id !== id)), []); const value = useMemo(() => ({ topics, addTopic, updateTopic, patchTopic, deleteTopic }), [topics, addTopic, updateTopic, patchTopic, deleteTopic]); return <Context.Provider value={value}>{children}</Context.Provider> }
export function useGolangMastery() { const c = useContext(Context); if (!c) throw new Error('useGolangMastery must be used inside GolangMasteryProvider'); return c }
export function useGolangMasterySummary() { const { topics } = useGolangMastery(); return useMemo(() => { const done = topics.filter(t => t.status === 'mastered').length; const active = topics.filter(t => t.status === 'learning' || t.status === 'practiced').length; return { progress: topics.length ? Math.round(done / topics.length * 100) : 0, done, active, left: topics.length - done - active } }, [topics]) }
