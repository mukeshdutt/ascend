import { useMemo } from 'react'
import type { Problem } from '../types'
import { DIFFICULTIES, DIFFICULTY_META } from '../types'
import { computeStats } from '../stats'

export function StatsPanel({ problems }: { problems: Problem[] }) {
  const stats = useMemo(() => computeStats(problems), [problems])
  const maxPattern = Math.max(1, ...stats.solvedByPattern.map((p) => p.count))

  return (
    <div className="stats-grid">
      {/* Solved by difficulty + totals */}
      <article className="panel stat-card">
        <h3>Solved by difficulty</h3>
        <div className="stat-total">
          <b>{stats.solved}</b>
          <small>of {stats.total} tracked · {stats.progress}%</small>
        </div>
        <div className="difficulty-rows">
          {DIFFICULTIES.map((d) => (
            <div className="difficulty-row" key={d}>
              <span className={`df-dot ${DIFFICULTY_META[d].className}`} />
              <span className="df-label">{d}</span>
              <b>{stats.solvedByDifficulty[d]}</b>
            </div>
          ))}
        </div>
      </article>

      {/* Solved by pattern bar chart */}
      <article className="panel stat-card">
        <h3>Solved by pattern</h3>
        {stats.solvedByPattern.length === 0 ? (
          <p className="stat-empty">No solved problems yet.</p>
        ) : (
          <div className="pattern-bars">
            {stats.solvedByPattern.slice(0, 6).map(({ pattern, count }) => (
              <div className="pattern-bar" key={pattern}>
                <span className="pattern-name">{pattern}</span>
                <div className="pattern-track">
                  <i style={{ width: `${(count / maxPattern) * 100}%` }} />
                </div>
                <b>{count}</b>
              </div>
            ))}
          </div>
        )}
      </article>

      {/* Rolling recent activity */}
      <article className="panel stat-card">
        <h3>Recent momentum</h3>
        <div className="rolling-row">
          <div className="rolling">
            <b>{stats.solvedLast7}</b>
            <small>solved · last 7 days</small>
          </div>
          <div className="rolling">
            <b>{stats.solvedLast30}</b>
            <small>solved · last 30 days</small>
          </div>
        </div>
        <div className="rolling-foot">
          <span className="st-attempted-chip">{stats.attempted} attempted</span>
          <span className="st-revisit-chip">{stats.needsRevisit} needs revisit</span>
        </div>
      </article>
    </div>
  )
}
