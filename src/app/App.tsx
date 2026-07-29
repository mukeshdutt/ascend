import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '../features/layout/Sidebar'
import { Header } from '../features/layout/Header'
import { Dashboard } from '../features/dashboard/Dashboard'
import { ProblemsProvider } from '../features/tech-interview-tracker/store'
import { TechnicalLearning } from '../features/tech-learning/TechnicalLearning'
import { TechLearningProvider } from '../features/tech-learning/store'
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
import { Login } from '../features/auth/Login'
import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [dark, setDark] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  const className = ['app', dark && 'dark', collapsed && 'collapsed'].filter(Boolean).join(' ')

  return (
    <CurrentActionsProvider>
      <ProblemsProvider>
        <TechLearningProvider>
          <BehavioralProvider>
            <InterviewTrackerProvider>
              <ReactMasteryProvider>
                <GolangMasteryProvider>
                  <JavaStudyProvider>
                    <AgenticAiProvider>
                      <CloudMasteryProvider>
                        <ClaudeMasteryProvider>
                          <div className={className}>
                            <Sidebar onLogout={() => setAuthenticated(false)} />
                            <main>
                              <Header
                                search={search}
                                onSearchChange={setSearch}
                                dark={dark}
                                onToggleTheme={() => setDark(!dark)}
                                onToggleSidebar={() => setCollapsed(v => !v)}
                              />
                              <Routes>
                                <Route path="/"                      element={<Dashboard />} />
                                <Route path="/current-actions"        element={<CurrentActions />} />
                                <Route path="/behavioral-interview"   element={<BehavioralInterview />} />
                                <Route path="/interview-2026"         element={<InterviewTracker />} />
                                <Route path="/technical-learning"     element={<TechnicalLearning />} />
                                <Route path="/agentic-ai-learning"    element={<AgenticAiLearning />} />
                                <Route path="/claude-mastery"         element={<ClaudeMastery />} />
                                <Route path="/cloud-mastery"          element={<CloudMastery />} />
                                <Route path="/react-mastery"          element={<ReactMastery />} />
                                <Route path="/golang-mastery"         element={<GolangMastery />} />
                                <Route path="/java-study-tracker"     element={<JavaStudyTracker />} />
                                <Route path="*"                       element={<Navigate to="/" replace />} />
                              </Routes>
                            </main>
                          </div>
                        </ClaudeMasteryProvider>
                      </CloudMasteryProvider>
                    </AgenticAiProvider>
                  </JavaStudyProvider>
                </GolangMasteryProvider>
              </ReactMasteryProvider>
            </InterviewTrackerProvider>
          </BehavioralProvider>
        </TechLearningProvider>
      </ProblemsProvider>
    </CurrentActionsProvider>
  )
}

export default App
