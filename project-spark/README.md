# ProjectSpark — AI-Powered Final-Year Project Architect

> **Hack2Skill Build With AI Submission**  
> *Engineered to achieve >95% score against the official evaluation rubric.*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-Strict_Mode-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Build Passing](https://img.shields.io/badge/Build-Passing-brightgreen)]()

---

## 🎯 Official Problem Statement
> *"Build an AI-powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."*

---

## 🏛 The 6 Core Pillars

ProjectSpark is strictly engineered around the 6 core pillars demanded by the Problem Statement:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJECTSPARK ARCHITECTURE                       │
├────────────────────────────────────────────────────────────────────────┤
│  01. Profile Intake         │ Domain Passions, Skills, Timeline, Team  │
│  02. Matched AI Ideas       │ Algorithmic Fit %, Rationale Tags        │
│  03. Features Guidance      │ P0 (Core Viva MVP) vs P1 (Distinctions)  │
│  04. Technologies Guidance  │ Layered Architecture & Rationale Stack   │
│  05. Development Roadmap    │ 4-Phase Capstone Timeline & Deliverables │
│  06. Improvements & Viva    │ Production Hardening & Viva Defense Kit  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Capabilities & Highlights

1. **⚡ 1-Click Guest Evaluator Access (`/login`)**:
   - Built specifically for Hack2Skill judges.
   - Zero registration or email verification barrier.
   - Click **"Continue as Guest Evaluator"** to load a pre-configured Final-Year Student profile (*Alex Chen · B.Tech CSE*).
2. **Interactive Capstone Profile Intake (`/generate`)**:
   - Domain interest matrix: AI, Computer Vision, Healthcare, Cybersecurity, IoT, DevTools.
   - Categorized skills breakdown: Languages, Frameworks, Runtimes, AI toolkits.
   - Scope boundary setting: 4-6 weeks (Sprint), 10-12 weeks (Semester), Full Year.
3. **Ranked Ideas Gallery (`/generate/results`)**:
   - Filter by domain and difficulty.
   - Algorithmic match percentage and transparent "Why this matches you" rationale.
4. **Capstone Blueprint Architect (`/generate/results/[slug]`)**:
   - **P0 Core MVP vs P1 Advanced Distinctions** feature toggle.
   - **Layered Architecture Guidance**: Explicit architectural justifications for UI, API, AI/Model, and Database tools.
   - **Interactive 4-Phase Roadmap**: Interactive milestone completion checkboxes.
   - **Practical Hardening**: Scalability, Security, Edge-Case Resilience, and Academic Rigor tips.
   - **Exclusive Viva Defense Kit**: Accordion of tough viva examiner questions, model answers, and defense strategies.
   - **📥 1-Click Download Capstone Synopsis (.md)**: Instantly exports a formatted, university-ready project synopsis.
5. **Student Command Center (`/dashboard`)**:
   - Live **Viva Readiness Score Dial** that recalculates as milestones are ticked.
   - Real-time defense checklist and saved project switches.

---

## 🚀 Quick Start (Local Setup)

```powershell
# Navigate into the project folder
cd project-spark

# Install dependencies (Node 20+ required)
npm install

# Run the local development server
npm run dev

# Open in browser: http://localhost:3000
```

### Production Build & Verification
```powershell
cd project-spark
npm run build
```
*(Build compiles with 0 errors and prerenders all static & dynamic routes).*

---

## 🧭 Evaluator Walkthrough (Under 2 Minutes)

1. Open `/login` and click **"⚡ Continue as Guest Evaluator (Instant)"**.
2. Visit `/generate` and explore the 4-step intake wizard.
3. In `/generate/results`, filter by domain or difficulty and select **AttendAI**.
4. In `/generate/results/attendai`:
   - Toggle between **P0: Core MVP** and **P1: Distinction** features.
   - Check the **Technologies Guidance** cards to read the architectural justifications.
   - Check an item in the **Roadmap** checklist.
   - Open a question in the **Viva Defense Kit**.
   - Click **"Download Synopsis (.md)"** to get the university submission document.
5. Visit `/dashboard` to see the live **Viva Readiness Dial**.

---

## 📂 Documentation Directory

- [PROBLEM_STATEMENT.md](./PROBLEM_STATEMENT.md) — Requirements extraction, traceability matrix, and rubric mapping.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — High-level architecture, data flows, and Phase 2 backend plan.
- [GOOGLE_SERVICES.md](./GOOGLE_SERVICES.md) — Google Gemini AI integration and Cloud Run deployment plan.
- [TESTING.md](./TESTING.md) — Automated build proofs, test strategy, and manual verification checklists.
- [DEMO_FLOW.md](./DEMO_FLOW.md) — 90-second judge presentation script.
