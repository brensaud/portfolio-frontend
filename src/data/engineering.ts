/**
 * engineering.ts — content data for the /engineering page.
 *
 * All 12 sections' content is stored here as typed constants.
 * Components import only the slices they need.
 *
 * Content rules:
 *   - No invented metrics, certifications, or production claims
 *   - "Planned" / "In development" language where appropriate
 *   - Honest representation of engineering maturity
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PrincipleItem {
  number: string
  title: string
  description: string
}

export interface ArchLayer {
  number: string
  name: string
  description: string
  tools: readonly string[]
}

export interface DetailItem {
  title: string
  description: string
}

export interface PracticeArea {
  /** Section anchor id */
  id: string
  eyebrow: string
  title: string
  description: string
  items: readonly DetailItem[]
}

export interface QualityArea {
  id: string
  eyebrow: string
  title: string
  description: string
  items: readonly (DetailItem & { tools?: readonly string[] })[]
}

export interface StackGroup {
  name: string
  description: string
  items: readonly string[]
}

export interface AppliedExample {
  projectSlug: string
  title: string
  concept: string
  description: string
  highlights: readonly string[]
  caseStudyAvailable: boolean
}

// ─── §2 Engineering Principles ────────────────────────────────────────────────

export const ENGINEERING_PRINCIPLES: readonly PrincipleItem[] = [
  {
    number: '01',
    title: 'Requirements before implementation',
    description:
      'Define the problem precisely. Write the API contract, data model, and test cases before writing the first handler. Ambiguity at design time costs ten times as much at refactor time.',
  },
  {
    number: '02',
    title: 'Simplicity before complexity',
    description:
      'The best abstraction is often no abstraction. Add complexity only when it solves a specific, demonstrable problem. Prefer boring technology over fashionable choices.',
  },
  {
    number: '03',
    title: 'Explicit contracts over implicit assumptions',
    description:
      'Every service boundary — API endpoints, function signatures, database schemas — has an explicit, validated contract. Pydantic models, TypeScript types, and database constraints enforce this.',
  },
  {
    number: '04',
    title: 'Database design before feature expansion',
    description:
      'A well-designed schema supports ten features. A rushed schema blocks the second. Model the data first. Migrations after the fact are expensive; rethinking the model is more so.',
  },
  {
    number: '05',
    title: 'Security as a default, not an afterthought',
    description:
      'Rate limiting, input validation, and least-privilege access are designed in from the first commit. Retrofitting security onto existing systems is significantly harder and riskier.',
  },
  {
    number: '06',
    title: 'Observability and testing as first-class concerns',
    description:
      'Code that cannot be tested is code that cannot be trusted. Structured logging, correlation IDs, and meaningful test coverage are not optional extras — they define what done means.',
  },
  {
    number: '07',
    title: 'Async by design for I/O-bound workloads',
    description:
      'In backend systems, most latency is I/O: database queries, external APIs, file operations. Async-first design (asyncio, Celery for heavy jobs) keeps systems responsive under load.',
  },
  {
    number: '08',
    title: 'Documentation as part of engineering',
    description:
      'A function without documentation is a function that will be misused. OpenAPI schemas, docstrings, Architecture Decision Records, and README files are part of the deliverable.',
  },
]

// ─── §3 Backend Architecture Layers ──────────────────────────────────────────

