import { useMemo, useState } from 'react'
import { trackerAreas } from './data'
import { countStates, useTechLearning } from './store'
import { TRACKERS } from './types'
import type { ItemState, TrackItem, TrackerId } from './types'

const STATE_GLYPH: Record<ItemState, string> = { todo: '', wip: '~', done: '✓' }
const STATE_HINT: Record<ItemState, string> = {
  todo: 'Mark in progress',
  wip: 'Mark done',
  done: 'Reset to not started',
}

type AreaTab = 'active' | string

function TriStateCheck({ state, onCycle }: { state: ItemState; onCycle: () => void }) {
  return (
    <button
      className={`tl-check tl-check--${state}`}
      onClick={onCycle}
      title={STATE_HINT[state]}
      aria-label={STATE_HINT[state]}
    >
      {STATE_GLYPH[state]}
    </button>
  )
}

function ItemRow({ item, state, onCycle }: { item: TrackItem; state: ItemState; onCycle: () => void }) {
  return (
    <div className={`tl-item tl-item--${state}`}>
      <TriStateCheck state={state} onCycle={onCycle} />
      <span className="tl-item-name">{item.title}</span>
      {state === 'wip' && <span className="tl-wip-badge">in progress</span>}
    </div>
  )
}

export function TechLearningTracker({ tracker }: { tracker: TrackerId }) {
  const { states, cycleItem } = useTechLearning()
  const state = states[tracker]
  const meta = TRACKERS.find((t) => t.id === tracker)!
  const areas = trackerAreas[tracker]
  const [areaTab, setAreaTab] = useState<AreaTab>(areas[0].id)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const stats = useMemo(() => countStates(tracker, state), [tracker, state])
  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0

  const areaStats = useMemo(() =>
    areas.map((a) => {
      let done = 0
      let wip = 0
      let total = 0
      for (const p of a.phases)
        for (const i of p.items) {
          total += 1
          const s = state[i.id] ?? 'todo'
          if (s === 'done') done += 1
          else if (s === 'wip') wip += 1
        }
      return { area: a, done, wip, total }
    }), [areas, state])

  // ⚡ Active view: every in-progress item, grouped area → phase.
  const activeGroups = useMemo(() =>
    areas
      .flatMap((a) =>
        a.phases.map((p) => ({
          area: a,
          phase: p,
          items: p.items.filter((i) => (state[i.id] ?? 'todo') === 'wip'),
        })),
      )
      .filter((g) => g.items.length > 0), [areas, state])

  const currentArea = areas.find((a) => a.id === areaTab)

  return (
    <div className="tl-tracker">
      <div className="tl-meta">
        <span className="tl-meta-chip">🔗 {meta.backend}</span>
        <span className="tl-meta-chip">Created {meta.created}</span>
        <span className="tl-meta-chip">Updated {meta.updated}</span>
        <span className="tl-meta-chip">{stats.total} items</span>
      </div>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{stats.total}</div><div className="stat-card-lbl">Total Items</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{stats.done}</div><div className="stat-card-lbl">Done</div></div>
        <div className="stat-card"><div className="stat-card-val c-wip">{stats.wip}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val c-pending">{stats.todo}</div><div className="stat-card-lbl">Not Started</div></div>
        <div className="stat-card stat-accent"><div className="stat-card-val">{pct}%</div><div className="stat-card-lbl">Overall Done</div></div>
      </div>

      <div className="tl-area-tabs">
        <button
          className={`tl-area-tab tl-area-tab--zap ${areaTab === 'active' ? 'active' : ''}`}
          onClick={() => setAreaTab('active')}
        >
          ⚡ Active <span className="tl-area-count">{stats.wip}</span>
        </button>
        {areaStats.map(({ area, done, wip, total }) => (
          <button
            key={area.id}
            className={`tl-area-tab ${areaTab === area.id ? 'active' : ''}`}
            onClick={() => setAreaTab(area.id)}
          >
            {area.emoji} {area.label}
            {wip > 0 && <span className="tl-pulse-dot" />}
            <span className="tl-area-count">{done}/{total}</span>
          </button>
        ))}
      </div>

      {areaTab === 'active' ? (
        activeGroups.length === 0 ? (
          <div className="mastery-right-empty">
            Nothing in progress yet — click a checkbox once to mark an item ~ in progress.
          </div>
        ) : (
          <div className="tl-phases">
            {activeGroups.map((g) => (
              <div key={g.phase.id} className="phase-section">
                <div className="phase-head tl-phase-head">
                  <span className="tl-pulse-dot" />
                  {g.area.emoji} {g.area.label} · {g.phase.title}
                  <em>{g.items.length} active</em>
                </div>
                {g.items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    state="wip"
                    onCycle={() => cycleItem(tracker, item.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        )
      ) : currentArea && (
        <div className="tl-phases">
          {currentArea.phases.map((phase) => {
            const done = phase.items.filter((i) => (state[i.id] ?? 'todo') === 'done').length
            const hasWip = phase.items.some((i) => (state[i.id] ?? 'todo') === 'wip')
            const isCollapsed = collapsed[phase.id] ?? false
            return (
              <div key={phase.id} className="phase-section">
                <button
                  className="phase-head tl-phase-head"
                  onClick={() => setCollapsed((c) => ({ ...c, [phase.id]: !isCollapsed }))}
                >
                  {hasWip && <span className="tl-pulse-dot" />}
                  {phase.title}
                  <em>{done}/{phase.items.length} done {isCollapsed ? '▸' : '▾'}</em>
                </button>
                {!isCollapsed && phase.items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    state={state[item.id] ?? 'todo'}
                    onCycle={() => cycleItem(tracker, item.id)}
                  />
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
