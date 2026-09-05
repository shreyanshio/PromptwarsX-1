import { getAdminFirestore } from '@/lib/firebase-admin'
import { StudentProfileData } from '@/lib/validations'

const memoryProfileStore = new Map<string, StudentProfileData>()

const DEFAULT_PROFILE: StudentProfileData = {
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  college: 'National Institute of Technology',
  course: 'B.Tech Computer Science & Engineering',
  year: 'Final Year (Capstone)',
  interests: ['Artificial Intelligence & Agents', 'Computer Vision & Edge AI'],
  skills: ['Python', 'React / Next.js', 'FastAPI / Python', 'OpenCV'],
  preferredDomains: ['Artificial Intelligence', 'Computer Vision'],
  experienceLevel: 'Intermediate',
}

/**
 * Retrieves a student's profile by UID.
 */
export async function getStudentProfile(uid: string): Promise<StudentProfileData> {
  const db = getAdminFirestore()

  if (db) {
    const doc = await db.collection('users').doc(uid).collection('meta').doc('profile').get()
    if (doc.exists) {
      return doc.data() as StudentProfileData
    }
  } else {
    const mem = memoryProfileStore.get(uid)
    if (mem) return mem
  }

  return {
    ...DEFAULT_PROFILE,
    name: uid.includes('alex') ? 'Alex Chen' : 'Student Builder',
  }
}

/**
 * Upserts a student profile.
 */
export async function upsertStudentProfile(
  uid: string,
  data: StudentProfileData
): Promise<StudentProfileData> {
  const db = getAdminFirestore()
  const updated: StudentProfileData = {
    ...data,
  }

  if (db) {
    await db.collection('users').doc(uid).collection('meta').doc('profile').set(updated, { merge: true })
  } else {
    memoryProfileStore.set(uid, updated)
  }

  return updated
}
