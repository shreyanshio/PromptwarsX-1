import React from 'react'
import Link from 'next/link'
import { Plus, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserProfile } from '@/lib/auth'

interface DashboardHeaderProps {
  user: UserProfile
  activeTitle: string
  completedCount: number
  totalCount: number
  vivaScore: number
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  activeTitle,
  completedCount,
  totalCount,
  vivaScore,
}) => {
  return (
    <>
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
            Welcome back, {user.name.split(' ')[0]} — your capstone project <strong>{activeTitle}</strong> is{' '}
            {completedCount} of {totalCount} phases completed.
          </p>
        </div>

        <div className="viva-readiness-widget">
          <div className="viva-score-dial">
            <span className="viva-score-num">{vivaScore}%</span>
            <small>Viva Readiness</small>
          </div>
        </div>
      </section>
    </>
  )
}
