import { useMemo, useState } from 'react'
import { Icon } from '../../shared/icons/Icon'
import { useCloudMastery } from './store'
import { BUILD_ORDER_PHASES, CLOUD_DIFFICULTIES, CLOUD_PHASES, CLOUD_PROVIDERS, GCP_JAVA_PHASES, PROJECT_STATUS_LABEL, PROJECT_STATUSES } from './types'
import type { BuildOrderPhase, CloudDifficulty, CloudProvider, CloudProject, GoLevel, JavaLevel, ProjectStatus } from './types'
import './cloud-mastery.css'
import '../../shared/mastery-layout.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

// ── Tab 1: Cloud Projects ─────────────────────────────────────────

function ProjectCard({ project, phaseColor }: { project: CloudProject; phaseColor: string }) {
  const { patchCloudStatus } = useCloudMastery()
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={`proj-card proj-card--${project.status}`}>
      <div className="proj-card-row" onClick={() => setExpanded(e => !e)}>
        <span className="proj-icon">{project.icon}</span>
        <div className="proj-info">
          <div className="proj-badges">
            <span className={`proj-cloud-badge proj-cloud-badge--${project.cloud.toLowerCase()}`}>{project.cloud}</span>
            <span className={`proj-diff-badge proj-diff-badge--${project.difficulty.toLowerCase()}`}>{project.difficulty}</span>
            <span className="proj-service-name">{project.serviceName}</span>
          </div>
          <div className="proj-title">{project.projectTitle}</div>
        </div>
        <div className="proj-actions" onClick={e => e.stopPropagation()}>
          <select className={`proj-status-sel proj-status-sel--${project.status}`} value={project.status}
            onChange={e => patchCloudStatus(project.id, e.target.value as ProjectStatus)}>
            {PROJECT_STATUSES.map(s => <option key={s} value={s}>{PROJECT_STATUS_LABEL[s]}</option>)}
          </select>
        </div>
        <button className="proj-expand-btn">
          <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={15} />
        </button>
      </div>
      {expanded && (
        <div className="proj-detail">
          <div className="proj-goal-box" style={{ borderLeftColor: phaseColor }}>
            <span className="proj-goal-label" style={{ color: phaseColor }}>🎯 Goal</span>
            <p className="proj-goal-text">{project.goal}</p>
          </div>
          <div className="proj-steps">
            <div className="proj-steps-label">📋 Build Steps</div>
            {project.steps.map((step, i) => (
              <div key={i} className="proj-step">
                <span className="proj-step-num" style={{ background: phaseColor + '22', color: phaseColor }}>{i + 1}</span>
                <span className="proj-step-text">{step}</span>
              </div>
            ))}
          </div>
          <div className="proj-hint-box">
            <span className="proj-hint-label">🐹 Go Hint</span>
            <code className="proj-hint-code">{project.hint}</code>
          </div>
        </div>
      )}
    </div>
  )
}

