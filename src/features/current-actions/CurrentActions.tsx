import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useGolangMastery } from '../golang-mastery/store'
import { useReactMastery } from '../react-mastery/store'
import { useJavaStudy } from '../java-study-tracker/store'
import { useAgenticAi } from '../agentic-ai-learning/store'
import { useInterviewTopics } from '../interview-tracker/store'
import { useBehavioral } from '../behavioral-interview/store'
import { useProblems } from '../tech-interview-tracker/store'
import { useCloudMastery } from '../cloud-mastery/store'
import { useClaudeMastery } from '../claude-mastery/store'
import { GO_STATUS_LABEL } from '../golang-mastery/types'
import { REACT_STATUS_LABEL } from '../react-mastery/types'
import { JAVA_WEEK_STATUS_LABEL } from '../java-study-tracker/types'
import { deriveWeekStatus } from '../java-study-tracker/store'
import { AI_STATUS_LABEL } from '../agentic-ai-learning/types'
import { PROJECT_STATUS_LABEL, CLOUD_PHASES } from '../cloud-mastery/types'
import { CLAUDE_WEEK_STATUS_LABEL } from '../claude-mastery/types'
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
  'cloud-mastery': { label: 'Cloud Mastery', color: '#4285f4', icon: 'cloud' },
  'claude-mastery': { label: 'Claude Mastery', color: '#c96442', icon: 'sparkles' },
}

