import { NextRequest } from 'next/server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { DEMO_USER, DEMO_USER_UID } from '@/lib/auth-server'

/**
 * POST /api/auth/demo-session
 * Generates an instant, authenticated demo session token.
 */
export async function POST(request: NextRequest) {
  try {
    const sessionData = {
      token: 'demo-token-alex-chen',
      user: {
        uid: DEMO_USER_UID,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        role: 'guest',
        degree: 'B.Tech Computer Science & Engineering',
        year: 'Final Year CSE (Capstone)',
        isGuest: true,
      },
      expiresIn: '7d',
    }

    return apiSuccess(sessionData, 200)
  } catch (err) {
    return apiError(err)
  }
}
