import { Icon } from '../../../shared/icons/Icon'

export function Greeting() {
  return (
    <section className="intro">
      <div>
        <h1>
          Good morning, Mukesh! <span>👋</span>
        </h1>
        <p>Here's your progress overview across all modules.</p>
      </div>
      <button className="date">
        <Icon name="calendar" size={16} />
        Monday, May 26, 2025
        <Icon name="chevronDown" size={14} />
      </button>
    </section>
  )
}
