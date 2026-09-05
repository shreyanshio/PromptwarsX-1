import { getAdminFirestore } from '@/lib/firebase-admin'
import type { Query, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { ProjectIdeaData } from '@/lib/validations'
import { ideas as templateIdeas } from '@/lib/ideas'
import { NotFoundError, ForbiddenError } from '@/lib/errors'

// In-memory fallback store for offline/demo evaluation when Firestore credentials are not set
const memoryProjectStore = new Map<string, Map<string, ProjectIdeaData>>()

function getMemoryUserStore(uid: string): Map<string, ProjectIdeaData> {
  let userStore = memoryProjectStore.get(uid)
  if (!userStore) {
    userStore = new Map()
    // Pre-populate with curated templates converted to ProjectIdeaData
    for (const tmpl of templateIdeas) {
      const enrichedRoadmap = tmpl.roadmap.map((phase, pIdx) => ({
        id: `phase-${pIdx + 1}`,
        phase: phase.phase,
        title: phase.title,
        duration: phase.duration,
        detail: phase.detail,
        deliverables: phase.deliverables,
        vivaMilestone: phase.vivaMilestone,
        order: pIdx,
        tasks: phase.deliverables.map((deliv, dIdx) => ({
          id: `task-${pIdx + 1}-${dIdx + 1}`,
          title: deliv,
          description: `Deliverable for ${phase.title}`,
          status: (pIdx === 0 && dIdx === 0 ? 'COMPLETED' : 'TODO') as 'COMPLETED' | 'TODO',
          priority: 'MEDIUM' as const,
          estimatedHours: 12,
        })),
      }))

      const proj: ProjectIdeaData = {
        id: tmpl.slug,
        slug: tmpl.slug,
        title: tmpl.title,
        tagline: tmpl.tagline,
        category: tmpl.category,
        domain: tmpl.domain,
        accent: tmpl.accent,
        match: tmpl.match,
        matchReason: tmpl.matchReason,
        difficulty: tmpl.difficulty,
        estimatedWeeks: tmpl.estimatedWeeks,
        targetOutcome: tmpl.targetOutcome,
        requiredSkills: tmpl.requiredSkills,
        interests: tmpl.interests,
        overview: tmpl.overview,
        problemContext: tmpl.problemContext,
        stack: tmpl.stack,
        featuresDetailed: tmpl.featuresDetailed.map((f, i) => ({
          id: `feat-${i + 1}`,
          name: f.name,
          priority: f.priority,
          description: f.description,
          deliverable: f.deliverable,
        })),
        roadmap: enrichedRoadmap,
        improvementsDetailed: tmpl.improvementsDetailed.map((imp, i) => ({
          id: `imp-${i + 1}`,
          area: imp.area,
          suggestion: imp.suggestion,
          implementationTip: imp.implementationTip,
        })),
        vivaQuestions: tmpl.vivaQuestions,
        saved: tmpl.slug === 'attendai',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      userStore.set(proj.id!, proj)
    }
    memoryProjectStore.set(uid, userStore)
  }
  return userStore
}

export interface ProjectFilters {
  domain?: string
  difficulty?: string
  saved?: boolean
  search?: string
  limit?: number
  page?: number
}

/**
 * Creates a new project in Firestore scoped strictly to the authenticated UID.
 */
export async function createProject(
  uid: string,
  project: ProjectIdeaData
): Promise<ProjectIdeaData> {
  const db = getAdminFirestore()
  const projectId = project.id || `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const record: ProjectIdeaData = {
    ...project,
    id: projectId,
    createdAt: project.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  if (db) {
    const docRef = db.collection('users').doc(uid).collection('projects').doc(projectId)
    await docRef.set(record)
    return record
  }

  // Fallback to memory store
  const userStore = getMemoryUserStore(uid)
  userStore.set(projectId, record)
  return record
}

/**
 * Retrieves all projects belonging to the authenticated user with filtering.
 */
export async function getProjects(
  uid: string,
  filters: ProjectFilters = {}
): Promise<{ projects: ProjectIdeaData[]; total: number }> {
  const db = getAdminFirestore()
  let list: ProjectIdeaData[] = []

  if (db) {
    let query: Query = db.collection('users').doc(uid).collection('projects')

    if (filters.domain && filters.domain !== 'All') {
      query = query.where('category', '==', filters.domain)
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      query = query.where('difficulty', '==', filters.difficulty)
    }
    if (filters.saved !== undefined) {
      query = query.where('saved', '==', filters.saved)
    }

    const snapshot = await query.get()
    list = snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as ProjectIdeaData)
  } else {
    const userStore = getMemoryUserStore(uid)
    list = Array.from(userStore.values())

    if (filters.domain && filters.domain !== 'All') {
      list = list.filter((p) => p.category === filters.domain || p.domain === filters.domain)
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      list = list.filter((p) => p.difficulty === filters.difficulty)
    }
    if (filters.saved !== undefined) {
      list = list.filter((p) => Boolean(p.saved) === filters.saved)
    }
  }

  if (filters.search) {
    const q = filters.search.toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  const total = list.length
  const limit = filters.limit || 20
  const page = filters.page || 1
  const start = (page - 1) * limit
  const paginated = list.slice(start, start + limit)

  return { projects: paginated, total }
}

/**
 * Retrieves a single project by ID or slug, strictly enforcing user ownership.
 */
export async function getProjectById(
  uid: string,
  projectId: string
): Promise<ProjectIdeaData> {
  const db = getAdminFirestore()

  if (db) {
    // Check by doc ID
    const docRef = db.collection('users').doc(uid).collection('projects').doc(projectId)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      return docSnap.data() as ProjectIdeaData
    }

    // Check by slug query
    const slugQuery = await db
      .collection('users')
      .doc(uid)
      .collection('projects')
      .where('slug', '==', projectId)
      .limit(1)
      .get()

    if (!slugQuery.empty) {
      return slugQuery.docs[0].data() as ProjectIdeaData
    }
  } else {
    const userStore = getMemoryUserStore(uid)
    const match =
      userStore.get(projectId) ||
      Array.from(userStore.values()).find((p) => p.slug === projectId)

    if (match) {
      return match
    }
  }

  throw new NotFoundError(`Project with identifier '${projectId}' was not found.`)
}

/**
 * Updates a project's fields, ensuring ownership.
 */
export async function updateProject(
  uid: string,
  projectId: string,
  patch: Partial<ProjectIdeaData>
): Promise<ProjectIdeaData> {
  const existing = await getProjectById(uid, projectId)
  const updated: ProjectIdeaData = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  }

  const db = getAdminFirestore()
  if (db) {
    const docRef = db.collection('users').doc(uid).collection('projects').doc(existing.id!)
    await docRef.set(updated, { merge: true })
  } else {
    const userStore = getMemoryUserStore(uid)
    userStore.set(existing.id!, updated)
  }

  return updated
}

/**
 * Toggles the saved status of a project.
 */
export async function toggleSaveProject(
  uid: string,
  projectId: string,
  saved?: boolean
): Promise<ProjectIdeaData> {
  const project = await getProjectById(uid, projectId)
  const nextSaved = saved !== undefined ? saved : !project.saved
  return updateProject(uid, projectId, { saved: nextSaved })
}
