export const JAVA_WEEK_STATUSES = ['not-started', 'in-progress', 'done'] as const
export type JavaWeekStatus = (typeof JAVA_WEEK_STATUSES)[number]
export const JAVA_WEEK_STATUS_LABEL: Record<JavaWeekStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  done: 'Done',
}

export const JAVA_TAGS = ['concept', 'code', 'project', 'cloud', 'interview'] as const
export type JavaTag = (typeof JAVA_TAGS)[number]

export type JavaTask = {
  id: string
  title: string
  tag: JavaTag
  done: boolean
}

export type JavaSection = {
  name: string
  tasks: JavaTask[]
}

export type JavaWeek = {
  id: string
  week: number
  title: string
  description: string
  sections: JavaSection[]
  status: JavaWeekStatus
  notes: string
}
