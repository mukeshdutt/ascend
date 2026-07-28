import { Fragment, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Modal } from '../../shared/components/Modal'
import { Icon } from '../../shared/icons/Icon'
import { todayISO } from '../../shared/utils/date'
import { useInterviewTopics } from './store'
import { PHASES, PHASE_DESC, PHASE_LABEL, PRIORITIES, STATUS_LABEL, TOPIC_STATUSES, TRACKS, TRACK_NOTE } from './types'
import type { InterviewTrack, Topic, TopicPhase, TopicPriority, TopicStatus } from './types'
import './interview-tracker.css'

type Form = Omit<Topic, 'id'>
const blank = (): Form => ({ track: TRACKS[0], phase: 'learning', title: '', subtopic: '', priority: 'P1', status: 'not-started', resource_link: '', notes: '', last_studied_date: '', next_revisit_date: '' })
const priorityRank: Record<TopicPriority, number> = { P0: 0, P1: 1, P2: 2 }
const ACCENT = {
  '--accent': '#c96442',
  '--accent-bg': '#fdf3ef',
  '--accent-border': '#f0c9b8',
  '--accent-dark': '#9b4628',
} as CSSProperties

// Three-state checkbox (like Technical Learning): empty → ~ in progress → ✓ done.
// 'needs-revisit' renders unchecked and cycles back to in-progress.
type CheckState = 'todo' | 'wip' | 'done'
const CHECK_STATE: Record<TopicStatus, CheckState> = { 'not-started': 'todo', 'needs-revisit': 'todo', 'in-progress': 'wip', done: 'done' }
const CHECK_GLYPH: Record<CheckState, string> = { todo: '', wip: '~', done: '✓' }
const CHECK_HINT: Record<CheckState, string> = { todo: 'Mark in progress', wip: 'Mark done', done: 'Reset to not started' }
const NEXT_STATUS: Record<TopicStatus, TopicStatus> = { 'not-started': 'in-progress', 'needs-revisit': 'in-progress', 'in-progress': 'done', done: 'not-started' }

function TriStateCheck({ status, onCycle }: { status: TopicStatus; onCycle: () => void }) {
  const s = CHECK_STATE[status]
  return <button className={`it-check it-check--${s}`} onClick={onCycle} title={CHECK_HINT[s]} aria-label={CHECK_HINT[s]}>{CHECK_GLYPH[s]}</button>
}

function TopicModal({ topic, onClose }: { topic: Topic | null; onClose: () => void }) {
  const { addTopic, updateTopic, deleteTopic } = useInterviewTopics()
  const [form, setForm] = useState<Form>(topic ? { ...topic } : blank())
  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm(f => ({ ...f, [key]: value }))
  const save = () => { if (!form.title.trim()) return; const value = { ...form, title: form.title.trim(), resource_link: form.resource_link || undefined, next_revisit_date: form.next_revisit_date || undefined }; if (topic) updateTopic(topic.id, value); else addTopic(value); onClose() }
  return <Modal title={topic ? 'Edit topic' : 'Add topic'} subtitle="Topics live within the fixed interview tracks." onClose={onClose} size="lg" footer={<><>{topic && <button className="btn-danger" onClick={() => { deleteTopic(topic.id); onClose() }}><Icon name="trash" size={15} /> Delete</button>}</><span style={{ flex: 1 }} /><button className="btn-ghost" onClick={onClose}>Cancel</button><button className="btn-primary" disabled={!form.title.trim()} onClick={save}><Icon name="check" size={15} /> {topic ? 'Save changes' : 'Add topic'}</button></>}>
    <div className="form-grid interview-form">
      <label className="fld span-2"><span>Title</span><input autoFocus value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Event-driven architecture" /></label>
      <label className="fld"><span>Track</span><select value={form.track} onChange={e => set('track', e.target.value as InterviewTrack)}>{TRACKS.map(t => <option key={t}>{t}</option>)}</select></label>
      <label className="fld"><span>Phase</span><select value={form.phase} onChange={e => set('phase', e.target.value as TopicPhase)}>{PHASES.map(p => <option key={p} value={p}>{PHASE_LABEL[p]}</option>)}</select></label>
      <label className="fld"><span>Subtopic</span><input value={form.subtopic} onChange={e => set('subtopic', e.target.value)} placeholder="Optional grouping" /></label>
      <label className="fld"><span>Priority</span><select value={form.priority} onChange={e => set('priority', e.target.value as TopicPriority)}>{PRIORITIES.map(p => <option key={p}>{p}</option>)}</select></label>
      <label className="fld"><span>Status</span><select value={form.status} onChange={e => set('status', e.target.value as TopicStatus)}>{TOPIC_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}</select></label>
      <label className="fld span-2"><span>Resource link</span><input type="url" value={form.resource_link} onChange={e => set('resource_link', e.target.value)} placeholder="https://..." /></label>
      <label className="fld"><span>Last studied</span><input type="date" value={form.last_studied_date} onChange={e => set('last_studied_date', e.target.value)} /></label>
      <label className="fld"><span>Next revisit</span><input type="date" value={form.next_revisit_date} onChange={e => set('next_revisit_date', e.target.value)} /></label>
      <label className="fld span-2"><span>Notes</span><textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Key ideas, gaps, interview prompts…" /></label>
    </div>
  </Modal>
}

