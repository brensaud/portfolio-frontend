/**
 * resume.ts — structured data for the /resume page.
 *
 * Single source of truth for all resume content. Components import
 * only the slices they need. Designed to be easy to update.
 *
 * Content rules:
 *   - No invented employment history, education details, or certifications
 *   - No exaggerated seniority claims
 *   - Honest, growth-oriented language throughout
 *   - RESUME_PDF_URL: replace '#' with the actual PDF path when available
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkillGroup {
  name: string
  skills: readonly string[]
}

export interface ResumeProject {
  /** Must match a Project.slug in projects.ts for deep-linking. */
  slug: string
  title: string
  engineeringFocus: string
  description: string
  techStack: readonly string[]
  caseStudyAvailable: boolean
}

export interface TechnicalStrength {
  title: string
  description: string
}

export type CredentialStatus =
  | 'Completed'
  | 'In progress'
  | 'Planned'
  | 'Self-directed'

export interface EducationEntry {
  institution: string
  degree: string
  status: CredentialStatus
  notes?: string
}

export interface LearningItem {
  title: string
  provider: string
  status: CredentialStatus
}

export interface ExperienceItem {
  role: string
  context: string
  period: string
  highlights: readonly string[]
}

// ─── PDF download URL ─────────────────────────────────────────────────────────

/**
 * Replace '#' with the actual resume PDF path when the file is available.
 * e.g. '/resume.pdf' (place file in /public/resume.pdf)
 */
export const RESUME_PDF_URL = '#'

// ─── §2 Professional summary ──────────────────────────────────────────────────

export const PROFESSIONAL_SUMMARY = {
  headline: 'Python backend engineer focused on FastAPI, AI SaaS, and production-grade systems.',
  paragraphs: [
    'I build backend systems for AI-powered SaaS products using Python, FastAPI, and PostgreSQL. My focus is clean layered architecture, scalable API design, and integrating LLMs with the rigour that production systems require — structured output validation, provider abstraction, background job durability, and meaningful test coverage.',
    'Currently building InterviewPilot AI — an AI SaaS backend that generates role-specific technical interview questions and evaluates candidate responses. The project demonstrates async FastAPI architecture, Celery + Redis for background AI evaluation jobs, JWT authentication, and a test suite that uses a mock LLM provider for deterministic results.',
    'I approach engineering as a craft: every layer has one responsibility, every contract is explicit, and every system is designed to be testable before it is designed to be fast.',
  ],
} as const

// ─── §3 Core skills ───────────────────────────────────────────────────────────

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    name: 'Backend',
    skills: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2.0', 'HTTPX', 'asyncio'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL 16', 'Redis', 'Alembic', 'asyncpg', 'pgvector'],
  },
  {
    name: 'AI Engineering',
    skills: ['OpenAI API', 'Prompt engineering', 'Structured LLM output', 'RAG design', 'LLM abstraction'],
  },
  {
    name: 'Frontend',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'React Router v7'],
  },
  {
    name: 'DevOps',
    skills: ['Docker', 'Docker Compose', 'GitHub Actions', 'nginx'],
  },
  {
    name: 'Testing',
    skills: ['pytest', 'pytest-asyncio', 'httpx', 'Vitest', 'React Testing Library', 'MSW'],
  },
  {
    name: 'Architecture',
    skills: ['REST API design', 'Layered architecture', 'Repository pattern', 'Background jobs', 'OpenAPI'],
  },
]

// ─── §4 Resume projects ───────────────────────────────────────────────────────

export const RESUME_PROJECTS: readonly ResumeProject[] = [
  {
    slug:                'interviewpilot-ai',
    title:              'InterviewPilot AI',
    engineeringFocus:   'AI SaaS backend · Async architecture · Background jobs',
    description:
      'FastAPI + Celery + Redis backend for AI-powered technical interview preparation. ' +
      'Generates role-specific questions via OpenAI and evaluates answers in background jobs ' +
      'with durable retry logic.',
    techStack:          ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'OpenAI API', 'Docker', 'pytest'],
    caseStudyAvailable: true,
  },
  {
    slug:                'clause-search',
    title:              'Clause Search System',
    engineeringFocus:   'RAG architecture · Semantic search · pgvector',
    description:
      'Semantic contract clause retrieval system using LLM embeddings and PostgreSQL pgvector. ' +
      'Demonstrates document chunking, cosine similarity scoring, and production-grade async ' +
      'search endpoint design.',
    techStack:          ['FastAPI', 'pgvector', 'PostgreSQL', 'LLM Embeddings', 'Python'],
    caseStudyAvailable: false,
  },
  {
    slug:                'fastapi-saas-backend',
    title:              'FastAPI SaaS Backend',
    engineeringFocus:   'Clean architecture · Testing · Multi-tenancy',
    description:
      'Production-ready backend template with JWT auth, Stripe billing, multi-tenant isolation, ' +
      'Celery background jobs, and 90%+ test coverage on business-critical service paths.',
    techStack:          ['FastAPI', 'PostgreSQL', 'Stripe', 'Redis', 'Celery', 'pytest'],
    caseStudyAvailable: false,
  },
  {
    slug:                'ai-resume-analyzer',
    title:              'AI Resume Analyzer',
    engineeringFocus:   'Structured LLM output · Prompt engineering',
    description:
      'Backend service that evaluates resume-to-job-description alignment using structured LLM ' +
      'output extraction via Pydantic. Demonstrates prompt engineering for consistent, ' +
      'parseable multi-section AI responses.',
    techStack:          ['FastAPI', 'OpenAI API', 'Pydantic', 'Python', 'pytest'],
    caseStudyAvailable: false,
  },
]

