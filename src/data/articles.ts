/**
 * articles.ts — canonical article data for the /writing page.
 *
 * Single source of truth for all writing — consumed by the featured article
 * component, the article grid, and future MDX article detail pages.
 *
 * Data rules:
 *   - No invented published dates — use status to reflect actual state
 *   - No fake view counts or subscriber numbers
 *   - readingTime is an honest estimate based on planned depth, not measured
 *   - Status must accurately reflect the current writing state
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleStatus =
  | 'In progress'
  | 'Draft'
  | 'Planned'
  | 'Coming soon'

export type ArticleCategory =
  | 'Backend'
  | 'FastAPI'
  | 'AI Engineering'
  | 'System Design'
  | 'Databases'
  | 'DevOps'
  | 'Testing'
  | 'Career Notes'

export interface Article {
  /** Stable identifier for list keys. */
  id: string
  /** URL slug for future detail page at /writing/:slug. */
  slug: string
  /** Short display title. */
  title: string
  /** 2–3 sentence description of what the article covers. */
  description: string
  /** Primary category. */
  category: ArticleCategory
  /** Honest publication status. */
  status: ArticleStatus
  /** Related topic tags — 3–5 per article. */
  tags: readonly string[]
  /**
   * Estimated reading time based on planned scope.
   * Format: "N min read". Not measured — planning estimate only.
   */
  readingTime: string
  /** Whether this article is promoted as featured. */
  featured: boolean
  /** ISO 8601 date — only set if the article has been published. */
  publishedAt?: string
  /** ISO 8601 date — only set if the article has been updated after publication. */
  updatedAt?: string
}

// ─── Status badge variant map ─────────────────────────────────────────────────

export const ARTICLE_STATUS_VARIANT: Record<
  ArticleStatus,
  'success' | 'warning' | 'default' | 'accent'
> = {
  'In progress': 'warning',
  'Draft':       'warning',
  'Planned':     'default',
  'Coming soon': 'default',
}

// ─── Article data ─────────────────────────────────────────────────────────────

