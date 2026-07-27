import type { ReactTopic } from './types'
export const seedReactTopics: ReactTopic[] = [
  { id: 'react-1', category: 'Core', title: 'State and derived state', status: 'mastered', resource_link: 'https://react.dev/learn/managing-state', project_applied: 'interview-tracks-v3', notes: 'Keep state minimal and derive the rest.' },
  { id: 'react-2', category: 'Core', title: 'Effects and lifecycle', status: 'learning', resource_link: 'https://react.dev/learn/synchronizing-with-effects', project_applied: '', notes: 'Know when an effect is unnecessary.' },
  { id: 'react-3', category: 'Patterns', title: 'Composition patterns', status: 'practiced', resource_link: '', project_applied: 'iterit', notes: 'Prefer composition over configuration props.' },
  { id: 'react-4', category: 'Performance', title: 'Memoization and profiling', status: 'mastered', resource_link: '', project_applied: '', notes: 'Profile before adding memoization.' },
  { id: 'react-5', category: 'State Management', title: 'Context boundaries', status: 'not-started', resource_link: '', project_applied: '', notes: '' },
  { id: 'react-6', category: 'Testing', title: 'React Testing Library queries', status: 'practiced', resource_link: 'https://testing-library.com/docs/react-testing-library/intro/', project_applied: 'interview-tracks-v3', notes: 'Test through user behavior.' },
  { id: 'react-7', category: 'Advanced', title: 'Suspense and streaming', status: 'learning', resource_link: '', project_applied: '', notes: '' },
]
