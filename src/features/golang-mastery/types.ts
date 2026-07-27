export const GO_CATEGORIES = ['Language Fundamentals', 'Concurrency', 'Standard Library', 'Testing & Benchmarking', 'Tooling', 'Cloud/AWS Integration', 'Distributed Systems Patterns'] as const
export type GoCategory = (typeof GO_CATEGORIES)[number]
export const GO_STATUSES = ['not-started', 'learning', 'practiced', 'mastered'] as const
export type GoStatus = (typeof GO_STATUSES)[number]
export type GoTopic = { id: string; category: GoCategory; title: string; status: GoStatus; resource_link: string; applied_in_project: string; notes: string }
export const GO_STATUS_LABEL: Record<GoStatus, string> = { 'not-started': 'Not started', learning: 'Learning', practiced: 'Practiced', mastered: 'Mastered' }
