import { useState } from 'react'
import { useGolangMastery } from './store'
import { GO_WEEK_STATUSES, GO_WEEK_STATUS_LABEL } from './types'
import type { GoWeekStatus } from './types'
import './golang-mastery.css'
import '../../shared/mastery-layout.css'

const ACCENT = { '--accent': '#c96442', '--accent-bg': '#fdf3ef', '--accent-border': '#f0c9b8', '--accent-dark': '#9b4628' } as React.CSSProperties

// ── Roadmap Data (5-phase project use cases) ───────────────────────────────
type UseCase = { id: string; title: string; level: string; cloud: boolean; desc: string; stack: string[]; concepts: string[]; cloudServices?: string[] }
type RoadmapPhase = { id: number; label: string; title: string; subtitle: string; cases: UseCase[] }

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 1, label: 'Phase 1', title: 'Pure Go Foundations', subtitle: 'No cloud. No frameworks. Just Go.',
    cases: [
      { id: '1a', title: 'CLI To-Do App', level: 'Beginner', cloud: false, desc: 'CRUD operations on tasks stored in a local JSON file. Learn structs, slices, file I/O, and os.Args.', stack: ['Go stdlib', 'encoding/json', 'os', 'bufio'], concepts: ['Structs', 'JSON marshaling', 'File I/O', 'CLI args'] },
      { id: '1b', title: 'Unit Converter', level: 'Beginner', cloud: false, desc: 'Convert between units (km/miles, celsius/fahrenheit). Learn functions, math, and basic packages.', stack: ['Go stdlib', 'fmt', 'math', 'strconv'], concepts: ['Functions', 'Type conversion', 'Error handling'] },
      { id: '1c', title: 'CSV Log Parser', level: 'Beginner', cloud: false, desc: 'Read a CSV file, filter rows by criteria, and output a summary report.', stack: ['encoding/csv', 'os', 'strings', 'fmt'], concepts: ['File reading', 'Slice filtering', 'String ops'] },
      { id: '1d', title: 'In-Memory Key-Value Store', level: 'Basic+', cloud: false, desc: 'Build a map-based KV store with get/set/delete via a REPL loop.', stack: ['Go stdlib', 'sync', 'bufio', 'strings'], concepts: ['Maps', 'Mutex', 'Goroutine basics', 'REPL'] },
      { id: '1e', title: 'Concurrent File Downloader', level: 'Basic+', cloud: false, desc: 'Download a list of URLs concurrently and save them to disk. Intro to goroutines and WaitGroups.', stack: ['net/http', 'sync', 'os', 'io'], concepts: ['Goroutines', 'WaitGroup', 'Channels', 'HTTP client'] },
    ],
  },
  {
    id: 2, label: 'Phase 2', title: 'Web & APIs', subtitle: 'Build HTTP servers. No cloud yet.',
    cases: [
      { id: '2a', title: 'REST API — Notes Service', level: 'Basic+', cloud: false, desc: 'CRUD REST API for notes stored in memory. Learn routing, JSON response, and HTTP methods.', stack: ['net/http', 'encoding/json', 'gorilla/mux or chi'], concepts: ['HTTP handlers', 'Routing', 'Middleware', 'JSON API'] },
      { id: '2b', title: 'URL Shortener', level: 'Intermediate', cloud: false, desc: 'Shorten long URLs, store mappings in SQLite, serve redirects with hit counters.', stack: ['chi', 'mattn/go-sqlite3', 'database/sql', 'net/http'], concepts: ['SQL', 'Redirects', 'Slug generation', 'db/sql'] },
      { id: '2c', title: 'Rate-Limited API Proxy', level: 'Intermediate', cloud: false, desc: 'A local reverse proxy that rate-limits incoming requests using a token bucket.', stack: ['net/http', 'golang.org/x/time/rate', 'httputil.ReverseProxy'], concepts: ['Token bucket', 'ReverseProxy', 'Middleware chain'] },
      { id: '2d', title: 'WebSocket Chat Server', level: 'Intermediate', cloud: false, desc: 'Real-time chat rooms using WebSockets. Manage broadcast channels and disconnections.', stack: ['gorilla/websocket', 'net/http', 'sync'], concepts: ['WebSockets', 'Fan-out pattern', 'Connection lifecycle'] },
      { id: '2e', title: 'JWT Auth Middleware', level: 'Intermediate', cloud: false, desc: 'Add JWT-based authentication to a REST API with role-based access control.', stack: ['golang-jwt/jwt', 'chi', 'bcrypt', 'net/http'], concepts: ['JWT', 'RBAC', 'Middleware', 'Password hashing'] },
    ],
  },
  {
    id: 3, label: 'Phase 3', title: 'Cloud-Native Basics', subtitle: 'Containerize and deploy your Go services.',
    cases: [
      { id: '3a', title: 'Dockerized REST API', level: 'Basic+', cloud: true, desc: 'Package your Phase 2 API into a multi-stage Docker image and run it with docker-compose.', stack: ['Docker', 'docker-compose', 'Alpine Linux'], concepts: ['Multi-stage builds', 'Health checks', 'ENV config', 'Volumes'], cloudServices: ['Docker Hub', 'Docker Desktop'] },
      { id: '3b', title: 'Config via Environment & Secrets', level: 'Basic+', cloud: true, desc: 'Externalize all config using env vars and integrate with a secrets manager.', stack: ['viper', 'godotenv', 'AWS SSM / GCP Secret Manager'], concepts: ['12-factor config', 'Secrets injection', 'Viper'], cloudServices: ['AWS SSM Parameter Store', 'GCP Secret Manager'] },
      { id: '3c', title: 'S3 File Upload Service', level: 'Intermediate', cloud: true, desc: 'REST endpoint to accept file uploads and store them in S3-compatible object storage.', stack: ['aws-sdk-go-v2', 'chi', 'net/http', 'multipart'], concepts: ['AWS SDK', 'Presigned URLs', 'Multipart upload'], cloudServices: ['AWS S3', 'MinIO (local)', 'GCS'] },
      { id: '3d', title: 'Serverless Function (Lambda)', level: 'Intermediate', cloud: true, desc: 'Deploy a Go function as a Lambda to process S3 events or HTTP via API Gateway.', stack: ['aws-lambda-go', 'aws-sdk-go-v2', 'SAM CLI'], concepts: ['Lambda handler', 'Event structs', 'Cold start', 'IAM roles'], cloudServices: ['AWS Lambda', 'API Gateway', 'S3 events'] },
      { id: '3e', title: 'Health-Checked Kubernetes Service', level: 'Intermediate', cloud: true, desc: 'Deploy a Go API to Kubernetes with liveness/readiness probes, resource limits, and rolling updates.', stack: ['Kubernetes', 'kubectl', 'Helm', 'Docker'], concepts: ['Deployments', 'Services', 'Probes', 'ConfigMaps', 'Rolling deploy'], cloudServices: ['GKE / EKS / AKS', 'Minikube (local)'] },
    ],
  },
  {
    id: 4, label: 'Phase 4', title: 'Messaging & Data', subtitle: 'Async patterns, queues, databases.',
    cases: [
      { id: '4a', title: 'PostgreSQL CRUD with sqlc', level: 'Intermediate', cloud: false, desc: 'Type-safe DB layer for a blog service using sqlc for code generation from SQL queries.', stack: ['sqlc', 'pgx', 'golang-migrate', 'PostgreSQL'], concepts: ['sqlc codegen', 'Migrations', 'Connection pooling'], cloudServices: ['Cloud SQL', 'RDS', 'Supabase (optional)'] },
      { id: '4b', title: 'Redis Session Cache', level: 'Intermediate', cloud: false, desc: 'Add distributed session storage and caching layer to your REST API using Redis.', stack: ['go-redis/redis', 'net/http', 'encoding/json'], concepts: ['Redis SET/GET/TTL', 'Session tokens', 'Cache aside'], cloudServices: ['AWS ElastiCache', 'Redis Cloud', 'Upstash'] },
      { id: '4c', title: 'Kafka Event Producer/Consumer', level: 'Intermediate', cloud: true, desc: 'Produce order events from an API and consume them in a separate worker to process orders.', stack: ['segmentio/kafka-go', 'Docker Compose (Kafka)', 'PostgreSQL'], concepts: ['Topics', 'Consumer groups', 'At-least-once delivery', 'Offset mgmt'], cloudServices: ['Confluent Cloud', 'AWS MSK', 'Redpanda'] },
      { id: '4d', title: 'Background Job Worker', level: 'Intermediate', cloud: false, desc: 'Process async tasks (email sending, image resizing) using a Redis-backed job queue.', stack: ['hibiken/asynq', 'go-redis', 'PostgreSQL'], concepts: ['Task queuing', 'Retry logic', 'Dead letter queue', 'Worker pool'], cloudServices: ['Redis Cloud', 'AWS SQS (alternative)'] },
      { id: '4e', title: 'CDC Pipeline with Debezium', level: 'Intermediate+', cloud: true, desc: 'Capture DB changes from PostgreSQL and stream them to Kafka using Change Data Capture.', stack: ['Debezium', 'Kafka', 'segmentio/kafka-go', 'PostgreSQL'], concepts: ['CDC', 'WAL', 'Outbox pattern', 'Event sourcing intro'], cloudServices: ['Confluent Cloud', 'AWS MSK + DMS'] },
    ],
  },
  {
    id: 5, label: 'Phase 5', title: 'Observability & Production', subtitle: 'Logs, metrics, traces — production-ready Go.',
    cases: [
      { id: '5a', title: 'Structured Logging Service', level: 'Intermediate', cloud: false, desc: 'Add structured JSON logging with request IDs and log levels across all HTTP handlers.', stack: ['zerolog or slog (stdlib)', 'chi middleware', 'context'], concepts: ['Structured logs', 'Context propagation', 'Log levels', 'Request IDs'], cloudServices: ['CloudWatch Logs', 'GCP Logging', 'Datadog'] },
      { id: '5b', title: 'Prometheus Metrics Exporter', level: 'Intermediate', cloud: false, desc: 'Expose /metrics endpoint with custom counters, histograms, and gauges from your API.', stack: ['prometheus/client_golang', 'Prometheus', 'Grafana'], concepts: ['Counter/Gauge/Histogram', 'Labels', 'Scrape config'], cloudServices: ['AWS Managed Prometheus', 'GCP Ops', 'Grafana Cloud'] },
      { id: '5c', title: 'Distributed Tracing with OTEL', level: 'Intermediate', cloud: true, desc: 'Instrument a multi-service Go app with OpenTelemetry and export traces to Jaeger or OTLP.', stack: ['go.opentelemetry.io/otel', 'Jaeger', 'OTLP exporter'], concepts: ['Spans', 'Trace context', 'Baggage', 'W3C TraceContext'], cloudServices: ['AWS X-Ray', 'GCP Cloud Trace', 'Honeycomb', 'Datadog APM'] },
      { id: '5d', title: 'gRPC Microservice', level: 'Intermediate', cloud: false, desc: 'Build a gRPC user service with protobuf schema, unary + streaming RPCs, and interceptors.', stack: ['google.golang.org/grpc', 'protobuf', 'buf CLI', 'Evans CLI'], concepts: ['Protobuf', 'Unary/Streaming RPC', 'Interceptors', 'Reflection'], cloudServices: ['GKE gRPC LB', 'AWS ALB gRPC', 'Envoy proxy'] },
      { id: '5e', title: 'Feature Flag Service', level: 'Intermediate+', cloud: true, desc: 'Self-hosted feature flag microservice with YAML config hot-reloading and an admin API.', stack: ['chi', 'fsnotify', 'yaml.v3', 'Redis', 'Docker'], concepts: ['Hot reload', 'inotify', 'Config-driven', 'Gradual rollout'], cloudServices: ['LaunchDarkly (SaaS alt)', 'CloudFront', 'K8s ConfigMap'] },
    ],
  },
]

