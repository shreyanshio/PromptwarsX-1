import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { getStudentProfile, upsertStudentProfile } from '@/services/profile-service'
import { studentProfileSchema } from '@/lib/validations'
import { BadRequestError } from '@/lib/errors'

/**
 * GET /api/profile
 * Retrieves the authenticated student's profile.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const profile = await getStudentProfile(user.uid)
    return apiSuccess({ profile })
  } catch (err) {
    return apiError(err)
  }
}

/**
 * PUT /api/profile
 * Updates the authenticated student's profile.
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json().catch(() => null)
    const parsed = studentProfileSchema.safeParse(body)

    if (!parsed.success) {
      throw new BadRequestError('Invalid profile data', 'INVALID_PROFILE', parsed.error.issues)
    }

    const updated = await upsertStudentProfile(user.uid, parsed.data)
    return apiSuccess({ profile: updated })
  } catch (err) {
    return apiError(err)
  }
}
