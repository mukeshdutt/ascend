import { Icon } from '../../../shared/icons/Icon'
import type { Story, StoryStatus } from '../types'
import { STATUS_META, STATUSES } from '../types'
import { ConfidenceStars } from './ConfidenceStars'

type StoryCardProps = {
  story: Story
  expanded: boolean
  onToggle: () => void
  onUpdate: (patch: Partial<Story>) => void
}

const STAR_FIELDS: { key: keyof Story; label: string; placeholder: string }[] = [
  { key: 'star_situation', label: 'Situation', placeholder: 'Set the scene — context and stakes.' },
  { key: 'star_task', label: 'Task', placeholder: 'What was your responsibility or goal?' },
  { key: 'star_action', label: 'Action', placeholder: 'What did YOU specifically do?' },
  { key: 'star_result', label: 'Result', placeholder: 'Outcome, impact, and what you learned.' },
]

export function StoryCard({ story, expanded, onToggle, onUpdate }: StoryCardProps) {
  return (
    <div className={`story-card ${expanded ? 'open' : ''}`}>
      <button className="story-head" onClick={onToggle}>
        <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={16} />
        <span className="story-q">{story.question_text}</span>
        <span className="story-meta">
          <ConfidenceStars value={story.confidence_rating} size={14} />
          <span className="practiced-count" title="Times practiced">
            <Icon name="play" size={11} /> {story.practiced_count}
          </span>
          <span className={`badge ${STATUS_META[story.status].className}`}>
            {STATUS_META[story.status].label}
          </span>
        </span>
      </button>

      {expanded && (
        <div className="story-editor">
          <div className="editor-controls">
            <label>
              <span>Status</span>
              <select
                value={story.status}
                onChange={(e) => onUpdate({ status: e.target.value as StoryStatus })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="conf-control">
              <span>Confidence</span>
              <ConfidenceStars
                value={story.confidence_rating}
                onChange={(v) => onUpdate({ confidence_rating: v })}
              />
            </label>
            {story.last_practiced_date && (
              <span className="last-practiced">Last practiced {story.last_practiced_date}</span>
            )}
          </div>

          <div className="star-fields">
            {STAR_FIELDS.map((f) => (
              <label key={f.key} className="star-field">
                <span>{f.label}</span>
                <textarea
                  value={story[f.key] as string}
                  onChange={(e) => onUpdate({ [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  rows={3}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
