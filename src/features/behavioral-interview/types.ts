export type CategoryKey =
  | 'leadership'
  | 'conflict'
  | 'failure'
  | 'ownership'
  | 'ambiguity'
  | 'teamwork'
  | 'disagreement-with-manager'
  | 'prioritization'

export type StoryStatus = 'not-started' | 'drafted' | 'practiced' | 'interview-ready'

export type Story = {
  id: string
  question_text: string
  category: CategoryKey
  star_situation: string
  star_task: string
  star_action: string
  star_result: string
  confidence_rating: number // 0 = unrated, 1-5
  practiced_count: number
  last_practiced_date?: string // ISO YYYY-MM-DD
  status: StoryStatus
}

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'leadership', label: 'Leadership' },
  { key: 'conflict', label: 'Conflict' },
  { key: 'failure', label: 'Failure' },
  { key: 'ownership', label: 'Ownership' },
  { key: 'ambiguity', label: 'Ambiguity' },
  { key: 'teamwork', label: 'Teamwork' },
  { key: 'disagreement-with-manager', label: 'Disagreement w/ Manager' },
  { key: 'prioritization', label: 'Prioritization' },
]

export const CATEGORY_LABEL: Record<CategoryKey, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.key]: c.label }),
  {} as Record<CategoryKey, string>,
)

export const STATUSES: StoryStatus[] = ['not-started', 'drafted', 'practiced', 'interview-ready']

// ---- 6-week preparation plan ----

export type PlanTask = {
  id: string
  label: string
}

export type PlanSection = {
  id: string
  emoji: string
  title: string
  tasks: PlanTask[]
}

export type PlanWeek = {
  id: string
  code: string // e.g. "W1"
  title: string
  subtitle: string
  sections: PlanSection[]
}

export const STATUS_META: Record<StoryStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'bs-notstarted' },
  drafted: { label: 'Drafted', className: 'bs-drafted' },
  practiced: { label: 'Practiced', className: 'bs-practiced' },
  'interview-ready': { label: 'Interview Ready', className: 'bs-ready' },
}
