import {
  GenerateProjectInput,
  ProjectIdeaData,
  StudentProfileData,
} from './validations'

const TOKEN_KEY = 'projectspark_auth_token'

export function getClientToken(): string {
  if (typeof window === 'undefined') return 'demo-token-alex-chen'
  return localStorage.getItem(TOKEN_KEY) || 'demo-token-alex-chen'
}

export function setClientToken(token: string | null): void {
  if (typeof window === 'undefined') return
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getClientToken()
  const headers = new Headers(options.headers || {})

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (!headers.has('Authorization') && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  })

  const json = await res.json().catch(() => null)

  if (!res.ok || !json?.success) {
    const errorMsg = json?.error || `HTTP ${res.status}: ${res.statusText}`
    const err = new Error(errorMsg)
    ;(err as unknown as { code?: string; status?: number }).code = json?.code
    ;(err as unknown as { code?: string; status?: number }).status = res.status
    throw err
  }

  return json.data as T
}

export const apiClient = {
  /**
   * Initialize a fast Demo session.
   */
  async loginDemo(): Promise<{ token: string; user: unknown }> {
    const data = await request<{ token: string; user: unknown }>(
      '/api/auth/demo-session',
      { method: 'POST' }
    )
    if (data.token) {
      setClientToken(data.token)
    }
    return data
  },

  /**
   * Fetch current student profile.
   */
  async getProfile(): Promise<{ profile: StudentProfileData }> {
    return request<{ profile: StudentProfileData }>('/api/profile')
  },

  /**
   * Update student profile.
   */
  async updateProfile(profile: StudentProfileData): Promise<{ profile: StudentProfileData }> {
    return request<{ profile: StudentProfileData }>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    })
  },

  /**
   * Generate personalized ideas with Gemini.
   */
  async generateProjects(
    input: GenerateProjectInput
  ): Promise<{ projects: ProjectIdeaData[] }> {
    return request<{ projects: ProjectIdeaData[] }>('/api/projects/generate', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  /**
   * Fetch user projects with filters.
   */
  async getProjects(params?: {
    domain?: string
    difficulty?: string
    saved?: boolean
    search?: string
  }): Promise<{ projects: ProjectIdeaData[]; total: number }> {
    const query = new URLSearchParams()
    if (params?.domain && params.domain !== 'All') query.set('domain', params.domain)
    if (params?.difficulty && params.difficulty !== 'All') query.set('difficulty', params.difficulty)
    if (params?.saved !== undefined) query.set('saved', String(params.saved))
    if (params?.search) query.set('search', params.search)

    const qs = query.toString()
    return request<{ projects: ProjectIdeaData[]; total: number }>(
      `/api/projects${qs ? `?${qs}` : ''}`
    )
  },

  /**
   * Get single project detail by ID or slug.
   */
  async getProject(id: string): Promise<{ project: ProjectIdeaData }> {
    return request<{ project: ProjectIdeaData }>(`/api/projects/${id}`)
  },

  /**
   * Toggle save state on a project.
   */
  async saveProject(
    id: string,
    saved?: boolean
  ): Promise<{ project: ProjectIdeaData; saved: boolean }> {
    return request<{ project: ProjectIdeaData; saved: boolean }>(
      `/api/projects/${id}/save`,
      {
        method: 'POST',
        body: JSON.stringify({ saved }),
      }
    )
  },

  /**
   * Request Gemini-powered improvement for a project.
   */
  async improveProject(
    id: string,
    improvementRequest: string
  ): Promise<{
    improvement: string
    whyItHelps: string
    difficulty: string
    technologies: string[]
    expectedImpact: string
    implementationSteps: string[]
  }> {
    return request(`/api/projects/${id}/improve`, {
      method: 'POST',
      body: JSON.stringify({ request: improvementRequest }),
    })
  },

  /**
   * Update task status and retrieve authoritative recalculated progress.
   */
  async updateRoadmapTask(
    projectId: string,
    taskId: string,
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  ): Promise<{
    updatedTask: unknown
    roadmap: unknown[]
    progressPct: number
    vivaScore: number
  }> {
    return request(`/api/projects/${projectId}/roadmap/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  },

  /**
   * Evaluate a live student viva defense answer using Gemini.
   */
  async evaluateVivaDefense(
    projectId: string,
    question: string,
    studentAnswer: string
  ): Promise<{
    score: number
    grade: string
    strengths: string[]
    weaknesses: string[]
    examinerFeedback: string
    idealAnswerSuggestion: string
    followUpQuestion: string
  }> {
    return request(`/api/projects/${projectId}/viva-evaluate`, {
      method: 'POST',
      body: JSON.stringify({ question, studentAnswer }),
    })
  },
}

