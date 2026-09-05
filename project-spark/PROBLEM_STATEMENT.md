# PROBLEM STATEMENT ANALYSIS & SPECIFICATION

**Event**: Hack2Skill Build With AI  
**Project Name**: ProjectSpark (AI-Powered Final-Year Project Architect)  
**Target Score Goal**: > 95% in Evaluation Rubric  

---

## 1. Problem Summary

Final-year undergraduate and graduate engineering students struggle with their capstone project lifecycle. The selection phase is fraught with generic, outdated ideas (e.g., standard e-commerce clones, trivial CRUD apps) that fail academic evaluation, or overambitious ideas that cannot be finished within one or two semesters. Even when students possess specific skills or genuine domain interests, they lack the architectural guidance to translate raw concepts into defensible, industry-relevant, practical implementations.

**Official Problem Statement**:
> *"Build an AI-powered platform that helps final-year students to generate project ideas based on their interests and skills that provide guidance on features, technologies, development steps, and improvements to turn the idea into a practical project."*

---

## 2. Target Users

1. **Final-Year Engineering Students (Primary)**:
   - Solo developers or capstone project teams (2–4 members).
   - Have mixed skill levels (e.g., knows Python & basic web, wants to learn Generative AI or Computer Vision).
   - Facing imminent submission deadlines, synopsis approvals, and external viva defenses.
2. **Academic Evaluators / Project Mentors (Secondary)**:
   - Demand technical depth, clear system boundaries, realistic timelines, and defensible architectures.
3. **Engineering Faculty & Review Committees**:
   - Assess novelty, feasibility, practical implementation rigor, and clear deliverables.

---

## 3. Core Pain Points

| Pain Point | Student Reality | Platform Solution |
| :--- | :--- | :--- |
| **Blank Canvas Paralysis** | "I know MERN/Python, but don't know what to build that looks novel." | Tailored idea generation based on fine-grained interest + skill tagging. |
| **Scope Mismatch** | Underestimating AI or over-scoping full production systems within 12 weeks. | Feasible scope boundary: Semester-ready MVP + incremental phases. |
| **Tech Stack Confusion** | Incompatible or obsolete stack choices chosen at random. | Cohesive, modern stack recommendations matched to actual student capability. |
| **Execution Void** | Knowing *what* to build, but stalling on *how* to start and structure iterations. | Week-by-week / Phase-by-phase build roadmap with milestones and viva defense tips. |
| **Superficial Projects** | Projects that look like beginner tutorials with no academic or real-world rigor. | "Ways to push it further": Concrete architectural improvements (security, edge cases, benchmarks). |

---

## 4. The 6 Core Pillars (Functional Requirements)

Per the official Problem Statement, the platform must deliver 6 non-negotiable functional pillars:

1. **Pillar 1: Student Profile Intake (Interests & Skills)**
   - Capture domain interests (e.g., Healthcare, FinTech, Autonomous Systems, EdTech, ClimateTech).
   - Capture verified technical skills (e.g., React, Python, Flutter, Go, PyTorch, SQL) and proficiency level.
   - Capture constraints (timeline: 1–6 months; team format: Solo vs Team; target viva focus: Research vs Applied Engineering).

2. **Pillar 2: AI Project Idea Generation**
   - Synthesize novel, non-trivial capstone concepts directly mapped to the student's specific profile.
   - Provide match confidence scoring (%) with transparent rationale of *why* it matches.
   - Support both instant discovery (preset curated gallery) and custom AI prompt/generation mode.

3. **Pillar 3: Feature Architecture Guidance**
   - Structured decomposition of features into **P0: Core Viva MVP** (must-have for passing review) and **P1: Advanced Capabilities** (differentiators for top grades).
   - Clear input/output definitions for each feature.

4. **Pillar 4: Modern Technology Stack Recommendations**
   - Prescriptive, layered stack breakdown:
     - Frontend layer
     - Backend & API layer
     - AI/ML & Pipeline layer
     - Database & Storage layer
     - DevOps & Deployment layer
   - Clear justification for why each technology was chosen based on the student's indicated skills.

5. **Pillar 5: Practical Phase-by-Phase Development Steps**
   - Realistic 4-Phase Capstone Roadmap:
     - **Phase 1: Architecture & Foundations** (Schema, boilerplate, API contracts)
     - **Phase 2: Core Processing Engine** (Business logic, AI pipelines, models)
     - **Phase 3: Interactive Interface & Dashboard** (User flows, analytics, exports)
     - **Phase 4: Hardening, Testing & Viva Defense** (Security, benchmark tests, live demo script)

