import { useState } from 'react'
import { useJavaStudy, deriveWeekStatus } from './store'
import { JAVA_WEEK_STATUSES, JAVA_WEEK_STATUS_LABEL } from './types'
import type { JavaWeek, JavaWeekStatus, JavaTag } from './types'
import '../../shared/mastery-layout.css'
import './java-study-tracker.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

const STATUS_DOT: Record<JavaWeekStatus, string> = {
  'not-started': '○',
  'in-progress': '◑',
  done: '●',
}

export function JavaStudyTracker() {
  const { weeks, patchWeek, toggleTask } = useJavaStudy()
  const [selectedId, setSelectedId] = useState<string>(weeks[0].id)

  const selected = weeks.find(w => w.id === selectedId) ?? weeks[0]
  const weeksDone = weeks.filter(w => w.status === 'done').length
  const weeksInProgress = weeks.filter(w => w.status === 'in-progress').length
  const totalTasks = weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.tasks.length, 0), 0)
  const doneTasks = weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.tasks.filter(t => t.done).length, 0), 0)
  const pct = totalTasks > 0 ? Math.round(doneTasks / totalTasks * 100) : 0

  return (
    <div className="content mastery-v2" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>Java Interview Prep</h1>
          <p>10-week tracker covering fundamentals, Spring, Kafka, microservices, and cloud deployment.</p>
        </div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{weeks.length}</div><div className="stat-card-lbl">Total Weeks</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{weeksDone}</div><div className="stat-card-lbl">Done</div></div>
        <div className="stat-card"><div className="stat-card-val c-progress">{weeksInProgress}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val">{totalTasks}</div><div className="stat-card-lbl">Total Tasks</div></div>
        <div className="stat-card stat-accent">
          <div className="stat-card-val">{pct}%</div>
          <div className="stat-card-lbl">Tasks Done</div>
        </div>
      </div>

      <div className="mastery-layout">
        <aside className="mastery-left" style={{ padding: 0, width: 300 }}>
          <div className="java-weeks">
            {weeks.map(w => {
              const status = deriveWeekStatus(w)
              const wTotal = w.sections.reduce((n, s) => n + s.tasks.length, 0)
              const wDone = w.sections.reduce((n, s) => n + s.tasks.filter(t => t.done).length, 0)
              return (
                <div
                  key={w.id}
                  className={`java-week-row ${status} ${selectedId === w.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(w.id)}
                >
                  <div className="java-week-num">W{w.week}</div>
                  <div className="java-week-body">
                    <div className="java-week-title">{w.title}</div>
                    <div className="java-week-meta">
                      <span className="java-week-progress">{wDone}/{wTotal} tasks</span>
                      <span className={`java-week-status-pill ${status}`}>
                        {STATUS_DOT[status]} {JAVA_WEEK_STATUS_LABEL[status]}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        <div className="mastery-right" style={{ padding: 0 }}>
          <WeekDetail
            week={selected}
            onPatch={(p) => patchWeek(selected.id, p)}
            onToggleTask={(sectionName, taskId) => toggleTask(selected.id, sectionName, taskId)}
          />
        </div>
      </div>
    </div>
  )
}

type WeekDetailProps = {
  week: JavaWeek
  onPatch: (p: Partial<JavaWeek>) => void
  onToggleTask: (sectionName: string, taskId: string) => void
}

function WeekDetail({ week, onPatch, onToggleTask }: WeekDetailProps) {
  return (
    <div className="java-detail">
      <div className="java-detail-header">
        <div>
          <div className="java-detail-week-label">WEEK {week.week} OF 10</div>
          <div className="java-detail-title">{week.title}</div>
          <div className="java-detail-desc">{week.description}</div>
        </div>
        <select
          className="java-status-select"
          value={week.status}
          onChange={e => onPatch({ status: e.target.value as JavaWeekStatus })}
        >
          {JAVA_WEEK_STATUSES.map(s => (
            <option key={s} value={s}>{JAVA_WEEK_STATUS_LABEL[s]}</option>
          ))}
        </select>
      </div>

      {week.sections.map(section => (
        <div key={section.name} className="java-section">
          <div className="java-section-name">{section.name}</div>
          {section.tasks.map(task => (
            <div key={task.id} className="java-task-row">
              <input
                type="checkbox"
                className="java-task-checkbox"
                checked={task.done}
                onChange={() => onToggleTask(section.name, task.id)}
                id={task.id}
              />
              <label
                htmlFor={task.id}
                className={`java-task-title ${task.done ? 'done' : ''}`}
              >
                {task.title}
              </label>
              <TagBadge tag={task.tag} />
            </div>
          ))}
        </div>
      ))}

      <div>
        <div className="java-detail-notes-label">Notes</div>
        <textarea
          className="java-detail-notes"
          placeholder="Add notes, links, or observations for this week…"
          value={week.notes}
          onChange={e => onPatch({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}

function TagBadge({ tag }: { tag: JavaTag }) {
  return <span className={`java-tag ${tag}`}>{tag}</span>
}
