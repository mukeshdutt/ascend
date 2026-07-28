export type ItemState = 'todo' | 'wip' | 'done'

export const ITEM_STATES: ItemState[] = ['todo', 'wip', 'done']

export const NEXT_STATE: Record<ItemState, ItemState> = {
  todo: 'wip',
  wip: 'done',
  done: 'todo',
}

export type TrackerId = 'interview' | 'learning'

export type TrackerMeta = {
  id: TrackerId
  title: string
  emoji: string
  created: string
  updated: string
  backend: string
}

export const TRACKERS: TrackerMeta[] = [
  { id: 'interview', title: 'Interview Tracker', emoji: '🎯', created: 'May 23, 2026', updated: 'Jul 28, 2026', backend: 'Notion' },
  { id: 'learning', title: 'Learning Tracker', emoji: '📚', created: 'May 22, 2026', updated: 'Jul 28, 2026', backend: 'Notion' },
]

export type TrackItem = { id: string; title: string }

export type TrackPhase = { id: string; title: string; items: TrackItem[] }

export type TrackArea = { id: string; label: string; emoji: string; phases: TrackPhase[] }
