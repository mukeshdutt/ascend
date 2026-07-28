import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useAgenticAi } from './store'
import { AI_PHASES, AI_STATUS_LABEL, AI_STATUSES } from './types'
import type { AiPhase, AiStatus } from './types'
import '../react-mastery/react-mastery.css'
import './agentic-ai.css'
import '../../shared/mastery-layout.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

export function AgenticAiLearning() {
  const { studyWeeks, useCases, patchStudyWeek, patchUseCase, toggleTopicItem } = useAgenticAi()
  const [view, setView] = useState<'study' | 'usecases'>('study')
  const [activePhase, setActivePhase] = useState<AiPhase>(AI_PHASES[0])
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleExpand = (id: string) =>
    setExpanded(x => x.includes(id) ? x.filter(v => v !== id) : [...x, id])

  const totalStudy = studyWeeks.length
  const doneStudy = studyWeeks.filter(w => w.status === 'done').length
  const totalUseCases = useCases.length
  const doneUseCases = useCases.filter(u => u.status === 'done').length
  const overallPct = (totalStudy + totalUseCases) > 0
    ? Math.round((doneStudy + doneUseCases) / (totalStudy + totalUseCases) * 100)
    : 0

  const phaseStudySummary = useMemo(() =>
    AI_PHASES.map(phase => {
      const items = studyWeeks.filter(w => w.phase === phase)
      const done = items.filter(w => w.status === 'done').length
      return { phase, total: items.length, pct: items.length ? Math.round(done / items.length * 100) : 0 }
    }), [studyWeeks])

  const phaseUseCaseSummary = useMemo(() =>
    AI_PHASES.map(phase => {
      const items = useCases.filter(u => u.phase === phase)
      const done = items.filter(u => u.status === 'done').length
      return { phase, total: items.length, pct: items.length ? Math.round(done / items.length * 100) : 0 }
    }), [useCases])

  const leftItems = view === 'study' ? phaseStudySummary : phaseUseCaseSummary

  const filteredStudyWeeks = useMemo(() =>
    studyWeeks.filter(w =>
      w.phase === activePhase &&
      `${w.weekTitle} ${w.topics.map(t => t.text).join(' ')}`.toLowerCase().includes(query.toLowerCase())),
    [studyWeeks, activePhase, query])

  const filteredUseCases = useMemo(() =>
    useCases.filter(u =>
      u.phase === activePhase &&
      `${u.title} ${u.description}`.toLowerCase().includes(query.toLowerCase())),
    [useCases, activePhase, query])

  const switchView = (v: 'study' | 'usecases') => {
    setView(v)
    setActivePhase(AI_PHASES[0])
    setQuery('')
    setExpanded([])
  }

  return (
    <div className="content mastery-v2" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>Agentic AI Learning</h1>
          <p>18-week roadmap · E-Commerce Track · LangChain + LangGraph</p>
        </div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{totalStudy}</div><div className="stat-card-lbl">Study Weeks</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{doneStudy}</div><div className="stat-card-lbl">Weeks Done</div></div>
        <div className="stat-card"><div className="stat-card-val">{totalUseCases}</div><div className="stat-card-lbl">Use Cases</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{doneUseCases}</div><div className="stat-card-lbl">Use Cases Done</div></div>
        <div className="stat-card stat-accent"><div className="stat-card-val">{overallPct}%</div><div className="stat-card-lbl">Overall Progress</div></div>
      </div>

      <div className="mastery-view-tabs">
        <button className={view === 'study' ? 'active' : ''} onClick={() => switchView('study')}>Study Topics</button>
        <button className={view === 'usecases' ? 'active' : ''} onClick={() => switchView('usecases')}>Use Cases</button>
      </div>

      <div className="mastery-filters">
        <label><Icon name="search" size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={view === 'study' ? 'Search topics or weeks' : 'Search use cases'} /></label>
      </div>

      <div className="mastery-layout">
        <aside className="mastery-left">
          {leftItems.map(({ phase, total, pct }) => (
            <button key={phase} className={`cat-item ${activePhase === phase ? 'active' : ''}`} onClick={() => setActivePhase(phase)}>
              <div className="cat-item-hd">
                <span className="cat-item-name">{phase}</span>
                <span className="cat-item-cnt">{total}</span>
              </div>
              <div className="cat-prog-track"><div className="cat-prog-fill" style={{ width: `${pct}%` }} /></div>
              <span className="cat-pct">{pct}% done</span>
            </button>
          ))}
        </aside>

        <div className="mastery-right">
          {view === 'study' && (
            filteredStudyWeeks.length === 0
              ? <div className="mastery-right-empty">No weeks match your search.</div>
              : filteredStudyWeeks.map(week => (
                <div key={week.id} className="phase-section">
                  <div className="agentic-row-head" onClick={() => toggleExpand(week.id)}>
                    <Icon name={expanded.includes(week.id) ? 'chevronDown' : 'chevronRight'} size={14} />
                    <span className="agentic-row-title">{week.weekTitle}</span>
                    <em>{week.topics.length} topics</em>
                    <select
                      className={`react-status ${week.status}`}
                      value={week.status}
                      onClick={e => e.stopPropagation()}
                      onChange={e => patchStudyWeek(week.id, e.target.value as AiStatus)}
                    >
                      {AI_STATUSES.map(s => <option key={s} value={s}>{AI_STATUS_LABEL[s]}</option>)}
                    </select>
                  </div>
                  {expanded.includes(week.id) && (
                    <ul className="agentic-topic-list">
                      {week.topics.map((t, i) => (
                        <li key={i} className={t.done ? 'done' : ''}>
                          <label>
                            <input
                              type="checkbox"
                              checked={t.done}
                              onChange={() => toggleTopicItem(week.id, i)}
                            />
                            <span>{t.text}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
          )}

          {view === 'usecases' && (
            filteredUseCases.length === 0
              ? <div className="mastery-right-empty">No use cases match your search.</div>
              : filteredUseCases.map(uc => (
                <div key={uc.id} className="phase-section">
                  <div className="agentic-row-head" onClick={() => toggleExpand(uc.id)}>
                    <Icon name={expanded.includes(uc.id) ? 'chevronDown' : 'chevronRight'} size={14} />
                    <span className="agentic-row-title">{uc.title}</span>
                    <em>Week {uc.weekNum}</em>
                    <select
                      className={`react-status ${uc.status}`}
                      value={uc.status}
                      onClick={e => e.stopPropagation()}
                      onChange={e => patchUseCase(uc.id, e.target.value as AiStatus)}
                    >
                      {AI_STATUSES.map(s => <option key={s} value={s}>{AI_STATUS_LABEL[s]}</option>)}
                    </select>
                  </div>
                  {expanded.includes(uc.id) && (
                    <p className="agentic-usecase-desc">{uc.description}</p>
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