// ─── §5 Technical strengths ───────────────────────────────────────────────────

export const TECHNICAL_STRENGTHS: readonly TechnicalStrength[] = [
  {
    title: 'REST API design',
    description: 'Resource-oriented routes, versioned URLs, consistent error envelopes, cursor-based pagination, and Pydantic request/response contracts.',
  },
  {
    title: 'Database modeling',
    description: 'Entity design, foreign key constraints, index strategy aligned to access patterns, Alembic migration management, and query performance awareness.',
  },
  {
    title: 'Authentication flows',
    description: 'JWT with short-lived access tokens, refresh token rotation with replay detection, and authorization enforced at the service layer.',
  },
  {
    title: 'Background job processing',
    description: 'Celery + Redis for durable async jobs with exponential back-off retry logic. LLM evaluation, email dispatch, and report generation off the HTTP request cycle.',
  },
  {
    title: 'AI integration',
    description: 'Provider-agnostic LLM abstraction (Python Protocol), versioned prompt templates, structured Pydantic output validation, and deterministic mock LLM for test coverage.',
  },
  {
    title: 'Semantic search (RAG)',
    description: 'pgvector for vector similarity search, document chunking strategies for long-form text, cosine similarity scoring, and ranked retrieval API design.',
  },
  {
    title: 'Containerised development',
    description: 'Docker and Docker Compose for local environment parity. CI pipeline runs the same container images as production. No "works on my machine" issues.',
  },
  {
    title: 'Testing discipline',
    description: 'Layered test strategy: unit tests with mocked dependencies, full HTTP cycle integration tests, and AI evaluation tests with a deterministic mock LLM provider.',
  },
]

// ─── §6 Education ─────────────────────────────────────────────────────────────

export const EDUCATION: readonly EducationEntry[] = [
  {
    institution: 'Self-directed engineering education',
    degree:      'Backend engineering, distributed systems, and AI integration',
    status:      'In progress',
    notes:
      'Deep-dive study of FastAPI, PostgreSQL internals, async Python patterns, system design principles, and AI engineering concepts. Applied through project-based learning across multiple production-focused builds.',
  },
]

// ─── §7 Certifications / Learning ────────────────────────────────────────────

export const LEARNING_ITEMS: readonly LearningItem[] = [
  {
    title:    'Python async programming patterns',
    provider: 'Self-directed study + official docs',
    status:   'Self-directed',
  },
  {
    title:    'FastAPI documentation (complete)',
    provider: 'tiangolo/fastapi official docs',
    status:   'Self-directed',
  },
  {
    title:    'PostgreSQL indexing and query optimization',
    provider: 'Self-directed study + PostgreSQL docs',
    status:   'In progress',
  },
  {
    title:    'System design fundamentals',
    provider: 'Self-directed — books, articles, and documentation',
    status:   'In progress',
  },
  {
    title:    'AWS Cloud Practitioner',
    provider: 'AWS Training',
    status:   'Planned',
  },
  {
    title:    'Retrieval-Augmented Generation (RAG) architecture',
    provider: 'Self-directed study + project application',
    status:   'In progress',
  },
]

// ─── §8 Practical experience ──────────────────────────────────────────────────

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    role:    'Backend Engineering Practice',
    context: 'Independent — project-based portfolio',
    period:  '2024 – present',
    highlights: [
      'Building InterviewPilot AI — a multi-user SaaS backend with async FastAPI, PostgreSQL, Redis, Celery, and OpenAI integration',
      'Implementing clean layered architecture (API → Service → Repository → Domain) with full test coverage at each layer',
      'Designing LLM integration systems with provider abstraction, structured output validation, and prompt injection mitigations',
      'Applying production-focused engineering practices: Alembic migrations, Docker Compose, GitHub Actions CI/CD',
    ],
  },
  {
    role:    'AI Backend Development',
    context: 'Independent — project-based portfolio',
    period:  '2024 – present',
    highlights: [
      'Built Clause Search System — RAG-powered semantic document search using pgvector and LLM embeddings',
      'Built AI Resume Analyzer — FastAPI service with Pydantic-validated structured LLM output extraction',
      'Applied prompt engineering for consistent, parseable multi-section AI responses',
      'Designed AI abstraction layers following Python Protocol pattern for LLM vendor independence',
    ],
  },
  {
    role:    'Full-Stack Portfolio Development',
    context: 'Independent — this website',
    period:  '2025 – present',
    highlights: [
      'Designed and built this portfolio site: React 19, TypeScript, Tailwind CSS v4, React Router v7',
      'Phase-by-phase implementation following a Product Strategy, UX Specification, and technical roadmap',
      'Applied strict TypeScript, ESLint, Vitest test suite, and production build pipeline',
    ],
  },
]
