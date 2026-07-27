import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useBehavioral } from './store'
import type { CategoryKey } from './types'
import { CATEGORIES } from './types'
import { SummaryPanel } from './components/SummaryPanel'
import { StreakGrid } from './components/StreakGrid'
import { CategoryGroup } from './components/CategoryGroup'
import { StoryCard } from './components/StoryCard'
import { PracticeMode } from './components/PracticeMode'
import './behavioral.css'

type SortMode = 'category' | 'weakest'

export function BehavioralInterview() {
  const { stories, practiceLog, updateStory } = useBehavioral()
  const [categoryFilter, setCategoryFilter] = useState<'' | CategoryKey>('')
  const [sortMode, setSortMode] = useState<SortMode>('category')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [practicing, setPracticing] = useState(false)
  const [openCategories, setOpenCategories] = useState<Record<CategoryKey, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((category) => [category.key, true])) as Record<CategoryKey, boolean>,
  )

  const filtered = useMemo(
    () => (categoryFilter ? stories.filter((s) => s.category === categoryFilter) : stories),
    [stories, categoryFilter],
  )

  // Weakest-first: lowest confidence surfaced first (unrated treated as 0).
  const weakestFirst = useMemo(
    () => [...filtered].sort((a, b) => a.confidence_rating - b.confidence_rating),
    [filtered],
  )

  const visibleCategories = categoryFilter
    ? CATEGORIES.filter((c) => c.key === categoryFilter)
    : CATEGORIES

  const toggleCard = (id: string) => setExpandedId((cur) => (cur === id ? null : id))
  const setAllCategories = (open: boolean) =>
    setOpenCategories(Object.fromEntries(CATEGORIES.map((category) => [category.key, open])) as Record<CategoryKey, boolean>)
  const hasOpenCategory = visibleCategories.some((category) => openCategories[category.key])

  // The queue Practice mode walks through follows the current view order.
  const practiceQueue = useMemo(
    () => (sortMode === 'weakest' ? weakestFirst : filtered).map((s) => s.id),
    [sortMode, weakestFirst, filtered],
  )

  return (
    <div className="content behavioral">
      <section className="intro">
        <div>
          <h1>Behavioral Interview</h1>
          <p>STAR-method story bank &amp; speaking-practice tracker.</p>
        </div>
        <button className="btn-primary" onClick={() => setPracticing(true)}>
          <Icon name="play" size={15} /> Practice mode
        </button>
      </section>

      <div className="behavioral-top">
        <SummaryPanel stories={stories} />
        <StreakGrid practiceLog={practiceLog} />
      </div>

      <div className="behavioral-controls">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as '' | CategoryKey)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="sort-toggle">
          <button className={sortMode === 'category' ? 'on' : ''} onClick={() => setSortMode('category')}>
            By category
          </button>
          <button className={sortMode === 'weakest' ? 'on' : ''} onClick={() => setSortMode('weakest')}>
            <Icon name="chevronUp" size={13} /> Weakest first
          </button>
        </div>
        {sortMode === 'category' && (
          <div className="group-actions">
            <button onClick={() => setAllCategories(!hasOpenCategory)}>
              {hasOpenCategory ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
        )}
      </div>

      {sortMode === 'weakest' ? (
        <div className="weakest-list">
          {weakestFirst.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              expanded={expandedId === story.id}
              onToggle={() => toggleCard(story.id)}
              onUpdate={(patch) => updateStory(story.id, patch)}
            />
          ))}
        </div>
      ) : (
        visibleCategories.map((c) => (
          <CategoryGroup
            key={c.key}
            category={c.key}
            stories={filtered.filter((s) => s.category === c.key)}
            expandedId={expandedId}
            onToggleCard={toggleCard}
            onUpdate={updateStory}
            open={openCategories[c.key]}
            onToggleGroup={() =>
              setOpenCategories((current) => ({ ...current, [c.key]: !current[c.key] }))
            }
          />
        ))
      )}

      {practicing && <PracticeMode queue={practiceQueue} onClose={() => setPracticing(false)} />}
    </div>
  )
}
