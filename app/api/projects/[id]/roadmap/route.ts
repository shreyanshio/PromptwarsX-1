import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getRoadmap } from '@/services/roadmap-service'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * GET /api/projects/[id]/roadmap
 * Retrieves the project's roadmap with server-computed progress and viva readiness metrics.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id) {
      throw new BadRequestError('Invalid project identifier')
    }

    const summary = await getRoadmap(user.uid, id)
    return apiSuccess(summary)
  } catch (err) {
    return apiError(err)
  }
}
