import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getProjectById, updateProject } from '@/services/project-service'
import { improveProject } from '@/services/ai-service'
import { improveProjectSchema } from '@/lib/validations'
import { assertRateLimit } from '@/lib/rate-limit'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * POST /api/projects/[id]/improve
 * Uses Gemini to evaluate student improvement requests and return actionable architectural changes.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id) {
      throw new BadRequestError('Invalid project identifier')
    }

    assertRateLimit(`improve:${user.uid}`, 8, 60_000)

    const body = await request.json().catch(() => null)
    const parsed = improveProjectSchema.safeParse(body)

    if (!parsed.success) {
      throw new BadRequestError(
        'Invalid improvement request payload',
        'VALIDATION_ERROR',
        parsed.error.issues
      )
    }

    // Verify ownership & retrieve context
    const project = await getProjectById(user.uid, id)

    // Call Gemini
    const improvementData = await improveProject(project, parsed.data.request)

    // Save improvement into project's improvementsDetailed history
    const newImprovementItem = {
      id: `imp-${Date.now()}`,
      area: (improvementData.difficulty === 'Advanced'
        ? 'Academic Rigor'
        : 'Scalability') as 'Academic Rigor' | 'Scalability',
      suggestion: `${improvementData.improvement}: ${improvementData.whyItHelps}`,
      implementationTip: improvementData.implementationSteps.join('; '),
    }

    await updateProject(user.uid, id, {
      improvementsDetailed: [newImprovementItem, ...(project.improvementsDetailed || [])],
    })

    return apiSuccess({
      improvement: improvementData.improvement,
      whyItHelps: improvementData.whyItHelps,
      difficulty: improvementData.difficulty,
      technologies: improvementData.technologies,
      expectedImpact: improvementData.expectedImpact,
      implementationSteps: improvementData.implementationSteps,
    })
  } catch (err) {
    return apiError(err)
  }
}
