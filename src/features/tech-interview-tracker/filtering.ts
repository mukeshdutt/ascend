import type { Problem, Difficulty, ProblemStatus } from './types'
import { DIFFICULTIES, STATUSES } from './types'
import { isDue } from './spacedRepetition'

export type Filters = {
  search: string
  pattern: string // '' = all
  difficulty: '' | Difficulty
  status: '' | ProblemStatus
  language: string // '' = all
  dueOnly: boolean
}

export const defaultFilters: Filters = {
  search: '',
  pattern: '',
  difficulty: '',
  status: '',
  language: '',
  dueOnly: false,
}

export function applyFilters(problems: Problem[], f: Filters): Problem[] {
  return problems.filter((p) => {
    if (f.search && !p.title.toLowerCase().includes(f.search.toLowerCase())) return false
    if (f.pattern && !p.patterns.includes(f.pattern)) return false
    if (f.difficulty && p.difficulty !== f.difficulty) return false
    if (f.status && p.status !== f.status) return false
    if (f.language && p.language !== f.language) return false
    if (f.dueOnly && !isDue(p.nextRevisitDate)) return false
    return true
  })
}

export type SortKey =
  | 'title'
  | 'source'
  | 'difficulty'
  | 'status'
  | 'language'
  | 'timeTakenMinutes'
  | 'lastAttemptedDate'
  | 'nextRevisitDate'

export type SortDir = 'asc' | 'desc'
export type SortState = { key: SortKey; dir: SortDir }

const difficultyRank: Record<Difficulty, number> = DIFFICULTIES.reduce(
  (acc, d, i) => ({ ...acc, [d]: i }),
  {} as Record<Difficulty, number>,
)
const statusRank: Record<ProblemStatus, number> = STATUSES.reduce(
  (acc, s, i) => ({ ...acc, [s]: i }),
  {} as Record<ProblemStatus, number>,
)

function compareValues(a: Problem, b: Problem, key: SortKey): number {
  switch (key) {
    case 'difficulty':
      return difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
    case 'status':
      return statusRank[a.status] - statusRank[b.status]
    case 'timeTakenMinutes':
      return (a.timeTakenMinutes ?? -1) - (b.timeTakenMinutes ?? -1)
    case 'lastAttemptedDate':
    case 'nextRevisitDate':
      return (a[key] ?? '').localeCompare(b[key] ?? '')
    default:
      return (a[key] ?? '').localeCompare(b[key] ?? '')
  }
}

export function sortProblems(problems: Problem[], sort: SortState): Problem[] {
  const dir = sort.dir === 'asc' ? 1 : -1
  return [...problems].sort((a, b) => compareValues(a, b, sort.key) * dir)
}
