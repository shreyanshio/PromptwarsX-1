'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  Plus,
  Sparkles,
  Download,
  Calendar,
  Award,
  ShieldCheck,
  FileText,
  UserCheck,
  CheckCircle2,
} from 'lucide-react'
import { getIdea, ideas } from '@/lib/ideas'
import { getCurrentUser, UserProfile, GUEST_USER } from '@/lib/auth'
import { ThemeToggle } from '@/components/ThemeToggle'
import { apiClient } from '@/lib/api-client'

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile>(GUEST_USER)
  const [activeSlug, setActiveSlug] = useState('attendai')
  const [completedPhases, setCompletedPhases] = useState<number[]>([0, 1])
  const [projectList, setProjectList] = useState(ideas)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)

    async function loadDashboard() {
      try {
        const res = await apiClient.getProjects()
        if (res?.projects && res.projects.length > 0) {
          const combined = [...res.projects, ...ideas.filter((i) => !res.projects.some((p) => p.slug === i.slug))]
          setProjectList(combined as unknown as typeof ideas)
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
      <header className="site-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="user-badge-pill">
            <span className="user-badge-dot" /> {user.name}
          </span>
          <ThemeToggle />
          <Link href="/generate" className="button button-primary button-small">
            <Plus size={14} /> New Spark
          </Link>
        </div>
      </header>

      <section className="section-wrap dashboard-head">
        <div>
          <div className="eyebrow">
            <Sparkles size={13} /> Final-Year Capstone Command Center
          </div>
          <h1>Keep the build momentum going.</h1>
          <p className="mt-2">
            Welcome back, {user.name.split(' ')[0]} — your capstone project <strong>{active.title}</strong> is{' '}
            {completedPhases.length} of {totalPhases} phases completed.
          </p>
        </div>

        <div className="viva-readiness-widget">
          <div className="viva-score-dial">
            <span className="viva-score-num">{vivaScore}%</span>
            <small>Viva Readiness</small>
          </div>
        </div>
      </section>

      <section className="section-wrap dashboard-grid">
        {/* Active Capstone Feature Card */}
        <article className="dash-feature">
          <div className="dash-feature-top">
            <span className="tag">{active.category}</span>
            <span className="status-pill in-progress">
              <span className="pulse-dot" /> In Development
            </span>
          </div>

          <h2>{active.title}</h2>
          <p>{active.tagline}</p>

          <div className="dash-progress">
            <span>
              <span style={{ width: `${progressPct}%` }} />
            </span>
            <div className="progress-label-row">
              <small>
                {completedPhases.length} of {totalPhases} Phases Complete ({progressPct}%)
              </small>
              <small className="font-semibold text-primary">{active.estimatedWeeks} Weeks Track</small>
            </div>
          </div>

          {/* Interactive Phase Checkpoints */}
          <div className="dashboard-phase-checkpoints">
            <label className="section-subhead">Interactive Milestone Tracker (Click to toggle)</label>
            <div className="phase-checkbox-list">
              {active.roadmap.map((phase, idx) => {
                const isChecked = completedPhases.includes(idx)
                return (
                  <button
                    key={phase.phase}
                    type="button"
                    onClick={() => togglePhase(idx)}
                    className={`dash-phase-item ${isChecked ? 'done' : ''}`}
                  >
                    <div className={`checkbox-circle ${isChecked ? 'checked' : ''}`}>
                      {isChecked && <Check size={12} />}
                    </div>
                    <div className="phase-text-group">
                      <span className="phase-title-text">
                        {phase.phase}: {phase.title}
                      </span>
                      <span className="phase-viva-goal">{phase.vivaMilestone}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="dash-feature-actions mt-6">
            <Link
              href={`/generate/results/${active.slug}`}
              className="button button-primary"
            >
              <span>View Full Project Blueprint</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/generate"
              className="button button-secondary"
            >
              <span>Refine Intake Criteria</span>
            </Link>
          </div>
        </article>

        {/* Dashboard Side Widgets */}
        <div className="dash-side">
          <div className="stat-card">
            <strong>{ideas.length}</strong>
            <span>Pre-Engineered Capstones</span>
            <small className="stat-sub">Across 5 domains</small>
          </div>

          <div className="stat-card">
            <strong>{vivaScore}%</strong>
            <span>Academic Defense Score</span>
            <small className="stat-sub">Based on deliverables</small>
          </div>

          <div className="activity">
            <div className="eyebrow">
              <ShieldCheck size={14} className="text-emerald-500" /> Defense Checklist
            </div>
            <p>
              <Check size={15} className="text-emerald-500" /> Problem Statement &amp; Scope Boundary Approved
            </p>
            <p>
              <Check size={15} className="text-emerald-500" /> Layered Tech Stack Architecture Verified
            </p>
            <p>
              <Check size={15} className="text-emerald-500" /> Anti-Spoofing &amp; Edge Vision Core Benchmarked
            </p>
            <p className={progressPct >= 75 ? '' : 'opacity-60'}>
              {progressPct >= 75 ? (
                <Check size={15} className="text-emerald-500" />
              ) : (
                <span className="bullet-pending">○</span>
              )}{' '}
              Viva Defense Q&amp;A Exam Preparation
            </p>
          </div>

          {/* Quick Switch Projects */}
          <div className="saved-sparks-card">
            <div className="eyebrow">
              <FileText size={14} /> Other Matched Capstones
            </div>
            <div className="saved-sparks-list">
              {projectList.map((item) => (
                <div key={item.slug} className="saved-spark-row">
                  <div>
                    <strong className="block text-sm">{item.title}</strong>
                    <span className="text-xs text-muted">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="chip-score">{item.difficulty}</span>
                    <Link
                      href={`/generate/results/${item.slug}`}
                      className="text-link text-xs"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
