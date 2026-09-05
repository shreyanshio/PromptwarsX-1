import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getProjects, ProjectFilters } from '@/services/project-service'

/**
 * GET /api/projects
 * Lists all projects owned by the authenticated user with optional filtering and pagination.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)

    const filters: ProjectFilters = {
      domain: searchParams.get('domain') || undefined,
      difficulty: searchParams.get('difficulty') || undefined,
      saved: searchParams.has('saved') ? searchParams.get('saved') === 'true' : undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.has('page') ? Math.max(1, parseInt(searchParams.get('page')!, 10)) : 1,
      limit: searchParams.has('limit') ? Math.min(50, Math.max(1, parseInt(searchParams.get('limit')!, 10))) : 20,
    }

    const { projects, total } = await getProjects(user.uid, filters)

    return apiSuccess({
      projects,
      total,
      page: filters.page,
      limit: filters.limit,
    })
  } catch (err) {
    return apiError(err)
  }
}
