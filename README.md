# portfolio-frontend

[![CI](https://github.com/brensaud/portfolio-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/brensaud/portfolio-frontend/actions/workflows/ci.yml)

Personal portfolio for **Bren Saud** — Python Backend Engineer.

**Live:** [brensaud.com](https://brensaud.com) &nbsp;|&nbsp; **API:** [api.brensaud.com](https://api.brensaud.com)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript ~6 (strict) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Unit tests | Vitest + React Testing Library |
| E2E tests | Playwright |
| Linting | ESLint + Prettier |
| Hosting | Vercel |

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # then fill in values
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). The backend must be running at `VITE_API_BASE_URL` for the contact form to work. See [portfolio-backend](https://github.com/brensaud/portfolio-backend).

---

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Vite dev server |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview production build |
| `pnpm type-check` | TypeScript check (no emit) |
| `pnpm lint` | ESLint |
| `pnpm format:check` | Prettier check (CI) |
| `pnpm format` | Prettier write |
| `pnpm test:run` | Vitest single run |
| `pnpm test:coverage` | Vitest + V8 coverage |
| `pnpm test:e2e` | Playwright E2E |

---

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL (`https://api.brensaud.com`) |
| `VITE_SITE_URL` | Canonical site URL (`https://brensaud.com`) |

---

## CI — GitHub Actions

Runs on every push and pull request to `main`.

| Job | What it checks |
|---|---|
| **Quality** | ESLint, Prettier, TypeScript |
| **Test** | Vitest unit tests + coverage artifact |
| **Build** | Production Vite build + dist artifact |
| **Audit** | `pnpm audit --audit-level=high` (advisory, non-blocking) |

### Quality gates (must pass before merge)

- `pnpm lint`
- `pnpm format:check`
- `pnpm type-check`
- `pnpm test:run`
- `pnpm build`

---

## CD — Vercel

Vercel deploys automatically via the GitHub integration.

| Event | Result |
|---|---|
| Push to `main` | Production → `brensaud.com` |
| Pull request | Preview → `*.vercel.app` |

**Vercel settings:**

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Install command | `pnpm install --frozen-lockfile` |
| Node version | 22 |

**Environment variables** (set in Vercel dashboard):

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://api.brensaud.com` |
| `VITE_SITE_URL` | `https://brensaud.com` |

**Custom domains:** Add `brensaud.com` in Vercel → Domains. Set `www.brensaud.com` to redirect to `brensaud.com`. DNS is managed via Cloudflare — add a CNAME pointing to `cname.vercel-dns.com`.

---

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production — always deployable |
| `feat/*` | Features and new pages |
| `fix/*` | Bug fixes |
| `chore/*` | Tooling, CI, dependencies |

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
