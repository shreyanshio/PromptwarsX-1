# BACKEND AUDIT — PROJECTSPARK / PROJECTPILOT AI

**Date**: September 2026  
**Auditor**: Senior Backend, AI, Security, Database & Cloud Engineer  
**Repository**: `PromptwarsX-1` / `project-spark`  
**Problem Statement**: *"Build an AI-powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."*

---

## 1. Executive Summary

ProjectSpark possesses a responsive, accessible, high-contrast Next.js 16 (App Router) frontend with rich UI components covering intake, blueprints, roadmaps, viva defense prep, and student dashboards. However, **the backend layer was previously non-existent**:
- There are **0 API routes** under `app/api`.
- There is **no persistent database** (Firestore or SQL) configured or running.
- There is **no live Google Gemini integration** (mock data in `lib/ideas.ts` served as a client-side placeholder).
- Authentication is currently **purely simulated in `localStorage`** (`lib/auth.ts`) without cryptographic token verification or Firebase session handling.
- There is **no Dockerfile** or production container configuration for Google Cloud Run.

To turn this into a production-grade, defensible capstone platform that meets 100% of the Problem Statement and backend criteria, we must build a clean, resilient backend that interfaces seamlessly with the existing frontend.

---

## 2. Current Architecture & Codebase Inspection

| Area | Current State | Deficiencies / Findings |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.3 (Turbopack, React 19, TypeScript 5.7) | High-performance modern stack, but `next.config.mjs` lacks `output: 'standalone'` for Cloud Run Docker builds. |
| **API Layer** | None (`app/api` directory does not exist) | No REST or Server Action endpoints for generation, saving, blueprints, improvements, or roadmaps. |
| **Database** | None (`localStorage` only) | User profiles, intake criteria, and saved ideas vanish if cache is cleared or on different devices. No server-side persistence. |
| **AI Integration** | None (Static catalog in `lib/ideas.ts`) | No live Gemini API calls. No structured output generation via `@google/genai`. |
| **Authentication** | Simulated (`lib/auth.ts` reading `localStorage`) | No Firebase Auth SDK on client or Firebase Admin SDK on server. No JWT verification or authorization checks. |
| **Input Validation** | None | No Zod schemas or request body validation on server. |
| **Security & Rate Limiting** | None | No API rate-limiting, no HTTP security headers configured in `next.config.mjs`. |
| **Docker / Cloud Run** | No Dockerfile, `.dockerignore`, or Cloud Run config | Cannot be deployed to Google Cloud Run as a containerized service. |
| **Testing** | None | No backend unit or integration test suite configured. |

---

## 3. Data Structure & Schema Analysis

### Existing Frontend Data Structures (`lib/ideas.ts`)
- **`Idea`**:
  - `slug`, `title`, `tagline`, `category`, `domain`, `accent`, `matchReason`, `difficulty`, `estimatedWeeks`, `targetOutcome`, `requiredSkills`, `interests`, `overview`, `problemContext`.
  - `stack`: Array of `{ group, tools, justification }`.
  - `featuresDetailed`: Array of `{ name, priority: 'P0 (Core MVP)' | 'P1 (Advanced Distinction)', description, deliverable }`.
  - `roadmap`: Array of `{ phase, title, duration, detail, deliverables, vivaMilestone }`.
  - `improvementsDetailed`: Array of `{ area: 'Scalability' | 'Security & Privacy' | 'Edge Case Resilience' | 'Academic Rigor', suggestion, implementationTip }`.
  - `vivaQuestions`: Array of `{ question, expectedAnswer, defenseTip }`.

### Target Firestore Data Model
To ensure strong user isolation, ownership boundaries, and predictable queries:
```
users/{uid}
  ├── profile: { name, email, college, course, year, interests, skills, preferredDomains, experienceLevel, createdAt, updatedAt }
  └── projects/{projectId}
        ├── { id, title, slug, tagline, category, domain, difficulty, estimatedWeeks, targetOutcome, overview, problemContext, saved, status, createdAt, updatedAt }
        ├── stack: [{ group, tools, justification }]
        ├── featuresDetailed: [{ id, name, priority, description, deliverable, difficulty, estimatedEffort }]
        ├── roadmap: [{ id, phase, title, duration, detail, deliverables, vivaMilestone, order, tasks: [{ id, title, description, status, priority, estimatedHours }] }]
        ├── improvements: [{ id, area, suggestion, implementationTip, createdAt }]
        └── vivaQuestions: [{ question, expectedAnswer, defenseTip }]
```

---

## 4. Security Weaknesses & Threats

1. **Authentication Bypass Risk**:
   - Currently, client sets arbitrary user objects in `localStorage`.
   - **Remediation**: Require `Authorization: Bearer <Firebase_ID_Token>` for all mutating/private endpoints. Verify tokens server-side using `firebase-admin`.

2. **Insecure Direct Object Reference (IDOR)**:
   - Without ownership validation, any user could modify or view another student's projects.
   - **Remediation**: Nest or query projects strictly under `users/{uid}/projects/{projectId}`. Compare verified token `uid` with resource owner before read/write.

