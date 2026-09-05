import { getProjectById, updateProject } from './project-service'
import { NotFoundError } from '@/lib/errors'

export interface RoadmapProgressSummary {
  roadmap: unknown[]
  totalTasks: number
  completedTasks: number
  progressPct: number
  vivaScore: number
}

/**
 * Calculates authoritative progress metrics for a project's roadmap.
 */
export function calculateRoadmapProgress(roadmap: { tasks?: { status?: string }[] }[]): {
  totalTasks: number
  completedTasks: number
  progressPct: number
  vivaScore: number
} {
  let total = 0
  let completed = 0

  for (const phase of roadmap) {
    if (phase.tasks && Array.isArray(phase.tasks)) {
      for (const t of phase.tasks) {
        total++
        if (t.status === 'COMPLETED') {
          completed++
        }
      }
    }
  }

  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0
  const vivaScore = Math.min(100, Math.round(progressPct * 0.7 + 28))

  return {
    totalTasks: total,
    completedTasks: completed,
    progressPct,
    vivaScore,
  }
}

/**
 * Retrieves the roadmap and calculated progress metrics for a project.
 */
export async function getRoadmap(
  uid: string,
  projectId: string
): Promise<RoadmapProgressSummary> {
  const project = await getProjectById(uid, projectId)
  const stats = calculateRoadmapProgress(project.roadmap)

  return {
    roadmap: project.roadmap,
    ...stats,
  }
}

/**
 * Updates a specific task's status and recalculates authoritative progress on the server.
 */
export async function updateRoadmapTaskStatus(
  uid: string,
  projectId: string,
  taskId: string,
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
): Promise<{
  updatedTask: unknown
  roadmap: unknown[]
  progressPct: number
  vivaScore: number
}> {
  const project = await getProjectById(uid, projectId)
  let foundTask: unknown = null

  const updatedRoadmap = project.roadmap.map((phase) => {
    if (!phase.tasks) return phase
    const updatedTasks = phase.tasks.map((task) => {
      if (task.id === taskId) {
        foundTask = { ...task, status }
        return foundTask as typeof task
      }
      return task
    })
    return { ...phase, tasks: updatedTasks }
  })

  if (!foundTask) {
    // Check if task ID corresponds to phase index toggle e.g. "phase-0" or "0"
    const phaseIdx = parseInt(taskId.replace('phase-', ''), 10)
    if (!isNaN(phaseIdx) && updatedRoadmap[phaseIdx]) {
      const phase = updatedRoadmap[phaseIdx]
      if (phase.tasks && phase.tasks.length > 0) {
        phase.tasks = phase.tasks.map((t) => ({ ...t, status }))
        foundTask = phase.tasks[0]
      }
    } else {
      throw new NotFoundError(`Roadmap task with ID '${taskId}' was not found in project '${projectId}'.`)
    }
  }

  const stats = calculateRoadmapProgress(updatedRoadmap)
  await updateProject(uid, projectId, { roadmap: updatedRoadmap })

  return {
    updatedTask: foundTask,
    roadmap: updatedRoadmap,
    progressPct: stats.progressPct,
    vivaScore: stats.vivaScore,
  }
}