// ── Weekly Plan Data (6-week curriculum) ──────────────────────────────────
type WeekPlan = { id: number; label: string; title: string; focus: string; topics: string[]; useCases: string[] }

const WEEKLY_PLAN: WeekPlan[] = [
  {
    id: 1, label: 'Week 1', title: 'Core Language Internals', focus: 'Go Foundations, Deep',
    topics: [
      'Go runtime: goroutine scheduler (GMP model), stack growth, garbage collector',
      'Data types deep dive: slices (backing array, capacity, copy semantics), maps (bucket internals), strings vs byte slices',
      'Interfaces: implicit implementation, empty interface, type assertions, type switches',
      'Pointers, value vs pointer receivers — when and why',
      'Error handling: sentinel errors, errors.Is, errors.As, wrapping with %w',
      'defer, panic, recover — execution order, practical uses',
      'Packages, modules, go.mod, go.sum, workspace mode',
      'Init functions, blank identifier, build tags',
    ],
    useCases: [
      'CLI tool — file stats analyzer (reads a dir, prints file count, sizes, extensions)',
      'Custom error types — wrapping for a fake "bank transfer" flow',
      'Slice/map benchmark — measure performance of append vs pre-allocated slices',
    ],
  },
  {
    id: 2, label: 'Week 2', title: 'Concurrency', focus: 'Goroutines, Channels, Sync',
    topics: [
      'Goroutines: lifecycle, leaks, how to prevent them',
      'Channels: buffered vs unbuffered, directional channels, select statement',
      'sync package: Mutex, RWMutex, WaitGroup, Once, Cond',
      'sync/atomic for lock-free counters',
      'Worker pool pattern, fan-out/fan-in pattern',
      'Context: cancellation, timeout, deadline, passing values',
      'Race conditions: detecting with -race flag',
      'errgroup from golang.org/x/sync',
    ],
    useCases: [
      'Worker pool — process 1000 jobs with N workers, measure throughput',
      'Pipeline — read CSV → transform → write output using channels',
      'Rate limiter — throttle API calls using ticker + channel',
      'Timeout-aware HTTP fetcher — using context.WithTimeout',
    ],
  },
  {
    id: 3, label: 'Week 3', title: 'Standard Library + Testing', focus: 'net/http, encoding, testing',
    topics: [
      'net/http: custom server, middleware chaining, request lifecycle, http.Handler interface',
      'encoding/json: custom marshal/unmarshal, struct tags, json.Decoder streaming',
      'io, bufio, os: readers, writers, file handling patterns',
      'time: parsing, formatting, timezones, tickers, timers',
      'regexp, strings, strconv — practical usage',
      'log/slog: structured logging (Go 1.21+)',
      'Testing: testing package, table-driven tests, subtests, benchmarks, fuzz tests',
      'Mocking with interfaces, test helpers, testify library',
      'httptest for HTTP handler testing',
    ],
    useCases: [
      'HTTP middleware chain — logging, auth, rate-limit, recovery middleware from scratch',
      'JSON streaming parser — for large NDJSON files',
      'Full test suite — for the worker pool from Week 2 (unit + benchmark + fuzz)',
    ],
  },
  {
    id: 4, label: 'Week 4', title: 'Web with Fiber + Database Layer', focus: 'REST APIs, PostgreSQL, Redis',
    topics: [
      'Fiber: routing, middleware, groups, error handler, request lifecycle',
      'Fiber vs net/http internals (fasthttp underneath)',
      'Validation: go-playground/validator',
      'JWT authentication flow with Fiber middleware',
      'database/sql vs sqlx vs pgx (PostgreSQL driver)',
      'GORM: models, associations, hooks, transactions, migrations',
      'sqlc: generate type-safe Go code from SQL queries',
      'Redis with go-redis: caching patterns, TTL, pub/sub basics',
      'Connection pooling, query optimization basics',
    ],
    useCases: [
      'REST API — Task Manager with Fiber: JWT auth, CRUD with PostgreSQL (sqlc), Redis cache for sessions, middleware stack',
      'Database migration tool using golang-migrate',
    ],
  },
  {
    id: 5, label: 'Week 5', title: 'Golang with Cloud + DevOps', focus: 'Docker, Kubernetes, AWS, GCP',
    topics: [
      'Docker: multi-stage builds for Go (minimal final image), .dockerignore',
      'Docker Compose: Go app + Postgres + Redis stack',
      'Kubernetes basics: Deployment, Service, ConfigMap, Secret for a Go app',
      'AWS SDK for Go v2: S3 (upload/download), SQS (producer/consumer), Secrets Manager',
      'GCP basics: Cloud Run deployment, Pub/Sub with Go',
      'Environment config: viper for config management, 12-factor app pattern',
      'Health checks, graceful shutdown with os.Signal + context',
      'OpenTelemetry: tracing + metrics instrumentation in Go',
      'Structured logging in production (slog + JSON output)',
    ],
    useCases: [
      'Dockerize the Week 4 API — multi-stage build, deploy with Docker Compose',
      'S3 file upload service — accept multipart upload via Fiber, store to S3',
      'SQS consumer worker — poll queue, process jobs concurrently with worker pool',
      'Graceful shutdown handler for the Fiber API',
    ],
  },
  {
    id: 6, label: 'Week 6', title: 'Advanced Patterns + Production-Grade Code', focus: 'Generics, gRPC, WebSockets, Profiling',
    topics: [
      'Generics (Go 1.18+): type parameters, constraints, generic data structures',
      'Reflection: reflect package, when to use and avoid',
      'Plugin architecture with interfaces',
      'Clean Architecture / Hexagonal Architecture in Go',
      'gRPC with Go: proto files, server/client, streaming, interceptors',
      'WebSockets with Fiber/Gorilla',
      'Memory profiling: pprof, heap/CPU profiling, escape analysis',
      'Build and release: goreleaser, cross-compilation',
      'go generate, code generation patterns',
    ],
    useCases: [
      'Generic Result/Option type and a generic in-memory cache with TTL',
      'gRPC service — notification service (unary + server-streaming)',
      'WebSocket chat room — multiple clients, broadcast with goroutines + channels',
      'Profile and optimize the Week 2 worker pool using pprof',
      'Refactor the Week 4 API into clean architecture (handler → usecase → repository layers)',
    ],
  },
]