export function CurrentActions() {
  const { topics: interviewTopics } = useInterviewTopics()
  const { problems } = useProblems()
  const { stories } = useBehavioral()
  const { topics: reactTopics } = useReactMastery()
  const { topics: goTopics } = useGolangMastery()
  const { weeks: javaWeeks } = useJavaStudy()
  const { studyWeeks: aiStudyWeeks, useCases: aiUseCases } = useAgenticAi()
  const { cloudProjects } = useCloudMastery()
  const { weeks: claudeWeeks } = useClaudeMastery()
  const { index, getSubTasks, addSubTask, toggleSubTask, deleteSubTask } = useCurrentActions()

  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set())
  const [expandedItemKey, setExpandedItemKey] = useState<string | null>(null)
  const [newSubTaskMap, setNewSubTaskMap] = useState<Record<string, string>>({})

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
      {
        key: 'cloud-mastery',
        items: cloudProjects
          .filter(p => p.status === 'in-progress')
          .map(p => {
            const phase = CLOUD_PHASES.find(ph => ph.id === p.phaseId)
            return {
              id: p.id,
              title: p.projectTitle,
              subtitle: `${p.cloud} · ${p.serviceName}${phase ? ` · ${phase.label}` : ''}`,
              statusLabel: PROJECT_STATUS_LABEL[p.status],
              statusClass: p.status,
            }
          }),
      },
      {
        key: 'claude-mastery',
        items: claudeWeeks
          .filter(w => w.status === 'in-progress')
          .map(w => ({
            id: w.id,
            title: `Week ${w.week}: ${w.title}`,
            subtitle: w.deliverable,
            statusLabel: CLAUDE_WEEK_STATUS_LABEL[w.status],
            statusClass: w.status,
          })),
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
  }, [interviewTopics, problems, stories, reactTopics, goTopics, javaWeeks, aiStudyWeeks, aiUseCases, cloudProjects, claudeWeeks])

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

  const visibleGroups = selectedModules.size === 0
    ? []
    : groups.filter(g => selectedModules.has(g.key))

  function toggleModule(key: string) {
    setSelectedModules(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function removeModule(key: string) {
    setSelectedModules(prev => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
    // collapse any expanded items from this module
    if (expandedItemKey?.startsWith(key + '::')) setExpandedItemKey(null)
  }

  function toggleExpand(moduleKey: string, itemId: string) {
    const k = `${moduleKey}::${itemId}`
    setExpandedItemKey(prev => (prev === k ? null : k))
  }

  function handleAddSubTask(moduleKey: string, itemId: string) {
    const mapKey = `${moduleKey}::${itemId}`
    const title = (newSubTaskMap[mapKey] ?? '').trim()
    if (!title) return
    addSubTask(moduleKey, itemId, title)
    setNewSubTaskMap(prev => ({ ...prev, [mapKey]: '' }))
  }

  return (
    <div className="current-actions content">
      <div className="ca-page-header">
        <div className="intro">
          <h1>Current Actions</h1>
          <p>Your active work queue across all learning modules</p>
        </div>
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

      {groups.length === 0 ? (
        <div className="ca-empty">
          <h3>All caught up!</h3>
          <p>No in-progress items found across your learning modules.</p>
        </div>
      ) : (
        <>
          {/* Module pill filter */}
          <div className="ca-filter-bar">
            <span className="ca-filter-label">Filter by module:</span>
            <div className="ca-pills">
              {groups.map(g => (
                <button
                  key={g.key}
                  className={`ca-pill${selectedModules.has(g.key) ? ' selected' : ''}`}
                  style={{ '--mod-color': g.color } as React.CSSProperties}
                  onClick={() => toggleModule(g.key)}
                >
                  <span className="ca-pill-icon">
                    <Icon name={g.iconName as Parameters<typeof Icon>[0]['name']} size={13} />
                  </span>
                  {g.label}
                  <span className="ca-pill-count">{g.items.length}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Module cards */}
          {selectedModules.size === 0 ? (
            <div className="ca-hint">
              <Icon name="clipboard" size={20} />
              <span>Select one or more modules above to view their in-progress tasks</span>
            </div>
          ) : (
            <div className="ca-module-cards">
              {visibleGroups.map(g => (
                <ModuleCard
                  key={g.key}
                  group={g}
                  expandedItemKey={expandedItemKey}
                  newSubTaskMap={newSubTaskMap}
                  getSubTasks={getSubTasks}
                  onToggleExpand={toggleExpand}
                  onRemove={removeModule}
                  onToggleSubTask={toggleSubTask}
                  onDeleteSubTask={deleteSubTask}
                  onNewSubTaskChange={(mk, id, val) =>
                    setNewSubTaskMap(prev => ({ ...prev, [`${mk}::${id}`]: val }))
                  }
                  onAddSubTask={handleAddSubTask}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

type ModuleCardProps = {
  group: ModuleGroup
  expandedItemKey: string | null
  newSubTaskMap: Record<string, string>
  getSubTasks: (mk: string, id: string) => { id: string; title: string; done: boolean }[]
  onToggleExpand: (mk: string, id: string) => void
  onRemove: (key: string) => void
  onToggleSubTask: (mk: string, id: string, stId: string) => void
  onDeleteSubTask: (mk: string, id: string, stId: string) => void
  onNewSubTaskChange: (mk: string, id: string, val: string) => void
  onAddSubTask: (mk: string, id: string) => void
}

function ModuleCard({
  group,
  expandedItemKey,
  newSubTaskMap,
  getSubTasks,
  onToggleExpand,
  onRemove,
  onToggleSubTask,
  onDeleteSubTask,
  onNewSubTaskChange,
  onAddSubTask,
}: ModuleCardProps) {
  return (
    <div
      className="ca-module-card"
      style={{ '--mod-color': group.color } as React.CSSProperties}
    >
      {/* Card header */}
      <div className="ca-card-header">
        <div className="ca-card-header-left">
          <div className="ca-card-icon">
            <Icon name={group.iconName as Parameters<typeof Icon>[0]['name']} size={16} />
          </div>
          <div className="ca-card-title-block">
            <div className="ca-card-name">{group.label}</div>
            <div className="ca-card-count">{group.items.length} pending task{group.items.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <button
          className="ca-card-close"
          onClick={() => onRemove(group.key)}
          title="Remove module"
          aria-label="Remove module"
        >
          <Icon name="x" size={14} />
        </button>
      </div>

      {/* Task list */}
      <div className="ca-card-tasks">
        {group.items.map((item, idx) => {
          const itemKey = `${group.key}::${item.id}`
          const isExpanded = expandedItemKey === itemKey
          const subTasks = getSubTasks(group.key, item.id)
          const donePct = subTasks.length
            ? Math.round(subTasks.filter(s => s.done).length / subTasks.length * 100)
            : 0
          const newVal = newSubTaskMap[itemKey] ?? ''

          return (
            <div key={item.id} className={`ca-task-item${isExpanded ? ' expanded' : ''}${idx === group.items.length - 1 ? ' last' : ''}`}>
              {/* Task row */}
              <button
                className="ca-task-header"
                onClick={() => onToggleExpand(group.key, item.id)}
              >
                <div className="ca-task-chevron">
                  <Icon name={isExpanded ? 'chevronDown' : 'chevronRight'} size={12} />
                </div>
                <div className="ca-task-info">
                  <div className="ca-task-title">{item.title}</div>
                  {item.subtitle && <div className="ca-task-subtitle">{item.subtitle}</div>}
                </div>
                <div className="ca-task-meta">
                  {subTasks.length > 0 && (
                    <span className="ca-task-st-count">
                      {subTasks.filter(s => s.done).length}/{subTasks.length} done
                    </span>
                  )}
                  <span className={`ca-badge ${item.statusClass}`}>{item.statusLabel}</span>
                </div>
              </button>

              {/* Expanded subtask panel */}
              {isExpanded && (
                <div className="ca-subtask-panel">
                  {subTasks.length > 0 && (
                    <div className="ca-stask-progress-row">
                      <div className="ca-stask-bar">
                        <div className="ca-stask-fill" style={{ width: `${donePct}%` }} />
                      </div>
                      <span className="ca-stask-pct">{donePct}%</span>
                    </div>
                  )}

                  {subTasks.length === 0 ? (
                    <div className="ca-stask-empty">No sub-tasks yet — add one below to break this into steps.</div>
                  ) : (
                    <div className="ca-stask-list">
                      {subTasks.map(st => (
                        <div key={st.id} className={`ca-stask-row${st.done ? ' done' : ''}`}>
                          <input
                            type="checkbox"
                            checked={st.done}
                            onChange={() => onToggleSubTask(group.key, item.id, st.id)}
                          />
                          <span className="ca-stask-title">{st.title}</span>
                          <button
                            className="ca-stask-del"
                            onClick={() => onDeleteSubTask(group.key, item.id, st.id)}
                            title="Delete"
                          >
                            <Icon name="x" size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="ca-stask-add">
                    <input
                      type="text"
                      placeholder="Add a sub-task…"
                      value={newVal}
                      onChange={e => onNewSubTaskChange(group.key, item.id, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') onAddSubTask(group.key, item.id) }}
                    />
                    <button
                      onClick={() => onAddSubTask(group.key, item.id)}
                      disabled={!newVal.trim()}
                    >
                      <Icon name="plus" size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
