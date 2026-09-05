# BACKEND ARCHITECTURE & SPECIFICATION

**Platform**: ProjectSpark / ProjectPilot AI  
**Framework**: Next.js 16.3.3 App Router (Node.js 20 LTS Runtime)  
**Database**: Google Cloud Firestore (via `firebase-admin/firestore`)  
**Generative AI**: Google Gemini 2.5/2.0 Flash (via `@google/genai` with structured JSON schema)  
**Authentication**: Firebase Authentication (Bearer token verification via `firebase-admin/auth`) + 1-Click Instant Demo Token  
**Deployment**: Google Cloud Run (Containerized via multi-stage Dockerfile with standalone output)

---

## 1. High-Level Architectural Flow

```
┌──────────────────────────────┐
│  Client Browser / Dashboard  │
└──────────────┬───────────────┘
               │  HTTPS / JSON (Authorization: Bearer <token>)
               ▼
┌──────────────────────────────┐
│  Next.js 16 App Router APIs  │  (/api/projects/*, /api/profile, etc.)
└──────────────┬───────────────┘
               │
      ┌────────┼────────┐
      ▼        ▼        ▼
┌──────────┐ ┌─────┐ ┌──────────────┐
│Rate Limit│ │Auth │ │Zod Validation│
│ (Sliding)│ │Check│ │(Strict Schema│
└──────────┘ └─────┘ └──────────────┘
               │
               ▼
┌──────────────────────────────┐
│    Domain Business Layer     │  (project-service, roadmap-service, profile-service)
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐ ┌──────────────┐
│Google Gemini │ │Google Cloud  │
│ 2.5 Flash    │ │  Firestore   │
│(@google/genai│ │(users/{uid}/ │
│structured)   │ │  projects)   │
└──────────────┘ └──────────────┘
```

---

## 2. API Endpoints Reference

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/demo-session` | None | Mints an authenticated demo session token for instant 1-click evaluation |
| `GET` | `/api/profile` | Yes (Bearer) | Retrieves the authenticated student's profile |
| `PUT` | `/api/profile` | Yes (Bearer) | Updates the authenticated student's profile |
| `GET` | `/api/projects` | Yes (Bearer) | Lists user-owned projects with domain/difficulty filters and pagination |
| `POST` | `/api/projects/generate` | Yes (Bearer) | Synthesizes 3 tailored capstones with Gemini, validates with Zod, and persists |
| `GET` | `/api/projects/[id]` | Yes (Bearer) | Retrieves single project detail strictly enforcing ownership |
| `PATCH` | `/api/projects/[id]` | Yes (Bearer) | Mutates project properties (saved state, status) |
| `POST` | `/api/projects/[id]/save` | Yes (Bearer) | Toggles or sets project saved bookmark |
| `POST` | `/api/projects/[id]/blueprint` | Yes (Bearer) | Completes and returns full 6-pillar architectural blueprint |
| `POST` | `/api/projects/[id]/improve` | Yes (Bearer) | Sends student scope adjustment or feature refinement to Gemini |
| `GET` | `/api/projects/[id]/roadmap` | Yes (Bearer) | Returns project roadmap with server-computed progress and viva score |
| `PATCH` | `/api/projects/[id]/roadmap/tasks/[taskId]` | Yes (Bearer) | Updates task status (`TODO`, `IN_PROGRESS`, `COMPLETED`) & recalculates progress |

---

## 3. Authentication & Authorization Strategy

### Cryptographic Token Verification
Every private request requires an `Authorization: Bearer <token>` header.
The server-side middleware `requireAuth(request)`:
1. Validates the `Bearer` syntax.
2. If token is the pre-configured Demo Token (`demo-token-alex-chen`), resolves to authenticated identity `{ uid: 'demo-user-alex-chen', isGuest: true }`.
3. For student accounts, verifies the token against Firebase Admin (`auth.verifyIdToken(token)`).
4. Extracts the cryptographically verified `uid`.

### Strict Object-Level Authorization (IDOR Prevention)
- Client-supplied `userId` in query parameters or JSON bodies is **strictly ignored**.
- All database queries and writes are scoped directly under `users/{uid}/projects/{projectId}`.
- If a user attempts to access or mutate a project belonging to another student, the service throws a `NotFoundError` (or `ForbiddenError`), preventing data leakage.

---

## 4. Google Gemini Generative AI Architecture

### SDK & Model Strategy
- Uses `@google/genai` (Google's official modern Node.js SDK).
- Model hierarchy: `gemini-2.5-flash` primary with automatic graceful fallback to `gemini-2.0-flash`.
- Configuration: `responseMimeType: 'application/json'`, deterministic temperature.

### Anti-Prompt Injection Defense
Untrusted student inputs (e.g. constraints, custom requirements, improvement requests) are strictly isolated using delimiter boundaries:
```
<<<STUDENT_PROFILE>>>
Domain Interests: ...
Technical Skills: ...
<<<END_STUDENT_PROFILE>>>

