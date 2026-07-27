import type { Problem, Difficulty } from './types'
import { DIFFICULTIES } from './types'
import { daysFromToday } from './spacedRepetition'

export type TrackerStats = {
  total: number
  solved: number
  attempted: number
  notStarted: number
  needsRevisit: number
  progress: number // % solved of total
  solvedByDifficulty: Record<Difficulty, number>
  solvedByPattern: { pattern: string; count: number }[]
  solvedLast7: number
  solvedLast30: number
}

export function computeStats(problems: Problem[]): TrackerStats {
  const total = problems.length
  const solved = problems.filter((p) => p.status === 'solved').length
  const attempted = problems.filter((p) => p.status === 'attempted').length
  const needsRevisit = problems.filter((p) => p.status === 'needs-revisit').length
  const notStarted = problems.filter((p) => p.status === 'not-started').length

  const solvedByDifficulty = DIFFICULTIES.reduce(
    (acc, d) => {
      acc[d] = problems.filter((p) => p.status === 'solved' && p.difficulty === d).length
      return acc
    },
    {} as Record<Difficulty, number>,
  )

  const patternCounts = new Map<string, number>()
  for (const p of problems) {
    if (p.status !== 'solved') continue
    for (const pattern of p.patterns) {
      patternCounts.set(pattern, (patternCounts.get(pattern) ?? 0) + 1)
    }
  }
  const solvedByPattern = [...patternCounts.entries()]
    .map(([pattern, count]) => ({ pattern, count }))
    .sort((a, b) => b.count - a.count)

  const solvedWithin = (days: number) =>
    problems.filter(
      (p) =>
        p.status === 'solved' &&
        p.lastAttemptedDate &&
        daysFromToday(p.lastAttemptedDate) >= -days &&
        daysFromToday(p.lastAttemptedDate) <= 0,
    ).length

  return {
    total,
    solved,
    attempted,
    notStarted,
    needsRevisit,
    progress: total ? Math.round((solved / total) * 100) : 0,
    solvedByDifficulty,
    solvedByPattern,
    solvedLast7: solvedWithin(7),
    solvedLast30: solvedWithin(30),
  }
}
