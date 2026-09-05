import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { toggleSaveProject } from '@/services/project-service'
import { BadRequestError } from '@/lib/errors'

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * POST /api/projects/[id]/save
 * Toggles or explicitly sets the saved status of a user project.
 */
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuth(request)
    const { id } = await context.params

    if (!id) {
      throw new BadRequestError('Invalid project identifier')
    }

    const body = await request.json().catch(() => ({}))
    const explicitSaved = typeof body?.saved === 'boolean' ? body.saved : undefined

    const updated = await toggleSaveProject(user.uid, id, explicitSaved)
    return apiSuccess({ project: updated, saved: updated.saved })
  } catch (err) {
    return apiError(err)
  }
}
