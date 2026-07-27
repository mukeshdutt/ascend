import { Icon } from '../../../shared/icons/Icon'

type ConfidenceStarsProps = {
  value: number
  onChange?: (value: number) => void
  size?: number
}

export function ConfidenceStars({ value, onChange, size = 16 }: ConfidenceStarsProps) {
  const interactive = !!onChange
  return (
    <span className={`stars ${interactive ? 'interactive' : ''}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${n <= value ? 'on' : ''}`}
          disabled={!interactive}
          onClick={(e) => {
            e.stopPropagation()
            // Click the current rating again to clear it back to unrated.
            onChange?.(value === n ? 0 : n)
          }}
          aria-label={`${n} of 5`}
        >
          <Icon name="star" size={size} />
        </button>
      ))}
    </span>
  )
}