export const ARCH_LAYERS: readonly ArchLayer[] = [
  {
    number: '01',
    name: 'API Layer',
    description:
      'Route definitions, dependency injection, HTTP status codes, and response serialisation. Zero business logic lives here. This layer translates HTTP concerns into domain language.',
    tools: ['FastAPI', 'Python'],
  },
  {
    number: '02',
    name: 'Schema / Validation Layer',
    description:
      'Pydantic v2 request and response models. Every incoming request is validated against an explicit schema before it touches the service layer. The single source of truth for data shapes.',
    tools: ['Pydantic v2'],
  },
  {
    number: '03',
    name: 'Service Layer',
    description:
      'Pure Python functions containing all business logic and workflow orchestration. No FastAPI imports, no ORM. Testable in complete isolation from the framework and database.',
    tools: ['Python', 'asyncio'],
  },
  {
    number: '04',
    name: 'Repository Layer',
    description:
      'All database access lives here and only here. Parameterised ORM queries, connection pooling, and transaction management. Business logic never calls the ORM directly.',
    tools: ['SQLAlchemy 2.0', 'asyncpg'],
  },
  {
    number: '05',
    name: 'Domain Layer',
    description:
      'Core entities, value objects, and domain events. Framework-free and dependency-free. The stable centre of the system — the layer that changes least as technology choices evolve.',
    tools: ['Python dataclasses', 'Pydantic'],
  },
  {
    number: '06',
    name: 'Infrastructure Layer',
    description:
      'Third-party integrations: Redis, external APIs, email, file storage. Each integration is abstracted behind a typed Protocol interface so swapping providers does not ripple through the codebase.',
    tools: ['Redis', 'HTTPX', 'SMTP'],
  },
  {
    number: '07',
    name: 'Worker Layer',
    description:
      'Background jobs, scheduled tasks, and async event processing. Completely isolated from the HTTP request cycle. Failed jobs are retried with exponential back-off and results are persisted.',
    tools: ['Celery', 'Redis (broker)'],
  },
  {
    number: '08',
    name: 'Migration Layer',
    description:
      'Database schema versioning. Every schema change is a numbered, reviewed, reversible migration. Migrations are deployed before the application binary — never the other way around.',
    tools: ['Alembic'],
  },
]

// ─── §4–6 Practice Areas (API, DB, AI) ───────────────────────────────────────

