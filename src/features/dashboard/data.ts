import type { Module, NavItem } from '../../shared/types'

export const modules: Module[] = [
  { name: 'Interview 2026', icon: 'clipboard', color: '#7851e8', progress: 68, done: 22, active: 18, left: 6, updated: 'Updated 2h ago' },
  { name: 'Technical Learning', icon: 'code', color: '#2879ee', progress: 72, done: 120, active: 60, left: 8, updated: 'Updated 1h ago' },
  { name: 'Behavioral Interview', icon: 'users', color: '#42b97d', progress: 55, done: 10, active: 7, left: 2, updated: 'Updated Yesterday' },
  { name: 'React Mastery', icon: 'atom', color: '#2eb8e7', progress: 60, done: 15, active: 10, left: 3, updated: 'Updated Yesterday' },
  { name: 'Golang Mastery', icon: 'box', color: '#2cb8bf', progress: 48, done: 8, active: 7, left: 3, updated: 'Updated 2d ago' },
  { name: 'Java Study Tracker', icon: 'coffee', color: '#ff8a26', progress: 65, done: 18, active: 14, left: 5, updated: 'Updated 1d ago' },
  { name: 'Agentic AI Learning', icon: 'bot', color: '#7851e8', progress: 58, done: 12, active: 9, left: 2, updated: 'Updated 3h ago' },
]

// Sidebar navigation: top-level views (Dashboard, Current Actions) followed
// by one link per module. "Current Actions" aggregates the in-progress items
// pulled from every module.
export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Current Actions', icon: 'activity' },
  ...modules.map((m): NavItem => ({ label: m.name, icon: m.icon })),
]

export const attention: { module: Module; lastUpdated: string; badge: string }[] = [
  { module: modules[4], lastUpdated: 'Last updated 2 days ago', badge: '2 days' },
  { module: modules[5], lastUpdated: 'Last updated 1 day ago', badge: '1 day' },
  { module: modules[2], lastUpdated: 'Last updated Yesterday', badge: '1 day' },
  { module: modules[3], lastUpdated: 'Last updated Yesterday', badge: '1 day' },
]

export type FocusItem = { title: string; module: string; time: string; color: string }

export const focus: FocusItem[] = [
  { title: 'Two Pointers – Problems', module: 'Technical Learning', time: '9:00 AM', color: '#7650e8' },
  { title: 'System Design Concepts', module: 'Interview 2026 (Java · GCP)', time: '11:00 AM', color: '#ff5961' },
  { title: 'STAR Method Practice', module: 'Behavioral Interview', time: '1:00 PM', color: '#42b97d' },
  { title: 'React useEffect Deep Dive', module: 'React Mastery', time: '3:00 PM', color: '#2879ee' },
  { title: 'Review Concurrency in Go', module: 'Golang Mastery', time: '5:00 PM', color: '#2cb8bf' },
]

export type ActivityRow = { item: string; module: string; status: string; when: string }

export const recentActivity: ActivityRow[] = [
  { item: 'DP – Longest Increasing Subsequence', module: 'Technical Learning', status: 'In Progress', when: '2 hours ago' },
  { item: 'C#.NET – Async/Await', module: 'Interview 2026', status: 'Done', when: '3 hours ago' },
  { item: 'Behavioral – Conflict Resolution', module: 'Behavioral Interview', status: 'In Progress', when: '5 hours ago' },
  { item: 'React – Component Lifecycle', module: 'React Mastery', status: 'In Progress', when: '6 hours ago' },
  { item: 'Go – Channels vs Mutex', module: 'Golang Mastery', status: 'Needs Revisit', when: 'Yesterday' },
]
