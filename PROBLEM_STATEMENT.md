# Problem Statement & Traceability Matrix (Phase 1)

## Official Problem Statement
> **"build an AI powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."**

## Comprehensive Traceability Matrix

| Requirement from Problem Statement | Engineering Interpretation | Implemented Feature | Frontend UI File | Backend API Route | Google / Firebase Service | Automated Vitest Test |
|---|---|---|---|---|---|---|
| **1. Interests & Skills Intake** | Capture student technical competencies, preferred domains, timeline, and team size | 4-Step Capstone Intake Wizard with dynamic chips | `app/generate/page.tsx` | `POST /api/profile` | Firestore `users/{uid}` profile | `tests/profile.test.ts` |
| **2. Generate Project Ideas** | AI-driven synthesis of personalized, defensible capstone architectures | Tailored Ideas Generator with transparent match rationale | `app/generate/results/page.tsx` | `POST /api/projects/generate` | Google Gemini 2.5 Flash (`@google/genai`) | `tests/gemini.test.ts` |
| **3. Features Guidance** | Explicit division between minimum passing criteria and top-tier distinction features | Core Viva MVP (P0) vs Distinction (P1) toggle | `components/BlueprintView.tsx` | `GET /api/projects/[id]/blueprint` | Firestore Project Doc | `tests/authorization-and-db.test.ts` |
| **4. Technologies Guidance** | Layered full-stack recommendations with clear academic and architectural justifications | Architecture justification cards (UI, API, AI runtime, Database) | `components/BlueprintView.tsx` | `GET /api/projects/[id]` | Gemini Architecture Generation | `tests/gemini.test.ts` |
| **5. Development Steps** | 4-Phase milestone timeline aligned with university semester reviews | Interactive milestone checklist & completion tracker | `app/dashboard/page.tsx` & `components/BlueprintView.tsx` | `PUT /api/projects/[id]/roadmap/tasks/[taskId]` | Firestore Tasks Update | `tests/roadmap.test.ts` |
| **6. Improvements & Practicality** | Production hardening recommendations and real-time AI scope adjustments | Practical hardening matrix & Gemini AI Refine Assistant | `components/BlueprintView.tsx` | `POST /api/projects/[id]/improve` | Google Gemini 2.5 Flash Refiner | `tests/gemini.test.ts` |

## Viva Defense Readiness & University Export
- **Academic Readiness Dial**: Real-time evaluation score dynamically computed from milestone completion percentages.
- **1-Click Capstone Synopsis Export**: Generates university-ready Markdown synopsis including problem statement, features, stack, and examiner defense strategies.