export const PRACTICE_AREAS: readonly PracticeArea[] = [
  {
    id: 'api',
    eyebrow: 'API design',
    title: 'How I design APIs',
    description:
      'REST-first, contract-driven API design that is predictable to consumers and maintainable as requirements evolve.',
    items: [
      {
        title: 'REST-first with predictable naming',
        description:
          'Resources are nouns, actions are HTTP methods. Route naming follows a consistent hierarchy — /resources, /resources/:id, /resources/:id/sub-resources — so consumers can predict URLs without reading docs.',
      },
      {
        title: 'URL versioning for change safety',
        description:
          'All APIs are versioned at the URL prefix (/api/v1/...). Breaking changes increment the version. Old versions are deprecated with explicit sunset dates and a migration guide.',
      },
      {
        title: 'Pydantic request/response validation',
        description:
          'Every incoming request body and query parameter is validated against an explicit Pydantic schema. No raw dict access in handlers. Response models are explicitly declared — no accidental field leakage.',
      },
      {
        title: 'Consistent error envelope',
        description:
          'All errors return { detail: string, code?: string } — matching FastAPI\'s default shape. Client libraries can handle errors without parsing error messages. HTTP status codes are used semantically.',
      },
      {
        title: 'Cursor-based pagination on list endpoints',
        description:
          'All list endpoints return paginated responses with cursor-based navigation. Prevents unbounded queries. Response includes next_cursor, has_more, and the resource list.',
      },
      {
        title: 'Server-side filtering with validated query params',
        description:
          'Filtering, sorting, and search are handled server-side via validated query parameters — not by over-fetching and filtering client-side. Each filter field has an explicit type and maximum value.',
      },
      {
        title: 'Auth boundary at the dependency layer',
        description:
          'Authentication is a FastAPI dependency injected at the route level. Authorization is enforced in the service layer, not the router. This means auth rules are testable without making HTTP calls.',
      },
      {
        title: 'Rate limiting and idempotency',
        description:
          'Sensitive and expensive endpoints are rate-limited per authenticated user via Redis-backed counters. Mutating operations support an Idempotency-Key header to prevent duplicate side effects.',
      },
    ],
  },
  {
    id: 'database',
    eyebrow: 'Database thinking',
    title: 'How I model data',
    description:
      'Database design is a first-class engineering concern — not something to fix after the service layer exists.',
    items: [
      {
        title: 'Entity modeling before writing code',
        description:
          'The data model is designed before a single route is written. Understanding the entities and their relationships clarifies the API contract, the service logic, and the test cases simultaneously.',
      },
      {
        title: 'Explicit foreign key constraints',
        description:
          'Relationships between entities are enforced at the database level with foreign key constraints and cascade rules — not in application code. The database is the last line of data integrity defence.',
      },
      {
        title: 'Index strategy aligned to access patterns',
        description:
          'Indexes are added to match the actual query access patterns — not just primary keys. Composite indexes are designed for the most common multi-column filter and sort operations.',
      },
      {
        title: 'Constraints at the database level',
        description:
          'NOT NULL, UNIQUE, CHECK, and ENUM constraints live in the schema. Application-level validation is the first line of defence; database constraints are the guarantee.',
      },
      {
        title: 'Alembic migrations as code',
        description:
          'Every schema change is a versioned, reviewed Alembic migration. Migrations include both upgrade and downgrade paths. They are tested in CI before merging and deployed before the application.',
      },
      {
        title: 'Query performance awareness',
        description:
          'EXPLAIN ANALYZE is used on any query that touches large tables or crosses multiple joins. Slow query candidates are identified in development, not discovered in production.',
      },
      {
        title: 'Audit fields on all mutable tables',
        description:
          'created_at and updated_at timestamps are present on every table that stores user-generated or system-generated data. These fields are set by the database layer, not the application layer.',
      },
      {
        title: 'UUIDs as primary keys',
        description:
          'UUIDs prevent ID enumeration attacks in API endpoints and support future distributed writes without a centralised sequence generator. The performance trade-off is monitored and addressed with ULID if needed.',
      },
    ],
  },
  {
    id: 'ai',
    eyebrow: 'AI system design',
    title: 'How I integrate AI',
    description:
      'AI features are engineered with the same rigour as any other system component — with explicit contracts, testability, and graceful fallback.',
    items: [
      {
        title: 'Provider-agnostic abstraction layer',
        description:
          'LLM calls go through a typed Python Protocol interface — not directly through the provider SDK. Swapping from OpenAI to Anthropic or a self-hosted model requires only a new implementation of the Protocol.',
      },
      {
        title: 'Versioned prompt templates',
        description:
          'Prompts are stored as parameterised Python classes with version numbers. Changes to prompt structure are code changes, reviewed in pull requests, and tracked in version history.',
      },
      {
        title: 'Structured output with Pydantic validation',
        description:
          'All LLM responses are requested in JSON mode and parsed through Pydantic models before use. If validation fails, the task retries with the validation error as context — no silent malformed data.',
      },
      {
        title: 'Background jobs for slow LLM calls',
        description:
          'LLM evaluation takes 3–10 seconds. Answer submission dispatches a Celery task and returns HTTP 202 immediately. Clients receive results via polling or push when evaluation completes.',
      },
      {
        title: 'RAG architecture readiness',
        description:
          'PostgreSQL with the pgvector extension stores document embeddings for semantic search. The embedding pipeline uses document chunking to handle long texts while preserving context relevance.',
      },
      {
        title: 'Prompt injection mitigation',
        description:
          'User-submitted content is passed to the LLM as a data parameter in a structured JSON payload — never concatenated into the instruction portion of the prompt. System prompts reference the data field explicitly.',
      },
      {
        title: 'Cost and latency awareness',
        description:
          'LLM calls per user session are counted and rate-limited. Expensive operations use background jobs. A pre-generated question bank is planned to serve cached questions for common topics, reducing live generation.',
      },
      {
        title: 'Human-readable feedback loops',
        description:
          'AI evaluation output is always structured for human readability: specific strengths, specific improvement areas, and an example strong answer — not a single opaque numeric score.',
      },
    ],
  },
]

// ─── §7–9 Quality Areas (Security, Testing, DevOps) ──────────────────────────

