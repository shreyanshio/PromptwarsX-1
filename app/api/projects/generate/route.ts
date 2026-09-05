import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { generateProjectSchema } from '@/lib/validations'
import { assertRateLimit } from '@/lib/rate-limit'
import { generateProjectIdeas } from '@/services/ai-service'
import { createProject } from '@/services/project-service'
import { BadRequestError } from '@/lib/errors'

/**
 * POST /api/projects/generate
 * Generates personalized capstone project ideas using Google Gemini, validates structure,
 * persists to Firestore under the authenticated student's UID, and returns typed results.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const user = await requireAuth(request)

    // 2. Rate limit: max 5 generations per minute per user/IP
    const ip = request.headers.get('x-forwarded-for') || 'local'
    assertRateLimit(`generate:${user.uid}:${ip}`, 5, 60_000)

    // 3. Validate input payload
    const body = await request.json().catch(() => null)
    const parsed = generateProjectSchema.safeParse(body)

    if (!parsed.success) {
      throw new BadRequestError(
        'Invalid generation parameters',
        'VALIDATION_ERROR',
        parsed.error.issues
      )
    }

    // 4. Call Gemini AI service
    const generatedProjects = await generateProjectIdeas(parsed.data)

    // 5. Persist each generated project under the authenticated user's account
    const savedProjects = await Promise.all(
      generatedProjects.map((p) => createProject(user.uid, p))
    )

    // 6. Return typed response
    return apiSuccess({ projects: savedProjects }, 201)
  } catch (err) {
    return apiError(err)
  }
}
