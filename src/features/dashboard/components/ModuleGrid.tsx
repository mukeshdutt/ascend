import { ModuleBadge } from '../../../shared/components/ModuleBadge'
import { useDashboardModules } from '../useDashboardModules'

export function ModuleGrid() {
  const modules = useDashboardModules()
  return (
    <section className="module-grid">
      {modules.map((item) => (
        <article className="module-card" key={item.name}>
          <div className="module-title">
            <ModuleBadge module={item} />
            <strong>{item.name}</strong>
          </div>
          <b className="percentage" style={{ color: item.color }}>
            {item.progress}%
          </b>
          <div className="track">
            <i style={{ width: `${item.progress}%`, background: item.color }} />
          </div>
          <div className="numbers">
            <span>
              <b>{item.done}</b>
              <small>Done</small>
            </span>
            <span>
              <b>{item.active}</b>
              <small>In Progress</small>
            </span>
            <span>
              <b>{item.left}</b>
              <small>Left</small>
            </span>
          </div>
          <p>{item.updated}</p>
        </article>
      ))}
    </section>
  )
}
