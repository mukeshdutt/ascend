export const CLAUDE_WEEK_STATUSES = ['not-started', 'in-progress', 'done'] as const
export type ClaudeWeekStatus = (typeof CLAUDE_WEEK_STATUSES)[number]

export const CLAUDE_WEEK_STATUS_LABEL: Record<ClaudeWeekStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
}

export type ClaudeWeek = {
  id: string
  week: number
  title: string
  material: string
  useCase: string
  deliverable: string
  status: ClaudeWeekStatus
  notes: string
}
