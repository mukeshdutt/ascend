export type ProblemSource = 'LeetCode' | 'HackerRank' | 'Company' | 'Other'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type ProblemStatus = 'not-started' | 'attempted' | 'solved' | 'needs-revisit'
export type Language = 'Go' | 'Java' | 'Python' | 'C#'

export type Problem = {
  id: string
  title: string
  source: ProblemSource
  patterns: string[]
  difficulty: Difficulty
  status: ProblemStatus
  language?: Language
  timeTakenMinutes?: number
  solutionNotes: string
  lastAttemptedDate?: string // ISO YYYY-MM-DD
  nextRevisitDate?: string // ISO YYYY-MM-DD
  /** Number of successful solves — drives spaced-repetition interval progression. */
  revisitCount: number
}

export const SOURCES: ProblemSource[] = ['LeetCode', 'HackerRank', 'Company', 'Other']
export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
export const STATUSES: ProblemStatus[] = ['not-started', 'attempted', 'solved', 'needs-revisit']
export const LANGUAGES: Language[] = ['Go', 'Java', 'Python', 'C#']

export const COMMON_PATTERNS = [
  'Arrays',
  'Hash Map',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'DP',
  'Greedy',
  'Graphs',
  'Trees',
  'Backtracking',
  'Stack',
  'Heap',
  'Linked List',
  'Intervals',
]

export const STATUS_META: Record<ProblemStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'st-notstarted' },
  attempted: { label: 'Attempted', className: 'st-attempted' },
  solved: { label: 'Solved', className: 'st-solved' },
  'needs-revisit': { label: 'Needs Revisit', className: 'st-revisit' },
}

export const DIFFICULTY_META: Record<Difficulty, { className: string; color: string }> = {
  Easy: { className: 'df-easy', color: '#1caa66' },
  Medium: { className: 'df-medium', color: '#e0912a' },
  Hard: { className: 'df-hard', color: '#f14d3e' },
}
