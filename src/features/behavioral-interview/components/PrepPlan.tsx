import { useMemo, useState } from 'react'
import { Icon } from '../../../shared/icons/Icon'
import { useBehavioral } from '../store'
import type { PlanWeek } from '../types'
import { PLAN_MANTRA, seedPlanWeeks } from '../planData'

function weekProgress(week: PlanWeek, done: Record<string, boolean>) {
  const tasks = week.sections.flatMap((s) => s.tasks)
  const completed = tasks.filter((t) => done[t.id]).length
  return { completed, total: tasks.length }
}

export function PrepPlan() {
  const { planDone, togglePlanTask } = useBehavioral()
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(seedPlanWeeks.map((w, i) => [w.id, i === 0])),
  )

  const overall = useMemo(() => {
    const tasks = seedPlanWeeks.flatMap((w) => w.sections.flatMap((s) => s.tasks))
    const completed = tasks.filter((t) => planDone[t.id]).length
    return { completed, total: tasks.length, pct: Math.round((completed / tasks.length) * 100) }
  }, [planDone])

  return (
    <div className="prep-plan">
      <div className="plan-header">
        <div>
          <h2>Behavioral Interview 2026</h2>
          <p>6-Week Preparation Tracker</p>
        </div>
        <div className="plan-overall">
          <b>{overall.pct}%</b>
          <span>
            {overall.completed} / {overall.total} tasks
          </span>
        </div>
      </div>
      <div className="plan-progress-track">
        <div className="plan-progress-fill" style={{ width: `${overall.pct}%` }} />
      </div>

      {seedPlanWeeks.map((week) => {
        const { completed, total } = weekProgress(week, planDone)
        const open = openWeeks[week.id]
        return (
          <section key={week.id} className={`plan-week${open ? ' open' : ''}`}>
            <button
              className="plan-week-head"
              onClick={() => setOpenWeeks((cur) => ({ ...cur, [week.id]: !cur[week.id] }))}
            >
              <Icon name={open ? 'chevronDown' : 'chevronRight'} size={14} />
              <span className="plan-week-code">{week.code}</span>
              <h3>{week.title}</h3>
              <em>{week.subtitle}</em>
              <span className={`plan-week-count${completed === total ? ' done' : ''}`}>
                {completed}/{total}
              </span>
            </button>
            {open && (
              <div className="plan-sections">
                {week.sections.map((section) => (
                  <div key={section.id} className="plan-section">
                    <h4>
                      <span aria-hidden="true">{section.emoji}</span> {section.title}
                    </h4>
                    <ul>
                      {section.tasks.map((task) => (
                        <li key={task.id}>
                          <label className={planDone[task.id] ? 'checked' : ''}>
                            <input
                              type="checkbox"
                              checked={!!planDone[task.id]}
                              onChange={() => togglePlanTask(task.id)}
                            />
                            <span>{task.label}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      })}

      <p className="plan-mantra">{PLAN_MANTRA}</p>
    </div>
  )
}
