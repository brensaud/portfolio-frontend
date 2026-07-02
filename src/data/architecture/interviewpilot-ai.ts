/**
 * interviewpilot-ai.ts — architecture data for the InterviewPilot AI project.
 *
 * This is the single source of truth for the /projects/interviewpilot-ai/architecture
 * route. All node details, connections, request flow, deployment stack, and
 * engineering decisions live here — no business logic in the data file.
 *
 * Adding a new project: create a new file in this directory following the same
 * shape, then register it in src/data/architecture/index.ts.
 */
import type { ProjectArchitecture } from '@/features/architecture/types'

export const INTERVIEWPILOT_AI_ARCHITECTURE: ProjectArchitecture = {
  id: 'interviewpilot-ai',
  projectSlug: 'interviewpilot-ai',
  projectName: 'InterviewPilot AI',
  tagline: 'AI-powered mock interview platform with real-time feedback',
  metadata: {
    lastUpdated: '2026-07-01',
    version: '1.0',
    tags: ['FastAPI', 'React', 'OpenAI', 'PostgreSQL', 'Redis', 'Background Workers'],
    summary:
      'A multi-tenant SaaS platform enabling candidates to practise technical interviews against an AI interviewer. The system streams responses in real time, analyses answers semantically, and generates structured feedback reports asynchronously.',
  },

  // ─── Grid ──────────────────────────────────────────────────────────────────
  // 3 columns × 5 rows. Empty cells contain no node.
  //
  //   Col:    0              1                   2
  //   Row 0:  —              Frontend            —
  //   Row 1:  —              API Gateway         —
  //   Row 2:  Auth Service   Interview Service   AI Service
  //   Row 3:  Redis          PostgreSQL          OpenAI API
  //   Row 4:  —              Background Workers  —
  //
  grid: { rows: 5, cols: 3 },

  // ─── Nodes ─────────────────────────────────────────────────────────────────
  nodes: {
    frontend: {
      id: 'frontend',
      label: 'React SPA',
      sublabel: 'Vite · TypeScript',
      category: 'frontend',
      position: { row: 0, col: 1 },
      details: {
        purpose:
          'Delivers the interview experience: real-time question stream, voice input, answer editor, and feedback dashboard.',
        responsibilities: [
          'Renders live AI responses via SSE (Server-Sent Events)',
          'Captures and submits candidate answers (text + optional voice)',
          'Displays structured feedback reports post-session',
          'Manages client-side session state and auth token refresh',
        ],
        technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'React Router v7'],
        whyItExists:
          'Interview sessions require real-time UI updates and a rich interactive surface that a server-rendered approach cannot deliver cleanly. The SPA architecture gives full control over streaming, focus management, and accessibility.',
        alternativesConsidered: [
          {
            option: 'Next.js with server components',
            whyNotChosen:
              'Server components add latency for highly interactive pages. The SSE streaming pattern is simpler to own in a pure client context.',
          },
          {
            option: 'SvelteKit',
            whyNotChosen:
              'Team familiarity with React was higher. React 19 server actions were not needed here.',
          },
        ],
        tradeoffs: [
          'Full client bundle must be downloaded before the interview can start — mitigated by code splitting and Vercel edge caching.',
          'SEO is limited to static metadata; interview content is behind auth so this is acceptable.',
        ],
        securityConsiderations: [
          'Access tokens stored in memory only — never in localStorage or cookies.',
          'Strict Content Security Policy header prevents XSS from injecting scripts.',
          'All API calls go to the same-origin proxy path to avoid leaking the backend URL in the JS bundle.',
        ],
        performanceConsiderations: [
          'Route-level code splitting: interview UI is lazy-loaded and not part of the initial bundle.',
          'SSE connection is reused for the entire session to avoid repeated handshakes.',
        ],
      },
    },

    'api-gateway': {
      id: 'api-gateway',
      label: 'API Gateway',
      sublabel: 'FastAPI · Python 3.12',
      category: 'api',
      position: { row: 1, col: 1 },
      details: {
        purpose:
          'Single entry point for all client requests. Handles auth validation, request routing, rate limiting, and CORS.',
        responsibilities: [
          'JWT validation on every request via a reusable FastAPI dependency',
          'Route dispatch to interview, auth, and feedback sub-routers',
          'Global exception handling — maps domain exceptions to HTTP status codes',
          'Rate limiting via Redis pipeline counter',
          'CORS configuration loaded from environment (different origins per env)',
        ],
        technologies: ['FastAPI 0.138', 'Pydantic v2', 'Uvicorn', 'Python 3.12'],
        whyItExists:
          'Centralising cross-cutting concerns (auth, rate limiting, CORS, error formatting) at the gateway means every downstream service and endpoint inherits them automatically — no per-handler boilerplate.',
        alternativesConsidered: [
          {
            option: 'Django REST Framework',
            whyNotChosen:
              "Django's ORM and admin are valuable when you need them, but for an async-first, streaming API they add unnecessary overhead. FastAPI's async support and OpenAPI generation are a better fit.",
          },
          {
            option: 'Separate API Gateway (Kong, AWS API Gateway)',
            whyNotChosen:
              'Overkill for a single-team SaaS. FastAPI handles all gateway concerns with less operational complexity.',
          },
        ],
        tradeoffs: [
          "All traffic goes through one process — a crash affects all routes. Mitigated by Render's automatic restart policy.",
          'SSE streams bypass standard request/response logging — requires separate stream audit middleware.',
        ],
        securityConsiderations: [
          'No admin endpoints are registered on this router — they live on a separate prefix.',
          'Request body size is capped at 64 KB to prevent payload attacks.',
          'All unhandled exceptions return a generic 500 message — stack traces are never exposed to clients.',
        ],
        performanceConsiderations: [
          'Async throughout: no blocking I/O in request handlers.',
          'Connection pooling via asyncpg keeps DB round-trips cheap.',
          'Uvicorn workers scale horizontally on Render by adjusting WEB_CONCURRENCY.',
        ],
      },
    },

    'auth-service': {
      id: 'auth-service',
      label: 'Auth Service',
      sublabel: 'JWT · bcrypt',
      category: 'auth',
      position: { row: 2, col: 0 },
      details: {
        purpose:
          'Issues and validates JWT access tokens. Manages refresh token rotation and session lifecycle.',
        responsibilities: [
          'Password verification using bcrypt (cost factor 12)',
          'Access token signing (HS256, 15-minute TTL)',
          'Refresh token issuance: opaque 32-byte random token stored as SHA-256 hash',
          'Token rotation on every refresh — invalidates all sessions on reuse detection',
          'Rate limits login attempts: 5 per 15 minutes per IP via Redis',
        ],
        technologies: ['PyJWT', 'bcrypt', 'Redis (Upstash)', 'Python secrets module'],
        whyItExists:
          'Separating auth logic into its own service boundary means it can be reasoned about, tested, and audited independently. All token lifecycle rules are in one place.',
        alternativesConsidered: [
          {
            option: 'Auth0 / Clerk',
            whyNotChosen:
              'Third-party auth adds a billing dependency and reduces control over token format and session semantics. For a project where auth is a core competency to demonstrate, owning it makes sense.',
          },
          {
            option: 'Server-side sessions (Redis only, no JWT)',
            whyNotChosen:
              'JWT allows stateless validation at the gateway without a Redis round-trip on every request — important for low-latency streaming endpoints.',
          },
        ],
        tradeoffs: [
          'Access tokens cannot be individually revoked before expiry — mitigated by keeping TTL short (15 minutes).',
          'Refresh token rotation means a user logged in on two devices will get logged out of the older device on refresh.',
        ],
        securityConsiderations: [
          'Refresh tokens stored as hashed values — if the DB is compromised, raw tokens are not exposed.',
          'Reuse detection: presenting a revoked token invalidates ALL active sessions for that user.',
          'Login rate limiting is keyed on both IP and email to prevent credential stuffing.',
        ],
        performanceConsiderations: [
          'bcrypt is intentionally slow — this is a security feature, not a bug.',
          'JWT validation is in-memory (no I/O) — adds sub-millisecond overhead per request.',
        ],
      },
    },

    'interview-service': {
      id: 'interview-service',
      label: 'Interview Service',
      sublabel: 'Core business logic',
      category: 'service',
      position: { row: 2, col: 1 },
      details: {
        purpose:
          'Owns the interview session lifecycle: question sequencing, answer evaluation orchestration, session state management, and report generation triggering.',
        responsibilities: [
          'Creates and manages interview sessions (topic, difficulty, question count)',
          'Sequences questions based on topic and difficulty profile',
          'Submits answers to AI Service for semantic evaluation',
          'Persists session snapshots to PostgreSQL',
          'Enqueues async report generation jobs in Redis',
          'Exposes SSE endpoint for real-time AI response streaming',
        ],
        technologies: ['Python 3.12', 'SQLAlchemy 2.0 (async)', 'asyncpg', 'Redis streams'],
        whyItExists:
          'Interview domain logic is complex and changes frequently. Isolating it from the API layer means business rules can evolve without touching routing, auth, or persistence plumbing.',
        alternativesConsidered: [
          {
            option: 'Inline logic in FastAPI route handlers',
            whyNotChosen:
              'Route handlers become untestable and brittle as complexity grows. The service layer enables pure unit tests with no HTTP context.',
          },
        ],
        tradeoffs: [
          'More files and indirection vs. a flat structure — pays off once the service grows beyond ~3 features.',
          'Service layer owns transactions: if the AI call fails mid-session, the partial state must be cleaned up explicitly.',
        ],
        securityConsiderations: [
          'All session reads are scoped by authenticated user ID — no IDOR possible at the service layer.',
          'Answer content is never logged — only session IDs and evaluation scores.',
        ],
        performanceConsiderations: [
          'SSE streaming starts before the full AI response is available — perceived latency is ~200 ms regardless of answer length.',
          'Session snapshots are flushed (not committed) until the full session is valid, avoiding partial data in the DB.',
        ],
      },
    },

    'ai-service': {
      id: 'ai-service',
      label: 'AI Service',
      sublabel: 'OpenAI · LangChain',
      category: 'ai',
      position: { row: 2, col: 2 },
      details: {
        purpose:
          'Abstracts all LLM integration: prompt construction, streaming, semantic answer evaluation, and token budget management.',
        responsibilities: [
          'Constructs structured prompts from question + answer + rubric context',
          'Streams OpenAI completions back to the caller via async generator',
          'Evaluates answers semantically: relevance, depth, accuracy, communication',
          'Enforces token budgets per session to control cost',
          'Caches identical prompt+model combinations in Redis (TTL: 1 hour)',
        ],
        technologies: ['LangChain', 'OpenAI API (gpt-4o)', 'tiktoken', 'Redis (Upstash)'],
        whyItExists:
          'LLM integration has its own failure modes, costs, and versioning concerns. Isolating it means the Interview Service does not need to change when the model, prompt format, or provider changes.',
        alternativesConsidered: [
          {
            option: 'Direct OpenAI SDK calls in the Interview Service',
            whyNotChosen:
              'Prompt management, token counting, and streaming logic would pollute the interview domain. Testability would require mocking the OpenAI client everywhere.',
          },
          {
            option: 'Separate microservice (own process)',
            whyNotChosen:
              'Network latency for streaming responses would be compounded. An in-process boundary is sufficient for V1.',
          },
        ],
        tradeoffs: [
          'Response quality depends on OpenAI uptime — degradation strategy returns a generic "evaluation unavailable" response.',
          'Prompt caching is an optimisation that only helps for duplicate inputs — new sessions bypass the cache.',
        ],
        securityConsiderations: [
          'OpenAI API key is environment-only — never logged or returned in any response.',
          'Prompt injection: user answer content is injected into prompts as a quoted string with a system-level instruction to ignore format overrides.',
        ],
        performanceConsiderations: [
          'Streaming avoids buffering the full response before display — first token appears in ~400 ms.',
          'tiktoken token counting runs before the API call to prevent context overflow errors.',
        ],
      },
    },

    redis: {
      id: 'redis',
      label: 'Redis',
      sublabel: 'Upstash · Cache + Queue',
      category: 'cache',
      position: { row: 3, col: 0 },
      details: {
        purpose:
          'Multi-purpose in-process store: API rate limiting, auth session store, AI response cache, and background job queue.',
        responsibilities: [
          'Rate limiting counters: sliding window per IP per endpoint',
          'Refresh token storage: hashed tokens with TTL',
          'AI response cache: prompt hash → evaluation result (TTL: 1 hour)',
          'Background job queue: Redis List used as a FIFO queue for report generation',
          'Session status tracking: allows the frontend to poll job completion',
        ],
        technologies: ['Redis 7', 'Upstash (serverless Redis)', 'redis.asyncio (Python client)'],
        whyItExists:
          'Redis provides sub-millisecond reads and atomic increment operations critical for rate limiting. It also serves as the simplest possible job queue without introducing a separate broker (Celery, RabbitMQ).',
        alternativesConsidered: [
          {
            option: 'PostgreSQL for job queuing (SKIP LOCKED)',
            whyNotChosen:
              'Postgres-as-queue works but adds contention on the primary DB. Redis is more appropriate for high-frequency, short-lived job records.',
          },
          {
            option: 'Celery + RabbitMQ',
            whyNotChosen:
              'Operational overhead of RabbitMQ is not justified for a single job type. Redis Lists provide FIFO semantics with no additional infrastructure.',
          },
        ],
        tradeoffs: [
          'Upstash is serverless Redis — cold starts add ~30 ms on the first request after idle. Mitigated by a keep-alive ping.',
          'Redis is used for multiple concerns — a Redis failure affects rate limiting AND job queuing simultaneously. Graceful degradation disables rate limiting but keeps the core path alive.',
        ],
        securityConsiderations: [
          'Upstash requires TLS — all connections use rediss:// scheme.',
          'Redis is not exposed to the public internet — only accessible from the API server.',
        ],
        performanceConsiderations: [
          'Pipeline batching: multiple Redis commands in one network round-trip where possible.',
          'TTL on all keys: no unbounded key growth.',
        ],
      },
    },

    postgresql: {
      id: 'postgresql',
      label: 'PostgreSQL',
      sublabel: 'Neon · Primary store',
      category: 'database',
      position: { row: 3, col: 1 },
      details: {
        purpose:
          'Primary durable data store for all domain objects: users, interview sessions, questions, answers, and evaluation reports.',
        responsibilities: [
          'Stores all user and session data with ACID guarantees',
          'Provides full-text and vector similarity search for question retrieval',
          'Maintains audit trail via append-only audit_logs table',
          'Hosts the Alembic migration history',
        ],
        technologies: ['PostgreSQL 16', 'Neon (serverless Postgres)', 'asyncpg', 'SQLAlchemy 2.0', 'Alembic'],
        whyItExists:
          'PostgreSQL is the correct default for relational, transactional data. Its rich type system (JSONB, arrays, enums) reduces the need for application-layer serialisation logic.',
        alternativesConsidered: [
          {
            option: 'MongoDB',
            whyNotChosen:
              'Document model adds complexity for relational data like session→question→answer chains. PostgreSQL JSONB provides document flexibility when needed without sacrificing joins.',
          },
          {
            option: 'SQLite',
            whyNotChosen:
              'Not suitable for concurrent async writes from multiple Uvicorn workers.',
          },
        ],
        tradeoffs: [
          'Neon is serverless — cold starts on an idle DB add ~200 ms to the first query after a pause period. Not appropriate for interactive endpoints; mitigated by a warmup query in the lifespan hook.',
          'Async SQLAlchemy requires greenlet for some synchronous Alembic operations — env.py explicitly handles this.',
        ],
        securityConsiderations: [
          'Connection string uses ?ssl=require — unencrypted connections are rejected.',
          'Application DB role has no DDL privileges in production — schema changes only through Alembic.',
          'No raw SQL in application code — all queries use ORM or parameterised text().',
        ],
        performanceConsiderations: [
          'Indexed columns: user_id FK, created_at, session status — covers all primary list queries.',
          'asyncpg connection pool: min_size=2, max_size=10 to balance cold start with memory footprint.',
        ],
      },
    },

    'openai-api': {
      id: 'openai-api',
      label: 'OpenAI API',
      sublabel: 'GPT-4o · External',
      category: 'external',
      position: { row: 3, col: 2 },
      details: {
        purpose:
          'Provides the LLM backbone for question generation, answer evaluation, and feedback synthesis.',
        responsibilities: [
          'Generates contextual interview questions from topic + difficulty parameters',
          'Evaluates candidate answers against a structured rubric',
          'Synthesises session-level feedback into a structured report',
          'Powers real-time conversational hints via streaming completions',
        ],
        technologies: ['GPT-4o', 'OpenAI Streaming API', 'Function Calling / Structured Outputs'],
        whyItExists:
          'Building a domain-specific evaluation model from scratch is out of scope. GPT-4o provides near-human evaluation quality for technical interview responses with well-crafted prompts.',
        alternativesConsidered: [
          {
            option: 'Open-source models (Llama 3, Mistral)',
            whyNotChosen:
              'Self-hosting adds infrastructure complexity and GPU costs. GPT-4o quality for evaluation tasks is significantly higher for structured rubric adherence.',
          },
          {
            option: 'Anthropic Claude',
            whyNotChosen:
              'OpenAI Structured Outputs (guaranteed JSON schema compliance) is critical for evaluation rubric responses. Claude lacks an equivalent at the time of design.',
          },
        ],
        tradeoffs: [
          'External dependency: OpenAI outages degrade the core product. Mitigation: graceful degradation returns a "retry later" state without losing session data.',
          'Cost scales with usage — token budgets and caching are critical cost controls.',
          "Data privacy: answer content is sent to OpenAI. Mitigated by not sending PII in prompts and by OpenAI's zero-data-retention option for API customers.",
        ],
        securityConsiderations: [
          'API key scoped to minimum required permissions via OpenAI project keys.',
          'All outbound requests go through the AI Service — never directly from the frontend.',
        ],
        performanceConsiderations: [
          'Streaming responses: first token in ~400 ms, full evaluation in 2–4 seconds.',
          'Structured Outputs (JSON mode) adds ~50 ms overhead but eliminates response parsing failures.',
        ],
      },
    },

    workers: {
      id: 'workers',
      label: 'Background Workers',
      sublabel: 'Async · Python',
      category: 'worker',
      position: { row: 4, col: 1 },
      details: {
        purpose:
          'Processes long-running tasks outside the request/response cycle: report generation, email delivery, and session analytics aggregation.',
        responsibilities: [
          'Dequeues report generation jobs from Redis List',
          'Calls AI Service to generate full session feedback reports',
          'Persists completed reports to PostgreSQL',
          'Sends email notifications (report ready) via email service',
          'Updates session status in Redis for frontend polling',
        ],
        technologies: ['Python asyncio', 'Redis (job queue)', 'asyncpg', 'SMTP / Resend API'],
        whyItExists:
          'Report generation takes 5–15 seconds (multiple AI calls). Blocking the API request for this duration would degrade UX and consume a Uvicorn worker slot. Background processing decouples generation time from response time.',
        alternativesConsidered: [
          {
            option: 'Celery + Redis',
            whyNotChosen:
              'Celery adds operational complexity (separate worker process, serialiser configuration, result backend). For a single job type, a simple asyncio loop consuming a Redis List is sufficient.',
          },
          {
            option: 'FastAPI BackgroundTasks',
            whyNotChosen:
              'BackgroundTasks run in the same process as the API — a crash in the task can affect the API, and there is no retry/persistence. Redis queuing provides durability.',
          },
        ],
        tradeoffs: [
          'No built-in retry mechanism — a failed job is logged and the session is marked as report_failed. A manual re-trigger endpoint is planned.',
          'Worker and API share the same Redis instance — backpressure from queue growth could affect rate limiting. Separate Redis databases (db 0 vs db 1) isolate these concerns.',
        ],
        securityConsiderations: [
          'Workers run with the same DB credentials as the API but in a separate process — future: read-write restricted role for workers.',
          'Processed jobs are deleted from the queue immediately to avoid reprocessing on restart.',
        ],
        performanceConsiderations: [
          'Workers process jobs concurrently using asyncio.gather — up to 4 reports in parallel.',
          'Job dequeue uses BLPOP (blocking pop) to avoid busy-waiting.',
        ],
      },
    },
  },

  // ─── Connections ───────────────────────────────────────────────────────────
  connections: [
    {
      id: 'c1',
      from: 'frontend',
      to: 'api-gateway',
      label: 'HTTPS / SSE',
      type: 'sync',
      description: 'REST API calls and Server-Sent Events for streaming responses',
    },
    {
      id: 'c2',
      from: 'api-gateway',
      to: 'auth-service',
      label: 'JWT validate',
      type: 'auth',
      description: 'Every request passes through JWT validation before reaching business logic',
    },
    {
      id: 'c3',
      from: 'api-gateway',
      to: 'interview-service',
      label: 'Route dispatch',
      type: 'sync',
      description: 'Validated requests are dispatched to the Interview Service',
    },
    {
      id: 'c4',
      from: 'interview-service',
      to: 'ai-service',
      label: 'Evaluate answer',
      type: 'sync',
      description: 'Interview Service calls AI Service for real-time answer evaluation',
    },
    {
      id: 'c5',
      from: 'interview-service',
      to: 'postgresql',
      label: 'Persist session',
      type: 'data',
      description: 'Session state, answers, and scores are persisted to PostgreSQL',
    },
    {
      id: 'c6',
      from: 'interview-service',
      to: 'redis',
      label: 'Enqueue job',
      type: 'async',
      description: 'On session complete, a report generation job is pushed to the Redis queue',
    },
    {
      id: 'c7',
      from: 'ai-service',
      to: 'openai-api',
      label: 'LLM call',
      type: 'sync',
      description: 'Structured prompts sent to GPT-4o; streaming completions returned',
    },
    {
      id: 'c8',
      from: 'workers',
      to: 'postgresql',
      label: 'Write report',
      type: 'async',
      description: 'Completed feedback reports are written back to PostgreSQL',
    },
    {
      id: 'c9',
      from: 'workers',
      to: 'redis',
      label: 'Dequeue / status',
      type: 'async',
      description: 'Workers consume jobs from the Redis queue and update job status',
    },
  ],

  // ─── Request Flow ──────────────────────────────────────────────────────────
  requestFlow: [
    {
      nodeId: 'frontend',
      label: 'Browser',
      description: 'Candidate submits an answer via the interview UI',
      direction: 'down',
    },
    {
      nodeId: 'api-gateway',
      label: 'FastAPI',
      description: 'Validates JWT, enforces rate limit, routes to Interview Service',
      direction: 'down',
    },
    {
      nodeId: 'auth-service',
      label: 'Auth Middleware',
      description: 'Decodes JWT payload, confirms token is not revoked',
      direction: 'down',
    },
    {
      nodeId: 'interview-service',
      label: 'Interview Service',
      description: 'Loads session context from PostgreSQL, validates answer format',
      direction: 'down',
    },
    {
      nodeId: 'ai-service',
      label: 'AI Service',
      description: 'Constructs rubric prompt, calls GPT-4o with streaming enabled',
      direction: 'down',
    },
    {
      nodeId: 'openai-api',
      label: 'OpenAI GPT-4o',
      description: 'Evaluates the answer, streams structured feedback tokens',
      direction: 'up',
    },
    {
      nodeId: 'interview-service',
      label: 'Interview Service',
      description: 'Persists evaluation score to PostgreSQL, enqueues async report job',
      direction: 'up',
    },
    {
      nodeId: 'api-gateway',
      label: 'FastAPI',
      description: 'Streams SSE tokens back through the open connection',
      direction: 'up',
    },
    {
      nodeId: 'frontend',
      label: 'Browser',
      description: 'Renders streaming feedback in real time as tokens arrive',
      direction: 'up',
    },
  ],

  // ─── Deployment Stack ──────────────────────────────────────────────────────
  deploymentStack: [
    {
      id: 'browser',
      label: 'Browser',
      sublabel: 'User\'s device',
      category: 'frontend',
    },
    {
      id: 'cloudflare',
      label: 'Cloudflare',
      sublabel: 'DNS · CDN · DDoS protection',
      category: 'infrastructure',
      provider: 'Cloudflare',
      note: 'All traffic passes through Cloudflare before reaching origin servers',
    },
    {
      id: 'vercel',
      label: 'Vercel',
      sublabel: 'React SPA · Edge CDN',
      category: 'frontend',
      provider: 'Vercel',
      note: 'Static assets served from edge nodes worldwide; ~10 ms TTFB globally',
    },
    {
      id: 'render',
      label: 'Render',
      sublabel: 'FastAPI · Uvicorn',
      category: 'api',
      provider: 'Render',
      note: 'Auto-scaled web service; deploys on push to main via GitHub Actions',
    },
    {
      id: 'neon',
      label: 'Neon PostgreSQL',
      sublabel: 'Serverless Postgres · us-east-1',
      category: 'database',
      provider: 'Neon',
      note: 'Branching used for staging; pooled connections via PgBouncer',
    },
    {
      id: 'upstash',
      label: 'Upstash Redis',
      sublabel: 'Serverless Redis · Global',
      category: 'cache',
      provider: 'Upstash',
      note: 'TLS-only; used for rate limiting, caching, and job queue',
    },
    {
      id: 'workers-deploy',
      label: 'Background Workers',
      sublabel: 'Render background worker',
      category: 'worker',
      provider: 'Render',
      note: 'Separate Render service; shares DB and Redis with the API',
    },
  ],

  // ─── Engineering Decisions ─────────────────────────────────────────────────
  decisions: [
    {
      id: 'd1',
      title: 'Streaming over polling for real-time feedback',
      problem:
        'Interview feedback must appear progressively as the AI generates it. Waiting for the full response (3–8 seconds) before displaying anything creates an unresponsive experience.',
      decision:
        'Server-Sent Events (SSE) with async generator endpoints in FastAPI. The AI Service yields tokens as they arrive from OpenAI\'s streaming API, and FastAPI forwards them as SSE events over a persistent HTTP connection.',
      alternatives: [
        'WebSockets: bidirectional, but adds connection state complexity that is not needed — feedback is always server-to-client.',
        'Short polling: simple but generates unnecessary requests and introduces up to 500 ms of extra latency.',
        'Long polling: better than short polling but still requires reconnection after each message batch.',
      ],
      tradeoffs:
        'SSE connections are unidirectional (server→client), which is all we need. They are simpler than WebSockets and work through HTTP/2 multiplexing. The trade-off: a single slow SSE stream holds a Uvicorn worker slot — mitigated by async generators that yield immediately on each token.',
      lessonsLearned:
        'FastAPI\'s StreamingResponse with an async generator is the cleanest SSE pattern. Buffering must be disabled in Nginx/Cloudflare (X-Accel-Buffering: no) or streaming stalls at the proxy layer.',
    },
    {
      id: 'd2',
      title: 'Service layer boundary between API and business logic',
      problem:
        'As interview features grow (session creation, evaluation, reporting, hints), the API route handlers accumulate domain logic that becomes difficult to test and reason about.',
      decision:
        'Every route handler is ≤20 lines — it validates input, calls one service method, and returns a response. All business logic lives in service classes. Services own transaction boundaries and call repositories for data access.',
      alternatives: [
        'Fat controllers: route handlers contain logic directly. Fast to write, hard to maintain.',
        'CQRS + event sourcing: powerful but far more complexity than needed for V1.',
      ],
      tradeoffs:
        'More files and indirection at first. The investment pays off when writing tests — service methods are pure Python functions, testable with no HTTP context. Route handler tests only verify that the right service is called with the right input.',
      lessonsLearned:
        'The repository layer (one class per domain model) is worth the abstraction even in a single-DB system. It makes swapping the query implementation (ORM to raw SQL for a performance-critical path) a one-file change.',
    },
    {
      id: 'd3',
      title: 'Async-first from the database up',
      problem:
        'FastAPI is async-native. Mixing sync database drivers (psycopg2) with async route handlers requires running DB calls in a thread pool, which adds overhead and complicates testing.',
      decision:
        'asyncpg as the Postgres driver, SQLAlchemy 2.0 async API, and async test fixtures using aiosqlite. Every layer is async from the Uvicorn event loop down to the DB connection.',
      alternatives: [
        'Sync SQLAlchemy with run_in_executor: works but every DB call incurs thread pool overhead.',
        'Tortoise ORM: async-native but less mature ecosystem than SQLAlchemy.',
      ],
      tradeoffs:
        'Alembic migrations cannot run in an async context — env.py uses asyncio.run() to wrap the migration function. The asyncpg driver requires ?ssl=require instead of ?sslmode=require (a psycopg2 parameter), which is a common source of deployment errors.',
      lessonsLearned:
        'Set UV_NO_CACHE=1 in the production Dockerfile and invoke the venv directly (/app/.venv/bin/uvicorn) rather than via uv run — prevents uv from re-syncing dev dependencies on every container startup.',
    },
    {
      id: 'd4',
      title: 'Redis for rate limiting instead of a database counter',
      problem:
        'Rate limiting requires atomic increment-and-check operations on counters that expire. PostgreSQL supports this but adds latency and contention to the primary DB.',
      decision:
        'Redis pipeline with INCR + EXPIRE: two commands in one round-trip, atomic at the key level. The counter key is {ip}:{endpoint} and expires after the rate limit window.',
      alternatives: [
        'PostgreSQL rate_limit table with UPSERT: durable but slow (~5 ms vs ~0.5 ms).',
        'In-memory counter (Python dict): no cross-process or cross-instance sharing — breaks under multiple workers.',
        'Token bucket algorithm: more sophisticated but INCR sliding window is sufficient.',
      ],
      tradeoffs:
        'Redis failure disables rate limiting — the system defaults to allowing all requests rather than blocking them. This is the correct failure mode for availability (a DoS is less damaging than making the site unavailable for all users). A Redis-unavailable warning is logged.',
      lessonsLearned:
        'Upstash serverless Redis has a cold-start latency of ~30 ms after idle periods. A lightweight keep-alive ping in the FastAPI lifespan hook prevents this from affecting the first real request.',
    },
  ],
}
