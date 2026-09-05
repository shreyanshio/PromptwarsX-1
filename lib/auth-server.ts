import { NextRequest } from 'next/server'
import { getFirebaseAdmin } from './firebase-admin'
import { UnauthorizedError } from './errors'

export interface AuthenticatedUser {
  uid: string
  email: string
  name: string
  isGuest: boolean
}

export const DEMO_USER_UID = 'demo-user-alex-chen'

export const DEMO_USER: AuthenticatedUser = {
  uid: DEMO_USER_UID,
  email: 'alex.chen@university.edu',
  name: 'Alex Chen',
  isGuest: true,
}

/**
 * Extracts and verifies the Bearer token from the incoming request.
 * Enforces authentication and returns the verified user identity.
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')

  if (!authHeader) {
    throw new UnauthorizedError('Missing Authorization header. Bearer token required.')
  }

  const parts = authHeader.trim().split(' ')
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedError('Malformed Authorization header. Format must be: Bearer <token>')
  }

  const token = parts[1]

  // Check for Demo Session Token
  if (token === 'demo-token-alex-chen' || token.startsWith('demo-session-')) {
    return DEMO_USER
  }

  const { auth, isConfigured } = getFirebaseAdmin()

  if (!isConfigured || !auth) {
    // If Firebase Admin credentials are not yet configured in environment,
    // allow demo fallback with warning
    if (process.env.NODE_ENV === 'development') {
      return {
        uid: `dev-user-${token.slice(0, 8)}`,
        email: 'dev.student@university.edu',
        name: 'Student Builder',
        isGuest: false,
      }
    }
    throw new UnauthorizedError('Authentication service not configured.')
  }

  try {
    const decoded = await auth.verifyIdToken(token)
    return {
      uid: decoded.uid,
      email: decoded.email || '',
      name: decoded.name || 'Student Builder',
      isGuest: Boolean(decoded.firebase?.sign_in_provider === 'anonymous'),
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid or expired token'
    throw new UnauthorizedError(`Authentication failed: ${msg}`)
  }
}
