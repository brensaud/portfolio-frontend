/**
 * projects.ts — canonical project data for the portfolio.
 *
 * Single source of truth consumed by:
 *   - src/features/home/featured-projects.tsx (homepage preview)
 *   - src/features/projects/featured-project.tsx
 *   - src/features/projects/projects-grid.tsx
 *   - src/pages/project-detail-page.tsx (Phase 7)
 *
 * Data rules:
 *   - No invented metrics, user counts, revenue, clients, or awards
 *   - Status values describe honest development stage
 *   - Highlights describe engineering decisions, not outcomes
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'Backend' | 'AI' | 'SaaS' | 'DevOps'

export type ProjectStatus =
  | 'In development'
  | 'Case study planned'
  | 'Prototype'
  | 'Learning project'
  | 'Production-focused build'

export interface ProjectLink {
  label: string
  href: string
  type: 'github' | 'demo' | 'case-study' | 'article'
}

export interface Project {
  /** Stable identifier used for array lookups and React keys. */
  id: string
  /** URL slug: used in /work/:slug route. */
  slug: string
  /** Short display title. */
  title: string
  /** One-line technical subtitle. */
  subtitle: string
  /** 2–3 sentence overview of the system. */
  description: string
  /** The engineering problem this project addresses. */
  problem: string
  /** The technical solution implemented. */
  solution: string
  /** One or more category tags used for filtering. */
  categories: readonly ProjectCategory[]
  /** Honest development / publication status. */
  status: ProjectStatus
  /** Technologies used, in order of relevance. */
  techStack: readonly string[]
  /** 3–5 specific engineering decisions or capabilities built. */
  highlights: readonly string[]
  /** External links (case study, GitHub, live demo). */
  links: readonly ProjectLink[]
  /** Whether this project is featured prominently above the grid. */
  featured: boolean
}

// ─── Status badge variant map ─────────────────────────────────────────────────

export const STATUS_BADGE_VARIANT: Record<
  ProjectStatus,
  'success' | 'warning' | 'default'
> = {
  'In development':          'warning',
  'Case study planned':      'default',
  'Prototype':               'default',
  'Learning project':        'default',
  'Production-focused build':'success',
}

// ─── Project data ─────────────────────────────────────────────────────────────

