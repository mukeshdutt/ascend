// ── Tab 1: Cloud Projects (AWS & GCP phases) ─────────────────────
export const CLOUD_DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'] as const
export type CloudDifficulty = (typeof CLOUD_DIFFICULTIES)[number]
export const CLOUD_PROVIDERS = ['AWS', 'GCP', 'Both'] as const
export type CloudProvider = (typeof CLOUD_PROVIDERS)[number]
export const PROJECT_STATUSES = ['not-started', 'in-progress', 'completed'] as const
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]
export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  'not-started': 'Not started', 'in-progress': 'In Progress', 'completed': 'Completed',
}
export type CloudProject = {
  id: string; phaseId: number; serviceName: string; cloud: CloudProvider; icon: string
  projectTitle: string; goal: string; steps: string[]; hint: string
  difficulty: CloudDifficulty; status: ProjectStatus
}
export type CloudPhaseInfo = {
  id: number; label: string; title: string; emoji: string; duration: string; color: string
}
export const CLOUD_PHASES: CloudPhaseInfo[] = [
  { id: 1, label: 'Phase 1', title: 'Foundation',            emoji: '🧱', duration: '4–6 weeks', color: '#0ea5e9' },
  { id: 2, label: 'Phase 2', title: 'Compute & Containers',  emoji: '📦', duration: '5–7 weeks', color: '#8b5cf6' },
  { id: 3, label: 'Phase 3', title: 'Data & Databases',      emoji: '🗃', duration: '5–7 weeks', color: '#10b981' },
  { id: 4, label: 'Phase 4', title: 'Networking & Security', emoji: '🔒', duration: '4–6 weeks', color: '#f97316' },
  { id: 5, label: 'Phase 5', title: 'DevOps & IaC',          emoji: '⚙️', duration: '5–6 weeks', color: '#ec4899' },
  { id: 6, label: 'Phase 6', title: 'AI / ML & Advanced',    emoji: '🧠', duration: '6–8 weeks', color: '#eab308' },
]

// ── Tab 2: AWS Build Order ────────────────────────────────────────
export const BUILD_ORDER_PHASES = ['small', 'intermediate'] as const
export type BuildOrderPhase = (typeof BUILD_ORDER_PHASES)[number]
export const GO_LEVELS = ['required', 'optional', 'not-required'] as const
export type GoLevel = (typeof GO_LEVELS)[number]
export type BuildOrderProject = {
  id: number; phase: BuildOrderPhase; title: string; services: string[]
  go: GoLevel; goNote: string; libs: string[]; desc: string; done: boolean
}

// ── Tab 3: GCP × Java Path ────────────────────────────────────────
export const JAVA_LEVELS = ['core', 'optional', 'none'] as const
export type JavaLevel = (typeof JAVA_LEVELS)[number]
export type GcpPhaseInfo = { id: string; title: string; subtitle: string }
export const GCP_JAVA_PHASES: GcpPhaseInfo[] = [
  { id: 'P.01', title: 'Beginner — single-service builds',         subtitle: 'one core GCP service each, Java writes the application logic' },
  { id: 'P.02', title: 'Intermediate — multi-service systems',     subtitle: 'services compose; Java is core, the surrounding plumbing isn\'t' },
  { id: 'P.03', title: 'Intermediate — infrastructure & ops',      subtitle: 'the code mostly already exists; this phase is config, infra, and ops' },
]
export type GcpJavaProject = {
  id: string; phaseId: string; title: string; flow: string
  teaches: string; chips: string[]; javaLevel: JavaLevel; done: boolean
}