function CloudProjectsTab() {
  const { cloudProjects } = useCloudMastery()
  const [activePhaseId, setActivePhaseId] = useState(1)
  const [cloudFilter, setCloudFilter] = useState<'all' | CloudProvider>('all')
  const [diffFilter, setDiffFilter] = useState<'all' | CloudDifficulty>('all')
  const [query, setQuery] = useState('')

  const phaseStats = useMemo(() =>
    CLOUD_PHASES.map(ph => {
      const pp = cloudProjects.filter(p => p.phaseId === ph.id)
      const done = pp.filter(p => p.status === 'completed').length
      return { ...ph, total: pp.length, pct: pp.length ? Math.round(done / pp.length * 100) : 0 }
    }), [cloudProjects])

  const activePhase = CLOUD_PHASES.find(p => p.id === activePhaseId)!

  const visible = useMemo(() =>
    cloudProjects.filter(p =>
      p.phaseId === activePhaseId &&
      (cloudFilter === 'all' || p.cloud === cloudFilter) &&
      (diffFilter === 'all' || p.difficulty === diffFilter) &&
      `${p.projectTitle} ${p.serviceName}`.toLowerCase().includes(query.toLowerCase())
    ), [cloudProjects, activePhaseId, cloudFilter, diffFilter, query])

  return (
    <>
      <div className="cloud-filters">
        <label className="cloud-filter-search">
          <Icon name="search" size={15} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects…" />
        </label>
        <div className="cloud-filter-chips">
          <span className="cloud-filter-label">Cloud</span>
          {(['all', ...CLOUD_PROVIDERS] as const).map(v => (
            <button key={v} className={`cloud-chip ${cloudFilter === v ? 'active' : ''}`} onClick={() => setCloudFilter(v)}>{v === 'all' ? 'All' : v}</button>
          ))}
        </div>
        <div className="cloud-filter-chips">
          <span className="cloud-filter-label">Level</span>
          {(['all', ...CLOUD_DIFFICULTIES] as const).map(v => (
            <button key={v} className={`cloud-chip ${diffFilter === v ? 'active' : ''}`} onClick={() => setDiffFilter(v as typeof diffFilter)}>{v === 'all' ? 'All' : v}</button>
          ))}
        </div>
      </div>
      <div className="mastery-layout">
        <aside className="mastery-left">
          {phaseStats.map(ph => (
            <button key={ph.id} className={`cat-item ${activePhaseId === ph.id ? 'active' : ''}`} onClick={() => setActivePhaseId(ph.id)}>
              <div className="cat-item-hd">
                <span className="cat-item-name">{ph.emoji} {ph.label} — {ph.title}</span>
                <span className="cat-item-cnt">{ph.total}</span>
              </div>
              <div className="cat-prog-track"><div className="cat-prog-fill" style={{ width: `${ph.pct}%`, background: ph.color }} /></div>
              <span className="cat-pct" style={activePhaseId === ph.id ? { color: ph.color } : {}}>{ph.pct}% done · {ph.duration}</span>
            </button>
          ))}
        </aside>
        <div className="mastery-right">
          <div className="cloud-phase-header" style={{ borderLeftColor: activePhase.color }}>
            <span className="cloud-phase-emoji">{activePhase.emoji}</span>
            <div>
              <div className="cloud-phase-label" style={{ color: activePhase.color }}>{activePhase.label} — {activePhase.title}</div>
              <div className="cloud-phase-duration">{activePhase.duration}</div>
            </div>
          </div>
          {visible.length === 0
            ? <div className="mastery-right-empty">No projects match your filters in this phase.</div>
            : visible.map(p => <ProjectCard key={p.id} project={p} phaseColor={activePhase.color} />)
          }
        </div>
      </div>
    </>
  )
}

// ── Tab 2: AWS Build Order ─────────────────────────────────────────

const GO_LABEL: Record<GoLevel, string> = { required: 'Go · Required', optional: 'Go · Optional', 'not-required': 'Go · Not Required' }

