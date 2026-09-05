# Final Engineering Report (ProjectSpark)

## 1. Repository Architecture
The application is architected with a strict 4-layer separation of concerns in Next.js 16 (React 19, TypeScript strict mode):
1. **Client / UI Layer** (`app/`, `components/`): UI presentation with modular feature components (`components/blueprint/`, `components/dashboard/`). Preserves exact original v0 visual identity, glassmorphism, responsive styles, and night/light modes.
2. **API Layer** (`app/api/`): HTTP endpoints enforcing Bearer token verification, Zod input validation, sliding-window rate limiting, and normalized JSON responses `{ success: true, data }`.
3. **Domain Service Layer** (`services/`):
   - `ai-service.ts`: Gemini 2.5 Flash orchestration with structured JSON schemas and prompt injection defenses.
   - `project-service.ts`: User-scoped Firestore queries (`users/{uid}/projects/{projectId}`).
   - `roadmap-service.ts`: Milestone progress and task status updates.
   - `profile-service.ts`: Student skills and domain interests profile management.
4. **Platform & SDK Layer** (`lib/`):
   - `gemini.ts`: Centralized Google GenAI client.
   - `firebase-admin.ts` & `auth-server.ts`: Server-side token verification and Firestore instances.
   - `validations.ts`: Comprehensive Zod schemas.

## 2. Major Changes & Stabilization
- Restructured repository to root level for seamless zero-config deployment on Railway & Google Cloud Run.
- Modularized complex components (`BlueprintView.tsx`, `DashboardPage.tsx`) into subcomponents under 150 lines.
- Configured ESLint 9 flat configuration (`eslint.config.mjs`) passing with 0 errors across the codebase.
- Configured Vitest test coverage reporting (`@vitest/coverage-v8`).
- Maintained 100% test pass rate (19/19 tests) with mock external services.

## 3. Problem Statement Traceability
The exact Problem Statement is:
*"build an AI powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."*

- **Interests & Skills**: 4-step intake matrix (`app/generate/page.tsx`).
- **Generate Ideas**: Tailored recommendation engine powered by Google Gemini 2.5 Flash (`app/api/projects/generate`).
- **Features Guidance**: Toggle between Core MVP (P0) and Distinction (P1) features with deliverables.
- **Technologies Guidance**: Layered stack with architectural justifications for UI, API, AI runtime, and DB.
- **Development Steps**: 4-phase milestone timeline aligned with academic reviews.
- **Improvements**: Hardening suggestions and Gemini AI scope refinement assistant.

## 4. Google & Firebase Services Used
- **Google Gemini 2.5 Flash** (`@google/genai`): Real structured capstone synthesis and dynamic scope refinement.
- **Firebase Auth** (`firebase-admin/auth`): Cryptographic token verification on all protected endpoints.
- **Cloud Firestore** (`firebase-admin/firestore`): Scoped user documents with data isolation.

## 5. Security Improvements
- HTTP security headers in `next.config.mjs` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
- Sliding-window rate limiter on AI and mutation endpoints.
- Zero client leakage of server secrets (Firebase Admin private key and Gemini key remain server-side).

## 6. Verification Results
- **TypeScript Typecheck** (`npx.cmd tsc --noEmit`): Exit code 0, 0 errors.
- **Lint Check** (`npm.cmd run lint`): Exit code 0, 0 errors.
- **Test Suite & Coverage** (`npm.cmd run test:coverage`): 6 test files, 19 tests passed (100%).
- **Production Build** (`npm.cmd run build`): Exit code 0, all 17 routes compiled and prerendered successfully.
