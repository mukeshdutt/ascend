import type { GoTopic } from './types'
export const seedGoTopics: GoTopic[] = [
  { id: 'go-1', category: 'Language Fundamentals', title: 'Interfaces and method sets', status: 'practiced', resource_link: 'https://go.dev/tour/methods/9', applied_in_project: 'cloud-engineering-labs', notes: 'Keep interfaces small and consumer-owned.' },
  { id: 'go-2', category: 'Concurrency', title: 'Goroutines and cancellation', status: 'learning', resource_link: 'https://go.dev/blog/context', applied_in_project: 'distributed-systems-lab', notes: 'Always ensure a goroutine has a termination path.' },
  { id: 'go-3', category: 'Concurrency', title: 'Channels, select, and backpressure', status: 'mastered', resource_link: '', applied_in_project: '', notes: 'Avoid closing channels from receivers; nil channels can gate select cases.' },
  { id: 'go-4', category: 'Standard Library', title: 'net/http server design', status: 'practiced', resource_link: '', applied_in_project: 'cloud-engineering-labs', notes: '' },
  { id: 'go-5', category: 'Testing & Benchmarking', title: 'Table tests and benchmarks', status: 'not-started', resource_link: '', applied_in_project: '', notes: '' },
  { id: 'go-6', category: 'Tooling', title: 'pprof CPU and heap profiles', status: 'learning', resource_link: '', applied_in_project: '', notes: '' },
  { id: 'go-7', category: 'Cloud/AWS Integration', title: 'AWS SDK v2 clients', status: 'not-started', resource_link: '', applied_in_project: '', notes: '' },
  { id: 'go-8', category: 'Distributed Systems Patterns', title: 'Idempotent consumers', status: 'mastered', resource_link: '', applied_in_project: 'distributed-systems-lab', notes: 'Store and check a durable idempotency key.' },
]