function BuildOrderTab() {
  const { buildOrder, toggleBuildDone } = useCloudMastery()
  const [phaseFilter, setPhaseFilter] = useState<'all' | BuildOrderPhase>('all')
  const [goOnly, setGoOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)

  const doneCount = buildOrder.filter(p => p.done).length

  const visible = useMemo(() =>
    buildOrder.filter(p =>
      (phaseFilter === 'all' || p.phase === phaseFilter) &&
      (!goOnly || p.go === 'required') &&
      `${p.title} ${p.services.join(' ')} ${p.libs.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    ), [buildOrder, phaseFilter, goOnly, query])

  return (
    <div className="bo-wrapper">
      <div className="bo-header">
        <div className="bo-stats">
          <div className="bo-stat"><span className="bo-stat-num bo-stat-done">{doneCount}/{buildOrder.length}</span><span className="bo-stat-lbl">complete</span></div>
          <div className="bo-stat"><span className="bo-stat-num bo-stat-go">{buildOrder.filter(p => p.go === 'required').length}</span><span className="bo-stat-lbl">Go required</span></div>
          <div className="bo-stat"><span className="bo-stat-num">{buildOrder.filter(p => p.phase === 'small').length}</span><span className="bo-stat-lbl">small</span></div>
          <div className="bo-stat"><span className="bo-stat-num bo-stat-int">{buildOrder.filter(p => p.phase === 'intermediate').length}</span><span className="bo-stat-lbl">intermediate</span></div>
        </div>
        <div className="bo-progress-track"><div className="bo-progress-fill" style={{ width: `${(doneCount / buildOrder.length) * 100}%` }} /></div>
      </div>

      <div className="bo-controls">
        <div className="bo-phase-tabs">
          {(['all', ...BUILD_ORDER_PHASES] as const).map(v => (
            <button key={v} className={`bo-phase-btn ${phaseFilter === v ? 'active' : ''}`} onClick={() => setPhaseFilter(v)}>
              {v.toUpperCase()}
            </button>
          ))}
        </div>
        <label className="bo-go-toggle">
          <input type="checkbox" checked={goOnly} onChange={e => setGoOnly(e.target.checked)} />
          Go required only
        </label>
        <label className="cloud-filter-search bo-search">
          <Icon name="search" size={15} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter by service or library…" />
        </label>
      </div>

      {visible.length === 0
        ? <div className="mastery-right-empty">No projects match these filters.</div>
        : (
          <div className="bo-list">
            {visible.map(p => {
              const isOpen = openId === p.id
              return (
                <div key={p.id} className={`bo-item ${p.done ? 'done' : ''}`}>
                  <div className="bo-item-row">
                    <button className="bo-check" onClick={() => toggleBuildDone(p.id)} aria-label={p.done ? 'Mark incomplete' : 'Mark complete'}>
                      {p.done ? '✓' : String(p.id).padStart(2, '0')}
                    </button>
                    <button className="bo-card-head" onClick={() => setOpenId(isOpen ? null : p.id)}>
                      <div className="bo-title-row">
                        <span className="bo-title">{p.title}</span>
                        <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} size={15} className="bo-chev" />
                      </div>
                      <div className="bo-badges">
                        <span className={`bo-phase-badge bo-phase-badge--${p.phase}`}>{p.phase}</span>
                        <span className={`bo-go-badge bo-go-badge--${p.go}`}>{GO_LABEL[p.go]}</span>
                      </div>
                      <div className="bo-chips">{p.services.map(s => <span key={s} className="bo-chip">{s}</span>)}</div>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="bo-detail">
                      <p className="bo-desc">{p.desc}</p>
                      <p className="bo-go-note">{p.goNote}</p>
                      {p.libs.length > 0 && (
                        <>
                          <div className="bo-libs-label">Go Libraries</div>
                          {p.libs.map(lib => <div key={lib} className="bo-lib">{lib}</div>)}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  )
}

// ── Tab 3: GCP × Java ─────────────────────────────────────────────

const JAVA_BADGE_LABEL: Record<string, string> = { core: 'Java core', optional: 'Java optional', none: 'No Java' }

function GcpJavaTab() {
  const { gcpJava, toggleGcpDone } = useCloudMastery()
  const [javaFilter, setJavaFilter] = useState<'all' | JavaLevel>('all')

  const doneCount = gcpJava.filter(p => p.done).length

  return (
    <div className="gj-wrapper">
      <div className="gj-header">
        <div className="gj-eyebrow">E-COMMERCE BACKEND TRACK · GCP SERVICE MAP</div>
        <div className="gj-lede">Nine stops, three phases. Each stop names where Java is the point of the exercise, and where it's just along for the ride.</div>
        <div className="gj-progress-row">
          <span className="gj-progress-label">{doneCount}/{gcpJava.length} completed</span>
          <div className="bo-progress-track" style={{ flex: 1 }}><div className="bo-progress-fill gj-fill" style={{ width: `${(doneCount / gcpJava.length) * 100}%` }} /></div>
        </div>
      </div>

      <div className="gj-filters">
        <span className="cloud-filter-label">Filter</span>
        {(['all', 'core', 'optional', 'none'] as const).map(v => (
          <button key={v} className={`gj-filter-btn ${javaFilter === v ? 'active' : ''}`}
            onClick={() => setJavaFilter(v as typeof javaFilter)}>
            <span className={`gj-swatch gj-swatch--${v}`} />
            {v === 'all' ? 'All' : JAVA_BADGE_LABEL[v]}
          </button>
        ))}
      </div>

      {GCP_JAVA_PHASES.map(phase => {
        const items = gcpJava.filter(p => p.phaseId === phase.id && (javaFilter === 'all' || p.javaLevel === javaFilter))
        if (items.length === 0) return null
        return (
          <div key={phase.id} className="gj-phase">
            <div className="gj-phase-head">
              <span className="gj-phase-id">{phase.id}</span>
              <div>
                <div className="gj-phase-title">{phase.title}</div>
                <div className="gj-phase-sub">// {phase.subtitle}</div>
              </div>
            </div>
            {items.map(p => (
              <div key={p.id} className={`gj-node ${p.done ? 'done' : ''}`}>
                <button className="gj-check" onClick={() => toggleGcpDone(p.id)} aria-label={p.done ? 'Mark incomplete' : 'Mark complete'}>
                  {p.done ? '✓' : p.id.split('-')[1]}
                </button>
                <div className="gj-node-body">
                  <div className="gj-node-top">
                    <h3 className="gj-node-title">{p.title}</h3>
                    <span className={`gj-java-badge gj-java-badge--${p.javaLevel}`}>
                      <span className={`gj-dot gj-dot--${p.javaLevel}`} />{JAVA_BADGE_LABEL[p.javaLevel]}
                    </span>
                  </div>
                  <div className="gj-flow"><strong>Flow:</strong> {p.flow}</div>
                  <div className="gj-teaches"><strong>Teaches:</strong> {p.teaches}</div>
                  <div className="gj-chips">{p.chips.map(c => <span key={c} className="bo-chip">{c}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────

type Tab = 'cloud-projects' | 'build-order' | 'gcp-java'

export function CloudMastery() {
  const { cloudProjects, buildOrder, gcpJava } = useCloudMastery()
  const [tab, setTab] = useState<Tab>('cloud-projects')

  const total = cloudProjects.length
  const completed = cloudProjects.filter(p => p.status === 'completed').length
  const inProgress = cloudProjects.filter(p => p.status === 'in-progress').length
  const notStarted = cloudProjects.filter(p => p.status === 'not-started').length
  const overallPct = total ? Math.round(completed / total * 100) : 0

  const boDone = buildOrder.filter(p => p.done).length
  const gjDone = gcpJava.filter(p => p.done).length

  return (
    <div className="content mastery-v2 cloud-mastery" style={ACCENT}>
      <section className="intro">
        <div>
          <h1>Cloud Mastery</h1>
          <p>Hands-on AWS &amp; GCP projects — six phases from foundation to AI/ML.</p>
        </div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{total}</div><div className="stat-card-lbl">Cloud Projects</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{completed}</div><div className="stat-card-lbl">Completed</div></div>
        <div className="stat-card"><div className="stat-card-val c-progress">{inProgress}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val c-pending">{notStarted}</div><div className="stat-card-lbl">Not Started</div></div>
        <div className="stat-card stat-accent"><div className="stat-card-val">{overallPct}%</div><div className="stat-card-lbl">Overall Done</div></div>
      </div>

      <div className="cloud-tab-bar">
        <button className={tab === 'cloud-projects' ? 'active' : ''} onClick={() => setTab('cloud-projects')}>
          ☁️ Cloud Projects <span className="cloud-tab-count">{completed}/{total}</span>
        </button>
        <button className={tab === 'build-order' ? 'active' : ''} onClick={() => setTab('build-order')}>
          🛠 AWS Build Order <span className="cloud-tab-count">{boDone}/{buildOrder.length}</span>
        </button>
        <button className={tab === 'gcp-java' ? 'active' : ''} onClick={() => setTab('gcp-java')}>
          ☕ GCP × Java Path <span className="cloud-tab-count">{gjDone}/{gcpJava.length}</span>
        </button>
      </div>

      {tab === 'cloud-projects' && <CloudProjectsTab />}
      {tab === 'build-order'    && <BuildOrderTab />}
      {tab === 'gcp-java'       && <GcpJavaTab />}
    </div>
  )
}
