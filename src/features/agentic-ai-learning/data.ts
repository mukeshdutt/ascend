import type { AiTopic, ReadingItem } from './types'
export const seedAiTopics: AiTopic[] = [
  { id: 'ai-1', category: 'Raw API Fundamentals', title: 'Tool-calling loop from first principles', status: 'practiced', resource_link: '', anchor_project: 'clothing brand agent', notes: 'Own the state loop before adopting a framework.' },
  { id: 'ai-2', category: 'Claude Agent SDK', title: 'Agent loop and tool permissions', status: 'learning', resource_link: '', anchor_project: 'iterit', notes: '' },
  { id: 'ai-3', category: 'LangGraph/LangChain', title: 'Stateful graph orchestration', status: 'not-started', resource_link: '', anchor_project: '', notes: 'Choose one framework to learn deeply.' },
  { id: 'ai-4', category: 'MCP Server Development', title: 'MCP tools and resources', status: 'mastered', resource_link: '', anchor_project: 'education platform', notes: 'Design narrow, composable tools.' },
  { id: 'ai-5', category: 'RAG & Vector Stores', title: 'Retrieval quality and chunking', status: 'learning', resource_link: '', anchor_project: 'education platform', notes: '' },
  { id: 'ai-6', category: 'Evals & Observability', title: 'Trace-driven evaluation datasets', status: 'practiced', resource_link: '', anchor_project: 'iterit', notes: '' },
  { id: 'ai-7', category: 'AI Engineering Foundations', title: 'Prompt and context engineering', status: 'mastered', resource_link: '', anchor_project: 'clothing brand agent', notes: 'Treat context as an explicit dependency.' },
]
export const seedReading: ReadingItem[] = [
  { id: 'read-1', title: 'Designing Data-Intensive Applications', status: 'in-progress', notes: 'Focus on replication and stream processing chapters.' },
  { id: 'read-2', title: 'AI Engineering', status: 'not-started', notes: 'Read alongside the evals work.' },
]
