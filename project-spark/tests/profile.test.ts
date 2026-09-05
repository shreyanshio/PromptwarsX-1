import { describe, it, expect } from 'vitest'
import { getStudentProfile, upsertStudentProfile } from '@/services/profile-service'

describe('Student Profile Service', () => {
  it('should return default profile for new user', async () => {
    const profile = await getStudentProfile('user-new-789')
    expect(profile.name).toBe('Student Builder')
    expect(profile.experienceLevel).toBe('Intermediate')
  })

  it('should update and retrieve custom profile fields', async () => {
    const updated = await upsertStudentProfile('user-new-789', {
      name: 'Rohan Sharma',
      email: 'rohan@university.edu',
      college: 'IIT Delhi',
      course: 'B.Tech AI & Data Science',
      year: 'Final Year 2026',
      interests: ['Autonomous Agents', 'Computer Vision'],
      skills: ['Python', 'PyTorch', 'FastAPI'],
      preferredDomains: ['AI'],
      experienceLevel: 'Advanced',
    })

    expect(updated.name).toBe('Rohan Sharma')
    expect(updated.college).toBe('IIT Delhi')

    const fetched = await getStudentProfile('user-new-789')
    expect(fetched.name).toBe('Rohan Sharma')
    expect(fetched.skills).toContain('PyTorch')
  })
})
