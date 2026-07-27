import { Icon } from '../../../shared/icons/Icon'
import type { Problem } from '../types'
import { STATUS_META, DIFFICULTY_META } from '../types'
import type { SortKey, SortState } from '../filtering'
import { isDue, relativeRevisitLabel } from '../spacedRepetition'

type ProblemTableProps = {
  problems: Problem[]
  sort: SortState
  onSort: (key: SortKey) => void
  onEdit: (problem: Problem) => void
  onDelete: (id: string) => void
}

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'title', label: 'Problem' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'status', label: 'Status' },
  { key: 'language', label: 'Lang' },
  { key: 'timeTakenMinutes', label: 'Time' },
  { key: 'lastAttemptedDate', label: 'Last Attempt' },
  { key: 'nextRevisitDate', label: 'Next Revisit' },
]

export function ProblemTable({ problems, sort, onSort, onEdit, onDelete }: ProblemTableProps) {
  return (
    <div className="panel table-panel">
      <table className="problem-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col.key} onClick={() => onSort(col.key)} className="sortable">
                <span>{col.label}</span>
                {sort.key === col.key && (
                  <Icon name={sort.dir === 'asc' ? 'chevronUp' : 'chevronDown'} size={13} />
                )}
              </th>
            ))}
            <th className="col-actions" />
          </tr>
        </thead>
        <tbody>
          {problems.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length + 1} className="empty-row">
                No problems match the current filters.
              </td>
            </tr>
          )}
          {problems.map((p) => (
            <tr key={p.id} onClick={() => onEdit(p)}>
              <td>
                <div className="cell-title">
                  <strong>{p.title}</strong>
                  <div className="tag-row">
                    <span className="src-tag">{p.source}</span>
                    {p.patterns.map((pat) => (
                      <span className="pattern-tag" key={pat}>
                        {pat}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge ${DIFFICULTY_META[p.difficulty].className}`}>
                  {p.difficulty}
                </span>
              </td>
              <td>
                <span className={`badge ${STATUS_META[p.status].className}`}>
                  {STATUS_META[p.status].label}
                </span>
              </td>
              <td className="muted">{p.language ?? '—'}</td>
              <td className="muted">{p.timeTakenMinutes ? `${p.timeTakenMinutes}m` : '—'}</td>
              <td className="muted">{p.lastAttemptedDate ?? '—'}</td>
              <td>
                {p.nextRevisitDate ? (
                  <span className={`revisit ${isDue(p.nextRevisitDate) ? 'due' : ''}`}>
                    {p.nextRevisitDate}
                    <em>{relativeRevisitLabel(p.nextRevisitDate)}</em>
                  </span>
                ) : (
                  <span className="muted">—</span>
                )}
              </td>
              <td className="col-actions" onClick={(e) => e.stopPropagation()}>
                <button className="row-btn" onClick={() => onEdit(p)} aria-label="Edit">
                  <Icon name="edit" size={15} />
                </button>
                <button
                  className="row-btn danger"
                  onClick={() => onDelete(p.id)}
                  aria-label="Delete"
                >
                  <Icon name="trash" size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
