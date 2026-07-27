import { Icon } from '../../../shared/icons/Icon'
import type { IconName } from '../../../shared/icons/Icon'

type Action = {
  variant: 'purple' | 'blue' | 'green' | 'orange'
  icon: IconName
  title: string
  description: string
}

const actions: Action[] = [
  { variant: 'purple', icon: 'plusCircle', title: 'Add New Item', description: 'Track a new topic or problem' },
  { variant: 'blue', icon: 'calendarCheck', title: "Today's Plan", description: 'See your focus items for today' },
  { variant: 'green', icon: 'list', title: 'All Items', description: 'Browse & manage all your items' },
  { variant: 'orange', icon: 'analytics', title: 'Analytics', description: 'Detailed stats & visual insights' },
]

export function QuickActions() {
  return (
    <article className="panel quick">
      <h2>Quick Actions</h2>
      <div className="actions">
        {actions.map(({ variant, icon, title, description }) => (
          <button className={variant} key={title}>
            <b>
              <Icon name={icon} size={22} />
            </b>
            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
          </button>
        ))}
      </div>
    </article>
  )
}