6. **Pillar 6: Practical Improvements & Industry-Readiness**
   - Concrete production upgrades:
     - Edge-case resilience (offline caching, rate limiting, fallbacks)
     - Enterprise security (data sanitization, RBAC, encrypted tokens)
     - Measurable benchmarking (latency, accuracy metrics, evaluation rubrics)
     - Viva defense talking points and examiner question prep.

---

## 5. Non-Functional Requirements

- **Instant Evaluation Access**: Zero-friction 1-Click Guest Mode bypassing mandatory OAuth/Email barriers for hackathon evaluators.
- **Visual Polish & Fluid Motion**: High-grade micro-interactions, spring physics, smooth transitions using CSS animations and React state transitions.
- **Responsiveness**: Pixel-perfect usability across mobile (375px+), tablet, and desktop (1440px+).
- **Performance**: Near-instant initial page render, sub-100ms UI response times, zero layout shifts.
- **Accessibility (a11y)**: WCAG 2.1 AA compliance, visible focus rings, aria labels, screen-reader semantic landmarks.
- **Exportability**: Ability to export the complete Project Blueprint (Features, Stack, Roadmap, Viva Prep) as structured Markdown/PDF for student submission.

---

## 6. AI & Technology Mapping

- **Platform Framework**: Next.js 16 (App Router), React 19, TypeScript (strict mode).
- **Styling & Design System**: Tailwind CSS v4, custom design tokens (Warm Amber, Deep Ink, Cool Fog, Technical Indigo), Lucide React.
- **Motion & Interactions**: CSS keyframes, spring physics, interactive stateful UI widgets.
- **AI Core (Google Gemini 1.5 / 2.0 Integration)**:
  - Generates bespoke project blueprints using structured JSON schema.
  - Multi-shot prompt engineering specifically calibrated against university project guidelines.
  - Fallback offline caching / intelligent mock matrix to guarantee 100% demo reliability under flaky hackathon network conditions.

---

## 7. Requirements Traceability Matrix

| Pillar / Requirement | Feature | Implementation | Route / File | Test Verification | Demo Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frictionless Entry** | Animated Auth & Guest Access | Animated Glassmorphism Auth Card + 1-Click Guest Bypass | `/login` (`app/login/page.tsx`) | Form validation + guest bypass state test | Seamless guest entry in under 2 seconds |
| **Pillar 1: Intake** | Interactive Interest & Skill Matrix | Multi-step interactive wizard with skill chips & domain tags | `/generate` (`app/generate/page.tsx`) | State persistence + validation test | Custom profile selection live walkthrough |
| **Pillar 2: Ideas** | Matched Idea Generation | Real-time generator + ranked fit algorithm with match score | `/generate/results` (`app/generate/results/page.tsx`) | Match ranking & filter verification | Score cards showing tailored fit % |
| **Pillar 3: Features** | MVP vs Advanced Feature Breakdown | Interactive checklist with difficulty badges & viva priority | `/generate/results/[slug]` | Component render test with mock/live data | Expandable feature architecture tree |
| **Pillar 4: Tech Stack** | Layered Stack Prescriptions | Grouped stack cards with skill compatibility justification | `/generate/results/[slug]` | Tech badge completeness test | Interactive tech stack inspector |
| **Pillar 5: Roadmap** | Phase-by-Phase Build Roadmap | Visual milestone timeline with progress tracker & deliverables | `/generate/results/[slug]`, `/dashboard` | Phase progression logic test | Interactive milestone completion checklist |
| **Pillar 6: Improvements** | Practical Upgrades & Viva Defense | Viva defense simulator, edge case hardening, security guidelines | `/generate/results/[slug]` | Content completeness test | Viva preparation & architectural improvements panel |
| **Export / Artifact** | Project Blueprint Download | Structured Markdown / PDF generation for project submission | `/generate/results/[slug]` | Export file generation test | 1-Click download of university synopsis |

---

## 8. Evaluation Criteria Mapping (Targeting 95%+)

| Evaluation Dimension | Weight | Our Strategy for 95%+ Score |
| :--- | :--- | :--- |
| **Alignment with Problem Statement** | 25% | Exact 1:1 match with all 6 pillars; zero unrelated bloat. |
| **Technical Execution & Architecture** | 20% | Clean Next.js 16 + React 19 + TypeScript strict mode, reusable components, typed interfaces. |
| **AI Integration Depth** | 20% | Meaningful prompt chaining, structured schema generation, real-time tailoring. |
| **UX / UI Polish & Accessibility** | 15% | Custom animated login with guest mode, cohesive typography, responsive, fluid micro-interactions. |
| **Innovation & Completeness** | 10% | Viva Defense Kit, instant synopsis generator, live phase progress tracker. |
| **Demo Readiness & Documentation** | 10% | Zero-login barrier for judges, comprehensive documentation, reproducible setup. |
