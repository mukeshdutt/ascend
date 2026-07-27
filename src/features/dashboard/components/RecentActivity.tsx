import { Icon } from '../../../shared/icons/Icon'
import { recentActivity } from '../data'

export function RecentActivity() {
  return (
    <article className="panel activity">
      <h2>Recent Activity</h2>
      <div className="table-head">
        <span>Item</span>
        <span>Module</span>
        <span>Status Changed</span>
        <span>When</span>
      </div>
      {recentActivity.map(({ item, module, status, when }) => (
        <div className="table-row" key={item}>
          <strong>{item}</strong>
          <span>{module}</span>
          <em className={status.replace(' ', '').toLowerCase()}>{status}</em>
          <span>{when}</span>
          <b>
            <Icon name="dots" size={15} />
          </b>
        </div>
      ))}
    </article>
  )
}
