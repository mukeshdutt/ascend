export const REACT_CATEGORIES = ['Fundamentals', 'Tailwind & shadcn', 'Architectures', 'Advanced React'] as const
export type ReactCategory = (typeof REACT_CATEGORIES)[number]
export const REACT_STATUSES = ['not-started', 'learning', 'practiced', 'mastered'] as const
export type ReactStatus = (typeof REACT_STATUSES)[number]
export const REACT_PHASES = ['Tab 1 — React (Fundamentals)', 'Tab 2 — Tailwind & shadcn', 'Tab 3 — React Architectures', 'Tab 4 — Advanced React'] as const
export type ReactPhase = (typeof REACT_PHASES)[number]

export type ProjectRef = {
  file?: string
  code?: string
  description?: string
}

export type LessonContent = {
  concept: string
  inYourProject: ProjectRef[]
  watchOut: string[]
  tryIt: string
}

export type ReactTopic = {
  id: string
  category: ReactCategory
  phase: ReactPhase
  lessonNum: string
  title: string
  status: ReactStatus
  content: LessonContent
  notes: string
}

export const REACT_STATUS_LABEL: Record<ReactStatus, string> = {
  'not-started': 'Not started',
  learning: 'Learning',
  practiced: 'Practiced',
  mastered: 'Mastered',
}