export const QUALITY_AREAS: readonly QualityArea[] = [
  {
    id: 'security',
    eyebrow: 'Security',
    title: 'Security & reliability',
    description:
      'Security decisions are built into the architecture from the first commit, not layered on after the system exists.',
    items: [
      {
        title: 'Input validation at all system boundaries',
        description:
          'Every incoming request is validated against an explicit Pydantic schema at the API boundary. Unknown fields are rejected. Field values have type constraints and maximum lengths.',
      },
      {
        title: 'JWT with short-lived access tokens and refresh rotation',
        description:
          'Access tokens expire in 15 minutes. Refresh tokens rotate on use. Reuse of a superseded refresh token revokes the entire token family — detecting replay attacks.',
      },
      {
        title: 'Authorization at the service layer',
        description:
          'Authentication is confirmed at the route level. Resource ownership and role-based rules are enforced inside service functions — not in the router. This keeps auth logic testable without HTTP.',
      },
      {
        title: 'Rate limiting on sensitive and expensive endpoints',
        description:
          'Redis-backed per-user rate limiting on auth, AI generation, and resource creation endpoints. Limits are configurable via environment variables. Exceeding limits returns 429 with a Retry-After header.',
      },
      {
        title: 'Secrets via environment variables only',
        description:
          'Database URLs, JWT secrets, and API keys are loaded exclusively from environment variables via pydantic-settings. No secrets appear in source code, config files, or version control.',
      },
      {
        title: 'Structured error handling',
        description:
          'All exceptions are caught at the API layer and returned as structured JSON errors. Stack traces are never exposed to API consumers. Internal errors are logged with correlation IDs.',
      },
      {
        title: 'Structured logging with correlation IDs',
        description:
          'Every request is assigned a correlation ID at the middleware layer. All log entries for that request carry the same ID, making full request traces reconstructable from log aggregation.',
      },
      {
        title: 'Dependency hygiene',
        description:
          'Dependencies are pinned to specific versions. pip-audit and GitHub Dependabot alerts are part of the repository setup. Dependencies with known CVEs are updated before merge.',
      },
    ],
  },
  {
    id: 'testing',
    eyebrow: 'Testing',
    title: 'Testing strategy',
    description:
      'Testing is layered, deterministic, and fast enough to run on every commit.',
    items: [
      {
        title: 'Unit tests — service layer',
        description: 'Service functions tested in isolation with mocked repositories and a mock AI provider. No network calls. No database. Runs in milliseconds.',
        tools: ['pytest', 'pytest-asyncio', 'unittest.mock'],
      },
      {
        title: 'API contract tests — HTTP layer',
        description: 'Full request-response cycle against a real FastAPI test app with a test database. Tests cover happy paths, validation errors, and auth failures.',
        tools: ['pytest', 'httpx async client', 'pytest-postgresql'],
      },
      {
        title: 'Repository tests — database layer',
        description: 'ORM queries, constraints, and migration correctness tested against a real PostgreSQL instance in Docker. Ensures the database layer matches the schema definition.',
        tools: ['pytest', 'SQLAlchemy async', 'Docker fixtures'],
      },
      {
        title: 'AI evaluation tests — prompt integrity',
        description: 'Snapshot tests for prompt templates detect unintended changes. All service and API tests use a deterministic mock LLM provider — no real API calls in CI.',
        tools: ['pytest', 'syrupy (snapshots)', 'mock LLM provider'],
      },
      {
        title: 'Frontend component tests',
        description: 'React component tests covering rendering, interaction, and accessibility. API calls are intercepted by MSW for deterministic component test behaviour.',
        tools: ['Vitest', 'React Testing Library', 'MSW'],
      },
      {
        title: 'Accessibility tests',
        description: 'Automated accessibility checks in the component test suite using jest-axe / vitest-axe. Keyboard navigation and ARIA attribute correctness are tested alongside functionality.',
        tools: ['vitest-axe', 'React Testing Library'],
      },
      {
        title: 'End-to-end tests (planned)',
        description: 'Full user flow tests from browser through API to database are planned using Playwright. Critical user journeys — session start, answer submission, feedback retrieval — will be covered.',
        tools: ['Playwright (planned)'],
      },
    ],
  },
  {
    id: 'devops',
    eyebrow: 'DevOps',
    title: 'DevOps & deployment mindset',
    description:
      'Deployment should be boring. A consistent, automated pipeline reduces risk and makes production changes predictable.',
    items: [
      {
        title: 'Docker for environment parity',
        description:
          'Every service runs in a Docker container. Docker Compose defines the full local development environment. The same container image runs locally, in CI, and in production.',
      },
      {
        title: 'Environment-based configuration',
        description:
          'pydantic-settings loads all configuration from environment variables. Different .env files for local, CI, and production. No config values in source code.',
      },
      {
        title: 'CI/CD with automated quality gates',
        description:
          'GitHub Actions runs type-check, lint, and the full test suite on every pull request. Merging requires all checks to pass. No manual exceptions.',
      },
      {
        title: 'Database migrations before application startup',
        description:
          'Alembic migrations run as a separate step before the application container starts — never alongside it. This ensures the schema is always consistent with the application code.',
      },
      {
        title: 'Production-hardened settings',
        description:
          'In production: DEBUG is false, CORS origins are explicitly whitelisted, secure cookie flags are set, and all secrets come from the environment. A dedicated production settings file prevents accidental dev settings.',
      },
      {
        title: 'Reverse proxy in front of ASGI',
        description:
          'nginx or Caddy sits in front of the ASGI application server, handling TLS termination, HTTP/2, and static file serving. The application server never handles raw TLS.',
      },
      {
        title: 'Health check endpoint',
        description:
          'A /health endpoint checks database connectivity and returns a structured JSON response. Load balancers and orchestration platforms use this for readiness and liveness probes.',
      },
      {
        title: 'Rollback plan documented before every deploy',
        description:
          'Every deployment has a documented rollback plan: which migration to reverse, which image tag to roll back to, and how to verify rollback success. Not a last-minute improvisation.',
      },
    ],
  },
]

