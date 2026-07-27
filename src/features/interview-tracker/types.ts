export const TRACKS = ['Java·GCP', 'Go·AWS', 'C#.NET·Azure', 'Python', 'Claude Code', 'React', 'Database', 'DevOps', 'Security', 'Monitoring', 'Resume & Apply'] as const
export type InterviewTrack = (typeof TRACKS)[number]
export const PRIORITIES = ['P0', 'P1', 'P2'] as const
export type TopicPriority = (typeof PRIORITIES)[number]
export const TOPIC_STATUSES = ['not-started', 'in-progress', 'done', 'needs-revisit'] as const
export type TopicStatus = (typeof TOPIC_STATUSES)[number]

export type Topic = {
  id: string
  track: InterviewTrack
  title: string
  subtopic: string
  priority: TopicPriority
  status: TopicStatus
  resource_link?: string
  notes: string
  last_studied_date: string
  next_revisit_date?: string
}

export const STATUS_LABEL: Record<TopicStatus, string> = {
  'not-started': 'Not started', 'in-progress': 'In progress', done: 'Done', 'needs-revisit': 'Needs revisit',
}