export const PROJECTS: readonly Project[] = [
  // ── 1. InterviewPilot AI ────────────────────────────────────────────────────
  {
    id:       'interviewpilot-ai',
    slug:     'interviewpilot-ai',
    title:    'InterviewPilot AI',
    subtitle: 'AI-powered technical interview preparation',
    description:
      'An AI SaaS product that generates personalised technical interview questions, ' +
      'evaluates candidate responses, and delivers structured feedback — built to reflect ' +
      'the specifics of real technical interviews rather than generic prep content.',
    problem:
      "Generic interview prep resources don't reflect the specifics of real technical " +
      'interviews. Candidates walk in under-prepared, guessing what they\'ll be asked.',
    solution:
      'AI-powered system that generates role-specific technical questions, evaluates ' +
      'responses in real time, and delivers structured feedback with example answers ' +
      'and improvement guidance.',
    categories: ['AI', 'SaaS'],
    status:    'In development',
    techStack: ['FastAPI', 'PostgreSQL', 'Redis', 'OpenAI API', 'Celery', 'Docker', 'pytest'],
    highlights: [
      'Async FastAPI backend with structured LLM output via Pydantic models',
      'Celery + Redis queue for async response evaluation jobs',
      'PostgreSQL schema supporting multi-user session management',
      'JWT authentication with role-based access control',
      'Docker Compose for consistent local and production environments',
    ],
    links: [
      { label: 'View case study', href: '/work/interviewpilot-ai', type: 'case-study' },
    ],
    featured: true,
  },

  // ── 2. Clause Search System ─────────────────────────────────────────────────
  {
    id:       'clause-search',
    slug:     'clause-search',
    title:    'Clause Search System',
    subtitle: 'Semantic contract clause retrieval using AI embeddings',
    description:
      'A RAG-powered document search system for legal contracts that finds relevant ' +
      'clauses using semantic search — returning ranked results in milliseconds rather ' +
      'than requiring manual document review.',
    problem:
      'Reviewing legal contracts requires reading hundreds of pages manually to find ' +
      'relevant clauses. Keyword search misses synonyms and context.',
    solution:
      'Semantic RAG pipeline using LLM embeddings and pgvector that surfaces relevant ' +
      'contract clauses based on meaning, ranked by cosine similarity score.',
    categories: ['AI', 'Backend'],
    status:    'Case study planned',
    techStack: ['FastAPI', 'pgvector', 'PostgreSQL', 'LLM Embeddings', 'Docker', 'Python'],
    highlights: [
      'pgvector extension for native vector similarity search in PostgreSQL',
      'LLM embedding pipeline with document chunking strategy for long texts',
      'Ranked retrieval scored by cosine similarity',
      'FastAPI async search endpoints with sub-100ms response targets',
    ],
    links: [
      { label: 'View case study', href: '/work/clause-search', type: 'case-study' },
    ],
    featured: false,
  },

  // ── 3. FastAPI SaaS Backend Template ───────────────────────────────────────
  {
    id:       'fastapi-saas-backend',
    slug:     'fastapi-saas-backend',
    title:    'FastAPI SaaS Backend',
    subtitle: 'Production-ready backend foundation for SaaS products',
    description:
      'A complete FastAPI backend template with authentication, Stripe billing, ' +
      'multi-tenancy, background jobs, and full test coverage — designed to eliminate ' +
      'the rebuild-from-scratch problem on every new SaaS project.',
    problem:
      'Every SaaS project rebuilds the same auth, billing, and multi-tenancy ' +
      "foundations from scratch, wasting weeks of engineering time before reaching product work.",
    solution:
      'Production-ready FastAPI backend with JWT auth, Stripe subscription billing, ' +
      'multi-tenant data isolation, Celery background tasks, and 90%+ test coverage.',
    categories: ['Backend', 'SaaS'],
    status:    'Production-focused build',
    techStack: ['FastAPI', 'PostgreSQL', 'Stripe', 'Redis', 'Celery', 'Docker', 'pytest'],
    highlights: [
      'JWT authentication with refresh token rotation',
      'Stripe subscription billing with webhook event handling',
      'Multi-tenant row-level data isolation pattern',
      'Celery + Redis for background job processing with retry logic',
      '90%+ test coverage on business-critical service paths',
    ],
    links: [
      { label: 'View case study', href: '/work/fastapi-saas-backend', type: 'case-study' },
    ],
    featured: false,
  },

  // ── 4. AI Resume Analyzer ──────────────────────────────────────────────────
  {
    id:       'ai-resume-analyzer',
    slug:     'ai-resume-analyzer',
    title:    'AI Resume Analyzer',
    subtitle: 'Structured resume evaluation using LLM analysis',
    description:
      'A backend service that accepts a resume and job description, then uses an LLM ' +
      'with structured output parsing to evaluate alignment, identify skill gaps, and ' +
      'return actionable improvement feedback.',
    problem:
      'Resume-to-job-description matching is subjective and time-consuming. Candidates ' +
      'struggle to identify specific gaps between their profile and the role requirements.',
    solution:
      'LLM-backed analysis service using Pydantic for structured output extraction, ' +
      'returning scored alignment categories and specific improvement suggestions.',
    categories: ['AI', 'Backend'],
    status:    'Prototype',
    techStack: ['FastAPI', 'OpenAI API', 'Pydantic', 'Python', 'pytest'],
    highlights: [
      'Structured LLM output extraction using Pydantic response models',
      'Prompt engineering for consistent, parseable multi-section responses',
      'FastAPI async endpoint with full input validation and error handling',
    ],
    links: [
      { label: 'View case study', href: '/work/ai-resume-analyzer', type: 'case-study' },
    ],
    featured: false,
  },

  // ── 5. Cloud-Deployed Backend System ───────────────────────────────────────
  {
    id:       'cloud-backend-system',
    slug:     'cloud-backend-system',
    title:    'Cloud-Deployed Backend',
    subtitle: 'End-to-end FastAPI deployment pipeline',
    description:
      'A learning project implementing a complete deployment pipeline for a FastAPI ' +
      'backend: containerisation, CI/CD automation, environment management, and ' +
      'cloud platform deployment with health monitoring.',
    problem:
      'Backend engineers often build and test locally but lack hands-on production ' +
      'deployment experience. Deploying correctly — with secrets management, health ' +
      'checks, and rollback capability — is a distinct engineering skill.',
    solution:
      'Complete Docker-based deployment setup with multi-stage Dockerfiles, GitHub ' +
      'Actions CI/CD pipeline, environment variable management, and cloud deployment ' +
      'with health check endpoints.',
    categories: ['Backend', 'DevOps'],
    status:    'Learning project',
    techStack: ['Docker', 'GitHub Actions', 'FastAPI', 'PostgreSQL', 'Linux', 'nginx'],
    highlights: [
      'Multi-stage Dockerfile reducing production image size significantly',
      'GitHub Actions pipeline: lint → test → build → deploy stages',
      'Environment variable management with secrets injection (no hardcoded credentials)',
      'Health check endpoints and process supervision for uptime monitoring',
    ],
    links: [
      { label: 'View case study', href: '/work/cloud-backend-system', type: 'case-study' },
    ],
    featured: false,
  },
]
