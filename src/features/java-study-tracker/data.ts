import type { JavaTopic } from './types'
export const seedJavaTopics: JavaTopic[] = [
  { id: 'java-1', category: 'Core Java', title: 'Records, sealed classes, and pattern matching', status: 'practiced', resource_link: '', gcp_service_involved: '', notes: 'Use records for transparent immutable data.' },
  { id: 'java-2', category: 'Concurrency & JVM', title: 'Virtual threads and structured concurrency', status: 'learning', resource_link: '', gcp_service_involved: 'Cloud Run', notes: 'Understand blocking I/O workloads.' },
  { id: 'java-3', category: 'Spring/Spring Boot', title: 'Spring Boot observability', status: 'mastered', resource_link: '', gcp_service_involved: 'Cloud Monitoring', notes: 'Expose metrics and traces intentionally.' },
  { id: 'java-4', category: 'GCP Services', title: 'Pub/Sub ordered delivery and retries', status: 'learning', resource_link: '', gcp_service_involved: 'Pub/Sub', notes: 'Design idempotent consumers.' },
  { id: 'java-5', category: 'GCP Services', title: 'BigQuery client patterns', status: 'not-started', resource_link: '', gcp_service_involved: 'BigQuery', notes: '' },
  { id: 'java-6', category: 'Testing', title: 'Integration tests with Testcontainers', status: 'practiced', resource_link: '', gcp_service_involved: '', notes: '' },
  { id: 'java-7', category: 'Performance & Profiling', title: 'JFR and async-profiler', status: 'mastered', resource_link: '', gcp_service_involved: 'Cloud Run', notes: 'Start with a representative load profile.' },
]
