import { Icon } from '../../../shared/icons/Icon'
import { useDashboardModules } from '../useDashboardModules'

export function ProgressChart() {
  const modules = useDashboardModules()
  return (
    <article className="panel chart-panel">
      <div className="panel-title">
        <h2>
          <Icon name="chart" size={17} /> Overall Progress Comparison
        </h2>
        <button>
          Completion % <Icon name="chevronDown" size={13} />
        </button>
      </div>
      <div className="chart">
        <div className="y-axis">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        <div className="bar-set">
          {modules.map((item) => (
            <div className="bar-column" key={item.name}>
              <b>{item.progress}%</b>
              <div className="bar-wrap">
                <i style={{ height: `${item.progress}%`, background: item.color }}>
                  <Icon name={item.icon} size={15} />
                </i>
              </div>
              <span>{item.name.replace(' ', '\n')}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
