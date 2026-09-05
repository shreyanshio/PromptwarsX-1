# PROJECTSPARK REST API SPECIFICATION

Base URL: `http://localhost:3000/api` (or production Cloud Run domain)

All mutating and private endpoints require the HTTP Authorization header:
```
Authorization: Bearer <Firebase_ID_Token_Or_Demo_Token>
```

---

## 1. Authentication

### `POST /api/auth/demo-session`
Creates an instant, authenticated demo session token for zero-barrier exploration.

* **Authentication**: None
* **Request**: Empty body `{}`
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "token": "demo-token-alex-chen",
    "user": {
      "uid": "demo-user-alex-chen",
      "name": "Alex Chen",
      "email": "alex.chen@university.edu",
      "role": "guest",
      "degree": "B.Tech Computer Science & Engineering",
      "year": "Final Year CSE (Capstone)",
      "isGuest": true
    },
    "expiresIn": "7d"
  }
}
```

---

## 2. Student Profile

### `GET /api/profile`
Retrieves the student's academic profile, interests, and skills.

* **Authentication**: Required
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "profile": {
      "name": "Alex Chen",
      "email": "alex.chen@university.edu",
      "college": "National Institute of Technology",
      "course": "B.Tech Computer Science & Engineering",
      "year": "Final Year (Capstone)",
      "interests": ["Artificial Intelligence & Agents", "Computer Vision & Edge AI"],
      "skills": ["Python", "React / Next.js", "FastAPI / Python", "OpenCV"],
      "preferredDomains": ["Artificial Intelligence", "Computer Vision"],
      "experienceLevel": "Intermediate"
    }
  }
}
```

### `PUT /api/profile`
Updates the student's profile.

* **Authentication**: Required
* **Request Body**:
```json
{
  "name": "Alex Chen",
  "college": "National Institute of Technology",
  "course": "B.Tech Computer Science & Engineering",
  "year": "Final Year 2026",
  "interests": ["Cybersecurity & Zero-Knowledge", "AI Agents"],
  "skills": ["Python", "Rust", "Docker", "PyTorch"],
  "preferredDomains": ["Cybersecurity"],
  "experienceLevel": "Advanced"
}
```
* **Response (200 OK)**: Returns updated profile object.

---

## 3. Project Generation & Management

### `POST /api/projects/generate`
Generates 3 personalized, defensible capstone ideas using Google Gemini, validates them with Zod, saves them under the student's account in Firestore, and returns typed blueprints.

* **Authentication**: Required
* **Rate Limit**: 5 requests / 60 seconds
* **Request Body**:
```json
{
  "interests": ["Computer Vision & Edge AI", "Artificial Intelligence & Agents"],
  "skills": ["Python", "OpenCV", "React / Next.js", "PyTorch"],
  "domain": "Computer Vision & Edge AI",
  "experienceLevel": "Intermediate",
  "timeline": "Standard Semester (10-12 Weeks)",
  "durationWeeks": 12,
  "teamSize": "Solo Final-Year Builder",
  "targetOutcome": "Defensible Working Prototype (Top Viva Score)",
  "constraints": "Must run on low-power edge hardware with offline sync"
}
```
* **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj_1725516000_abcde",
        "slug": "attendai",
        "title": "AttendAI",
        "tagline": "Defensible on-device face recognition with anti-spoofing and offline sync.",
        "category": "Computer Vision & Edge AI",
        "domain": "Artificial Intelligence",
        "accent": "indigo",
        "match": 95,
        "matchReason": "Direct match for Python + OpenCV + React skills...",
        "difficulty": "Intermediate",
        "estimatedWeeks": 12,
        "targetOutcome": "Defensible Working Prototype",
        "stack": [...],
        "featuresDetailed": [...],
        "roadmap": [...],
        "improvementsDetailed": [...],
        "vivaQuestions": [...]
      }
    ]
  }
}
```

### `GET /api/projects`
Retrieves all projects owned by the authenticated student.

* **Authentication**: Required
* **Query Parameters**:
  * `domain` (optional): Filter by domain category
  * `difficulty` (optional): `'Beginner'` | `'Intermediate'` | `'Advanced'`
  * `saved` (optional): `true` | `false`
  * `search` (optional): Substring search in title, tagline, category
  * `page` (optional): Page number (default: 1)
  * `limit` (optional): Items per page (default: 20)
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "projects": [...],
    "total": 5,
    "page": 1,
    "limit": 20
  }
}
```

### `GET /api/projects/[id]`
Retrieves a single project detail strictly enforcing ownership.

* **Authentication**: Required
* **Response (200 OK)**: Returns `{ project }`
* **Errors**: `404 Not Found` if project does not exist or does not belong to user.

### `PATCH /api/projects/[id]`
Updates project properties.

* **Authentication**: Required
* **Request Body**:
```json
{
  "saved": true,
  "status": "ACTIVE"
}
```
* **Response (200 OK)**: Returns updated `{ project }`.

### `POST /api/projects/[id]/save`
Toggles or explicitly sets the saved bookmark state.

* **Authentication**: Required
* **Request Body**: `{ "saved": true }` (or empty to toggle)
* **Response (200 OK)**: Returns `{ project, saved }`.

### `POST /api/projects/[id]/blueprint`
Completes or retrieves the 6-pillar architectural blueprint.

* **Authentication**: Required
* **Rate Limit**: 10 requests / 60 seconds
* **Response (200 OK)**: Returns `{ blueprint }`.

---

## 4. Project Improvement & Refinement

### `POST /api/projects/[id]/improve`
Sends the project context along with the student's scope modification request to Google Gemini to formulate practical architectural adjustments.

* **Authentication**: Required
* **Rate Limit**: 8 requests / 60 seconds
* **Request Body**:
```json
{
  "request": "Reduce the scope so a solo developer can complete it in 6 weeks without cloud dependencies."
}
```
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "improvement": "Prune Cloud Microservices to Edge SQLite Buffer",
    "whyItHelps": "Eliminates distributed consensus overhead and enables 100% offline classroom testing.",
    "difficulty": "Intermediate",
    "technologies": ["SQLite", "FastAPI", "InsightFace ONNX"],
    "expectedImpact": "Reduces development timeline by 4 weeks while preserving high viva defense marks.",
    "implementationSteps": [
      "Replace PostgreSQL cluster with local embedded SQLite",
      "Deploy MiniFASNet quantized ONNX model directly in edge worker",
      "Implement simple JSON batch sync on Wi-Fi reconnection"
    ]
  }
}
```

---

## 5. Milestone & Roadmap Tracking

### `GET /api/projects/[id]/roadmap`
Retrieves the project roadmap with authoritative, server-computed progress metrics.

* **Authentication**: Required
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "roadmap": [...],
    "totalTasks": 8,
    "completedTasks": 4,
    "progressPct": 50,
    "vivaScore": 63
  }
}
```

### `PATCH /api/projects/[id]/roadmap/tasks/[taskId]`
Marks a roadmap task as `TODO`, `IN_PROGRESS`, or `COMPLETED`. The server authoritatively updates the task and recalculates progress.

* **Authentication**: Required
* **Request Body**:
```json
{
  "status": "COMPLETED"
}
```
* **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "updatedTask": {
      "id": "task-1-1",
      "title": "Edge Camera Feed Ingestion",
      "status": "COMPLETED"
    },
    "progressPct": 63,
    "vivaScore": 72
  }
}
```
