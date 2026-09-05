import { describe, it, expect } from 'vitest'
import { calculateRoadmapProgress } from '@/services/roadmap-service'

describe('Roadmap Service & Authoritative Progress Calculation', () => {
  it('should calculate 0% when no tasks are completed', () => {
    const roadmap = [
      {
        tasks: [
          { status: 'TODO' },
          { status: 'TODO' },
        ],
      },
      {
        tasks: [
          { status: 'TODO' },
          { status: 'TODO' },
        ],
      },
    ]

    const stats = calculateRoadmapProgress(roadmap)
    expect(stats.totalTasks).toBe(4)
    expect(stats.completedTasks).toBe(0)
    expect(stats.progressPct).toBe(0)
    expect(stats.vivaScore).toBe(28) // base viva score formula
  })

  it('should calculate 50% when half of tasks are completed and update viva readiness', () => {
    const roadmap = [
      {
        tasks: [
          { status: 'COMPLETED' },
          { status: 'COMPLETED' },
        ],
      },
      {
        tasks: [
          { status: 'TODO' },
          { status: 'TODO' },
        ],
      },
    ]

    const stats = calculateRoadmapProgress(roadmap)
    expect(stats.totalTasks).toBe(4)
    expect(stats.completedTasks).toBe(2)
    expect(stats.progressPct).toBe(50)
    expect(stats.vivaScore).toBe(63) // 50 * 0.7 + 28 = 63
  })

  it('should calculate 100% and cap viva score at 100% when all tasks complete', () => {
    const roadmap = [
      {
        tasks: [
          { status: 'COMPLETED' },
        ],
      },
    ]

    const stats = calculateRoadmapProgress(roadmap)
    expect(stats.progressPct).toBe(100)
    expect(stats.vivaScore).toBe(98)
  })
})
