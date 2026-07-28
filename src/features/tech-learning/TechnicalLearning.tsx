import { useState } from 'react'
import { TechInterviewTracker } from '../tech-interview-tracker/TechInterviewTracker'
import { TechLearningTracker } from './TechLearningTracker'
import { countStates, useTechLearning } from './store'
import { TRACKERS } from './types'
import type { TrackerId } from './types'
import './tech-learning.css'
import '../../shared/mastery-layout.css'

const ACCENT = {
  '--accent': '#c96442',
  '--accent-bg': '#fdf3ef',
  '--accent-border': '#f0c9b8',
  '--accent-dark': '#9b4628',
} as React.CSSProperties

type Tab = TrackerId | 'problems'

export function TechnicalLearning() {
  const { states } = useTechLearning()
  const [tab, setTab] = useState<Tab>('interview')

  const tabBar = (
    <div className="tl-tab-bar" style={ACCENT}>
      {TRACKERS.map((t) => {
        const { done, total } = countStates(t.id, states[t.id])
        return (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            {t.emoji} {t.title} <span className="tl-tab-count">{done}/{total}</span>
          </button>
        )
      })}
      <button className={tab === 'problems' ? 'active' : ''} onClick={() => setTab('problems')}>
        🗂 Problems
      </button>
    </div>
  )

  if (tab === 'problems') return <TechInterviewTracker tabs={tabBar} />

  return (
    <div className="content mastery-v2 tech-learning" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>Technical Learning</h1>
          <p>Interview prep and the full learning curriculum — two trackers, tracked independently.</p>
        </div>
      </section>
      {tabBar}
      <TechLearningTracker key={tab} tracker={tab} />
    </div>
  )
}
