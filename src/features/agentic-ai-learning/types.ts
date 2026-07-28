export const AI_PHASES = [
  'Foundation — Weeks 1–2',
  'Phase 1 — AI Application Engineering',
  'Phase 2 — AI System Design',
  'Phase 3 — Agentic AI',
] as const
export type AiPhase = (typeof AI_PHASES)[number]

export const AI_STATUSES = ['not-started', 'in-progress', 'done'] as const
export type AiStatus = (typeof AI_STATUSES)[number]
export const AI_STATUS_LABEL: Record<AiStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
}

export type TopicItem = { text: string; done: boolean }

export type StudyWeek = {
  id: string
  weekNum: string
  weekTitle: string
  phase: AiPhase
  topics: TopicItem[]
  status: AiStatus
}

export type UseCase = {
  id: string
  weekNum: string
  phase: AiPhase
  title: string
  description: string
  status: AiStatus
}
