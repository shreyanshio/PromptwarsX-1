import React from 'react'
import { Idea } from '@/lib/ideas'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

interface DashboardMilestoneTrackerProps {
  active: Idea
  completedPhases: number[]
  totalPhases: number
  progressPct: number
  onTogglePhase: (idx: number) => void
}

export const DashboardMilestoneTracker: React.FC<DashboardMilestoneTrackerProps> = ({
  active,
  completedPhases,
  totalPhases,
  progressPct,
  onTogglePhase,
}) => {
  return (
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

      <div className="dashboard-phase-checkpoints">
        <label className="section-subhead">Interactive Milestone Tracker (Click to toggle)</label>
        <div className="phase-checkbox-list">
          {active.roadmap.map((phase, idx) => {
            const isChecked = completedPhases.includes(idx)
            return (
              <button
                key={phase.phase}
                type="button"
                onClick={() => onTogglePhase(idx)}
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
  )
}
