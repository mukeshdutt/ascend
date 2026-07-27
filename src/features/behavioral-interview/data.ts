import type { CategoryKey, Story } from './types'
import { addDays, todayISO } from '../../shared/utils/date'

// The 40-question bank, five questions per category.
const BANK: Record<CategoryKey, string[]> = {
  leadership: [
    'Tell me about a time you led a team through a difficult project.',
    'Describe a situation where you had to motivate a demotivated team.',
    'Give an example of when you took the lead without being asked.',
    'Tell me about a time you had to make an unpopular decision as a leader.',
    'Describe how you developed or mentored a team member.',
  ],
  conflict: [
    'Tell me about a conflict you had with a coworker and how you resolved it.',
    'Describe a time you disagreed with a teammate on a technical approach.',
    'Give an example of handling a conflict between two team members.',
    'Tell me about a time you received harsh criticism from a peer.',
    'Describe a situation where you had to work with a difficult stakeholder.',
  ],
  failure: [
    'Tell me about a time you failed and what you learned.',
    'Describe a project that did not go as planned.',
    'Give an example of a mistake you made and how you handled it.',
    'Tell me about a time you missed a deadline.',
    'Describe a decision you regret and what you would do differently.',
  ],
  ownership: [
    'Tell me about a time you went above and beyond your responsibilities.',
    "Describe a situation where you took ownership of a problem no one else would.",
    "Give an example of when you fixed something that wasn't your job.",
    'Tell me about a time you took responsibility for a team failure.',
    'Describe how you followed through on a long-term commitment.',
  ],
  ambiguity: [
    'Tell me about a time you had to make a decision with incomplete information.',
    'Describe a situation with unclear requirements and how you proceeded.',
    'Give an example of navigating a major change or reorganization.',
    'Tell me about a time priorities shifted suddenly.',
    'Describe how you handled a problem with no clear right answer.',
  ],
  teamwork: [
    'Tell me about a time you collaborated across teams to reach a goal.',
    'Describe a situation where you helped a struggling teammate.',
    'Give an example of building consensus in a group.',
    'Tell me about a time you had to rely on others to succeed.',
    'Describe how you contributed to a positive team culture.',
  ],
  'disagreement-with-manager': [
    'Tell me about a time you disagreed with your manager.',
    'Describe a situation where you pushed back on a decision from leadership.',
    'Give an example of convincing your manager to change direction.',
    'Tell me about a time you got feedback from your manager you disagreed with.',
    'Describe how you handled being asked to do something you thought was wrong.',
  ],
  prioritization: [
    'Tell me about a time you had to juggle multiple competing priorities.',
    'Describe how you decided what to work on when everything felt urgent.',
    'Give an example of when you had to say no to a request.',
    'Tell me about a time you had to cut scope to meet a deadline.',
    'Describe how you manage your time under pressure.',
  ],
}