// ── Level badge colours ────────────────────────────────────────────────────
const LEVEL_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Beginner':      { bg: 'rgba(0,180,216,0.10)',  color: '#0077a3', border: 'rgba(0,150,199,0.35)' },
  'Basic+':        { bg: 'rgba(46,196,182,0.10)', color: '#0b7f76', border: 'rgba(11,159,149,0.35)' },
  'Intermediate':  { bg: 'rgba(123,47,190,0.10)', color: '#7b2fbe', border: 'rgba(123,47,190,0.35)' },
  'Intermediate+': { bg: 'rgba(230,57,70,0.10)',  color: '#c5202e', border: 'rgba(230,57,70,0.35)' },
}


function UseCaseCard({ uc }: { uc: UseCase }) {
  const [open, setOpen] = useState(false)
  const lc = LEVEL_COLORS[uc.level] ?? LEVEL_COLORS['Intermediate']
  return (
    <div className={`uc-card ${open ? 'uc-card--open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="uc-card-head">
        <div className="uc-card-left">
          <span className="uc-card-id">{uc.id}</span>
          <span className="uc-card-title">{uc.title}</span>
        </div>
        <div className="uc-card-right">
          <span className="uc-badge" style={{ background: lc.bg, color: lc.color, borderColor: lc.border }}>{uc.level}</span>
          {uc.cloud && <span className="uc-badge uc-badge--cloud">☁ cloud</span>}
          <span className="uc-chevron">{open ? '▾' : '▸'}</span>
        </div>
      </div>
      {open && (
        <div className="uc-card-body">
          <p className="uc-desc">{uc.desc}</p>
          <div className="uc-tags-row">
            <span className="uc-tags-label">Tech Stack</span>
            <div className="uc-tags">{uc.stack.map(s => <span key={s} className="uc-tag uc-tag--stack">{s}</span>)}</div>
          </div>
          <div className="uc-tags-row">
            <span className="uc-tags-label">Go Concepts</span>
            <div className="uc-tags">{uc.concepts.map(c => <span key={c} className="uc-tag uc-tag--concept">{c}</span>)}</div>
          </div>
          {uc.cloudServices && (
            <div className="uc-tags-row">
              <span className="uc-tags-label">Cloud Services</span>
              <div className="uc-tags">{uc.cloudServices.map(cs => <span key={cs} className="uc-tag uc-tag--cloud">{cs}</span>)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RoadmapView() {
  const [activePhase, setActivePhase] = useState(1)
  const phase = ROADMAP_PHASES.find(p => p.id === activePhase) ?? ROADMAP_PHASES[0]
  const totalCases = ROADMAP_PHASES.reduce((a, p) => a + p.cases.length, 0)
  const cloudCases = ROADMAP_PHASES.reduce((a, p) => a + p.cases.filter(c => c.cloud).length, 0)

  return (
    <div>
      <div className="roadmap-meta">
        <span className="roadmap-meta-stat"><strong>{ROADMAP_PHASES.length}</strong> phases</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>{totalCases}</strong> use cases</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>{cloudCases}</strong> cloud-enabled</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat roadmap-meta-tip">click any card to expand</span>
      </div>
      <div className="mastery-layout">
        <aside className="mastery-left">
          {ROADMAP_PHASES.map(p => (
            <button key={p.id} className={`cat-item ${activePhase === p.id ? 'active' : ''}`} onClick={() => setActivePhase(p.id)}>
              <div className="cat-item-hd">
                <span className="cat-item-name">{p.label} — {p.title}</span>
                <span className="cat-item-cnt">{p.cases.length} cases</span>
              </div>
              <span className="cat-pct" style={{ color: '#8994aa', marginTop: 2 }}>{p.subtitle}</span>
            </button>
          ))}
        </aside>
        <div className="mastery-right">
          <div className="phase-section">
            <div className="phase-head" style={{ cursor: 'default' }}>
              <span>{phase.label} — {phase.title}</span>
              <em>{phase.subtitle}</em>
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {phase.cases.map(uc => <UseCaseCard key={uc.id} uc={uc} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="roadmap-tip">
        💡 All cloud services have local equivalents — MinIO → S3, Kafka via Docker Compose, Minikube → GKE/EKS. Build locally first; swap in managed cloud services when ready to deploy.
      </div>
    </div>
  )
}

function WeeklyPlanView() {
  const { weekStatuses, setWeekStatus } = useGolangMastery()
  const [activeWeek, setActiveWeek] = useState(1)
  const week = WEEKLY_PLAN.find(w => w.id === activeWeek) ?? WEEKLY_PLAN[0]
  const weekStatus = weekStatuses[week.id] ?? 'not-started'
  const weeksDone = WEEKLY_PLAN.filter(w => (weekStatuses[w.id] ?? 'not-started') === 'done').length

  return (
    <div>
      <div className="roadmap-meta">
        <span className="roadmap-meta-stat"><strong>6</strong> weeks</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>{weeksDone}</strong> done</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>1h</strong> read concepts</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>1.5h</strong> implement</span>
        <span className="roadmap-meta-sep">·</span>
        <span className="roadmap-meta-stat"><strong>30m</strong> write tests</span>
      </div>
      <div className="mastery-layout">
        <aside className="mastery-left">
          {WEEKLY_PLAN.map(w => {
            const st = weekStatuses[w.id] ?? 'not-started'
            return (
              <button key={w.id} className={`cat-item ${activeWeek === w.id ? 'active' : ''}`} onClick={() => setActiveWeek(w.id)}>
                <div className="cat-item-hd">
                  <span className="cat-item-name">{w.label}</span>
                  <span className={`go-week-pill ${st}`}>{GO_WEEK_STATUS_LABEL[st]}</span>
                </div>
                <span className="cat-pct" style={{ color: '#8994aa', marginTop: 2 }}>{w.title}</span>
              </button>
            )
          })}
        </aside>
        <div className="mastery-right">
          <div className="phase-section">
            <div className="phase-head" style={{ cursor: 'default' }}>
              <span>{week.label} — {week.title}</span>
              <span className="go-week-head-right">
                <em>{week.focus}</em>
                <select
                  className="go-status-select"
                  value={weekStatus}
                  onChange={e => setWeekStatus(week.id, e.target.value as GoWeekStatus)}
                >
                  {GO_WEEK_STATUSES.map(s => (
                    <option key={s} value={s}>{GO_WEEK_STATUS_LABEL[s]}</option>
                  ))}
                </select>
              </span>
            </div>
            <div style={{ padding: '10px 14px 14px' }}>
              <div className="week-section-label">Topics</div>
              <ul className="week-topics-list">
                {week.topics.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <div className="week-section-label" style={{ marginTop: 14 }}>Use Cases to Build</div>
              <ul className="week-usecases-list">
                {week.useCases.map((u, i) => <li key={i}><span className="week-uc-bullet">▸</span>{u}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function GolangMastery() {
  const { topics } = useGolangMastery()
  const [view, setView] = useState<'weekplan' | 'roadmap'>('weekplan')

  const total = topics.length
  const mastered = topics.filter(t => t.status === 'mastered').length
  const inProgress = topics.filter(t => t.status === 'learning' || t.status === 'practiced').length
  const notStarted = topics.filter(t => t.status === 'not-started').length
  const overallPct = total ? Math.round(mastered / total * 100) : 0

  return (
    <div className="content mastery-v2" style={ACCENT}>
      <section className="intro">
        <div><h1>Golang Mastery</h1><p>Build durable Go skills for cloud and distributed systems engineering.</p></div>
      </section>

      <div className="mastery-stats">
        <div className="stat-card"><div className="stat-card-val">{total}</div><div className="stat-card-lbl">Total Topics</div></div>
        <div className="stat-card"><div className="stat-card-val c-mastered">{mastered}</div><div className="stat-card-lbl">Mastered</div></div>
        <div className="stat-card"><div className="stat-card-val c-progress">{inProgress}</div><div className="stat-card-lbl">In Progress</div></div>
        <div className="stat-card"><div className="stat-card-val c-pending">{notStarted}</div><div className="stat-card-lbl">Not Started</div></div>
        <div className="stat-card stat-accent"><div className="stat-card-val">{overallPct}%</div><div className="stat-card-lbl">Overall Mastered</div></div>
      </div>

      <div className="mastery-view-tabs">
        <button className={view === 'weekplan' ? 'active' : ''} onClick={() => setView('weekplan')}>6-Week Plan</button>
        <button className={view === 'roadmap' ? 'active' : ''} onClick={() => setView('roadmap')}>Roadmap</button>
      </div>

      {view === 'weekplan' && <WeeklyPlanView />}
      {view === 'roadmap' && <RoadmapView />}
    </div>
  )
}
