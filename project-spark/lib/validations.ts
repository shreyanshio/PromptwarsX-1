import { z } from 'zod'

/**
 * Stack Group Schema
 */
export const stackGroupSchema = z.object({
  group: z.string().trim().min(1).max(100),
  tools: z.array(z.string().trim().min(1)).min(1),
  justification: z.string().trim().min(1).max(1000),
})

/**
 * Feature Detail Schema
 */
export const featureDetailSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).max(150),
  priority: z.enum(['P0 (Core MVP)', 'P1 (Advanced Distinction)', 'MUST_HAVE', 'SHOULD_HAVE', 'NICE_TO_HAVE']).transform((p) => {
    if (p === 'MUST_HAVE') return 'P0 (Core MVP)' as const
    if (p === 'SHOULD_HAVE' || p === 'NICE_TO_HAVE') return 'P1 (Advanced Distinction)' as const
    return p
  }),
  description: z.string().trim().min(1).max(1000),
  deliverable: z.string().trim().min(1).max(500),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  estimatedEffort: z.string().optional(),
})

/**
 * Roadmap Task Schema
 */
export const roadmapTaskSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(500).optional().default(''),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional().default('MEDIUM'),
  estimatedHours: z.number().optional().default(10),
})

/**
 * Roadmap Phase Schema
 */
export const roadmapPhaseSchema = z.object({
  id: z.string().optional(),
  phase: z.string().trim().min(1).max(50),
  title: z.string().trim().min(1).max(150),
  duration: z.string().trim().min(1).max(50),
  detail: z.string().trim().min(1).max(1500),
  deliverables: z.array(z.string().trim().min(1)).min(1),
  vivaMilestone: z.string().trim().min(1).max(500),
  order: z.number().int().optional(),
  tasks: z.array(roadmapTaskSchema).optional(),
})

/**
 * Practical Improvement Schema
 */
export const practicalImprovementSchema = z.object({
  id: z.string().optional(),
  area: z.enum(['Scalability', 'Security & Privacy', 'Edge Case Resilience', 'Academic Rigor']),
  suggestion: z.string().trim().min(1).max(1000),
  implementationTip: z.string().trim().min(1).max(1000),
})

/**
 * Viva Defense Q&A Schema
 */
export const vivaQuestionSchema = z.object({
  question: z.string().trim().min(1).max(500),
  expectedAnswer: z.string().trim().min(1).max(2000),
  defenseTip: z.string().trim().min(1).max(1000),
})

/**
 * Project Idea Schema (Full Capstone Blueprint)
 */
export const projectIdeaSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(1).max(100),
  title: z.string().trim().min(1).max(150),
  tagline: z.string().trim().min(1).max(350),
  category: z.string().trim().min(1).max(100),
  domain: z.string().trim().min(1).max(100),
  accent: z.enum(['amber', 'indigo', 'green']).default('amber'),
  match: z.number().optional().default(95),
  matchReason: z.string().trim().min(1).max(500),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  estimatedWeeks: z.number().int().min(1).max(52),
  targetOutcome: z.string().trim().min(1).max(250),
  requiredSkills: z.array(z.string()),
  interests: z.array(z.string()),
  overview: z.string().trim().min(1).max(3000),
  problemContext: z.string().trim().min(1).max(3000),
  stack: z.array(stackGroupSchema),
  featuresDetailed: z.array(featureDetailSchema),
  roadmap: z.array(roadmapPhaseSchema),
  improvementsDetailed: z.array(practicalImprovementSchema),
  vivaQuestions: z.array(vivaQuestionSchema),
  saved: z.boolean().optional().default(false),
  status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional().default('ACTIVE'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

/**
 * Project Generation Request Schema
 */
export const generateProjectSchema = z.object({
  interests: z.array(z.string().trim().min(1)).min(1, 'Please select at least 1 domain passion').max(10),
  skills: z.array(z.string().trim().min(1)).min(1, 'Please select at least 1 technical skill').max(25),
  domain: z.string().trim().max(100).optional().default('Artificial Intelligence & Computer Vision'),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional().default('Intermediate'),
  projectType: z.string().trim().max(100).optional().default('Academic Capstone'),
  timeline: z.string().trim().max(100).optional().default('Standard Semester (10-12 Weeks)'),
  durationWeeks: z.number().int().min(2).max(52).optional().default(12),
  teamSize: z.union([z.string(), z.number()]).optional().default('Solo Final-Year Builder'),
  targetOutcome: z.string().trim().max(200).optional().default('Defensible Working Prototype (Top Viva Score)'),
  constraints: z.string().trim().max(500).optional(),
})

/**
 * Project Improvement Request Schema
 */
export const improveProjectSchema = z.object({
  request: z.string().trim().min(3, 'Improvement request must be at least 3 characters').max(500, 'Improvement request cannot exceed 500 characters'),
})

/**
 * Roadmap Task Mutation Schema
 */
export const taskUpdateSchema = z.object({
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']),
  title: z.string().trim().min(1).max(200).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

/**
 * Project Patch Schema
 */
export const projectPatchSchema = z.object({
  saved: z.boolean().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
  active: z.boolean().optional(),
})

/**
 * Student Profile Schema
 */
export const studentProfileSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().email().optional(),
  college: z.string().trim().max(200).optional().default(''),
  course: z.string().trim().max(200).optional().default('B.Tech Computer Science & Engineering'),
  year: z.string().trim().max(100).optional().default('Final Year 2026'),
  interests: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  preferredDomains: z.array(z.string()).default([]),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Intermediate'),
})

export type GenerateProjectInput = z.input<typeof generateProjectSchema>
export type ProjectIdeaData = z.infer<typeof projectIdeaSchema>
export type ImproveProjectInput = z.input<typeof improveProjectSchema>
export type TaskUpdateInput = z.input<typeof taskUpdateSchema>
export type StudentProfileData = z.input<typeof studentProfileSchema>
export type ProjectPatchInput = z.input<typeof projectPatchSchema>
