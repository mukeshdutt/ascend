import { modules } from './data'
import type { Module } from '../../shared/types'
import { useTechTrackerSummary } from '../tech-interview-tracker/store'
import { useBehavioralSummary } from '../behavioral-interview/store'
import { useInterviewTrackerSummary } from '../interview-tracker/store'
import { useReactMasterySummary } from '../react-mastery/store'
import { useGolangMasterySummary } from '../golang-mastery/store'
import { useJavaStudySummary } from '../java-study-tracker/store'
import { useAgenticAiSummary } from '../agentic-ai-learning/store'

/**
 * Dashboard module cards with live figures merged in from feature stores, so
 * the shared dashboard stays in sync with each module:
 *  - Technical Learning → total solved / total tracked
 *  - Behavioral Interview   → stories at interview-ready / 40
 */
export function useDashboardModules(): Module[] {
  const tech = useTechTrackerSummary()
  const behavioral = useBehavioralSummary()
  const interview = useInterviewTrackerSummary()
  const react = useReactMasterySummary()
  const golang = useGolangMasterySummary()
  const java = useJavaStudySummary()
  const agenticAi = useAgenticAiSummary()

  return modules.map((m) => {
    if (m.name === 'Interview 2026') {
      return { ...m, progress: interview.progress, done: interview.done, active: interview.active, left: interview.left, updated: interview.updated ? `Updated ${interview.updated}` : 'No study activity yet' }
    }
    if (m.name === 'Technical Learning') {
      return { ...m, progress: tech.progress, done: tech.solved, active: tech.attempted, left: tech.left }
    }
    if (m.name === 'Behavioral Interview') {
      return {
        ...m,
        progress: behavioral.progress,
        done: behavioral.ready,
        active: behavioral.inProgress,
        left: behavioral.notStarted,
      }
    }
    if (m.name === 'React Mastery') {
      return { ...m, progress: react.progress, done: react.done, active: react.active, left: react.left }
    }
    if (m.name === 'Golang Mastery') {
      return { ...m, progress: golang.progress, done: golang.done, active: golang.active, left: golang.left }
    }
    if (m.name === 'Java Study Tracker') {
      return { ...m, progress: java.progress, done: java.done, active: java.active, left: java.left }
    }
    if (m.name === 'Agentic AI Learning') {
      return { ...m, progress: agenticAi.progress, done: agenticAi.done, active: agenticAi.active, left: agenticAi.left }
    }
    return m
  })
}
