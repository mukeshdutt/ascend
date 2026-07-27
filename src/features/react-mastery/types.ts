export const REACT_CATEGORIES = ['Core', 'Patterns', 'Performance', 'State Management', 'Testing', 'Advanced'] as const
export type ReactCategory = (typeof REACT_CATEGORIES)[number]
export const REACT_STATUSES = ['not-started', 'learning', 'practiced', 'mastered'] as const
export type ReactStatus = (typeof REACT_STATUSES)[number]
export type ReactTopic = { id: string; category: ReactCategory; title: string; status: ReactStatus; resource_link: string; project_applied: string; notes: string }
export const REACT_STATUS_LABEL: Record<ReactStatus, string> = { 'not-started': 'Not started', learning: 'Learning', practiced: 'Practiced', mastered: 'Mastered' }
