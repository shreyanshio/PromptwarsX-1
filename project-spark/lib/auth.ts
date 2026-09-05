'use client'

export type UserProfile = {
  name: string
  email: string
  role: 'student' | 'guest'
  degree: string
  year: string
  avatar: string
  isGuest: boolean
}

export const GUEST_USER: UserProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  role: 'guest',
  degree: 'B.Tech Computer Science & Engineering',
  year: 'Final Year CSE (Capstone)',
  avatar: 'AC',
  isGuest: true,
}

const STORAGE_KEY = 'projectspark_session_user'

export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) return JSON.parse(data)
  } catch {
    // fallback
  }
  return null
}

export function setCurrentUser(user: UserProfile | null): void {
  if (typeof window === 'undefined') return
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // fallback
  }
}
