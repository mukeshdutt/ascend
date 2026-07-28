import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useGolangMastery } from '../golang-mastery/store'
import { useReactMastery } from '../react-mastery/store'
import { useJavaStudy } from '../java-study-tracker/store'
import { useAgenticAi } from '../agentic-ai-learning/store'
import { useInterviewTopics } from '../interview-tracker/store'
import { useBehavioral } from '../behavioral-interview/store'
import { useProblems } from '../tech-interview-tracker/store'
import { GO_STATUS_LABEL } from '../golang-mastery/types'
import { REACT_STATUS_LABEL } from '../react-mastery/types'
import { JAVA_WEEK_STATUS_LABEL } from '../java-study-tracker/types'
import { deriveWeekStatus } from '../java-study-tracker/store'
import { AI_STATUS_LABEL } from '../agentic-ai-learning/types'
import { useCurrentActions } from './store'
import './current-actions.css'
import '../../shared/mastery-layout.css'

type ActiveItem = {
  id: string
  title: string
  subtitle: string
  statusLabel: string
  statusClass: string
}

type ModuleGroup = {
  key: string
  label: string
  color: string
  iconName: string
  items: ActiveItem[]
}

const MODULE_META: Record<string, { label: string; color: string; icon: string }> = {
  'interview-2026': { label: 'Interview 2026', color: '#7851e8', icon: 'clipboard' },
  'tech-learning': { label: 'Technical Learning', color: '#2879ee', icon: 'code' },
  'behavioral': { label: 'Behavioral Interview', color: '#42b97d', icon: 'users' },
  'react-mastery': { label: 'React Mastery', color: '#2eb8e7', icon: 'atom' },
  'golang-mastery': { label: 'Golang Mastery', color: '#2cb8bf', icon: 'box' },
  'java-study': { label: 'Java Study Tracker', color: '#ff8a26', icon: 'coffee' },
  'agentic-ai': { label: 'Agentic AI Learning', color: '#7851e8', icon: 'bot' },
}

