# GOOGLE & AI SERVICES INTEGRATION

**Event**: Hack2Skill Build With AI  
**Project**: ProjectSpark — AI-Powered Final-Year Project Architect  

---

## 1. Google Technology Mapping

| Service / Tool | Purpose in Project | Data Flow | Architectural Justification |
| :--- | :--- | :--- | :--- |
| **Google Gemini 1.5 / 2.0 Flash** | Capstone idea synthesis & viva question generation | Student Interests & Skills → Structured JSON Prompt → 6-Pillar Blueprint | 1M+ token context window and sub-second latency enables multi-modal ingestion of university syllabi and instant blueprint synthesis. |
| **Cloud Run (Deployment Ready)** | Serverless container hosting | Docker Container → HTTP/2 / HTTPS traffic → Next.js App Router | Provides zero-cold-start autoscaling, cost efficiency for hackathon demos, and non-root secure container execution. |
| **Firebase Auth (Optional / Phase 2)** | Multi-provider student authentication | OAuth (Google / GitHub) → JWT Token → Session Cookie | Seamless single-sign-on for university students while maintaining our 1-click guest evaluator mode. |

---

## 2. Gemini Structured Prompt Specification

When synthesizing custom capstone projects, Gemini is invoked with strict JSON Schema constraints:

```json
{
  "system_instruction": "You are a senior university capstone examiner and engineering architect. Return ONLY valid JSON adhering to the 6 Problem Statement pillars.",
  "response_schema": {
    "title": "string",
    "tagline": "string",
    "domain": "string",
    "matchScore": "number",
    "featuresDetailed": [
      {
        "name": "string",
        "priority": "P0 (Core MVP) | P1 (Advanced Distinction)",
        "description": "string",
        "deliverable": "string"
      }
    ],
    "stack": [
      {
        "group": "string",
        "tools": ["string"],
        "justification": "string"
      }
    ],
    "roadmap": [
      {
        "phase": "string",
        "title": "string",
        "duration": "string",
        "detail": "string",
        "deliverables": ["string"],
        "vivaMilestone": "string"
      }
    ],
    "improvementsDetailed": [
      {
        "area": "Scalability | Security & Privacy | Edge Case Resilience | Academic Rigor",
        "suggestion": "string",
        "implementationTip": "string"
      }
    ],
    "vivaQuestions": [
      {
        "question": "string",
        "expectedAnswer": "string",
        "defenseTip": "string"
      }
    ]
  }
}
```

---

## 3. Resilience & Zero-Fail Hackathon Guarantee

To guarantee that hackathon evaluators never encounter API timeouts, network deadlocks, or quota errors:
- **Client-Side Fallback Matrix**: Pre-engineered capstones (`AttendAI`, `MediLens AI`, `ZeroTrace`, `VoltGrid AI`, `CodeMentor AI`) are cached locally in `lib/ideas.ts`.
- Evaluator demonstrations work **100% offline** without dependency on live external API status.
