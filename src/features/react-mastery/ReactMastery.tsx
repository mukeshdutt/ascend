import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useReactMastery } from './store'
import { REACT_CATEGORIES, REACT_STATUS_LABEL, REACT_STATUSES } from './types'
import type { ReactCategory, ReactStatus, ReactTopic, ProjectRef } from './types'
import './react-mastery.css'
import '../../shared/mastery-layout.css'

const ACCENT = {
  '--accent': '#c96442',
  '--accent-bg': '#fdf3ef',
  '--accent-border': '#f0c9b8',
  '--accent-dark': '#9b4628',
} as React.CSSProperties

// Parse backtick-wrapped text into React nodes with <code> elements
function tx(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, i) =>
    part.startsWith('`') && part.endsWith('`')
      ? <code key={i} className="rm-ic">{part.slice(1, -1)}</code>
      : part
  )
}

function ProjectSection({ refs }: { refs: ProjectRef[] }) {
  if (refs.length === 0) return null
  return (
    <div className="rm-section rm-project">
      <div className="rm-sec-label">IN YOUR PROJECT</div>
      {refs.map((ref, i) => (
        <div key={i} className="rm-proj-ref">
          {ref.file && (
            <div className="rm-file-badge">
              <Icon name="code" size={13} />
              <code>{ref.file}</code>
            </div>
          )}
          {ref.code && (
            <pre className="rm-code-block"><code>{ref.code}</code></pre>
          )}
          {ref.description && <p className="rm-proj-desc">{tx(ref.description)}</p>}
        </div>
      ))}
    </div>
  )
}

function LessonDetail({
  lesson,
  onStatusChange,
}: {
  lesson: ReactTopic
  onStatusChange: (s: ReactStatus) => void
}) {
  const { lessonNum, title, status, content } = lesson

  return (
    <div className="rm-detail">
      <div className="rm-detail-hd">
        <span className="rm-detail-num">{lessonNum}</span>
        <h2 className="rm-detail-title">{title}</h2>
        <select
          className={`react-status ${status}`}
          value={status}
          onChange={e => onStatusChange(e.target.value as ReactStatus)}
        >
          {REACT_STATUSES.map(s => (
            <option key={s} value={s}>{REACT_STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>

      <div className="rm-section rm-concept">
        <div className="rm-sec-label">CONCEPT</div>
        <p>{tx(content.concept)}</p>
      </div>

      <ProjectSection refs={content.inYourProject} />

      {content.watchOut.length > 0 && (
        <div className="rm-section rm-watchout">
          <div className="rm-sec-label">WATCH OUT</div>
          <ul>
            {content.watchOut.map((w, i) => <li key={i}>{tx(w)}</li>)}
          </ul>
        </div>
      )}

      <div className="rm-section rm-tryit">
        <div className="rm-sec-label">TRY IT</div>
        <p>{tx(content.tryIt)}</p>
      </div>
    </div>
  )
}

export function ReactMastery() {
  const { topics, patchTopic } = useReactMastery()
  const [activeTab, setActiveTab] = useState<ReactCategory>('Fundamentals')
  const [activeLessonId, setActiveLessonId] = useState<string>(
    () => topics.find(t => t.category === 'Fundamentals')?.id ?? ''
  )

  const tabTopics = useMemo(
    () => topics.filter(t => t.category === activeTab),
    [topics, activeTab]
  )

  const activeLesson = useMemo(
    () => topics.find(t => t.id === activeLessonId) ?? tabTopics[0] ?? null,
    [topics, activeLessonId, tabTopics]
  )

  const handleTabChange = (tab: ReactCategory) => {
    setActiveTab(tab)
    const first = topics.find(t => t.category === tab)
    if (first) setActiveLessonId(first.id)
  }

  const total = topics.length
  const mastered = topics.filter(t => t.status === 'mastered').length
  const inProgress = topics.filter(t => t.status === 'learning' || t.status === 'practiced').length
  const notStarted = topics.filter(t => t.status === 'not-started').length
  const pct = total ? Math.round(mastered / total * 100) : 0

  return (
    <div className="content rm-root" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>React Mastery</h1>
          <p>ANF Admin Edition — 34 lessons across 4 tracks.</p>
        </div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card">
          <div className="stat-card-val">{total}</div>
          <div className="stat-card-lbl">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val c-mastered">{mastered}</div>
          <div className="stat-card-lbl">Mastered</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val c-progress">{inProgress}</div>
          <div className="stat-card-lbl">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val c-pending">{notStarted}</div>
          <div className="stat-card-lbl">Not Started</div>
        </div>
        <div className="stat-card stat-accent">
          <div className="stat-card-val">{pct}%</div>
          <div className="stat-card-lbl">Overall</div>
        </div>
      </div>

      {/* ─── Tab bar ─────────────────────────────────────── */}
      <div className="rm-tabs">
        {REACT_CATEGORIES.map(cat => {
          const catTotal = topics.filter(t => t.category === cat).length
          const catDone = topics.filter(t => t.category === cat && t.status === 'mastered').length
          return (
            <button
              key={cat}
              className={`rm-tab${activeTab === cat ? ' active' : ''}`}
              onClick={() => handleTabChange(cat)}
            >
              <span className="rm-tab-name">{cat}</span>
              <span className="rm-tab-pill">{catDone}/{catTotal}</span>
            </button>
          )
        })}
      </div>

      {/* ─── Two-panel body ───────────────────────────────── */}
      <div className="rm-body">
        <aside className="rm-list">
          {tabTopics.map(t => (
            <button
              key={t.id}
              className={`rm-item${activeLessonId === t.id ? ' active' : ''}`}
              onClick={() => setActiveLessonId(t.id)}
            >
              <span className="rm-item-num">{t.lessonNum}</span>
              <span className="rm-item-title">{t.title}</span>
              <span className={`rm-item-dot ${t.status}`} />
            </button>
          ))}
        </aside>

        <div className="rm-detail-pane">
          {activeLesson
            ? <LessonDetail
                lesson={activeLesson}
                onStatusChange={s => patchTopic(activeLesson.id, { status: s })}
              />
            : <div className="rm-empty">Select a lesson to get started.</div>
          }
        </div>
      </div>
    </div>
  )
}
