import type { Story } from './types'

export type BehavioralSummary = {
  total: number
  interviewReady: number
  notStarted: number
  drafted: number
  practiced: number
  inProgress: number // drafted + practiced
  avgConfidence: number // mean over rated stories (rating >= 1)
  ratedCount: number
  totalPracticed: number // sum of practiced_count
}

export function computeSummary(stories: Story[]): BehavioralSummary {
  const total = stories.length
  const interviewReady = stories.filter((s) => s.status === 'interview-ready').length
  const notStarted = stories.filter((s) => s.status === 'not-started').length
  const drafted = stories.filter((s) => s.status === 'drafted').length
  const practiced = stories.filter((s) => s.status === 'practiced').length

  const rated = stories.filter((s) => s.confidence_rating >= 1)
  const avgConfidence = rated.length
    ? Math.round((rated.reduce((sum, s) => sum + s.confidence_rating, 0) / rated.length) * 10) / 10
    : 0

  return {
    total,
    interviewReady,
    notStarted,
    drafted,
    practiced,
    inProgress: drafted + practiced,
    avgConfidence,
    ratedCount: rated.length,
    totalPracticed: stories.reduce((sum, s) => sum + s.practiced_count, 0),
  }
}
