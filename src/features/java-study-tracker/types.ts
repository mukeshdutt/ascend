export const JAVA_CATEGORIES = ['Core Java', 'Concurrency & JVM', 'Spring/Spring Boot', 'GCP Services', 'Testing', 'Performance & Profiling'] as const
export type JavaCategory = (typeof JAVA_CATEGORIES)[number]
export const JAVA_STATUSES = ['not-started', 'learning', 'practiced', 'mastered'] as const
export type JavaStatus = (typeof JAVA_STATUSES)[number]
export type JavaTopic = { id: string; category: JavaCategory; title: string; status: JavaStatus; resource_link: string; gcp_service_involved: string; notes: string }
export const JAVA_STATUS_LABEL: Record<JavaStatus, string> = { 'not-started': 'Not started', learning: 'Learning', practiced: 'Practiced', mastered: 'Mastered' }
