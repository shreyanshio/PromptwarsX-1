import React from 'react'
import { RoadmapPhase } from '@/lib/ideas'
import { Check, Calendar, Award } from 'lucide-react'

interface BlueprintRoadmapProps {
  roadmap: RoadmapPhase[]
  completedPhases: number[]
  estimatedWeeks: number
  onTogglePhase: (idx: number) => void
}

export const BlueprintRoadmap: React.FC<BlueprintRoadmapProps> = ({
  roadmap,
  completedPhases,
  estimatedWeeks,
  onTogglePhase,
}) => {
  const progressPct = Math.round((completedPhases.length / roadmap.length) * 100)

  return (
    <div className="detail-card-panel mt-6">
      <div className="panel-header">
        <div>
          <h2>Development Steps &amp; Milestone Roadmap</h2>
          <small className="text-muted">
            Interactive 4-Phase Capstone Timeline ({progressPct}% Complete)
          </small>
        </div>
        <span className="timeline-badge">
          <Calendar size={13} /> {estimatedWeeks} Weeks Total
        </span>
      </div>

      <div className="roadmap-interactive-list">
        {roadmap.map((phase, idx) => {
          const isDone = completedPhases.includes(idx)
          return (
            <div key={phase.phase} className={`roadmap-step-card ${isDone ? 'completed' : ''}`}>
              <div className="step-card-left">
                <button
                  type="button"
                  onClick={() => onTogglePhase(idx)}
                  className={`phase-checkbox ${isDone ? 'checked' : ''}`}
                  aria-label={`Toggle completion of ${phase.phase}`}
                >
                  {isDone && <Check size={14} />}
                </button>
              </div>

              <div className="step-card-content">
                <div className="step-header-meta">
                  <span className="phase-id-pill">{phase.phase}</span>
                  <span className="phase-duration">{phase.duration}</span>
                </div>
                <h3>{phase.title}</h3>
                <p className="step-detail-text">{phase.detail}</p>

                <div className="step-deliverables-box">
                  <strong>Key Phase Deliverables:</strong>
                  <ul>
                    {phase.deliverables.map((d) => (
                      <li key={d}>
                        <span className="bullet">›</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="viva-milestone-banner">
                  <Award size={14} className="text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>Academic Viva Review Goal:</strong> {phase.vivaMilestone}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