// Overrides that give a subset of stories realistic progress, so the summary
// panel, weakest-first sort, and dashboard completion % have data to show.
type Override = Partial<Story> & { id: string }
const t = todayISO()
const OVERRIDES: Override[] = [
  {
    id: 'beh-leadership-1',
    status: 'interview-ready',
    confidence_rating: 5,
    practiced_count: 4,
    last_practiced_date: addDays(t, -2),
    star_situation: 'Our team inherited a stalled payments migration two weeks before a hard compliance deadline.',
    star_task: 'As tech lead I had to get four engineers aligned and delivery back on track.',
    star_action: 'Broke the work into daily milestones, ran short standups, and personally unblocked the trickiest integration.',
    star_result: 'We shipped two days early with zero compliance findings; the approach became our template for tight deadlines.',
  },
  {
    id: 'beh-leadership-2',
    status: 'practiced',
    confidence_rating: 3,
    practiced_count: 2,
    last_practiced_date: addDays(t, -6),
    star_situation: 'Morale dropped after a reorg cut our roadmap in half.',
    star_task: 'I wanted to re-energize the team without overpromising.',
    star_action: 'Held 1:1s, surfaced quick wins, and gave people ownership of areas they cared about.',
    star_result: 'Sprint velocity recovered within a month and two engineers took on stretch projects.',
  },
  {
    id: 'beh-conflict-1',
    status: 'interview-ready',
    confidence_rating: 4,
    practiced_count: 3,
    last_practiced_date: addDays(t, -3),
    star_situation: 'A senior peer and I clashed over the architecture for a new service.',
    star_task: 'We needed a decision that both of us could commit to.',
    star_action: 'I proposed a spike to test both designs against real load instead of arguing in the abstract.',
    star_result: 'Data settled it; we shipped their approach for reads and mine for writes, and our relationship improved.',
  },
  {
    id: 'beh-failure-1',
    status: 'drafted',
    confidence_rating: 2,
    practiced_count: 1,
    last_practiced_date: addDays(t, -12),
    star_situation: 'I owned a release that caused a partial outage.',
    star_task: '',
    star_action: '',
    star_result: '',
  },
  {
    id: 'beh-ownership-1',
    status: 'interview-ready',
    confidence_rating: 4,
    practiced_count: 2,
    last_practiced_date: addDays(t, -5),
    star_situation: 'Recurring on-call alerts were being ignored because no one owned the flaky service.',
    star_task: 'I decided to take responsibility even though it was outside my team.',
    star_action: 'Instrumented the service, fixed the top three causes, and wrote a runbook.',
    star_result: 'Pages dropped ~80% and the service was formally reassigned with proper ownership.',
  },
  {
    id: 'beh-ambiguity-1',
    status: 'practiced',
    confidence_rating: 3,
    practiced_count: 2,
    last_practiced_date: addDays(t, -8),
    star_situation: 'A new initiative launched with a one-line goal and no requirements.',
    star_task: 'I had to turn it into something buildable.',
    star_action: 'Interviewed stakeholders, wrote a lightweight PRD, and validated with a prototype.',
    star_result: 'The prototype aligned everyone and became the basis for the funded project.',
  },
  {
    id: 'beh-teamwork-1',
    status: 'interview-ready',
    confidence_rating: 5,
    practiced_count: 5,
    last_practiced_date: addDays(t, -1),
    star_situation: 'A launch needed backend, mobile, and data teams to sync on a tight timeline.',
    star_task: 'I coordinated the cross-team dependencies.',
    star_action: 'Set up a shared tracker, a single Slack channel, and a weekly integration checkpoint.',
    star_result: 'We launched on schedule with no last-minute integration surprises.',
  },
  {
    id: 'beh-disagreement-with-manager-1',
    status: 'drafted',
    confidence_rating: 2,
    practiced_count: 1,
    last_practiced_date: addDays(t, -15),
    star_situation: 'My manager wanted to ship without a rollback plan.',
    star_task: '',
    star_action: '',
    star_result: '',
  },
  {
    id: 'beh-prioritization-1',
    status: 'practiced',
    confidence_rating: 3,
    practiced_count: 2,
    last_practiced_date: addDays(t, -4),
    star_situation: 'Three "P0" requests landed the same week with the same due date.',
    star_task: 'I had to decide what actually shipped.',
    star_action: 'Scored each by impact and effort with stakeholders and negotiated two of the deadlines.',
    star_result: 'The highest-impact item shipped on time; the others slipped a week by agreement.',
  },
  {
    id: 'beh-ownership-2',
    status: 'interview-ready',
    confidence_rating: 4,
    practiced_count: 3,
    last_practiced_date: addDays(t, -9),
    star_situation: 'A customer commitment was at risk because a dependency team was overloaded.',
    star_task: 'I chose to own the outcome end-to-end.',
    star_action: 'Paired with their engineer, contributed the change myself, and kept the customer updated.',
    star_result: 'We hit the commitment and I built a lasting relationship with that team.',
  },
  {
    id: 'beh-conflict-2',
    status: 'drafted',
    confidence_rating: 1,
    practiced_count: 0,
    star_situation: 'A stakeholder kept changing scope late in the cycle.',
    star_task: '',
    star_action: '',
    star_result: '',
  },
]

function buildSeed(): Story[] {
  const base: Story[] = []
  for (const [category, questions] of Object.entries(BANK) as [CategoryKey, string[]][]) {
    questions.forEach((question_text, i) => {
      base.push({
        id: `beh-${category}-${i + 1}`,
        question_text,
        category,
        star_situation: '',
        star_task: '',
        star_action: '',
        star_result: '',
        confidence_rating: 0,
        practiced_count: 0,
        status: 'not-started',
      })
    })
  }
  const overrideMap = new Map(OVERRIDES.map((o) => [o.id, o]))
  return base.map((s) => (overrideMap.has(s.id) ? { ...s, ...overrideMap.get(s.id)! } : s))
}

export const seedStories: Story[] = buildSeed()

// Seeded speaking-practice dates within the last ~5 weeks for the streak grid.
export const seedPracticeLog: string[] = [
  addDays(t, -1),
  addDays(t, -2),
  addDays(t, -3),
  addDays(t, -5),
  addDays(t, -6),
  addDays(t, -8),
  addDays(t, -9),
  addDays(t, -12),
  addDays(t, -13),
  addDays(t, -15),
  addDays(t, -20),
  addDays(t, -22),
  addDays(t, -23),
]
