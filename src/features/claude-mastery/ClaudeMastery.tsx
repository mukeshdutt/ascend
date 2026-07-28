import { useState } from 'react'
import { useClaudeMastery } from './store'
import { CLAUDE_WEEK_STATUSES, CLAUDE_WEEK_STATUS_LABEL } from './types'
import type { ClaudeWeek, ClaudeWeekStatus } from './types'
import '../../shared/mastery-layout.css'
import './claude-mastery.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

const STATUS_DOT: Record<ClaudeWeekStatus, string> = {
  'not-started': '○',
  'in-progress': '◑',
  done: '●',
}

// ── Use Cases Data ─────────────────────────────────────────────────────────
type UseCase = { id: string; title: string; priority: 'mandatory' | 'extended'; desc: string }
type UseCaseCategory = { id: string; label: string; color: string; cases: UseCase[] }

const USE_CASE_CATEGORIES: UseCaseCategory[] = [
  {
    id: 'interview',
    label: 'Interview + Personal',
    color: '#7846e7',
    cases: [
      { id: 'i1', priority: 'mandatory', title: 'Behavioral story bank', desc: 'STAR bank, 40-question set — top priority, no agent substitutes for this.' },
      { id: 'i2', priority: 'mandatory', title: 'Anekriti pricing agent as interview demo', desc: 'Tool loop → memory → MCP server → approval gate. Your live portfolio piece.' },
      { id: 'i3', priority: 'mandatory', title: 'Job-matching + resume-tailoring agent', desc: 'Scans job alert emails (LinkedIn/Naukri/Hirist/Glassdoor), scores against your resume, remembers already-reviewed roles, and drafts a JD-tailored resume variant on request.' },
      { id: 'i4', priority: 'mandatory', title: 'Claude Code track item', desc: 'Finish the Claude Code track from your 11-track tracker — don\'t restart.' },
      { id: 'i5', priority: 'extended', title: 'Recruiter-email triage agent', desc: 'Auto-labels/archives low-relevance recruiter spam (IoT, unrelated stacks) vs. genuine matches so inbox signal improves over time.' },
      { id: 'i6', priority: 'extended', title: 'Interview scheduling assistant', desc: 'Calendar MCP + email — proposes slots for recruiter calls without manual cross-checking.' },
      { id: 'i7', priority: 'extended', title: 'Mock interview practice agent', desc: 'Feeds your behavioral stories back as follow-up questions, Socratic-style.' },
      { id: 'i8', priority: 'extended', title: 'LinkedIn activity/outreach tracker', desc: 'Logs which recruiters you\'ve replied to, follow-up cadence.' },
    ],
  },
  {
    id: 'anekriti',
    label: 'Anekriti',
    color: '#c96442',
    cases: [
      { id: 'a1', priority: 'mandatory', title: 'Inventory + pricing agent', desc: 'MCP server on billing DB, memory tool, nightly run, approval-gated flags.' },
      { id: 'a2', priority: 'mandatory', title: 'Saree photography agent (unattended)', desc: 'Watch-folder → process → upload → notify on low confidence. Fully unattended.' },
      { id: 'a3', priority: 'extended', title: 'Order follow-up agent', desc: 'Overdue payment detection, drafts (not sends) reminders.' },
      { id: 'a4', priority: 'extended', title: 'Fabric/market-rate research agent', desc: 'Periodic web search for zari/fabric pricing trends, summarized weekly.' },
      { id: 'a5', priority: 'extended', title: 'Customer inquiry triage', desc: 'Categorizes WhatsApp/email inquiries by urgency/type.' },
      { id: 'a6', priority: 'extended', title: 'Seasonal demand forecasting', desc: 'Pattern analysis on past sales data ahead of festive seasons.' },
    ],
  },
  {
    id: 'iterit',
    label: 'Iterit',
    color: '#2879ee',
    cases: [
      { id: 'it1', priority: 'mandatory', title: 'Speaking-practice agent', desc: 'Daily topic → transcript → RAG feedback → vocabulary gaps. Your Agent SDK/LangGraph comparison project.' },
      { id: 'it2', priority: 'extended', title: 'Word-selection agent', desc: 'Trending/exam-relevant vocabulary sourcing + difficulty tagging.' },
      { id: 'it3', priority: 'extended', title: 'Spaced-repetition tuning agent', desc: 'Adjusts review intervals from quiz performance data.' },
      { id: 'it4', priority: 'extended', title: 'User churn/engagement agent', desc: 'Flags users who\'ve stalled, drafts re-engagement nudges.' },
      { id: 'it5', priority: 'extended', title: 'Content quality agent', desc: 'Reviews new vocabulary entries for accuracy/appropriateness before publishing.' },
    ],
  },
  {
    id: 'earlichamps',
    label: 'EarliChamps',
    color: '#42b97d',
    cases: [
      { id: 'e1', priority: 'mandatory', title: 'Content-generation + review pipeline', desc: 'Claude Code hook: draft lesson → lint/quality check → PR for approval.' },
      { id: 'e2', priority: 'extended', title: 'User progress agent', desc: 'Flags stalled kids, drafts parent nudges.' },
      { id: 'e3', priority: 'extended', title: 'Crash/bug triage agent', desc: 'Categorizes crash reports/reviews, opens GitHub issues with repro steps.' },
      { id: 'e4', priority: 'extended', title: 'Content localization agent', desc: 'Adapts lessons for different reading levels or languages.' },
      { id: 'e5', priority: 'extended', title: 'Parent-facing weekly summary agent', desc: 'Auto-generates a "here\'s what your kid learned" digest.' },
    ],
  },
]

