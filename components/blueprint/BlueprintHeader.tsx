import React from 'react'
import Link from 'next/link'
import { Idea } from '@/lib/ideas'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Download,
  Sparkles,
  Award,
  Code2,
} from 'lucide-react'

interface BlueprintHeaderProps {
  idea: Idea
  isSaved: boolean
  onToggleSave: () => void
  onDownloadSynopsis: () => void
  onDownloadStarterKit: () => void
}

export const BlueprintHeader: React.FC<BlueprintHeaderProps> = ({
  idea,
  isSaved,
  onToggleSave,
  onDownloadSynopsis,
  onDownloadStarterKit,
}) => {
  return (
    <section className="section-wrap detail-head">
      <div className="detail-top-nav">
        <Link href="/generate/results" className="text-link">
          <ArrowLeft size={15} /> All Matched Ideas
        </Link>
        <div className="flex items-center gap-2">
          <span className="tag">Full Project Blueprint</span>
        </div>
      </div>

      <div className={`eyebrow accent-${idea.accent}`}>{idea.category}</div>
      <h1>{idea.title}</h1>
      <p className="detail-tagline">{idea.tagline}</p>

      <div className="detail-meta-bar">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="match-chip">
            <Sparkles size={14} className="text-amber-500" /> Recommended for Your Stack
          </span>
          <span className="meta-badge">Difficulty: {idea.difficulty}</span>
          <span className="meta-badge">Duration: {idea.estimatedWeeks} Weeks</span>
          <span className="meta-badge outcome-badge">
            <Award size={13} /> {idea.targetOutcome}
          </span>
        </div>

        <div className="detail-action-buttons">
          <button
            type="button"
            onClick={onToggleSave}
            className={`button button-secondary ${isSaved ? 'text-amber-500' : ''}`}
            title="Save this capstone to your dashboard"
          >
            <Bookmark size={15} className={isSaved ? 'fill-current text-amber-500' : ''} />
            <span>{isSaved ? 'Saved to Sparks' : 'Save Project'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadSynopsis}
            className="button button-secondary download-btn"
            title="Download formatted university synopsis in Markdown"
          >
            <Download size={15} />
            <span>Download Synopsis (.md)</span>
          </button>

          <button
            type="button"
            onClick={onDownloadStarterKit}
            className="button button-secondary"
            title="Download complete starter boilerplate code files"
          >
            <Code2 size={15} className="text-primary" />
            <span>Starter Scaffold (.zip)</span>
          </button>

          <Link href="/dashboard" className="button button-primary">
            <span>Track in Dashboard</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