export function InterviewTracker() {
  const { topics, patchTopic } = useInterviewTopics()
  const [view, setView] = useState<'tracks' | 'board' | 'overview'>('tracks')
  const [track, setTrack] = useState<'active' | InterviewTrack>(TRACKS[0])
  const [priority, setPriority] = useState<'all' | TopicPriority>('all')
  const [status, setStatus] = useState<'all' | TopicStatus>('all')
  const [modal, setModal] = useState<Topic | null | 'new'>(null)
  const [dragged, setDragged] = useState<string | null>(null)
  const filtered = useMemo(() => topics.filter(t => (view !== 'tracks' || (track === 'active' ? t.status === 'in-progress' : t.track === track)) && (priority === 'all' || t.priority === priority) && (status === 'all' || t.status === status)).sort((a,b) => priorityRank[a.priority] - priorityRank[b.priority]), [topics, view, track, priority, status])
  const wipCount = useMemo(() => topics.filter(t => t.status === 'in-progress').length, [topics])
  const wipTracks = useMemo(() => new Set(topics.filter(t => t.status === 'in-progress').map(t => t.track)), [topics])
  const activeTracks = wipTracks.size
  const updateStatus = (id: string, next: TopicStatus) => patchTopic(id, { status: next, last_studied_date: next !== 'not-started' ? todayISO() : undefined })
  const topicRow = (t: Topic) => <tr key={t.id}><td><TriStateCheck status={t.status} onCycle={() => updateStatus(t.id, NEXT_STATUS[t.status])} /></td><td><button className="topic-title" onClick={() => setModal(t)}>{t.title}<small>{t.subtopic}</small></button></td><td><span className={`priority ${t.priority.toLowerCase()}`}>{t.priority}</span></td><td><select className={`status-select ${t.status}`} value={t.status} onChange={e => updateStatus(t.id, e.target.value as TopicStatus)}>{TOPIC_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}</select></td><td>{t.last_studied_date || '—'}</td><td>{t.next_revisit_date || '—'}</td><td><button className="row-edit" onClick={() => setModal(t)} aria-label={`Edit ${t.title}`}><Icon name="edit" size={15} /></button></td></tr>
  const tableHead = <thead><tr><th></th><th>Topic</th><th>Priority</th><th>Status</th><th>Last studied</th><th>Next revisit</th><th></th></tr></thead>
  return <div className="content interview-tracker" style={ACCENT}>
    <section className="intro"><div><h1>Interview Tracker 2026</h1><p>Language + cloud depth · V3 · project-driven. DSA, system design &amp; behavioral live in your dedicated artifacts.</p></div><button className="btn-primary" onClick={() => setModal('new')}><Icon name="plus" size={16} /> Add topic</button></section>
    {activeTracks > 2 && <div className="active-nudge"><Icon name="activity" size={17} /><span><strong>Focus nudge:</strong> you have active work in {activeTracks} tracks. Consider narrowing to two for deeper progress.</span></div>}
    <div className="tracker-toolbar"><div className="view-tabs">{([['tracks', 'Track view'], ['board', 'Board'], ['overview', 'Overview']] as const).map(([id,label]) => <button className={view === id ? 'active' : ''} onClick={() => setView(id)} key={id}>{label}</button>)}</div><div className="tracker-filters"><select value={priority} onChange={e => setPriority(e.target.value as typeof priority)}><option value="all">All priorities</option>{PRIORITIES.map(x => <option key={x}>{x}</option>)}</select><select value={status} onChange={e => setStatus(e.target.value as typeof status)}><option value="all">All statuses</option>{TOPIC_STATUSES.map(x => <option key={x} value={x}>{STATUS_LABEL[x]}</option>)}</select></div></div>
    {view === 'tracks' && <><div className="track-tabs"><button className={`it-active-tab ${track === 'active' ? 'active' : ''}`} onClick={() => setTrack('active')}>⚡ Active <span className="it-active-count">{wipCount}</span></button>{TRACKS.map(t => <button key={t} className={track === t ? 'active' : ''} onClick={() => setTrack(t)}>{wipTracks.has(t) && <span className="it-pulse-dot" />}{t}</button>)}</div>{track === 'active'
      ? <>{filtered.length === 0
          ? <div className="topic-table-wrap"><table className="topic-table"><tbody><tr><td className="empty">Nothing in progress yet — click a topic's checkbox once to mark it ~ in progress.</td></tr></tbody></table></div>
          : <div className="topic-table-wrap"><table className="topic-table">{tableHead}<tbody>{TRACKS.map(tr => { const rows = filtered.filter(t => t.track === tr); if (rows.length === 0) return null; return <Fragment key={tr}><tr className="phase-row"><td colSpan={7}><span className="it-pulse-dot" /><strong>{tr}</strong><em>{rows.length} active</em></td></tr>{rows.map(topicRow)}</Fragment> })}</tbody></table></div>}</>
      : <><p className="track-note">{TRACK_NOTE[track]}</p><div className="topic-table-wrap"><table className="topic-table">{tableHead}<tbody>{PHASES.map(ph => { const rows = filtered.filter(t => t.phase === ph); if (rows.length === 0) return null; return <Fragment key={ph}><tr className="phase-row"><td colSpan={7}><strong>{PHASE_LABEL[ph]}</strong><em>{PHASE_DESC[ph]}</em></td></tr>{rows.map(topicRow)}</Fragment> })}{filtered.length === 0 && <tr><td colSpan={7} className="empty">No topics match these filters.</td></tr>}</tbody></table></div></>}</>}
    {view === 'board' && <div className="kanban">{TOPIC_STATUSES.map(s => <section key={s} className="kanban-column" onDragOver={e => e.preventDefault()} onDrop={() => { if (dragged) updateStatus(dragged, s); setDragged(null) }}><header><span className={`status-dot ${s}`} />{STATUS_LABEL[s]} <b>{filtered.filter(t => t.status === s).length}</b></header>{filtered.filter(t => t.status === s).map(t => <article key={t.id} draggable onDragStart={() => setDragged(t.id)} className="kanban-card" onClick={() => setModal(t)}><span>{t.track} · {PHASE_LABEL[t.phase]}</span><strong>{t.title}</strong><em className={`priority ${t.priority.toLowerCase()}`}>{t.priority}</em></article>)}</section>)}</div>}
    {view === 'overview' && <div className="overview-card"><table className="topic-table"><thead><tr><th>Track</th><th>Complete</th><th>Needs revisit</th><th>P0 not started</th></tr></thead><tbody>{TRACKS.map(t => { const rows = topics.filter(x => x.track === t); const done = rows.filter(x => x.status === 'done').length; return <tr key={t}><td><strong>{t}</strong><small>{rows.length} topics</small></td><td><div className="complete-cell"><span>{rows.length ? Math.round(done / rows.length * 100) : 0}%</span><i><b style={{ width: `${rows.length ? done / rows.length * 100 : 0}%` }} /></i></div></td><td>{rows.filter(x => x.status === 'needs-revisit').length}</td><td>{rows.filter(x => x.priority === 'P0' && x.status === 'not-started').length}</td></tr>})}</tbody></table></div>}
    {modal !== null && <TopicModal topic={modal === 'new' ? null : modal} onClose={() => setModal(null)} />}
  </div>
}