export function CurrentActions() {
  const { topics: interviewTopics } = useInterviewTopics()
  const { problems } = useProblems()
  const { stories } = useBehavioral()
  const { topics: reactTopics } = useReactMastery()
  const { topics: goTopics } = useGolangMastery()
  const { weeks: javaWeeks } = useJavaStudy()
  const { studyWeeks: aiStudyWeeks, useCases: aiUseCases } = useAgenticAi()
  const { index, getSubTasks, addSubTask, toggleSubTask, deleteSubTask } = useCurrentActions()

  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [newSubTask, setNewSubTask] = useState('')

  const groups = useMemo<ModuleGroup[]>(() => {
    const raw: { key: string; items: ActiveItem[] }[] = [
      {
        key: 'interview-2026',
        items: interviewTopics
          .filter(t => t.status === 'in-progress' || t.status === 'needs-revisit')
          .map(t => ({
            id: t.id,
            title: t.title,
            subtitle: `${t.track} · ${t.subtopic}`,
            statusLabel: t.status === 'in-progress' ? 'In Progress' : 'Needs Revisit',
            statusClass: t.status,
          })),
      },
      {
        key: 'tech-learning',
        items: problems
          .filter(p => p.status === 'attempted' || p.status === 'needs-revisit')
          .map(p => ({
            id: p.id,
            title: p.title,
            subtitle: `${p.difficulty} · ${p.patterns.slice(0, 2).join(', ')}`,
            statusLabel: p.status === 'attempted' ? 'Attempted' : 'Needs Revisit',
            statusClass: p.status,
          })),
      },
      {
        key: 'behavioral',
        items: stories
          .filter(s => s.status === 'drafted' || s.status === 'practiced')
          .map(s => ({
            id: s.id,
            title: s.question_text.length > 60 ? s.question_text.slice(0, 60) + '…' : s.question_text,
            subtitle: s.category.charAt(0).toUpperCase() + s.category.slice(1),
            statusLabel: s.status === 'drafted' ? 'Drafted' : 'Practiced',
            statusClass: s.status,
          })),
      },
      {
        key: 'react-mastery',
        items: reactTopics
          .filter(t => t.status === 'learning' || t.status === 'practiced')
          .map(t => ({
            id: t.id,
            title: t.title,
            subtitle: `${t.category} · ${t.phase}`,
            statusLabel: REACT_STATUS_LABEL[t.status],
            statusClass: t.status,
          })),
      },
      {
        key: 'golang-mastery',
        items: goTopics
          .filter(t => t.status === 'learning' || t.status === 'practiced')
          .map(t => ({
            id: t.id,
            title: t.title,
            subtitle: `${t.category} · ${t.phase}`,
            statusLabel: GO_STATUS_LABEL[t.status],
            statusClass: t.status,
          })),
      },
      {
        key: 'java-study',
        items: javaWeeks
          .filter(w => {
            const s = deriveWeekStatus(w)
            return s === 'in-progress' || w.status === 'in-progress'
          })
          .map(w => {
            const status = deriveWeekStatus(w)
            return {
              id: w.id,
              title: `Week ${w.week}: ${w.title}`,
              subtitle: w.description,
              statusLabel: JAVA_WEEK_STATUS_LABEL[status],
              statusClass: status,
            }
          }),
      },
      {
        key: 'agentic-ai',
        items: [
          ...aiStudyWeeks.filter(w => w.status === 'in-progress').map(w => ({
            id: w.id,
            title: w.weekTitle,
            subtitle: w.phase,
            statusLabel: AI_STATUS_LABEL[w.status],
            statusClass: w.status,
          })),
          ...aiUseCases.filter(u => u.status === 'in-progress').map(u => ({
            id: u.id,
            title: u.title,
            subtitle: `Week ${u.weekNum} · ${u.phase}`,
            statusLabel: AI_STATUS_LABEL[u.status],
            statusClass: u.status,
          })),
        ],
      },
    ]

    return raw
      .filter(g => g.items.length > 0)
      .map(g => {
        const meta = MODULE_META[g.key]
        return {
          key: g.key,
          label: meta.label,
          color: meta.color,
          iconName: meta.icon,
          items: g.items,
        }
      })
  }, [interviewTopics, problems, stories, reactTopics, goTopics, javaWeeks, aiStudyWeeks, aiUseCases])

  const totalPending = useMemo(() => groups.reduce((sum, g) => sum + g.items.length, 0), [groups])
  const activeModules = groups.length

  const { subTasksOpen, subTasksDone } = useMemo(() => {
    let open = 0
    let done = 0
    for (const subTasks of Object.values(index)) {
      for (const st of subTasks) {
        if (st.done) done++
        else open++
      }
    }
    return { subTasksOpen: open, subTasksDone: done }
  }, [index])

  const activeGroup = groups.find(g => g.key === selectedModule) ?? null

  const subTasks = selectedModule && selectedItemId
    ? getSubTasks(selectedModule, selectedItemId)
    : []

  const selectedItem = activeGroup?.items.find(i => i.id === selectedItemId) ?? null

  const donePct = subTasks.length
    ? Math.round(subTasks.filter(s => s.done).length / subTasks.length * 100)
    : 0

  function handleModuleClick(key: string) {
    const group = groups.find(g => g.key === key)
    setSelectedModule(key)
    setSelectedItemId(group?.items[0]?.id ?? null)
    setNewSubTask('')
  }

  function handleAddSubTask() {
    if (!selectedModule || !selectedItemId || !newSubTask.trim()) return
    addSubTask(selectedModule, selectedItemId, newSubTask.trim())
    setNewSubTask('')
  }

  return (
    <div className="current-actions mastery-page">
      <div className="intro">
        <h1>Current Actions</h1>
        <p>Your active work queue across all learning modules</p>
      </div>

      {/* Stats bar */}
      <div className="ca-stats">
        <div className="ca-stat">
          <div className="ca-stat-val c-pending">{totalPending}</div>
          <div className="ca-stat-lbl">Total Pending</div>
        </div>
        <div className="ca-stat">
          <div className="ca-stat-val c-modules">{activeModules}</div>
          <div className="ca-stat-lbl">Active Modules</div>
        </div>
        <div className="ca-stat">
          <div className="ca-stat-val c-open">{subTasksOpen}</div>
          <div className="ca-stat-lbl">Sub-tasks Open</div>
        </div>
        <div className="ca-stat">
          <div className="ca-stat-val c-done">{subTasksDone}</div>
          <div className="ca-stat-lbl">Sub-tasks Done</div>
        </div>
      </div>

      {/* Module cards */}
      {groups.length === 0 ? (
        <div className="ca-empty">
          <h3>All caught up!</h3>
          <p>No in-progress items found across your learning modules.</p>
        </div>
      ) : (
        <>
          <div className="ca-cards">
            {groups.map(g => (
              <button
                key={g.key}
                className={`ca-mod-card${selectedModule === g.key ? ' active' : ''}`}
                style={{ '--mod-color': g.color } as React.CSSProperties}
                onClick={() => handleModuleClick(g.key)}
              >
                <div className="ca-mod-icon">
                  <Icon name={g.iconName as Parameters<typeof Icon>[0]['name']} size={18} />
                </div>
                <div className="ca-mod-body">
                  <div className="ca-mod-name">{g.label}</div>
                  <div className="ca-mod-sub">active items</div>
                </div>
                <div className="ca-mod-badge">{g.items.length}</div>
              </button>
            ))}
          </div>

          {/* Workspace */}
          {selectedModule && activeGroup ? (
            <div className="ca-workspace">
              {/* Left: task list */}
              <div className="ca-task-list">
                <div className="ca-task-list-hd">
                  <h3>{activeGroup.label}</h3>
                  <span>{activeGroup.items.length} items</span>
                </div>
                <div className="ca-task-list-body">
                  {activeGroup.items.map(item => (
                    <button
                      key={item.id}
                      className={`ca-task-row${selectedItemId === item.id ? ' active' : ''}`}
                      onClick={() => { setSelectedItemId(item.id); setNewSubTask('') }}
                    >
                      <div className="ca-task-row-title">{item.title}</div>
                      {item.subtitle && <div className="ca-task-row-sub">{item.subtitle}</div>}
                      <div className="ca-task-row-foot">
                        <span className={`ca-badge ${item.statusClass}`}>{item.statusLabel}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: sub-task panel */}
              {selectedItemId && selectedItem ? (
                <div className="ca-subtask-panel">
                  <div className="ca-subtask-hd">
                    <h3>{selectedItem.title}</h3>
                    <div className="ca-subtask-meta">{selectedItem.subtitle}</div>
                    {subTasks.length > 0 && (
                      <div className="ca-subtask-progress">
                        <div className="ca-subtask-progress-track">
                          <div
                            className="ca-subtask-progress-fill"
                            style={{ width: `${donePct}%` }}
                          />
                        </div>
                        <div className="ca-subtask-progress-label">{donePct}% done</div>
                      </div>
                    )}
                  </div>
                  <div className="ca-subtask-body">
                    {subTasks.length === 0 ? (
                      <div className="ca-subtask-empty-msg">No sub-tasks yet. Add one below to break this item into steps.</div>
                    ) : (
                      subTasks.map(st => (
                        <div key={st.id} className={`ca-subtask-row${st.done ? ' done' : ''}`}>
                          <input
                            type="checkbox"
                            checked={st.done}
                            onChange={() => toggleSubTask(selectedModule, selectedItemId, st.id)}
                          />
                          <div className="ca-subtask-row-title">{st.title}</div>
                          <button
                            className="ca-subtask-del"
                            onClick={() => deleteSubTask(selectedModule, selectedItemId, st.id)}
                            title="Delete sub-task"
                          >
                            <Icon name="x" size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="ca-subtask-add">
                    <input
                      type="text"
                      placeholder="Add a sub-task…"
                      value={newSubTask}
                      onChange={e => setNewSubTask(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleAddSubTask() }}
                    />
                    <button onClick={handleAddSubTask} disabled={!newSubTask.trim()}>
                      <Icon name="plus" size={13} />
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ca-subtask-panel">
                  <div className="ca-subtask-placeholder">Select a task from the list to manage sub-tasks</div>
                </div>
              )}
            </div>
          ) : (
            <div className="ca-hint">Click a module card above to see its active tasks</div>
          )}
        </>
      )}
    </div>
  )
}
