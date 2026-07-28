export const TRACKS = ['Java·GCP', 'Go·AWS', 'C#.NET·Azure', 'Python', 'Claude Code', 'React', 'Database', 'DevOps', 'Security', 'Monitoring', 'Resume & Apply'] as const
export type InterviewTrack = (typeof TRACKS)[number]
export const PRIORITIES = ['P0', 'P1', 'P2'] as const
export type TopicPriority = (typeof PRIORITIES)[number]
export const TOPIC_STATUSES = ['not-started', 'in-progress', 'done', 'needs-revisit'] as const
export type TopicStatus = (typeof TOPIC_STATUSES)[number]
export const PHASES = ['revise', 'learning', 'projects', 'confident', 'continue'] as const
export type TopicPhase = (typeof PHASES)[number]

export type Topic = {
  id: string
  track: InterviewTrack
  phase: TopicPhase
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

export const PHASE_LABEL: Record<TopicPhase, string> = {
  revise: 'Revise', learning: 'Learning', projects: 'Projects', confident: 'Confident', continue: 'Continue',
}

export const PHASE_DESC: Record<TopicPhase, string> = {
  revise: 'Refresh what you once knew — the basics interviews assume.',
  learning: 'New material to learn for interview purposes.',
  projects: 'Learn by building. Ship Beginner before starting Intermediate.',
  confident: "Confident = survives three consecutive 'why' follow-ups, aloud.",
  continue: 'Maintenance cadence — keep sharp without burnout.',
}

export const TRACK_NOTE: Record<InterviewTrack, string> = {
  'Java·GCP': 'Primary for Amex-aligned roles. DSA & system design live in your other artifacts.',
  'Go·AWS': 'Your senior systems story (ANF). Close the Claude Code understanding gap here.',
  'C#.NET·Azure': 'Parked track — activate only for a specific .NET role. Scope below = hireable, not just conversational.',
  'Python': 'Deliberately scoped: fallback scripting + API/DB gap. Resist inflating this tab.',
  'Claude Code': 'Your AI tab: tool fluency → architecture → judgment, plus agentic AI interview material.',
  'React': 'Modern stack gap. Practice ground already exists: Akshar Shiksha (Vite/React/TS) + DiagnoCare (TanStack/Zustand/Tailwind).',
  'Database': 'SQL depth + data modeling. You have MySQL (DiagnoCare) — Postgres is the interview standard.',
  'DevOps': 'Containers → Kubernetes → CI/CD → IaC. This is where your GitHub Actions exploration gets systematic.',
  'Security': 'AppSec for backend seniors — auth flows, OWASP, secrets. Woven into every 2026 interview round.',
  'Monitoring': 'Observability = the senior signal. Mentioning monitoring unprompted marks production experience.',
  'Resume & Apply': "Enter when one anchor track (Go·AWS or Java·GCP) ≥ 60% + Database & DevOps ≥ 50%. Don't wait for perfection.",
}
