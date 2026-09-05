import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { requireAuth, DEMO_USER_UID } from '@/lib/auth-server'
import { UnauthorizedError } from '@/lib/errors'

describe('Authentication Service', () => {
  it('should throw UnauthorizedError (401) when Authorization header is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/projects')
    await expect(requireAuth(req)).rejects.toThrow(UnauthorizedError)
  })

  it('should throw UnauthorizedError (401) when Authorization header is not Bearer', async () => {
    const req = new NextRequest('http://localhost:3000/api/projects', {
      headers: { Authorization: 'Basic dXNlcjpwYXNz' },
    })
    await expect(requireAuth(req)).rejects.toThrow(UnauthorizedError)
  })

  it('should authenticate demo token successfully', async () => {
    const req = new NextRequest('http://localhost:3000/api/projects', {
      headers: { Authorization: 'Bearer demo-token-alex-chen' },
    })
    const user = await requireAuth(req)
    expect(user).toBeDefined()
    expect(user.uid).toBe(DEMO_USER_UID)
    expect(user.isGuest).toBe(true)
    expect(user.email).toBe('alex.chen@university.edu')
  })
})
