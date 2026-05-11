export interface Service {
  id: string
  title: string
  description: string
  offerings: string[]
}

export interface EngagementModel {
  title: string
  description: string
}

export interface ServiceGrouping {
  title: string
  description: string
  href: string
}

export const services: Service[] = [
  {
    id: 'leadership-development',
    title: 'Management and Leadership Development',
    description:
      'You gain a dedicated Thought Partnership for your development and decision-making. Strategic counsel helps you refine your thinking, align your team, and move confidently toward your goals.',
    offerings: [
      'Trusted advisory for leaders navigating complex decisions',
      'Strategy and framework design for decision-making and action',
      'Personal and team development with personality assessments (DISC)',
      'Program, policy, and implementation option drafting',
      'Pilot project design and organizational plan creation',
      'Strategic communications, talking points, and briefings',
      'Representation at meetings, presentations, and functions on your behalf',
      'Confidential and customized support',
    ],
  },
  {
    id: 'coaching',
    title: 'Coaching — All Levels',
    description:
      'You receive dedicated coaching tailored to where you are and where you want to go. Whether you are a new manager or a seasoned executive, the focus is on your growth, alignment, and effectiveness.',
    offerings: [
      'Thought Partnership for your development and next steps',
      'Leadership and management ally committed to your success',
      'Personal and team development',
      'Personality assessments (DISC) and applied results',
      'Alignment of self with group and team needs for productivity',
      'Assessing and evaluating before and during a change in position',
      'Genuine interest in you, with customization for your context',
    ],
  },
  {
    id: 'meeting-facilitation',
    title: 'Meeting Design and Facilitation — Meetings with Mary',
    description:
      'You get meetings that deliver extra-ordinary results. From conference-scale sessions to intimate retreats, every gathering is designed for productive outcomes and meaningful participation.',
    offerings: [
      'Meeting design, facilitation, and agenda setting',
      'Materials preparation, plan and report generation',
      'Goal-setting and expectation-articulation with discussion moderation',
      'Stakeholder interviews, focus groups, and public workshops',
      'Conference-scale sessions and multi-day retreats',
      'Change management facilitation from incremental to transformational',
      'Flexible formats from office rooms to outdoor settings',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Development and Management',
    description:
      'You move from initial ideas to clarified programs with detailed scopes of work. Projects stay on track with focused content, appropriate stakeholder involvement, disciplined time and budget management, and practical new service delivery models.',
    offerings: [
      'Develop initial ideas into clarified programs or projects',
      'Detailed scopes of work and project planning',
      'Stakeholder and agency involvement with resource identification',
      'Time and budget tracking with regular project briefings',
      'Flexible scope adjustment based on project experience',
      'Focused content and developmental practices for participant success',
    ],
  },
  {
    id: 'plan-policy',
    title: 'Plan and Policy Making',
    description:
      'You receive expert planning and policy support, whether creating new frameworks or updating existing ones. Technical planning assistance is paired with practical coordination and community engagement.',
    offerings: [
      'Create new or update existing organizational and public service plans and policies',
      'Technical planning assistance including reports and permit applications',
      'Coordination with allied professionals to accomplish goals',
      'Informational needs analysis, collection, management, and presentation',
      'Fiscal analysis, budget economics, tradeoffs, negotiations, and new service delivery models with metrics',
      'Guidance through bureaucratic and community processes',
    ],
  },
  {
    id: 'written-deliverables',
    title: 'Written Deliverables — Reports for USE (not the shelf)',
    description:
      'You get documentation that is fully vetted, strategically designed, and ready for USE across your organization and community. Materials are customized for multi-channel communication needs.',
    offerings: [
      'Reports, plans, policies, and summaries ready for immediate use',
      'Materials for web, social media, and electronic communications',
      'Strategic communications and talking points',
      'Bid-package materials and donor-facing documents',
      'Content developed collaboratively with your team',
    ],
  },
  {
    id: 'coordination-communication',
    title: 'Interagency Coordination and Communication',
    description:
      'You build and maintain the strategic alliances and community relationships essential to your mission. From public policy alternatives to interagency agreements and impactful public-private partnerships, coordination is managed with clarity and purpose.',
    offerings: [
      'Build and maintain strategic alliances and positive relationships',
      'Public policy alternative development and strategy',
      'Interagency materials including letters of intent and agreements',
      'Issue identification, analysis, and resolution strategies',
      'Stakeholder interviews, focus groups, task forces, and public workshops',
      'Organizational and community relationship strengthening',
      'Presentation and representation at meetings on your behalf',
    ],
  },
]

export const engagementModels: EngagementModel[] = [
  {
    title: 'External Consultant',
    description:
      'You hire dedicated expertise in listening, assessing, and analyzing needs. This role provides agility and candor that facilitates evolution and change, with the freedom to re-imagine and re-construct outside the constraints of an in-house position.',
  },
  {
    title: 'Internal Staff (Interim / Part-Time)',
    description:
      'You bring on a professional who aligns with your staff and leaders from within the organization. This internal operations role empowers delivery of excellence through the organizational framework and established relationships.',
  },
]

export const specialtyAreas: string[] = [
  'Urban and rural planning',
  'Land use and real estate analysis',
  'Natural resources, parks, and recreation',
  'Agriculture',
  'Transportation',
  'Libraries',
  'Engagement and decision-making',
  'Community and organizational development',
  'Scenario backcasting and forecasting',
  'Budget implications',
  'Governance and management',
  'Program and project design and implementation',
]

export const serviceGroupings: ServiceGrouping[] = [
  {
    title: 'Leadership and Coaching',
    description:
      'Trusted advisory, thought partnership, and dedicated coaching for leaders and teams at every level.',
    href: '/services#leadership-development',
  },
  {
    title: 'Meeting Design and Facilitation',
    description:
      'Meetings with Mary delivers extra-ordinary gatherings, from conference-scale sessions to focused retreats.',
    href: '/services#meeting-facilitation',
  },
  {
    title: 'Planning and Policy',
    description:
      'Expert project management, plan and policy creation, and technical planning assistance for budget economics, tradeoffs, and new service delivery models.',
    href: '/services#project-management',
  },
  {
    title: 'Communication and Coordination',
    description:
      'Strategic written deliverables, interagency coordination, and support for impactful public-private partnerships.',
    href: '/services#coordination-communication',
  },
]
