import { ModuleBadge } from '../../../shared/components/ModuleBadge'
import { attention } from '../data'

export function NeedsAttention() {
  return (
    <article className="panel attention">
      <div className="panel-title">
        <h2>Needs Attention</h2>
        <a>View all</a>
      </div>
      {attention.map(({ module, lastUpdated, badge }) => (
        <div className="attention-item" key={module.name}>
          <ModuleBadge module={module} small />
          <span>
            <strong>{module.name}</strong>
            <small>{lastUpdated}</small>
          </span>
          <em>{badge}</em>
        </div>
      ))}
    </article>
  )
}