// ─── §10 Engineering Stack ────────────────────────────────────────────────────

export const STACK_GROUPS: readonly StackGroup[] = [
  {
    name: 'Backend',
    description: 'The core server-side stack',
    items: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2.0', 'HTTPX'],
  },
  {
    name: 'Database',
    description: 'Storage and schema management',
    items: ['PostgreSQL 16', 'Redis', 'asyncpg', 'Alembic', 'pgvector'],
  },
  {
    name: 'Async & Jobs',
    description: 'Background processing',
    items: ['Celery', 'Redis (broker)', 'asyncio', 'asyncpg'],
  },
  {
    name: 'AI & ML',
    description: 'Language model integration',
    items: ['OpenAI API', 'gpt-4o', 'pgvector', 'LangChain (evaluating)'],
  },
  {
    name: 'Frontend',
    description: 'Client-side stack',
    items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'React Router v7'],
  },
  {
    name: 'DevOps',
    description: 'Deployment and infrastructure',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'nginx'],
  },
  {
    name: 'Testing',
    description: 'Quality assurance tools',
    items: ['pytest', 'pytest-asyncio', 'httpx', 'Vitest', 'React Testing Library', 'MSW'],
  },
  {
    name: 'Tooling',
    description: 'Code quality and workflow',
    items: ['ruff', 'mypy', 'ESLint', 'uv', 'pnpm', 'pre-commit'],
  },
]

// ─── §11 Applied Examples ─────────────────────────────────────────────────────

export const APPLIED_EXAMPLES: readonly AppliedExample[] = [
  {
    projectSlug: 'interviewpilot-ai',
    title: 'InterviewPilot AI',
    concept: 'AI system design & background job architecture',
    description:
      'The AI evaluation pipeline demonstrates provider abstraction, structured Pydantic output parsing, background job durability, and prompt injection mitigations — applied to a real product context.',
    highlights: [
      'Provider-agnostic AI abstraction layer (OpenAI → any LLM via Protocol)',
      'Celery + Redis for durable, retriable evaluation jobs',
      'Structured LLM output via Pydantic — validation errors trigger retries',
      'User input passed as data parameter, never injected into instruction prompts',
      'Full test coverage with deterministic mock LLM provider',
    ],
    caseStudyAvailable: true,
  },
  {
    projectSlug: 'clause-search',
    title: 'Clause Search System',
    concept: 'RAG architecture & semantic API design',
    description:
      'A RAG-powered document search system that demonstrates pgvector integration, document chunking strategy, semantic retrieval design, and production-grade API design for search endpoints.',
    highlights: [
      'pgvector extension for native vector similarity search in PostgreSQL',
      'Document chunking strategy for long-form legal text',
      'Cosine similarity scoring with ranked result pagination',
      'FastAPI async search endpoints designed for sub-100ms targets',
    ],
    caseStudyAvailable: false,
  },
  {
    projectSlug: 'fastapi-saas-backend',
    title: 'FastAPI SaaS Backend',
    concept: 'Clean architecture & test coverage',
    description:
      'A production-ready backend template demonstrating the full layered architecture — API, service, repository, domain, and infrastructure — with high test coverage across all layers.',
    highlights: [
      'Strict three-layer architecture: API → Service → Repository',
      'Multi-tenant row-level data isolation pattern',
      'JWT auth with refresh token rotation and replay detection',
      'Celery background tasks with retry logic and dead letter queue',
      '90%+ test coverage on business-critical service paths',
    ],
    caseStudyAvailable: false,
  },
]
