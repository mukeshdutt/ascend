import { useMemo } from 'react'
import type { Story } from '../types'
import { computeSummary } from '../stats'
import { ConfidenceStars } from './ConfidenceStars'

export function SummaryPanel({ stories }: { stories: Story[] }) {
  const s = useMemo(() => computeSummary(stories), [stories])

  return (
    <article className="panel summary-panel">
      <h3>Story bank summary</h3>
      <div className="summary-figures">
        <div className="fig ready">
          <b>
            {s.interviewReady}
            <small>/ {s.total}</small>
          </b>
          <span>Interview ready</span>
        </div>
        <div className="fig">
          <b>{s.notStarted}</b>
          <span>Not started</span>
        </div>
        <div className="fig">
          <b>{s.avgConfidence || '—'}</b>
          <span>Avg confidence</span>
        </div>
      </div>
      <div className="summary-conf">
        <ConfidenceStars value={Math.round(s.avgConfidence)} size={15} />
        <small>
          across {s.ratedCount} rated {s.ratedCount === 1 ? 'story' : 'stories'} ·{' '}
          {s.totalPracticed} total practices
        </small>
      </div>
    </article>
  )
}
