import { useMemo, useState } from 'react'
import { Modal } from '../../shared/components/Modal'
import { Icon } from '../../shared/icons/Icon'
import { useReactMastery } from './store'
import { REACT_CATEGORIES, REACT_PHASES, REACT_STATUS_LABEL, REACT_STATUSES } from './types'
import type { ReactCategory, ReactPhase, ReactStatus, ReactTopic } from './types'
import './react-mastery.css'
import '../../shared/mastery-layout.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

type Form = Omit<ReactTopic, 'id'>
const empty = (): Form => ({ category: 'Fundamentals', phase: 'Tab 1 — React (Fundamentals)', title: '', status: 'not-started', resource_link: '', project_applied: '', notes: '' })

function TopicModal({ topic, onClose }: { topic: ReactTopic | null; onClose: () => void }) {
  const { addTopic, updateTopic, deleteTopic } = useReactMastery()
  const [form, setForm] = useState<Form>(topic ? { ...topic } : empty())
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }))
  const save = () => {
    if (!form.title.trim()) return
    const value = { ...form, title: form.title.trim() }
    if (topic) updateTopic(topic.id, value); else addTopic(value)
    onClose()
  }
  return (
    <Modal title={topic ? 'Edit React topic' : 'Add React topic'} subtitle="Capture the theory and where you used it in practice." onClose={onClose} size="lg"
      footer={<>{topic && <button className="btn-danger" onClick={() => { deleteTopic(topic.id); onClose() }}><Icon name="trash" size={15} /> Delete</button>}<span style={{ flex: 1 }} /><button className="btn-ghost" onClick={onClose}>Cancel</button><button className="btn-primary" onClick={save} disabled={!form.title.trim()}><Icon name="check" size={15} /> Save topic</button></>}>
      <div className="form-grid react-form">
        <label className="fld span-2"><span>Title</span><input autoFocus value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Compound components" /></label>
        <label className="fld"><span>Category</span><select value={form.category} onChange={e => set('category', e.target.value as ReactCategory)}>{REACT_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
        <label className="fld"><span>Phase</span><select value={form.phase} onChange={e => set('phase', e.target.value as ReactPhase)}>{REACT_PHASES.map(p => <option key={p}>{p}</option>)}</select></label>
        <label className="fld"><span>Status</span><select value={form.status} onChange={e => set('status', e.target.value as ReactStatus)}>{REACT_STATUSES.map(s => <option key={s} value={s}>{REACT_STATUS_LABEL[s]}</option>)}</select></label>
        <label className="fld"><span>Resource link</span><input type="url" value={form.resource_link} onChange={e => set('resource_link', e.target.value)} placeholder="https://..." /></label>
        <label className="fld span-2"><span>Project applied</span><input value={form.project_applied} onChange={e => set('project_applied', e.target.value)} placeholder="e.g. iterit or ascend" /></label>
        <label className="fld span-2"><span>Notes</span><textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="What you learned or want to remember…" /></label>
      </div>
    </Modal>
  )
}