<<<USER_CONSTRAINTS>>>
... untrusted student text ...
<<<END_USER_CONSTRAINTS>>>
```
System developer instructions are placed in top-level `systemInstruction` parameters, preventing student inputs from overriding core constraints.

### Structured Output & Zod Validation
Raw AI responses are passed through `extractJsonFromText()`, stripping any markdown fences, and validated against `projectIdeaSchema` and `improvementResultSchema`. If validation fails, an automatic repair retry is triggered once. If unrecoverable, an `AIServiceError` (503) is returned without crashing the server.

---

## 5. Firestore Data Model

```
users/{uid}
  ├── meta/profile: StudentProfileData
  │     ├── name: string
  │     ├── email: string
  │     ├── college: string
  │     ├── course: string
  │     ├── year: string
  │     ├── interests: string[]
  │     ├── skills: string[]
  │     └── experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced'
  │
  └── projects/{projectId}: ProjectIdeaData
        ├── id: string (UUID)
        ├── slug: string
        ├── title: string
        ├── tagline: string
        ├── category: string
        ├── domain: string
        ├── accent: 'amber' | 'indigo' | 'green'
        ├── match: number
        ├── matchReason: string
        ├── difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
        ├── estimatedWeeks: number
        ├── targetOutcome: string
        ├── requiredSkills: string[]
        ├── interests: string[]
        ├── overview: string
        ├── problemContext: string
        ├── saved: boolean
        ├── status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
        ├── createdAt: ISOString
        ├── updatedAt: ISOString
        │
        ├── stack: Array<{ group: string, tools: string[], justification: string }>
        ├── featuresDetailed: Array<{ id: string, name: string, priority: string, description: string, deliverable: string }>
        ├── roadmap: Array<{ id: string, phase: string, title: string, duration: string, detail: string, deliverables: string[], vivaMilestone: string, order: number, tasks: Array<{ id: string, title: string, status: 'TODO'|'IN_PROGRESS'|'COMPLETED', priority: string, estimatedHours: number }> }>
        ├── improvementsDetailed: Array<{ id: string, area: string, suggestion: string, implementationTip: string }>
        └── vivaQuestions: Array<{ question: string, expectedAnswer: string, defenseTip: string }>
```

---

## 6. Rate Limiting & Denial of Service Defense

All resource-intensive AI routes (`/api/projects/generate`, `/api/projects/[id]/improve`, `/api/projects/[id]/blueprint`) are protected by a sliding-window rate limiter (`lib/rate-limit.ts`):
- Generation: 5 requests per 60 seconds per UID/IP.
- Refinement: 8 requests per 60 seconds per UID/IP.
- Returns `HTTP 429 Too Many Requests` with a human-readable retry duration.

---

## 7. Authoritative Server-Side Progress Calculation

Clients cannot arbitrarily submit completion percentages.
When a roadmap task status is modified (`PATCH /api/projects/[id]/roadmap/tasks/[taskId]`):
1. The server updates the task status to `COMPLETED`.
2. Total tasks ($T$) and completed tasks ($C$) are counted across all roadmap phases.
3. $\text{Progress} = \text{round}\left(\frac{C}{T} \times 100\right)\%$.
4. $\text{Viva Readiness Score} = \min\left(100, \text{round}(\text{Progress} \times 0.7 + 28)\right)\%$.
5. The updated metrics and timestamp are persisted in Firestore and returned to the client.

---

## 8. Google Cloud Run Deployment

- `next.config.mjs` configures `output: 'standalone'` to generate a minimal, production-optimized Node.js server bundle.
- Multi-stage `Dockerfile`:
  - Builds Next.js in a separate container layer.
  - Copies only standalone artifacts (`server.js`, `.next/static`, `public`) into a lightweight Alpine image.
  - Runs under an unprivileged system user (`nextjs:nodejs`, UID 1001).
  - Binds to `0.0.0.0` and respects the Cloud Run injected `process.env.PORT`.
