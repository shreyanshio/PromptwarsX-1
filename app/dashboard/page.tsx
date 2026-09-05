'use client'

import { useState, useEffect } from 'react'
import { getIdea, ideas, Idea } from '@/lib/ideas'
import { getCurrentUser, UserProfile, GUEST_USER } from '@/lib/auth'
import { apiClient } from '@/lib/api-client'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardMilestoneTracker } from '@/components/dashboard/DashboardMilestoneTracker'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile>(GUEST_USER)
  const [activeSlug] = useState('attendai')
  const [completedPhases, setCompletedPhases] = useState<number[]>([0, 1])
  const [projectList, setProjectList] = useState<Idea[]>(ideas)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)

    async function loadDashboard() {
      try {
        const res = await apiClient.getProjects()
        if (res?.projects && res.projects.length > 0) {
          const combined = [
            ...res.projects,
            ...ideas.filter((i) => !res.projects.some((p) => p.slug === i.slug)),
          ]
          setProjectList(combined as unknown as Idea[])
        }
      } catch {
        // offline fallback
      }
    }

    loadDashboard()
  }, [])

  const active = projectList.find((p) => p.slug === activeSlug) || getIdea(activeSlug) || ideas[0]
  const totalPhases = active.roadmap.length
  const progressPct = Math.round((completedPhases.length / totalPhases) * 100)

  async function togglePhase(idx: number) {
    const isChecked = completedPhases.includes(idx)
    const nextPhases = isChecked
      ? completedPhases.filter((i) => i !== idx)
      : [...completedPhases, idx]
    setCompletedPhases(nextPhases)

    try {
      await apiClient.updateRoadmapTask(
        active.slug,
        `phase-${idx}`,
        isChecked ? 'TODO' : 'COMPLETED'
      )
    } catch {
      // offline fallback
    }
  }

  // Viva Readiness score calculation
  const vivaScore = Math.min(100, Math.round(progressPct * 0.7 + 28))

  return (
    <main className="sub-page">
      <DashboardHeader
        user={user}
        activeTitle={active.title}
        completedCount={completedPhases.length}
        totalCount={totalPhases}
        vivaScore={vivaScore}
      />

      <section className="section-wrap dashboard-grid">
        <DashboardMilestoneTracker
          active={active}
          completedPhases={completedPhases}
          totalPhases={totalPhases}
          progressPct={progressPct}
          onTogglePhase={togglePhase}
        />

        <DashboardSidebar
          ideasCount={ideas.length}
          vivaScore={vivaScore}
          progressPct={progressPct}
          projectList={projectList}
        />
      </section>
    </main>
  )
}
