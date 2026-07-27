import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../../../shared/icons/Icon'
import { useBehavioral } from '../store'
import { CATEGORY_LABEL } from '../types'
import { ConfidenceStars } from './ConfidenceStars'

type PracticeModeProps = {
  queue: string[] // story ids, in the order currently shown
  onClose: () => void
}

const STAR_ROWS: { key: 'star_situation' | 'star_task' | 'star_action' | 'star_result'; label: string }[] = [
  { key: 'star_situation', label: 'Situation' },
  { key: 'star_task', label: 'Task' },
  { key: 'star_action', label: 'Action' },
  { key: 'star_result', label: 'Result' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function PracticeMode({ queue, onClose }: PracticeModeProps) {
  const { stories, practiceStory, updateStory } = useBehavioral()
  const [random, setRandom] = useState(false)
  const [order, setOrder] = useState<string[]>(queue)
  const [idx, setIdx] = useState(0)
  const [rating, setRating] = useState(false) // showing the re-rate prompt

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const setMode = (isRandom: boolean) => {
    setRandom(isRandom)
    setOrder(isRandom ? shuffle(queue) : queue)
    setIdx(0)
    setRating(false)
  }

  const story = useMemo(() => stories.find((s) => s.id === order[idx]), [stories, order, idx])
  const goTo = (n: number) => {
    setIdx(Math.max(0, Math.min(order.length - 1, n)))
    setRating(false)
  }

  if (!story) {
    return (
      <div className="practice-overlay">
        <div className="practice-empty">
          <p>No stories to practice with the current filters.</p>
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  }

  const isLast = idx === order.length - 1
  const handlePracticed = () => {
    practiceStory(story.id)
    setRating(true)
  }
  const handleRate = (value: number) => {
    updateStory(story.id, { confidence_rating: value })
    if (isLast) onClose()
    else goTo(idx + 1)
  }

  return (
    <div className="practice-overlay">
      <div className="practice-topbar">
        <div className="practice-progress">
          Practice mode · {idx + 1} of {order.length}
        </div>
        <div className="practice-mode-toggle">
          <button className={!random ? 'on' : ''} onClick={() => setMode(false)}>
            Sequential
          </button>
          <button className={random ? 'on' : ''} onClick={() => setMode(true)}>
            <Icon name="shuffle" size={13} /> Random
          </button>
        </div>
        <button className="practice-close" onClick={onClose} aria-label="Exit practice">
          <Icon name="x" size={20} />
        </button>
      </div>

      <div className="practice-body">
        <span className="practice-cat">{CATEGORY_LABEL[story.category]}</span>
        <h1 className="practice-question">{story.question_text}</h1>

        <div className="practice-star">
          {STAR_ROWS.map((row) => (
            <div className="practice-star-row" key={row.key}>
              <span className="ps-label">{row.label}</span>
              <p className={story[row.key] ? '' : 'empty'}>
                {story[row.key] || 'Nothing drafted yet — rehearse it out loud from memory.'}
              </p>
            </div>
          ))}
        </div>

        {rating ? (
          <div className="practice-rate">
            <p>Nice work! How confident do you feel now?</p>
            <ConfidenceStars value={story.confidence_rating} onChange={handleRate} size={30} />
            <button className="btn-ghost" onClick={() => (isLast ? onClose() : goTo(idx + 1))}>
              Skip rating
            </button>
          </div>
        ) : (
          <button className="btn-primary practice-did" onClick={handlePracticed}>
            <Icon name="check" size={18} /> I practiced this
          </button>
        )}
      </div>

      <div className="practice-nav">
        <button className="btn-ghost" onClick={() => goTo(idx - 1)} disabled={idx === 0}>
          <Icon name="arrowLeft" size={16} /> Previous
        </button>
        <span className="practiced-note">Practiced {story.practiced_count}×</span>
        <button className="btn-ghost" onClick={() => goTo(idx + 1)} disabled={isLast}>
          Next <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </div>
  )
}
