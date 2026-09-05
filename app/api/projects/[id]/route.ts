import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getProjectById, updateProject } from '@/services/project-service'
import { projectPatchSchema } from '@/lib/validations'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * GET /api/projects/[id]
 * Retrieves a single project strictly owned by the authenticated student.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Invalid project identifier')
    }

    const project = await getProjectById(user.uid, id)
    return apiSuccess({ project })
  } catch (err) {
    return apiError(err)
  }
}

/**
 * PATCH /api/projects/[id]
 * Updates project settings (e.g., saved state, status).
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Invalid project identifier')
    }

    const body = await request.json().catch(() => null)
    const parsed = projectPatchSchema.safeParse(body)

    if (!parsed.success) {
      throw new BadRequestError('Invalid patch data', 'VALIDATION_ERROR', parsed.error.issues)
    }

    const updated = await updateProject(user.uid, id, parsed.data)
    return apiSuccess({ project: updated })
  } catch (err) {
    return apiError(err)
  }
}
