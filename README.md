<div align="center">

# ✦ ProjectSpark — AI-Powered Capstone Architect
### Transforming Student Interests & Skills into Defensible, Production-Grade Engineering Projects

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8e75ff?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Admin_SDK-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vitest](https://img.shields.io/badge/Tests-21_Passed-6e9f18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

<br/>

### 🚀 **[👉 Click Here to Open the Live Application on Railway 👈](https://promptwarsx1.up.railway.app/)**
**Live URL**: [`https://promptwarsx1.up.railway.app`](https://promptwarsx1.up.railway.app/)

**[Problem Statement Traceability](#-problem-statement-traceability)** • **[Tech Stack Matrix](#-comprehensive-technology-stack)** • **[Features Walkthrough](#-deep-dive-features-walkthrough)**

</div>

---

## 🎯 Official Problem Statement
> *"build an AI powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."*

ProjectSpark was built strictly ground-up to solve the capstone crisis: university students often pick unrealistic, copy-pasted, or indefensible projects and fail their terminal evaluations. ProjectSpark provides an end-to-end intelligent bridge that translates raw student skills into structured, achievable, and viva-ready engineering deliverables.

---

## 🛠 Comprehensive Technology Stack

<div align="center">

| Layer | Technologies & Frameworks | Purpose & Architectural Justification |
| :--- | :--- | :--- |
| **Frontend Core** | <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" height="40" alt="Frontend Stack" /><br/>**Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4** | Sub-second hydration, Turbopack incremental builds, server-rendered components (RSC), and high-contrast night/light theme synchronization. |
| **AI Intelligence** | <img src="https://skillicons.dev/icons?i=google" height="40" alt="Google AI" /><br/>**Google Gemini 2.5 Flash (`@google/genai`)** | Real-time multi-project synthesis, prompt injection defense wrappers, structured Zod JSON parsing, and Socratic oral viva examiner coaching. |
| **Auth & Security** | <img src="https://skillicons.dev/icons?i=firebase" height="40" alt="Firebase" /><br/>**Firebase Admin Auth, Cryptographic Bearer Verification** | Server-side token verification (`firebase-admin/auth`), user-isolated Firestore queries (`users/{uid}/projects`), and zero client secret exposure. |
| **Backend & Storage** | <img src="https://skillicons.dev/icons?i=nodejs" height="40" alt="Node" /><br/>**Next.js API Route Handlers, Cloud Firestore, In-Memory Cache** | REST API endpoints, sliding-window rate limiting (`lib/rate-limit.ts`), resilient offline fallback caches, and normalized `{ success, data }` envelopes. |
| **Testing & QA** | <img src="https://skillicons.dev/icons?i=vitest" height="40" alt="Testing" /><br/>**Vitest v5, V8 Coverage Engine, ESLint 9 Flat Config** | 100% automated test pass rate (21/21 unit & integration tests) covering authorization, Zod validation schemas, and mock Gemini SDK responses. |
| **Deployment & Ops** | <img src="https://skillicons.dev/icons?i=docker,gcp" height="40" alt="DevOps" /><br/>**Docker Multi-Stage, Cloud Run Compatible, Railway CI/CD** | Production `Dockerfile` with non-root security execution (`nextjs:nodejs`), minimal standalone footprint, and native `Procfile` deployment. |

</div>

---

## 🏛 System Architecture & Data Flow

```mermaid
graph TD
    User([Student / Evaluator]) -->|HTTPS / Responsive UI| UI[Next.js 16 + React 19 Frontend]
    
    subgraph "Client-Side Security & State"
        UI -->|Theme State & Cache| LocalStorage[(Local Store)]
        UI -->|Bearer Auth Token| ApiClient[lib/api-client.ts]
    end
    
    ApiClient -->|REST API Requests| Gateway[Next.js API Route Handlers]
    
    subgraph "Server-Side Protection Layer"
        Gateway -->|Verify ID Token| AdminAuth[Firebase Admin Auth]
        Gateway -->|Sliding Window 10req/min| RateLimiter[lib/rate-limit.ts]
        Gateway -->|Strict Payload Parse| ZodValidation[lib/validations.ts]
    end
    
    subgraph "Domain Service Layer"
        ZodValidation --> AIService[services/ai-service.ts]
        ZodValidation --> ProjectService[services/project-service.ts]
        ZodValidation --> VivaService[services/viva-service.ts]
        ZodValidation --> RoadmapService[services/roadmap-service.ts]
    end
    
    subgraph "Google Cloud & External Services"
        AIService -->|System Instructions & JSON Schema| Gemini[Google Gemini 2.5 Flash]
        VivaService -->|Socratic Defense Evaluation| Gemini
        ProjectService -->|User-Scoped Queries users/uid/projects| Firestore[(Cloud Firestore)]
    end
    
    Gemini -->|Validated JSON Output| Gateway
    Firestore -->|Encrypted Documents| Gateway
    Gateway -->|Unified JSON Response Envelope| UI
```

---

## ✨ Deep-Dive Features Walkthrough

### 1. 🎓 Interactive Student Profile & Skills Intake (`/generate`)
- **Domain Passion Matrix**: Select across AI Agents, Edge Computer Vision, Clinical BioNLP, Cybersecurity, IoT Microgrids, and DevTools.
- **Granular Skill Intake**: Multi-select languages (Python, TypeScript, C++), frameworks (React, FastAPI), and databases.
- **Academic Boundary Configuration**: Configure target timelines (Fast-track 4–6 weeks, Standard Semester 10–12 weeks, or Full-Year) and team sizing (Solo Builder vs 4-member Team).

### 2. ⚡ AI-Powered Tailored Ideas Engine (`/generate/results`)
- **Structured Multi-Idea Synthesis**: Powered by Google Gemini 2.5 Flash with strict Zod parsing.
- **Match Rationale**: Transparent, algorithmic "Why this matches you" explanations showing how the project directly utilizes the student's existing skills while introducing high-impact stretch concepts.

### 3. 🏛 Comprehensive Capstone Blueprint (`/generate/results/[slug]`)
- **Features Guidance (P0 vs P1)**:
  - **P0 (Core Viva MVP)**: The non-negotiable functional core required to pass the academic board.
  - **P1 (Advanced Distinction)**: Stretch microservices and optimizations that secure top grades.
- **Technologies Guidance & Visual Dataflow Pipeline**:
  - Architectural justifications for every layer: Frontend, API, Edge Models, and Persistence.
  - **Live Flow Diagram**: An interactive visual flowchart rendering the end-to-end dataflow pipeline from client input to database commit.
- **4-Phase Development Roadmap**:
  - Interactive milestone checkboxes aligned with University Semester reviews (Phase 1: Foundation ➔ Phase 2: Core Algorithm ➔ Phase 3: Hardening ➔ Phase 4: Viva Prep).
- **Practical Hardening & Scope Refinement**:
  - Real-world production advice on Scalability, Security, Edge-Case Resilience, and Academic Rigor.
  - **Gemini AI Refinement Assistant**: Type a live request (e.g., *"Make it simpler for a 6-week timeline"* or *"Add offline sync"*), and Gemini dynamically refactors the architecture!

### 4. 🤖 Socratic AI "Viva Defense Examiner" (`components/blueprint/BlueprintVivaKit.tsx`)
- **Simulate Oral Viva Examination**: Students click *"Practice Answering this to AI Examiner"* on realistic viva questions.
- **Instant AI Scoring & Feedback**: Gemini evaluates the oral response, awards an academic score (0–100) and grade (`Distinction`, `Pass`, `Needs Improvement`), pinpoints technical strengths, highlights missing benchmarks, and fires a probing follow-up challenge.

### 5. 📥 1-Click University Exports & Starter Scaffold
- **Download Capstone Synopsis (.md)**: Generates a university-ready markdown document detailing the problem context, feature specs, tech stack justifications, milestones, and viva kit.
- **Download Starter Scaffold (.txt / .zip boilerplate)**: Automatically exports setup scripts, virtual environment commands, `main.py` / `index.ts` entrypoints, and library manifests tailored to the project's recommended stack.

### 6. 📊 Real-Time Student Command Center (`/dashboard`)
- **Academic Defense Readiness Dial**: A live visual dial that dynamically recalculates defense readiness percentage as milestone deliverables are checked off.
- **Defense Checklist**: Real-time validation verifying that problem boundaries, layered stacks, and benchmarking criteria have been satisfied.

---

## 🔒 Production Security & Hardening

1. **Authentication Boundary Enforcement**:
   - Every protected API endpoint enforces `Authorization: Bearer <token>` verified via `firebase-admin/auth`.
   - Dedicated 1-click Demo session authentication for frictionless zero-barrier evaluator testing.
2. **Strict Zod Input Validation**:
   - Zero raw `request.json()` trust. All bodies, IDs, and query parameters are strictly validated using comprehensive schemas (`lib/validations.ts`, `lib/viva-validation.ts`).
3. **Prompt Injection & AI Sanitization**:
   - System instructions force Gemini to return strictly valid JSON schemas and strip execution vectors.
4. **Sliding-Window Rate Limiting**:
   - High-compute Gemini generation endpoints are throttled via in-memory sliding-window limiters (`lib/rate-limit.ts`) to prevent API abuse.
5. **HTTP Security Headers**:
   - Built into `next.config.mjs`:
     - `X-Frame-Options: DENY`
     - `X-Content-Type-Options: nosniff`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 🧪 Automated Testing Suite (100% Passing)

The project includes an automated Vitest test suite with **21 tests across 7 test files**:

```bash
# Run automated tests
npm test

# Run tests with V8 coverage report
npm run test:coverage
```

### Verified Test Suite Breakdown:
- `tests/auth.test.ts` — Bearer token extraction, missing header 401 handling, demo user session.
- `tests/authorization-and-db.test.ts` — User-isolated queries, 404 boundaries, and store mutations.
- `tests/gemini.test.ts` — JSON markdown extraction and parsing resilience.
- `tests/profile.test.ts` — Student skills profile defaults and updates.
- `tests/roadmap.test.ts` — Task state transitions and dynamic viva readiness recalculations.
- `tests/validation.test.ts` — Zod boundaries, payload length validation, and viva schemas.
- `tests/viva.test.ts` — Live Socratic oral defense grading and feedback parsing.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 20+ installed
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/shreyanshio/PromptwarsX-1.git
cd PromptwarsX-1
npm install
```

### 2. Environment Configuration
Copy the provided `.env.example` template:
```bash
cp .env.example .env.local
```

Populate the required environment variables:
```bash
# Google Gemini API (https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# Firebase Admin SDK (Server Only)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Public Client SDK (Browser Safe)
NEXT_PUBLIC_FIREBASE_API_KEY=your_public_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

*(Note: If Firebase credentials are not supplied during local review, ProjectSpark gracefully activates its in-memory fallback store and pre-configured demo account so all features remain 100% functional!)*

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🐳 Docker & Google Cloud Run Deployment

ProjectSpark is containerized with a production multi-stage `Dockerfile` optimizing build cache and running on an unprivileged `nextjs` user:

```bash
# 1. Build the Docker container
docker build -t projectspark-app .

# 2. Run container locally
docker run -p 3000:3000 --env-file .env.local projectspark-app

# 3. Deploy to Google Cloud Run
gcloud run deploy projectspark \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📋 Problem Statement Traceability Matrix

| Requirement Clause | Implemented Feature | Primary Source File | Test Verification |
| :--- | :--- | :--- | :--- |
| **Interests & Skills** | 4-Step Capstone Intake Matrix with dynamic domain chips | `app/generate/page.tsx` | `tests/profile.test.ts` |
| **Generate Ideas** | Tailored recommendations with match rationales via Gemini | `app/api/projects/generate/route.ts` | `tests/gemini.test.ts` |
| **Features Guidance** | Core Viva MVP (P0) vs Distinction (P1) toggle & deliverables | `components/blueprint/BlueprintFeatures.tsx` | `tests/validation.test.ts` |
| **Technologies Guidance** | Layered full-stack stack with justifications & visual dataflow | `components/blueprint/BlueprintStack.tsx` | `tests/authorization-and-db.test.ts` |
| **Development Steps** | 4-Phase milestone roadmap & interactive progress tracker | `components/blueprint/BlueprintRoadmap.tsx` | `tests/roadmap.test.ts` |
| **Improvements** | Hardening matrix, Gemini AI scope refiner, and AI viva examiner | `components/blueprint/BlueprintImprovements.tsx` | `tests/viva.test.ts` |

---

## 🌟 Support & Feedback

If you find **ProjectSpark** helpful or inspiring, please consider **starring ⭐ the repository**!

[![Star on GitHub](https://img.shields.io/github/stars/shreyanshio/PromptwarsX-1?style=social)](https://github.com/shreyanshio/PromptwarsX-1)

---

<div align="center">

### 👨‍💻 Built & Engineered with ❤️ by **Shreyansh**
**PromptWars × Parul University — Department of CSE AIML**

*Empowering the next generation of software engineers to build and defend extraordinary capstones.*

<br/>

[![Live Deployment](https://img.shields.io/badge/🌐_Visit_Live_App-promptwarsx1.up.railway.app-10b981?style=for-the-badge)](https://promptwarsx1.up.railway.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-PromptwarsX--1-181717?style=for-the-badge&logo=github)](https://github.com/shreyanshio/PromptwarsX-1)

</div>

