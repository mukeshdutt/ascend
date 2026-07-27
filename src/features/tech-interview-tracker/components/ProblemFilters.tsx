import { Icon } from '../../../shared/icons/Icon'
import type { Filters } from '../filtering'
import { defaultFilters } from '../filtering'
import { COMMON_PATTERNS, DIFFICULTIES, LANGUAGES, STATUSES, STATUS_META } from '../types'

type ProblemFiltersProps = {
  filters: Filters
  onChange: (filters: Filters) => void
  dueCount: number
  patterns: string[]
}

export function ProblemFilters({ filters, onChange, dueCount, patterns }: ProblemFiltersProps) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value })

  const patternOptions = [...new Set([...COMMON_PATTERNS, ...patterns])].sort()
  const isFiltered =
    filters.search || filters.pattern || filters.difficulty || filters.status || filters.language

  return (
    <div className="filters">
      <div className="filter-search">
        <Icon name="search" size={16} />
        <input
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
          placeholder="Search problems by title..."
        />
      </div>

      <select value={filters.pattern} onChange={(e) => set('pattern', e.target.value)}>
        <option value="">All patterns</option>
        {patternOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        value={filters.difficulty}
        onChange={(e) => set('difficulty', e.target.value as Filters['difficulty'])}
      >
        <option value="">All difficulty</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => set('status', e.target.value as Filters['status'])}
      >
        <option value="">All status</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_META[s].label}
          </option>
        ))}
      </select>

      <select value={filters.language} onChange={(e) => set('language', e.target.value)}>
        <option value="">All languages</option>
        {LANGUAGES.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <button
        className={`due-toggle ${filters.dueOnly ? 'active' : ''}`}
        onClick={() => set('dueOnly', !filters.dueOnly)}
      >
        <Icon name="clock" size={15} />
        Due for revisit
        {dueCount > 0 && <em>{dueCount}</em>}
      </button>

      {(isFiltered || filters.dueOnly) && (
        <button className="clear-filters" onClick={() => onChange(defaultFilters)}>
          Clear
        </button>
      )}
    </div>
  )
}
