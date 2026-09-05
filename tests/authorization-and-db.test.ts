import { describe, it, expect } from 'vitest'
import {
  createProject,
  getProjectById,
  getProjects,
  toggleSaveProject,
} from '@/services/project-service'
import { NotFoundError } from '@/lib/errors'
import { ProjectIdeaData } from '@/lib/validations'

const mockProject: ProjectIdeaData = {
  id: 'test-proj-1',
  slug: 'test-proj-1',
  title: 'Test Capstone',
  tagline: 'Test Tagline',
  category: 'Computer Vision',
  domain: 'AI',
  accent: 'amber',
  match: 95,
  matchReason: 'Test match',
  difficulty: 'Intermediate',
  estimatedWeeks: 12,
  targetOutcome: 'Working Prototype',
  requiredSkills: ['Python'],
  interests: ['AI'],
  overview: 'Test overview',
  problemContext: 'Test problem',
  stack: [{ group: 'Frontend', tools: ['React'], justification: 'Fast UI' }],
  featuresDetailed: [{ name: 'Auth', priority: 'P0 (Core MVP)', description: 'Login', deliverable: 'Code' }],
  roadmap: [{ phase: 'Phase 1', title: 'Setup', duration: '2 Weeks', detail: 'Setup env', deliverables: ['Repo'], vivaMilestone: 'Setup' }],
  improvementsDetailed: [{ area: 'Scalability', suggestion: 'Cache', implementationTip: 'Redis' }],
  vivaQuestions: [{ question: 'Why React?', expectedAnswer: 'SSR', defenseTip: 'Performance' }],
  saved: false,
  status: 'ACTIVE',
}

describe('Project Service & Ownership Isolation', () => {
  const userA = 'user-alpha-123'
  const userB = 'user-beta-456'

  it('should create and retrieve project for the owner', async () => {
    const created = await createProject(userA, mockProject)
    expect(created.id).toBe('test-proj-1')

    const fetched = await getProjectById(userA, 'test-proj-1')
    expect(fetched.title).toBe('Test Capstone')
  })

  it('should block userB from accessing userA project (IDOR protection)', async () => {
    // userB querying userA's project must throw NotFoundError (does not leak existence)
    await expect(getProjectById(userB, 'test-proj-1')).rejects.toThrow(NotFoundError)
  })

  it('should toggle saved state correctly', async () => {
    const updated = await toggleSaveProject(userA, 'test-proj-1', true)
    expect(updated.saved).toBe(true)

    const list = await getProjects(userA, { saved: true })
    expect(list.projects.some((p) => p.id === 'test-proj-1')).toBe(true)
  })
})
