import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { assertRateLimit } from '@/lib/rate-limit'
import { vivaExaminerInputSchema } from '@/lib/viva-validation'
import { evaluateVivaDefense } from '@/services/viva-service'
import { getProjectById } from '@/services/project-service'
import { apiSuccess, apiError } from '@/lib/api-response'
import { BadRequestError } from '@/lib/errors'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(request)
    assertRateLimit(`viva-${user.uid}`, 15, 60_000)

    const { id } = await context.params
    const body = await request.json().catch(() => null)

    const parsed = vivaExaminerInputSchema.safeParse({
      ...body,
      projectId: id,
    })

    if (!parsed.success) {
      return apiError(new BadRequestError('Validation Error', 'INVALID_INPUT', parsed.error.format()))
    }

    const project = await getProjectById(user.uid, id)
    const evaluation = await evaluateVivaDefense(
      project,
      parsed.data.question,
      parsed.data.studentAnswer
    )

    return apiSuccess(evaluation)
  } catch (err: unknown) {
    return apiError(err, 500)
  }
}
