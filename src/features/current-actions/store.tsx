/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { SubTask, SubTasksIndex } from './types'
import { seedSubTasksIndex } from './data'

let ids = 0
const makeKey = (moduleKey: string, itemId: string) => `${moduleKey}::${itemId}`

type Value = {
  index: SubTasksIndex
  getSubTasks: (moduleKey: string, itemId: string) => SubTask[]
  addSubTask: (moduleKey: string, itemId: string, title: string) => void
  toggleSubTask: (moduleKey: string, itemId: string, subId: string) => void
  deleteSubTask: (moduleKey: string, itemId: string, subId: string) => void
}

const Context = createContext<Value | null>(null)

export function CurrentActionsProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<SubTasksIndex>(seedSubTasksIndex)

  const getSubTasks = useCallback((moduleKey: string, itemId: string): SubTask[] => {
    return index[makeKey(moduleKey, itemId)] ?? []
  }, [index])

  const addSubTask = useCallback((moduleKey: string, itemId: string, title: string) => {
    const key = makeKey(moduleKey, itemId)
    const st: SubTask = { id: `st-${Date.now().toString(36)}-${ids++}`, title, done: false, notes: '', createdAt: new Date().toISOString() }
    setIndex(prev => ({ ...prev, [key]: [...(prev[key] ?? []), st] }))
  }, [])

  const toggleSubTask = useCallback((moduleKey: string, itemId: string, subId: string) => {
    const key = makeKey(moduleKey, itemId)
    setIndex(prev => ({ ...prev, [key]: (prev[key] ?? []).map(st => st.id === subId ? { ...st, done: !st.done } : st) }))
  }, [])

  const deleteSubTask = useCallback((moduleKey: string, itemId: string, subId: string) => {
    const key = makeKey(moduleKey, itemId)
    setIndex(prev => ({ ...prev, [key]: (prev[key] ?? []).filter(st => st.id !== subId) }))
  }, [])

  const value = useMemo(() => ({ index, getSubTasks, addSubTask, toggleSubTask, deleteSubTask }), [index, getSubTasks, addSubTask, toggleSubTask, deleteSubTask])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCurrentActions() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useCurrentActions must be inside CurrentActionsProvider')
  return ctx
}
