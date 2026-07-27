import { Greeting } from './components/Greeting'
import { ModuleGrid } from './components/ModuleGrid'
import { ProgressChart } from './components/ProgressChart'
import { NeedsAttention } from './components/NeedsAttention'
import { TodaysFocus } from './components/TodaysFocus'
import { RecentActivity } from './components/RecentActivity'
import { QuickActions } from './components/QuickActions'
import './dashboard.css'

export function Dashboard() {
  return (
    <div className="content">
      <Greeting />
      <ModuleGrid />
      <section className="dashboard-row">
        <ProgressChart />
        <NeedsAttention />
        <TodaysFocus />
      </section>
      <section className="bottom-row">
        <RecentActivity />
        <QuickActions />
      </section>
    </div>
  )
}