export const ARTICLES: readonly Article[] = [
  // ── 1. FastAPI Architecture Playbook (featured) ────────────────────────────
  {
    id:          'fastapi-architecture-playbook',
    slug:        'fastapi-architecture-playbook',
    title:       'Designing Scalable FastAPI APIs: My Backend Architecture Playbook',
    description:
      'A practical breakdown of the layered architecture pattern I use for production FastAPI ' +
      'applications — covering API routers, Pydantic validation, the service layer, repository ' +
      'pattern, and how each layer is tested in isolation.',
    category:    'FastAPI',
    status:      'In progress',
    tags:        ['FastAPI', 'Architecture', 'Python', 'REST', 'Testing'],
    readingTime: '12 min read',
    featured:    true,
  },

  // ── 2. PostgreSQL Patterns ─────────────────────────────────────────────────
  {
    id:          'postgresql-patterns-backend',
    slug:        'postgresql-patterns-backend',
    title:       'PostgreSQL Patterns Every Backend Engineer Should Know',
    description:
      'Entity modeling, index strategy, constraint design, and migration management in PostgreSQL — ' +
      'practical patterns for building backends that stay fast and correct as data grows.',
    category:    'Databases',
    status:      'Planned',
    tags:        ['PostgreSQL', 'SQL', 'Performance', 'Indexing', 'Alembic'],
    readingTime: '10 min read',
    featured:    false,
  },

  // ── 3. Redis and Celery ────────────────────────────────────────────────────
  {
    id:          'redis-celery-background-jobs',
    slug:        'redis-celery-background-jobs',
    title:       'Redis and Celery: Non-Blocking Background Jobs for Python Backends',
    description:
      'Why and how to move slow operations — LLM calls, email dispatch, report generation — ' +
      'off the HTTP request cycle using Celery and Redis, with retry logic, task state ' +
      'persistence, and monitoring.',
    category:    'Backend',
    status:      'Planned',
    tags:        ['Redis', 'Celery', 'Python', 'Async', 'Performance'],
    readingTime: '9 min read',
    featured:    false,
  },

  // ── 4. AI SaaS Architecture ────────────────────────────────────────────────
  {
    id:          'ai-saas-production-architecture',
    slug:        'ai-saas-production-architecture',
    title:       'Building AI SaaS Products with Production-Grade Architecture',
    description:
      'From provider abstraction to structured output parsing to background evaluation jobs — ' +
      'how to integrate LLMs into a multi-user SaaS backend without coupling your business ' +
      'logic to a single AI vendor.',
    category:    'AI Engineering',
    status:      'Planned',
    tags:        ['AI', 'FastAPI', 'SaaS', 'OpenAI', 'Architecture'],
    readingTime: '11 min read',
    featured:    false,
  },

  // ── 5. RAG-Ready Applications ──────────────────────────────────────────────
  {
    id:          'rag-ready-applications',
    slug:        'rag-ready-applications',
    title:       'Designing RAG-Ready Applications with pgvector and PostgreSQL',
    description:
      'Retrieval-Augmented Generation starts with the right data architecture. How to design ' +
      'a PostgreSQL schema with pgvector for semantic search, plan document chunking strategy, ' +
      'and build an embedding pipeline that scales.',
    category:    'AI Engineering',
    status:      'Planned',
    tags:        ['RAG', 'pgvector', 'AI', 'PostgreSQL', 'Embeddings'],
    readingTime: '10 min read',
    featured:    false,
  },

  // ── 6. Clean Architecture in FastAPI ──────────────────────────────────────
  {
    id:          'clean-architecture-fastapi',
    slug:        'clean-architecture-fastapi',
    title:       'Clean Architecture in FastAPI: Why Each Layer Has One Job',
    description:
      'A practical guide to applying clean architecture principles in a FastAPI codebase — ' +
      'what belongs in routers vs. services vs. repositories, and how to write code that ' +
      'can be tested at each layer without framework dependencies.',
    category:    'System Design',
    status:      'Planned',
    tags:        ['FastAPI', 'Architecture', 'Python', 'Clean Code', 'Design Patterns'],
    readingTime: '8 min read',
    featured:    false,
  },

  // ── 7. Testing Python Backends ─────────────────────────────────────────────
  {
    id:          'testing-python-backends',
    slug:        'testing-python-backends',
    title:       'Testing Strategies for Python Backends: Unit, Integration, and AI Tests',
    description:
      'How to build a layered test suite for a FastAPI backend — unit tests with mocked ' +
      'dependencies, full HTTP cycle integration tests, and deterministic AI evaluation ' +
      'tests using a mock LLM provider.',
    category:    'Testing',
    status:      'Planned',
    tags:        ['pytest', 'Testing', 'FastAPI', 'Python', 'AI Testing'],
    readingTime: '9 min read',
    featured:    false,
  },

  // ── 8. Docker and CI/CD ───────────────────────────────────────────────────
  {
    id:          'fastapi-docker-cicd',
    slug:        'fastapi-docker-cicd',
    title:       'Deploying FastAPI Applications with Docker and GitHub Actions',
    description:
      'End-to-end deployment guide: containerising a FastAPI application, running Alembic ' +
      'migrations in the deploy pipeline, setting up GitHub Actions for CI/CD, and ' +
      'configuring a production-hardened environment.',
    category:    'DevOps',
    status:      'Planned',
    tags:        ['Docker', 'GitHub Actions', 'CI/CD', 'FastAPI', 'DevOps'],
    readingTime: '8 min read',
    featured:    false,
  },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** All unique categories present in the articles array. */
export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  'Backend',
  'FastAPI',
  'AI Engineering',
  'System Design',
  'Databases',
  'DevOps',
  'Testing',
  'Career Notes',
]