// ── Main Component ─────────────────────────────────────────────────────────
export function ClaudeMastery() {
  const { weeks, patchWeek } = useClaudeMastery()
  const [tab, setTab] = useState<'learnings' | 'usecases'>('learnings')
  const [selectedId, setSelectedId] = useState<string>(weeks[0].id)

  const selected = weeks.find(w => w.id === selectedId) ?? weeks[0]
  const done = weeks.filter(w => w.status === 'done').length
  const inProgress = weeks.filter(w => w.status === 'in-progress').length
  const notStarted = weeks.filter(w => w.status === 'not-started').length
  const pct = Math.round(done / weeks.length * 100)

  return (
    <div className="content mastery-v2" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>Claude Mastery</h1>
          <p>8-week plan to master Claude's tool use, MCP, Agent SDK, and advanced Claude Code patterns.</p>
        </div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{weeks.length}</div><div className="stat-card-lbl">Total Weeks</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{done}</div><div className="stat-card-lbl">Done</div></div>
        <div className="stat-card"><div className="stat-card-val c-progress">{inProgress}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val c-pending">{notStarted}</div><div className="stat-card-lbl">Not Started</div></div>
        <div className="stat-card stat-accent">
          <div className="stat-card-val">{pct}%</div>
          <div className="stat-card-lbl">Complete</div>
        </div>
      </div>

      <div className="mastery-view-tabs">
        <button className={tab === 'learnings' ? 'active' : ''} onClick={() => setTab('learnings')}>Learnings</button>
        <button className={tab === 'usecases' ? 'active' : ''} onClick={() => setTab('usecases')}>Use Cases</button>
      </div>

      {tab === 'learnings' && (
        <div className="mastery-layout">
          <aside className="mastery-left" style={{ padding: 0, width: 300 }}>
            <div className="claude-weeks">
              {weeks.map(w => (
                <div
                  key={w.id}
                  className={`claude-week-row ${w.status} ${selectedId === w.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(w.id)}
                >
                  <div className="claude-week-num">W{w.week}</div>
                  <div className="claude-week-body">
                    <div className="claude-week-title">{w.title}</div>
                    <div className={`claude-week-status-pill ${w.status}`}>
                      {STATUS_DOT[w.status]} {CLAUDE_WEEK_STATUS_LABEL[w.status]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <div className="mastery-right" style={{ padding: 0 }}>
            <WeekDetail week={selected} onPatch={(p) => patchWeek(selected.id, p)} />
          </div>
        </div>
      )}

      {tab === 'usecases' && <UseCasesView />}
    </div>
  )
}

// ── Learnings detail panel ─────────────────────────────────────────────────
function WeekDetail({ week, onPatch }: { week: ClaudeWeek; onPatch: (p: Partial<ClaudeWeek>) => void }) {
  return (
    <div className="claude-detail">
      <div className="claude-detail-header">
        <div>
          <div className="claude-detail-week-label">WEEK {week.week} OF 8</div>
          <div className="claude-detail-title">{week.title}</div>
        </div>
        <select
          className="claude-status-select"
          value={week.status}
          onChange={e => onPatch({ status: e.target.value as ClaudeWeekStatus })}
        >
          {CLAUDE_WEEK_STATUSES.map(s => (
            <option key={s} value={s}>{CLAUDE_WEEK_STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>

      <div className="claude-detail-section">
        <div className="claude-detail-section-label">Material</div>
        <div className="claude-detail-section-body">{week.material}</div>
      </div>

      <div className="claude-detail-section">
        <div className="claude-detail-section-label">Use Case</div>
        <div className="claude-detail-section-body">{week.useCase}</div>
      </div>

      <div className="claude-detail-section">
        <div className="claude-detail-section-label">Deliverable</div>
        <div className="claude-detail-section-body deliverable">{week.deliverable}</div>
      </div>

      <div className="claude-detail-section">
        <div className="claude-detail-section-label">Notes</div>
        <textarea
          className="claude-detail-notes"
          placeholder="Add notes, links, or observations for this week…"
          value={week.notes}
          onChange={e => onPatch({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}

// ── Use Cases view ─────────────────────────────────────────────────────────
function UseCasesView() {
  const [activeCat, setActiveCat] = useState(USE_CASE_CATEGORIES[0].id)
  const cat = USE_CASE_CATEGORIES.find(c => c.id === activeCat) ?? USE_CASE_CATEGORIES[0]

  const mandatoryCount = USE_CASE_CATEGORIES.reduce((n, c) => n + c.cases.filter(x => x.priority === 'mandatory').length, 0)
  const totalCount = USE_CASE_CATEGORIES.reduce((n, c) => n + c.cases.length, 0)

  const mandatory = cat.cases.filter(c => c.priority === 'mandatory')
  const extended = cat.cases.filter(c => c.priority === 'extended')

  return (
    <div>
      <div className="roadmap-meta">
        <span className="roadmap-meta-stat"><strong>{mandatoryCount}</strong> mandatory</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>{totalCount - mandatoryCount}</strong> extended (v2 backlog)</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat roadmap-meta-tip">finish mandatory first, don't touch extended until all five are live</span>
      </div>
      <div className="mastery-layout">
        <aside className="mastery-left">
          {USE_CASE_CATEGORIES.map(c => {
            const mCount = c.cases.filter(x => x.priority === 'mandatory').length
            return (
              <button
                key={c.id}
                className={`cat-item ${activeCat === c.id ? 'active' : ''}`}
                onClick={() => setActiveCat(c.id)}
                style={activeCat === c.id ? { '--accent': c.color, '--accent-bg': `${c.color}18`, '--accent-border': `${c.color}55`, '--accent-dark': c.color } as React.CSSProperties : undefined}
              >
                <div className="cat-item-hd">
                  <span className="cat-item-name">{c.label}</span>
                  <span className="cat-item-cnt">{c.cases.length} ideas</span>
                </div>
                <span className="cat-pct">{mCount} mandatory · {c.cases.length - mCount} extended</span>
              </button>
            )
          })}
        </aside>

        <div className="mastery-right">
          {mandatory.length > 0 && (
            <div className="phase-section">
              <div className="phase-head" style={{ cursor: 'default', color: '#9b3a20', background: '#fff5f0' }}>
                <span>Mandatory</span>
                <em>Build these first — they're your Level 5 portfolio</em>
              </div>
              {mandatory.map(uc => <UseCaseRow key={uc.id} uc={uc} color={cat.color} />)}
            </div>
          )}
          {extended.length > 0 && (
            <div className="phase-section">
              <div className="phase-head" style={{ cursor: 'default' }}>
                <span>Extended</span>
                <em>v2 backlog — legitimate ideas, don't touch until mandatory is live</em>
              </div>
              {extended.map(uc => <UseCaseRow key={uc.id} uc={uc} color={cat.color} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function UseCaseRow({ uc, color }: { uc: UseCase; color: string }) {
  return (
    <div className="topic-row">
      <div className="topic-row-title">
        <div className="topic-row-name" style={{ cursor: 'default' }}>{uc.title}</div>
        <div className="topic-row-meta" style={{ marginTop: 4, fontSize: 12, color: '#4e5e7a', lineHeight: 1.5 }}>{uc.desc}</div>
      </div>
      <div className="topic-row-actions">
        <span
          className={`claude-week-status-pill ${uc.priority === 'mandatory' ? 'mandatory' : 'extended'}`}
          style={uc.priority === 'mandatory'
            ? { background: `${color}18`, color, borderColor: `${color}55` }
            : undefined}
        >
          {uc.priority === 'mandatory' ? '★ Mandatory' : '○ Extended'}
        </span>
      </div>
    </div>
  )
}
