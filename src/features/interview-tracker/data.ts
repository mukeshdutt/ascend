import type { Topic } from './types'

export const seedTopics: Topic[] = [
  { id: 'it-1', track: 'Java·GCP', title: 'System design fundamentals', subtopic: 'Distributed systems', priority: 'P0', status: 'in-progress', resource_link: '', notes: 'Focus on trade-offs and diagrams.', last_studied_date: '2026-07-21', next_revisit_date: '2026-07-29' },
  { id: 'it-2', track: 'Java·GCP', title: 'JVM memory model', subtopic: 'Java core', priority: 'P0', status: 'needs-revisit', notes: '', last_studied_date: '2026-07-04' },
  { id: 'it-3', track: 'Go·AWS', title: 'Goroutines and channels', subtopic: 'Concurrency', priority: 'P0', status: 'in-progress', notes: '', last_studied_date: '2026-07-20' },
  { id: 'it-4', track: 'C#.NET·Azure', title: 'Async/Await', subtopic: 'Runtime', priority: 'P1', status: 'done', notes: '', last_studied_date: '2026-07-19' },
  { id: 'it-5', track: 'Python', title: 'Python data model', subtopic: 'Language core', priority: 'P1', status: 'not-started', notes: '', last_studied_date: '' },
  { id: 'it-6', track: 'Claude Code', title: 'Agent workflows', subtopic: 'Tool use', priority: 'P1', status: 'in-progress', notes: '', last_studied_date: '2026-07-22' },
  { id: 'it-7', track: 'React', title: 'Rendering and effects', subtopic: 'Hooks', priority: 'P0', status: 'needs-revisit', notes: '', last_studied_date: '2026-07-08' },
  { id: 'it-8', track: 'Database', title: 'Query optimization', subtopic: 'SQL', priority: 'P0', status: 'not-started', notes: '', last_studied_date: '' },
  { id: 'it-9', track: 'DevOps', title: 'Kubernetes deployment patterns', subtopic: 'Kubernetes', priority: 'P1', status: 'done', notes: '', last_studied_date: '2026-07-17' },
  { id: 'it-10', track: 'Security', title: 'Threat modeling', subtopic: 'Application security', priority: 'P0', status: 'not-started', notes: '', last_studied_date: '' },
  { id: 'it-11', track: 'Monitoring', title: 'SLOs and error budgets', subtopic: 'Observability', priority: 'P2', status: 'not-started', notes: '', last_studied_date: '' },
  { id: 'it-12', track: 'Resume & Apply', title: 'Senior engineering resume', subtopic: 'Resume', priority: 'P0', status: 'in-progress', notes: '', last_studied_date: '2026-07-23' },
]
