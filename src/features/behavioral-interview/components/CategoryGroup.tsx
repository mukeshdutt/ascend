import { Icon } from '../../../shared/icons/Icon'
import type { CategoryKey, Story } from '../types'
import { CATEGORY_LABEL } from '../types'
import { StoryCard } from './StoryCard'

type CategoryGroupProps = {
  category: CategoryKey
  stories: Story[]
  expandedId: string | null
  onToggleCard: (id: string) => void
  onUpdate: (id: string, patch: Partial<Story>) => void
  open: boolean
  onToggleGroup: () => void
}

export function CategoryGroup({
  category,
  stories,
  expandedId,
  onToggleCard,
  onUpdate,
  open,
  onToggleGroup,
}: CategoryGroupProps) {
  const ready = stories.filter((s) => s.status === 'interview-ready').length

  return (
    <section className="category-group">
      <button className="category-head" onClick={onToggleGroup}>
        <Icon name={open ? 'chevronDown' : 'chevronRight'} size={16} />
        <h3>{CATEGORY_LABEL[category]}</h3>
        <span className="cat-count">{stories.length}</span>
        <span className="cat-ready">{ready} ready</span>
      </button>
      {open && (
        <div className="category-cards">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              expanded={expandedId === story.id}
              onToggle={() => onToggleCard(story.id)}
              onUpdate={(patch) => onUpdate(story.id, patch)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
