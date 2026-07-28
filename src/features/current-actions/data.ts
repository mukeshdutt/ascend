import type { SubTasksIndex } from './types'

const st = (id: string, title: string, done = false) => ({
  id,
  title,
  done,
  notes: '',
  createdAt: '2026-07-25T09:00:00.000Z',
})

export const seedSubTasksIndex: SubTasksIndex = {
  // ── Interview 2026 ──────────────────────────────────────────────────────────
  'interview-2026::it-1': [
    st('ss-it1-1', 'Read DDIA Chapter 5 – Replication', true),
    st('ss-it1-2', 'Draw CAP theorem decision tree', true),
    st('ss-it1-3', 'Practice explaining consistency trade-offs out loud'),
    st('ss-it1-4', 'Sketch a URL-shortener design end-to-end'),
  ],
  'interview-2026::it-2': [
    st('ss-it2-1', 'Re-read JVM memory model spec (JSR-133)'),
    st('ss-it2-2', 'Write volatile vs synchronized benchmark'),
    st('ss-it2-3', 'Explain happens-before guarantee without notes'),
  ],
  'interview-2026::it-3': [
    st('ss-it3-1', 'Read context.WithCancel and WithTimeout docs', true),
    st('ss-it3-2', 'Build goroutine fan-out/fan-in example'),
    st('ss-it3-3', 'Identify goroutine leak in sample code'),
  ],
  'interview-2026::it-6': [
    st('ss-it6-1', 'Study Claude Code agent loop internals', true),
    st('ss-it6-2', 'Implement a minimal tool-calling loop from scratch'),
    st('ss-it6-3', 'Add subagent spawning to clothing brand agent'),
  ],
  'interview-2026::it-12': [
    st('ss-it12-1', 'Update Golang and GCP experience bullet points', true),
    st('ss-it12-2', 'Quantify impact metrics on past 3 projects'),
    st('ss-it12-3', 'Get resume reviewed by a senior engineer peer'),
    st('ss-it12-4', 'Tailor resume to senior cloud engineering JDs'),
  ],

  // ── Behavioral Interview ─────────────────────────────────────────────────────
  'behavioral::beh-leadership-2': [
    st('ss-b1-1', 'Write full STAR story draft', true),
    st('ss-b1-2', 'Tighten story to under 2 minutes'),
    st('ss-b1-3', 'Add specific metrics (team size, velocity %)'),
    st('ss-b1-4', 'Record and review playback'),
  ],
  'behavioral::beh-failure-1': [
    st('ss-b2-1', 'Identify the exact moment of failure'),
    st('ss-b2-2', 'Write what I would do differently (concrete steps)'),
    st('ss-b2-3', 'Draft the full STAR story'),
    st('ss-b2-4', 'Practice — focus on showing growth not blame'),
  ],
  'behavioral::beh-ambiguity-1': [
    st('ss-b3-1', 'Flesh out the stakeholder interview process', true),
    st('ss-b3-2', 'Add specific outcome metric to the Result section', true),
    st('ss-b3-3', 'Rehearse cold (no notes)'),
  ],
  'behavioral::beh-prioritization-1': [
    st('ss-b4-1', 'List the three P0 requests with real names', true),
    st('ss-b4-2', 'Draft scoring matrix used with stakeholders', true),
    st('ss-b4-3', 'Time the delivery — target 90 seconds'),
  ],
  'behavioral::beh-disagreement-with-manager-1': [
    st('ss-b5-1', 'Write the situation section in detail'),
    st('ss-b5-2', 'Define what "wrong" meant and why I raised it'),
    st('ss-b5-3', 'Articulate the outcome and learnings'),
  ],

  // ── Golang Mastery ──────────────────────────────────────────────────────────
  'golang-mastery::go-4': [
    st('ss-go4-1', 'Read context package docs and examples', true),
    st('ss-go4-2', 'Write goroutine fan-out with cancel signal'),
    st('ss-go4-3', 'Demonstrate goroutine leak and fix it'),
  ],
  'golang-mastery::go-6': [
    st('ss-go6-1', 'Study semaphore-based worker pool pattern', true),
    st('ss-go6-2', 'Implement pool and benchmark 3 concurrency levels'),
    st('ss-go6-3', 'Apply in distributed-systems-lab repo'),
  ],
  'golang-mastery::go-3': [
    st('ss-go3-1', 'Read generics proposal and tour examples'),
    st('ss-go3-2', 'Implement a generic Set[T comparable] type'),
    st('ss-go3-3', 'Identify one real use case in cloud-engineering-labs'),
  ],
  'golang-mastery::go-14': [
    st('ss-go14-1', 'Study DynamoDB single-table design patterns', true),
    st('ss-go14-2', 'Implement PutItem and QueryItems with AWS SDK v2'),
    st('ss-go14-3', 'Write integration test against LocalStack'),
  ],

  // ── React Mastery ────────────────────────────────────────────────────────────
  'react-mastery::react-2': [
    st('ss-r2-1', 'Read React docs on synchronizing with effects', true),
    st('ss-r2-2', 'Find and remove unnecessary useEffect in ascend'),
    st('ss-r2-3', 'Write 3 examples: correct vs incorrect effect usage'),
  ],
  'react-mastery::react-9': [
    st('ss-r9-1', 'Read Zustand README and bear example'),
    st('ss-r9-2', 'Replace one Context store in iterit with Zustand'),
    st('ss-r9-3', 'Benchmark re-render count before vs after'),
  ],
  'react-mastery::react-12': [
    st('ss-r12-1', 'Read Suspense and streaming RFC'),
    st('ss-r12-2', 'Implement lazy-loaded route in ascend'),
  ],
  'react-mastery::react-3': [
    st('ss-r3-1', 'Document custom hook pattern with example', true),
    st('ss-r3-2', 'Extract useMasteryFilter from mastery screens', true),
  ],

  // ── Java Study Tracker ───────────────────────────────────────────────────────
  'java-study::java-3': [
    st('ss-j3-1', 'Read JMM happens-before rules (JSR-133 summary)'),
    st('ss-j3-2', 'Write volatile + synchronized comparison code'),
    st('ss-j3-3', 'Explain the memory model to a rubber duck'),
  ],
  'java-study::java-4': [
    st('ss-j4-1', 'Read Project Loom virtual threads blog post', true),
    st('ss-j4-2', 'Port a blocking I/O service to virtual threads'),
    st('ss-j4-3', 'Measure throughput difference with JMH'),
  ],
  'java-study::java-8': [
    st('ss-j8-1', 'Read Pub/Sub ordering guarantees docs', true),
    st('ss-j8-2', 'Implement idempotency key check in consumer'),
    st('ss-j8-3', 'Write integration test with emulator'),
  ],
  'java-study::java-11': [
    st('ss-j11-1', 'Set up Testcontainers with Postgres', true),
    st('ss-j11-2', 'Write repository integration test with rollback'),
  ],

  // ── Agentic AI Learning ──────────────────────────────────────────────────────
  'agentic-ai::ai-3': [
    st('ss-ai3-1', 'Study Claude Agent SDK loop internals', true),
    st('ss-ai3-2', 'Add permission guard to tool execution'),
    st('ss-ai3-3', 'Test edge case: invalid tool name in response'),
  ],
  'agentic-ai::ai-9': [
    st('ss-ai9-1', 'Benchmark chunk sizes 256 / 512 / 1024 tokens'),
    st('ss-ai9-2', 'Measure recall@5 for each chunk size'),
    st('ss-ai9-3', 'Choose strategy and apply to education platform'),
  ],
  'agentic-ai::ai-2': [
    st('ss-ai2-1', 'Implement basic streaming with SSE handler'),
    st('ss-ai2-2', 'Handle partial JSON in streamed tool calls'),
  ],
  'agentic-ai::ai-11': [
    st('ss-ai11-1', 'Build a trace-driven eval dataset from iterit logs', true),
    st('ss-ai11-2', 'Implement LLM-as-judge for output quality'),
    st('ss-ai11-3', 'Set score threshold for regression alerts'),
  ],
}
