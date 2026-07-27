import { focus } from '../data'

export function TodaysFocus() {
  return (
    <article className="panel focus">
      <div className="panel-title">
        <h2>Today's Focus</h2>
        <a>View all</a>
      </div>
      {focus.map(({ title, module, time, color }) => (
        <div className="focus-item" key={title}>
          <i style={{ background: color }} />
          <span>
            <strong>{title}</strong>
            <small>{module}</small>
          </span>
          <time>{time}</time>
        </div>
      ))}
    </article>
  )
}