3. **Prompt Injection & Unsafe AI Generation**:
   - Students can supply custom constraints or improvement prompts.
   - **Remediation**: Isolate user input with explicit delimiters (`<<<USER_INPUT>>>`). Separate system developer prompts from user data. Mandate JSON schema responses via Gemini SDK.

4. **Resource Exhaustion & Denial of Service**:
   - Calling Gemini repeatedly costs API quota and compute.
   - **Remediation**: Implement IP & UID-based sliding-window rate limiters on all generation and improvement endpoints (`429 Too Many Requests`).

5. **Secret Exposure**:
   - **Remediation**: Store `GEMINI_API_KEY`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` strictly server-side in `.env.local`. Ensure `.gitignore` blocks `.env`, `.env.local`, and service account files.

---

## 5. Frontend / Backend Mismatches & Integration Plan

1. **Intake Flow (`/generate`)**:
   - Currently: Saves to `localStorage` and routes to `/generate/results`.
   - Target: Sends `POST /api/projects/generate` with student's profile and constraints, receives Gemini-generated `Idea` structures validated by Zod, stores in Firestore, and populates results.
   - UX Continuity: Keep the existing 4-step wizard UI identical; add a smooth AI generation progress loader.

2. **Results & Catalog (`/generate/results`)**:
   - Currently: Displays static `ideas` array from `lib/ideas.ts`.
   - Target: Fetches user-generated projects from `GET /api/projects`, supplemented with curated sparks. "Save" button triggers `POST /api/projects/[id]/save`.

3. **Blueprint Details (`/generate/results/[slug]`)**:
   - Currently: Renders static `getIdea(slug)`.
   - Target: Looks up project by ID/slug from Firestore or curated fallback. Adds dynamic AI project improvement via `POST /api/projects/[id]/improve` and milestone tracking via `PATCH /api/projects/[id]/roadmap/tasks/[taskId]`.

4. **Student Dashboard (`/dashboard`)**:
   - Currently: Renders static AttendAI milestone tracker.
   - Target: Fetches active project from `GET /api/projects`, computes live progress based on verified completed tasks, and updates defense score.

5. **Authentication (`/login`)**:
   - Provide Firebase Auth client integration with:
     - Email/Password sign in & registration
     - 1-Click Demo / Guest Account (generating a valid anonymous/custom Firebase session so the demo experience communicates with real authenticated APIs!).

---

## 6. Recommended Implementation Order

1. **Dependencies & Environment Setup**:
   - Install `@google/genai` (or `@google/generative-ai`), `firebase`, `firebase-admin`, `zod`, `vitest` (for tests).
   - Create `.env.example` documenting all configuration keys.
2. **Core Server Utilities & Middleware**:
   - `lib/errors.ts`: Standardized error codes & HTTP response builder.
   - `lib/api-response.ts`: Typed success & error envelopes `{ success, data/error }`.
   - `lib/rate-limit.ts`: Sliding-window memory rate limiter for Cloud Run.
   - `lib/validations.ts`: Zod schemas for intake, projects, blueprints, roadmaps, and profiles.
   - `lib/firebase-admin.ts`: Singleton Firebase Admin initialization & ID token verifier.
   - `lib/auth-server.ts`: Reusable `requireAuth(request)` helper.
3. **AI Service Architecture (`lib/gemini.ts` & `services/ai-service.ts`)**:
   - Centralized Gemini client with structured JSON output enforcement.
   - Prompt builders with anti-injection boundaries for generation, blueprint expansion, and project improvements.
4. **Business Services**:
   - `services/project-service.ts`: Project CRUD, Firestore queries, and ownership enforcement.
   - `services/roadmap-service.ts`: Task status transitions, server-side progress recalculation.
   - `services/profile-service.ts`: Student profile persistence.
5. **REST API Route Handlers**:
   - `app/api/profile/route.ts` (GET, PUT)
   - `app/api/projects/route.ts` (GET)
   - `app/api/projects/generate/route.ts` (POST)
   - `app/api/projects/[id]/route.ts` (GET, PATCH)
   - `app/api/projects/[id]/save/route.ts` (POST)
   - `app/api/projects/[id]/blueprint/route.ts` (POST)
   - `app/api/projects/[id]/improve/route.ts` (POST)
   - `app/api/projects/[id]/roadmap/route.ts` (GET, POST)
   - `app/api/projects/[id]/roadmap/tasks/[taskId]/route.ts` (PATCH)
   - `app/api/auth/demo-session/route.ts` (POST for 1-click Demo)
6. **Frontend Integration (`lib/api-client.ts` & component wiring)**:
   - Centralized API client with automatic token attachment.
   - Wire `/login`, `/generate`, `/generate/results`, `/generate/results/[slug]`, and `/dashboard`.
7. **Containerization & Cloud Run**:
   - Multi-stage `Dockerfile`, `.dockerignore`, `next.config.mjs` standalone output, port handling.
8. **Automated Testing & Security Verification**:
   - Unit tests covering auth, validation, authorization, mock Gemini, and roadmap progress.
   - Security verification (IDOR, prompt injection, secret leaks, rate limits).
9. **Final Documentation & Reporting**:
   - `BACKEND_ARCHITECTURE.md`, `API.md`, `BACKEND_FINAL_REPORT.md`.
