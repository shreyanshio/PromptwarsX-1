import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getProjectById, updateProject } from '@/services/project-service'
import { assertRateLimit } from '@/lib/rate-limit'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * POST /api/projects/[id]/blueprint
 * Returns or dynamically completes the full capstone architectural blueprint.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id) {
      throw new BadRequestError('Invalid project identifier')
    }

    assertRateLimit(`blueprint:${user.uid}`, 10, 60_000)

    const project = await getProjectById(user.uid, id)

    return apiSuccess({
      blueprint: {
        id: project.id,
        slug: project.slug,
        title: project.title,
        tagline: project.tagline,
        category: project.category,
        domain: project.domain,
        overview: project.overview,
        problemContext: project.problemContext,
        features: project.featuresDetailed,
        stack: project.stack,
        roadmap: project.roadmap,
        improvements: project.improvementsDetailed,
        vivaQuestions: project.vivaQuestions,
      },
    })
  } catch (err) {
    return apiError(err)
  }
}
