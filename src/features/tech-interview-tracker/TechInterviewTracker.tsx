import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useProblems } from './store'
import type { NewProblem } from './store'
import type { Problem } from './types'
import { isDue } from './spacedRepetition'
import { applyFilters, defaultFilters, sortProblems } from './filtering'
import type { Filters, SortKey, SortState } from './filtering'
import { StatsPanel } from './components/StatsPanel'
import { ProblemFilters } from './components/ProblemFilters'
import { ProblemTable } from './components/ProblemTable'
import { ProblemModal } from './components/ProblemModal'
import './tech-tracker.css'

type TechInterviewTrackerProps = {
  title?: string
  description?: string
  tabs?: React.ReactNode
}

export function TechInterviewTracker({
  title = 'Technical Learning',
  description = 'Coding-interview problems with spaced-repetition revisits.',
  tabs,
}: TechInterviewTrackerProps) {
  const { problems, addProblem, updateProblem, deleteProblem } = useProblems()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [sort, setSort] = useState<SortState>({ key: 'nextRevisitDate', dir: 'asc' })
  const [modal, setModal] = useState<{ open: boolean; editing: Problem | null }>({
    open: false,
    editing: null,
  })

  const dueCount = useMemo(() => problems.filter((p) => isDue(p.nextRevisitDate)).length, [problems])
  const allPatterns = useMemo(() => problems.flatMap((p) => p.patterns), [problems])

  const visible = useMemo(
    () => sortProblems(applyFilters(problems, filters), sort),
    [problems, filters, sort],
  )

  const onSort = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))

  const handleSave = (data: NewProblem) => {
    if (modal.editing) updateProblem(modal.editing.id, data)
    else addProblem(data)
  }

  return (
    <div className="content tech-tracker">
      <section className="intro">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="btn-primary add-problem" onClick={() => setModal({ open: true, editing: null })}>
          <Icon name="plus" size={16} /> Add problem
        </button>
      </section>

      {tabs}

      <StatsPanel problems={problems} />

      <ProblemFilters
        filters={filters}
        onChange={setFilters}
        dueCount={dueCount}
        patterns={allPatterns}
      />

      <div className="table-meta">
        Showing {visible.length} of {problems.length} problems
        {filters.dueOnly && ' · due for revisit'}
      </div>

      <ProblemTable
        problems={visible}
        sort={sort}
        onSort={onSort}
        onEdit={(p) => setModal({ open: true, editing: p })}
        onDelete={deleteProblem}
      />

      {modal.open && (
        <ProblemModal
          problem={modal.editing}
          onClose={() => setModal({ open: false, editing: null })}
          onSave={handleSave}
          onDelete={deleteProblem}
        />
      )}
    </div>
  )
}
