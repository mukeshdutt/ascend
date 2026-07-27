import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { Icon } from '../../../shared/icons/Icon'
import type { NewProblem } from '../store'
import type { Problem, ProblemStatus } from '../types'
import {
  COMMON_PATTERNS,
  DIFFICULTIES,
  LANGUAGES,
  SOURCES,
  STATUSES,
  STATUS_META,
} from '../types'
import { suggestNextRevisit, todayISO } from '../spacedRepetition'

type ProblemModalProps = {
  problem: Problem | null // null = create
  onClose: () => void
  onSave: (problem: NewProblem) => void
  onDelete: (id: string) => void
}

type FormState = {
  title: string
  source: Problem['source']
  difficulty: Problem['difficulty']
  status: ProblemStatus
  patterns: string[]
  language: string
  timeTaken: string
  lastAttemptedDate: string
  nextRevisitDate: string
  solutionNotes: string
}

function initialForm(problem: Problem | null): FormState {
  return {
    title: problem?.title ?? '',
    source: problem?.source ?? 'LeetCode',
    difficulty: problem?.difficulty ?? 'Medium',
    status: problem?.status ?? 'not-started',
    patterns: problem?.patterns ?? [],
    language: problem?.language ?? '',
    timeTaken: problem?.timeTakenMinutes ? String(problem.timeTakenMinutes) : '',
    lastAttemptedDate: problem?.lastAttemptedDate ?? '',
    nextRevisitDate: problem?.nextRevisitDate ?? '',
    solutionNotes: problem?.solutionNotes ?? '',
  }
}

export function ProblemModal({ problem, onClose, onSave, onDelete }: ProblemModalProps) {
  const [form, setForm] = useState<FormState>(() => initialForm(problem))
  const [customPattern, setCustomPattern] = useState('')

  const baseRevisitCount = problem?.revisitCount ?? 0
  const wasSolved = problem?.status === 'solved'

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleStatusChange = (status: ProblemStatus) => {
    setForm((f) => {
      const next = { ...f, status }
      // Auto-fill a spaced-repetition suggestion when first marking solved.
      if (status === 'solved' && !f.nextRevisitDate) {
        next.nextRevisitDate = suggestNextRevisit(baseRevisitCount)
      }
      // Record an attempt date when moving off "not started".
      if (status !== 'not-started' && !f.lastAttemptedDate) {
        next.lastAttemptedDate = todayISO()
      }
      return next
    })
  }

  const togglePattern = (pattern: string) =>
    setForm((f) => ({
      ...f,
      patterns: f.patterns.includes(pattern)
        ? f.patterns.filter((p) => p !== pattern)
        : [...f.patterns, pattern],
    }))

  const addCustomPattern = () => {
    const p = customPattern.trim()
    if (p && !form.patterns.includes(p)) togglePattern(p)
    setCustomPattern('')
  }

  const handleSave = () => {
    if (!form.title.trim()) return
    const time = form.timeTaken.trim() ? Number(form.timeTaken) : undefined
    const revisitCount =
      form.status === 'solved' && !wasSolved ? baseRevisitCount + 1 : baseRevisitCount

    onSave({
      title: form.title.trim(),
      source: form.source,
      difficulty: form.difficulty,
      status: form.status,
      patterns: form.patterns,
      language: (form.language || undefined) as Problem['language'],
      timeTakenMinutes: Number.isFinite(time) ? time : undefined,
      solutionNotes: form.solutionNotes,
      lastAttemptedDate: form.lastAttemptedDate || undefined,
      nextRevisitDate: form.nextRevisitDate || undefined,
      revisitCount,
    })
    onClose()
  }

  const extraPatterns = form.patterns.filter((p) => !COMMON_PATTERNS.includes(p))

  const footer = (
    <>
      {problem && (
        <button
          className="btn-danger"
          onClick={() => {
            onDelete(problem.id)
            onClose()
          }}
        >
          <Icon name="trash" size={15} /> Delete
        </button>
      )}
      <span style={{ flex: 1 }} />
      <button className="btn-ghost" onClick={onClose}>
        Cancel
      </button>
      <button className="btn-primary" onClick={handleSave} disabled={!form.title.trim()}>
        <Icon name="check" size={15} /> {problem ? 'Save changes' : 'Add problem'}
      </button>
    </>
  )

  return (
    <Modal
      title={problem ? 'Edit problem' : 'Add problem'}
      subtitle="Track a coding-interview problem and its revisit schedule."
      onClose={onClose}
      footer={footer}
      size="lg"
    >
      <div className="form-grid">
        <label className="fld span-2">
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. Merge k Sorted Lists"
            autoFocus
          />
        </label>

        <label className="fld">
          <span>Source</span>
          <select value={form.source} onChange={(e) => set('source', e.target.value as Problem['source'])}>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="fld">
          <span>Difficulty</span>
          <select
            value={form.difficulty}
            onChange={(e) => set('difficulty', e.target.value as Problem['difficulty'])}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="fld">
          <span>Status</span>
          <select value={form.status} onChange={(e) => handleStatusChange(e.target.value as ProblemStatus)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </label>

        <label className="fld">
          <span>Language</span>
          <select value={form.language} onChange={(e) => set('language', e.target.value)}>
            <option value="">—</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <div className="fld span-2">
          <span>Patterns / topics</span>
          <div className="pattern-picker">
            {COMMON_PATTERNS.map((p) => (
              <button
                key={p}
                type="button"
                className={`chip ${form.patterns.includes(p) ? 'on' : ''}`}
                onClick={() => togglePattern(p)}
              >
                {p}
              </button>
            ))}
            {extraPatterns.map((p) => (
              <button key={p} type="button" className="chip on custom" onClick={() => togglePattern(p)}>
                {p}
                <Icon name="x" size={12} />
              </button>
            ))}
          </div>
          <div className="pattern-add">
            <input
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addCustomPattern()
                }
              }}
              placeholder="Add custom tag..."
            />
            <button type="button" onClick={addCustomPattern}>
              <Icon name="plus" size={14} /> Add
            </button>
          </div>
        </div>

        <label className="fld">
          <span>Time taken (min)</span>
          <input
            type="number"
            min="0"
            value={form.timeTaken}
            onChange={(e) => set('timeTaken', e.target.value)}
            placeholder="optional"
          />
        </label>

        <label className="fld">
          <span>Last attempted</span>
          <input
            type="date"
            value={form.lastAttemptedDate}
            onChange={(e) => set('lastAttemptedDate', e.target.value)}
          />
        </label>

        <label className="fld">
          <span>
            Next revisit
            {form.status === 'solved' && <em className="suggested"> · suggested</em>}
          </span>
          <input
            type="date"
            value={form.nextRevisitDate}
            onChange={(e) => set('nextRevisitDate', e.target.value)}
          />
        </label>

        <label className="fld span-2">
          <span>Solution notes</span>
          <textarea
            className="code-notes"
            value={form.solutionNotes}
            onChange={(e) => set('solutionNotes', e.target.value)}
            placeholder="Approach, complexity, and code snippets…"
            rows={7}
            spellCheck={false}
          />
        </label>
      </div>
    </Modal>
  )
}