export function ReactMastery() {
  const { topics, patchTopic } = useReactMastery()
  const [view, setView] = useState<'study' | 'usecases'>('study')
  const [activeKey, setActiveKey] = useState<string>(REACT_CATEGORIES[0])
  const [statusFilter, setStatusFilter] = useState<'all' | ReactStatus>('all')
  const [query, setQuery] = useState('')
  const [collapsedPhases, setCollapsedPhases] = useState<string[]>([])
  const [modal, setModal] = useState<ReactTopic | 'new' | null>(null)

  const total = topics.length
  const mastered = topics.filter(t => t.status === 'mastered').length
  const inProgress = topics.filter(t => t.status === 'learning' || t.status === 'practiced').length
  const notStarted = topics.filter(t => t.status === 'not-started').length
  const overallPct = total ? Math.round(mastered / total * 100) : 0

  const projects = useMemo(() => [...new Set(topics.map(t => t.project_applied.trim()).filter(Boolean))].sort(), [topics])

  const leftItems = useMemo(() => {
    if (view === 'study') {
      return REACT_CATEGORIES.map(c => {
        const ct = topics.filter(t => t.category === c)
        const m = ct.filter(t => t.status === 'mastered').length
        return { key: c, label: c, total: ct.length, pct: ct.length ? Math.round(m / ct.length * 100) : 0 }
      })
    }
    return projects.map(p => {
      const ct = topics.filter(t => t.project_applied.trim() === p)
      const m = ct.filter(t => t.status === 'mastered').length
      return { key: p, label: p, total: ct.length, pct: ct.length ? Math.round(m / ct.length * 100) : 0 }
    })
  }, [topics, view, projects])

  const rightTopics = useMemo(() => {
    const base = view === 'study'
      ? topics.filter(t => t.category === activeKey)
      : topics.filter(t => t.project_applied.trim() === activeKey)
    return base.filter(t =>
      (statusFilter === 'all' || t.status === statusFilter) &&
      `${t.title} ${t.notes}`.toLowerCase().includes(query.toLowerCase())
    )
  }, [topics, view, activeKey, statusFilter, query])

  const phaseGroups = useMemo(() =>
    REACT_PHASES.map(phase => ({ phase, items: rightTopics.filter(t => t.phase === phase) })).filter(g => g.items.length > 0),
    [rightTopics])

  const togglePhase = (p: string) => setCollapsedPhases(x => x.includes(p) ? x.filter(v => v !== p) : [...x, p])
  const switchView = (v: 'study' | 'usecases') => {
    setView(v)
    setActiveKey(v === 'usecases' ? (projects[0] ?? '') : REACT_CATEGORIES[0])
  }

  return (
    <div className="content mastery-v2" style={ACCENT}>
      <section className="intro">
        <div><h1>React Mastery</h1><p>Turn React theory into applied experience, one topic at a time.</p></div>
        <button className="btn-primary" onClick={() => setModal('new')}><Icon name="plus" size={16} /> Add topic</button>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{total}</div><div className="stat-card-lbl">Total Topics</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{mastered}</div><div className="stat-card-lbl">Mastered</div></div>
        <div className="stat-card"><div className="stat-card-val c-progress">{inProgress}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val c-pending">{notStarted}</div><div className="stat-card-lbl">Not Started</div></div>
        <div className="stat-card stat-accent"><div className="stat-card-val">{overallPct}%</div><div className="stat-card-lbl">Overall Mastered</div></div>
      </div>

      <div className="mastery-view-tabs">
        <button className={view === 'study' ? 'active' : ''} onClick={() => switchView('study')}>Study Topics</button>
        <button className={view === 'usecases' ? 'active' : ''} onClick={() => switchView('usecases')}>Use Cases</button>
      </div>

      <div className="mastery-filters">
        <label><Icon name="search" size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics or notes" /></label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}>
          <option value="all">All statuses</option>
          {REACT_STATUSES.map(s => <option key={s} value={s}>{REACT_STATUS_LABEL[s]}</option>)}
        </select>
      </div>

      <div className="mastery-layout">
        <aside className="mastery-left">
          {leftItems.length === 0 && <div className="mastery-right-empty" style={{ fontSize: 11 }}>No projects linked yet.</div>}
          {leftItems.map(({ key, label, total: t, pct }) => (
            <button key={key} className={`cat-item ${activeKey === key ? 'active' : ''}`} onClick={() => setActiveKey(key)}>
              <div className="cat-item-hd"><span className="cat-item-name">{label}</span><span className="cat-item-cnt">{t} topics</span></div>
              <div className="cat-prog-track"><div className="cat-prog-fill" style={{ width: `${pct}%` }} /></div>
              <span className="cat-pct">{pct}% mastered</span>
            </button>
          ))}
        </aside>

        <div className="mastery-right">
          {phaseGroups.length === 0 && <div className="mastery-right-empty">No topics match your filters in this {view === 'study' ? 'category' : 'project'}.</div>}
          {phaseGroups.map(({ phase, items }) => {
            const isCollapsed = collapsedPhases.includes(phase)
            return (
              <div key={phase} className="phase-section">
                <button className="phase-head" onClick={() => togglePhase(phase)}>
                  <Icon name={isCollapsed ? 'chevronRight' : 'chevronDown'} size={15} />
                  <span>{phase}</span>
                  <em>{items.length} topic{items.length !== 1 ? 's' : ''}</em>
                </button>
                {!isCollapsed && items.map(t => (
                  <div key={t.id} className="topic-row">
                    <div className="topic-row-title">
                      <button className="topic-row-name" onClick={() => setModal(t)}>{t.title}</button>
                      {t.resource_link && <a className="topic-row-link" href={t.resource_link} target="_blank" rel="noreferrer">Resource ↗</a>}
                      {t.project_applied && <div className="topic-row-meta">Project: {t.project_applied}</div>}
                      {t.notes && <div className="topic-row-meta">{t.notes}</div>}
                    </div>
                    <div className="topic-row-actions">
                      <select className={`react-status ${t.status}`} value={t.status} onChange={e => patchTopic(t.id, { status: e.target.value as ReactStatus })}>
                        {REACT_STATUSES.map(s => <option key={s} value={s}>{REACT_STATUS_LABEL[s]}</option>)}
                      </select>
                      <button className="row-edit-btn" onClick={() => setModal(t)}><Icon name="edit" size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {modal !== null && <TopicModal topic={modal === 'new' ? null : modal} onClose={() => setModal(null)} />}
    </div>
  )
}
