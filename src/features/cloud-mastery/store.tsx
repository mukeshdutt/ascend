/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { seedBuildOrder, seedCloudProjects, seedGcpJava } from './data'
import type { BuildOrderProject, CloudProject, GcpJavaProject, ProjectStatus } from './types'

type Value = {
  cloudProjects: CloudProject[]
  patchCloudStatus: (id: string, status: ProjectStatus) => void
  buildOrder: BuildOrderProject[]
  toggleBuildDone: (id: number) => void
  gcpJava: GcpJavaProject[]
  toggleGcpDone: (id: string) => void
}

const Context = createContext<Value | null>(null)

export function CloudMasteryProvider({ children }: { children: ReactNode }) {
  const [cloudProjects, setCloudProjects] = useState(seedCloudProjects)
  const [buildOrder, setBuildOrder] = useState(seedBuildOrder)
  const [gcpJava, setGcpJava] = useState(seedGcpJava)

  const patchCloudStatus = useCallback((id: string, status: ProjectStatus) =>
    setCloudProjects(p => p.map(x => x.id === id ? { ...x, status } : x)), [])

  const toggleBuildDone = useCallback((id: number) =>
    setBuildOrder(p => p.map(x => x.id === id ? { ...x, done: !x.done } : x)), [])

  const toggleGcpDone = useCallback((id: string) =>
    setGcpJava(p => p.map(x => x.id === id ? { ...x, done: !x.done } : x)), [])

  const value = useMemo(() => ({ cloudProjects, patchCloudStatus, buildOrder, toggleBuildDone, gcpJava, toggleGcpDone }),
    [cloudProjects, patchCloudStatus, buildOrder, toggleBuildDone, gcpJava, toggleGcpDone])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCloudMastery() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useCloudMastery must be inside CloudMasteryProvider')
  return ctx
}

export function useCloudMasterySummary() {
  const { cloudProjects } = useCloudMastery()
  return useMemo(() => {
    const done = cloudProjects.filter(p => p.status === 'completed').length
    const active = cloudProjects.filter(p => p.status === 'in-progress').length
    return { progress: cloudProjects.length ? Math.round(done / cloudProjects.length * 100) : 0, done, active, left: cloudProjects.length - done - active }
  }, [cloudProjects])
}
