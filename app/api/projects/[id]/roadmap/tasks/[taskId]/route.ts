import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { updateRoadmapTaskStatus } from '@/services/roadmap-service'
import { taskUpdateSchema } from '@/lib/validations'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string; taskId: string }>
}

/**
 * PATCH /api/projects/[id]/roadmap/tasks/[taskId]
 * Updates task status and recalculates authoritative progress and viva readiness on the server.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id, taskId } = await context.params

    if (!id || !taskId) {
      throw new BadRequestError('Both project id and task id are required')
    }

    const body = await request.json().catch(() => null)
    const parsed = taskUpdateSchema.safeParse(body)

    if (!parsed.success) {
      throw new BadRequestError('Invalid task update data', 'VALIDATION_ERROR', parsed.error.issues)
    }

    const result = await updateRoadmapTaskStatus(
      user.uid,
      id,
      taskId,
      parsed.data.status
    )

    return apiSuccess(result)
  } catch (err) {
    return apiError(err)
  }
}
