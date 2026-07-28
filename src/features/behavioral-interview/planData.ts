import type { PlanSection, PlanWeek } from './types'

type SectionDef = { emoji: string; title: string; tasks: string[] }

function buildWeek(
  id: string,
  code: string,
  title: string,
  subtitle: string,
  sections: SectionDef[],
): PlanWeek {
  return {
    id,
    code,
    title,
    subtitle,
    sections: sections.map(
      (s, si): PlanSection => ({
        id: `${id}-s${si + 1}`,
        emoji: s.emoji,
        title: s.title,
        tasks: s.tasks.map((label, ti) => ({ id: `${id}-s${si + 1}-t${ti + 1}`, label })),
      }),
    ),
  }
}

export const seedPlanWeeks: PlanWeek[] = [
  buildWeek('w1', 'W1', 'Foundation', 'Sub-pages + Experience Bank', [
    {
      emoji: '📚',
      title: 'Read Sub-pages',
      tasks: [
        'Read Behavioral Interview Prerequisite',
        'Read Exit Questions',
        'Read Salary Negotiation',
      ],
    },
    {
      emoji: '🏢',
      title: 'Company Research Checklist',
      tasks: [
        'Study company lingo / taglines / brand language',
        'Research competitors & market share',
        'Review mission, values & culture page',
        'Check LinkedIn of company & interviewers',
        'Read recent news (product launches, leadership changes)',
        'Deeply understand the Job Description',
      ],
    },
    {
      emoji: '🧠',
      title: 'Build Your Experience Bank',
      tasks: [
        'Huge accomplishment story',
        'Fixed something broken story',
        'Challenging decision story',
        'Influenced a leader or team story',
        'Got surprised / overlooked something story',
        'Removed barriers / creative solution story',
        'Failed but learned story',
        'Defused escalating situation story',
      ],
    },
  ]),
  buildWeek('w2', 'W2', 'Core Stories', '3 Career Narrative Speeches', [
    {
      emoji: '🎤',
      title: 'Story 1 — Professional Journey',
      tasks: [
        'Draft 2-min narrative arc',
        'Deliver Speech Day 1 — record & review',
        'Deliver Speech Day 2 — fix one speaking flaw',
        'Deliver Speech Day 3 — polish & finalize',
        'Map to: Tell me about yourself / Walk me through your background',
      ],
    },
    {
      emoji: '🎤',
      title: 'Story 2 — Key Project Ownership',
      tasks: [
        'Draft STAR format with metrics',
        'Deliver Speech Day 4',
        'Deliver Speech Day 5 — fix flaw',
        'Deliver Speech Day 6 — polish',
        'Map to: Why hire you / Proudest accomplishment / Engineering impact',
      ],
    },
    {
      emoji: '🎤',
      title: 'Story 3 — Growth into Seniority',
      tasks: [
        'Draft: shift from executing to owning outcomes',
        'Deliver Speech Day 7',
        'Deliver Speech Day 8 — fix flaw',
        'Deliver Speech Day 9 — polish',
        'Map to: Senior responsibilities / End-to-end project ownership',
      ],
    },
  ]),
  buildWeek('w3', 'W3', 'Conflict', 'Disagreement & Team Dynamics', [
    {
      emoji: '⚡',
      title: 'Conflict & Disagreement Questions',
      tasks: [
        'Disagreement with your manager',
        'Conflict with a teammate',
        'Conflict within your team — how you resolved it',
        'Different opinion than the rest of the team',
        'Hard time working with someone',
        'Disagreed with a colleague (NoSQL vs SQL type)',
      ],
    },
    {
      emoji: '🔥',
      title: 'Pressure & Prioritization Questions',
      tasks: [
        'Worked well under pressure',
        'Prioritize your tasks quickly',
        'Workload was heavy — how you handled it',
        'Simultaneous high-priority and long-term projects',
      ],
    },
  ]),
  buildWeek('w4', 'W4', 'Deadlines & Decisions', 'Execution Under Constraints', [
    {
      emoji: '⏰',
      title: 'Deadlines & Planning',
      tasks: [
        'Missed a deadline — what happened',
        'Delivered project under tight deadline',
        "Excess work — knew you couldn't meet deadline",
        "Project that didn't go according to plan",
      ],
    },
    {
      emoji: '🧭',
      title: 'Difficult Decisions',
      tasks: [
        'Had to make a difficult decision',
        'Problem with multiple possible solutions',
        'Made decision without all information',
        'Sacrificed short-term gain for longer-term goal',
        'Anticipated potential problems — preventive measures',
      ],
    },
  ]),
  buildWeek('w5', 'W5', 'Failure & Growth', 'Resilience, Risk & Learning', [
    {
      emoji: '💥',
      title: 'Failure & Risk Questions',
      tasks: [
        'Time you failed — how you dealt with it',
        'Took a big risk and it failed',
        'Took a huge risk and failed — alternative version',
        "How you respond when you don't know the answer",
      ],
    },
    {
      emoji: '🌱',
      title: 'Growth & Adaptability',
      tasks: [
        'Went out of your comfort zone',
        'Dealt with significant change at work',
        'Received tough or critical feedback',
        'Gave someone difficult feedback',
        "Something new you've learned recently",
        'What you do to enhance technical knowledge apart from work',
        'How do you stay up-to-date with tech advancements',
      ],
    },
  ]),
  buildWeek('w6', 'W6', 'Leadership & Initiative', 'Ownership, Impact & Technical Depth', [
    {
      emoji: '👑',
      title: 'Leadership & Motivation',
      tasks: [
        'Led a team — what was the outcome',
        'Motivated a group — encouraged collaboration',
        'Saw a problem and took initiative to correct it',
        'Went above and beyond requirements for a project',
        'Collaborate effectively with a different department',
      ],
    },
    {
      emoji: '⚙️',
      title: 'Technical Depth Questions',
      tasks: [
        "Complex technical project you've worked on",
        "Biggest technical challenge you've worked on",
        'Debugged a challenging technical issue',
        'Explained complex technical concept to non-technical person',
        'Linked two problems and identified underlying issue',
      ],
    },
    {
      emoji: '🎯',
      title: 'Final Interview Prep',
      tasks: [
        'Why are you interested in working at company',
        'Why do you want to change your current company',
        'How do you prioritize your workload',
        'Assign task to design a system — how would you do it',
        'Prepare 6 questions to ask the interviewer',
        'Final review — Record full mock interview (5 random questions)',
      ],
    },
  ]),
]

export const PLAN_MANTRA = 'Daily Speech · Record · Review · Re-deliver · Log to Notion'
