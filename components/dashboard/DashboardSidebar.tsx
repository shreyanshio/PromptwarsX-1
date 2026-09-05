import React from 'react'
import Link from 'next/link'
import { Idea } from '@/lib/ideas'
import { ShieldCheck, Check, FileText } from 'lucide-react'

interface DashboardSidebarProps {
  ideasCount: number
  vivaScore: number
  progressPct: number
  projectList: Idea[]
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  ideasCount,
  vivaScore,
  progressPct,
  projectList,
}) => {
  return (
    <div className="dash-side">
      <div className="stat-card">
        <strong>{ideasCount}</strong>
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
  )
}
