import { useState } from 'react'
import { Sidebar } from '../features/layout/Sidebar'
import { Header } from '../features/layout/Header'
import { Dashboard } from '../features/dashboard/Dashboard'
import { TechInterviewTracker } from '../features/tech-interview-tracker/TechInterviewTracker'
import { ProblemsProvider } from '../features/tech-interview-tracker/store'
import { BehavioralInterview } from '../features/behavioral-interview/BehavioralInterview'
import { BehavioralProvider } from '../features/behavioral-interview/store'
import { InterviewTracker } from '../features/interview-tracker/InterviewTracker'
import { InterviewTrackerProvider } from '../features/interview-tracker/store'
import { ReactMastery } from '../features/react-mastery/ReactMastery'
import { ReactMasteryProvider } from '../features/react-mastery/store'
import { GolangMastery } from '../features/golang-mastery/GolangMastery'
import { GolangMasteryProvider } from '../features/golang-mastery/store'
import { JavaStudyTracker } from '../features/java-study-tracker/JavaStudyTracker'
import { JavaStudyProvider } from '../features/java-study-tracker/store'
import { AgenticAiLearning } from '../features/agentic-ai-learning/AgenticAiLearning'
import { AgenticAiProvider } from '../features/agentic-ai-learning/store'
import { CloudMastery } from '../features/cloud-mastery/CloudMastery'
import { CloudMasteryProvider } from '../features/cloud-mastery/store'
import { ClaudeMastery } from '../features/claude-mastery/ClaudeMastery'
import { ClaudeMasteryProvider } from '../features/claude-mastery/store'
import { CurrentActions } from '../features/current-actions/CurrentActions'
import { CurrentActionsProvider } from '../features/current-actions/store'
import { navItems } from '../features/dashboard/data'
import { Login } from '../features/auth/Login'
import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [dark, setDark] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  const [search, setSearch] = useState('')

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  const className = ['app', dark && 'dark', collapsed && 'collapsed'].filter(Boolean).join(' ')
  const activeLabel = navItems[activeNav]?.label

  const renderView = () => {
    if (activeLabel === 'Technical Learning') return <TechInterviewTracker />
    if (activeLabel === 'Golang Mastery') return <GolangMastery />
    if (activeLabel === 'Behavioral Interview') return <BehavioralInterview />
    if (activeLabel === 'Interview 2026') return <InterviewTracker />
    if (activeLabel === 'React Mastery') return <ReactMastery />
    if (activeLabel === 'Java Study Tracker') return <JavaStudyTracker />
    if (activeLabel === 'Agentic AI Learning') return <AgenticAiLearning />
    if (activeLabel === 'Cloud Mastery') return <CloudMastery />
    if (activeLabel === 'Claude Mastery') return <ClaudeMastery />
    if (activeLabel === 'Currently Actioning') return <CurrentActions />
    return <Dashboard />
  }

  return (
    <CurrentActionsProvider>
      <ProblemsProvider>
        <BehavioralProvider>
          <InterviewTrackerProvider><ReactMasteryProvider><GolangMasteryProvider><JavaStudyProvider><AgenticAiProvider><CloudMasteryProvider><ClaudeMasteryProvider><div className={className}>
            <Sidebar activeNav={activeNav} onNavigate={setActiveNav} onLogout={() => setAuthenticated(false)} />
            <main>
              <Header
                search={search}
                onSearchChange={setSearch}
                dark={dark}
                onToggleTheme={() => setDark(!dark)}
                onToggleSidebar={() => setCollapsed((v) => !v)}
              />
              {renderView()}
            </main>
          </div></ClaudeMasteryProvider></CloudMasteryProvider></AgenticAiProvider></JavaStudyProvider></GolangMasteryProvider></ReactMasteryProvider></InterviewTrackerProvider>
        </BehavioralProvider>
      </ProblemsProvider>
    </CurrentActionsProvider>
  )
}

export default App
