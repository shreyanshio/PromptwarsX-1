'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Sparkles,
  Download,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Layers,
  Code2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
} from 'lucide-react'
import { Idea } from '@/lib/ideas'

export default function BlueprintView({ idea }: { idea: Idea }) {
  const [activeTab, setActiveTab] = useState<'all' | 'p0' | 'p1'>('all')
  const [completedPhases, setCompletedPhases] = useState<number[]>([0])
  const [openVivaIndex, setOpenVivaIndex] = useState<number | null>(0)
  const [isSaved, setIsSaved] = useState(true)
  const [downloadNotice, setDownloadNotice] = useState(false)

  function togglePhase(index: number) {
    setCompletedPhases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  function handleDownloadSynopsis() {
    const content = `# CAPSTONE PROJECT SYNOPSIS & ARCHITECTURAL BLUEPRINT
**Project Title**: ${idea.title}
**Domain**: ${idea.category} (${idea.domain})
**Target Scope**: ${idea.estimatedWeeks} Weeks · ${idea.difficulty} Level
**Target Academic Outcome**: ${idea.targetOutcome}

---

## 1. Executive Summary & Problem Context
${idea.overview}

### Problem Statement
${idea.problemContext}

---

## 2. Feature Specification & Scope Breakdown
${idea.featuresDetailed
  .map(
    (f, i) => `### Feature ${i + 1}: ${f.name} [${f.priority}]
- **Description**: ${f.description}
- **Examination Deliverable**: ${f.deliverable}
`
  )
  .join('\n')}

---

## 3. Prescribed Technology Stack & Justification
${idea.stack
  .map(
    (s) => `### Layer: ${s.group}
- **Technologies**: ${s.tools.join(', ')}
- **Architectural Rationale**: ${s.justification}
`
  )
  .join('\n')}

---

## 4. Phase-by-Phase Development Roadmap
${idea.roadmap
  .map(
    (r) => `### ${r.phase}: ${r.title} (${r.duration})
- **Technical Plan**: ${r.detail}
- **Milestone Deliverables**: ${r.deliverables.join(', ')}
- **Academic Viva Goal**: ${r.vivaMilestone}
`
  )
  .join('\n')}

---

## 5. Practical Hardening & Production Improvements
${idea.improvementsDetailed
  .map(
    (imp) => `### Area: ${imp.area}
- **Improvement**: ${imp.suggestion}
- **Implementation Strategy**: ${imp.implementationTip}
`
  )
  .join('\n')}

---

## 6. Viva Defense Question Bank & Model Answers
${idea.vivaQuestions
  .map(
    (v, i) => `### Q${i + 1}: ${v.question}
**Model Answer**: ${v.expectedAnswer}
**Examiner Defense Tip**: ${v.defenseTip}
`
  )
  .join('\n')}

---
*Generated via ProjectSpark (AI-Powered Final-Year Project Architect) for University Capstone Defense.*
`
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${idea.slug}-capstone-synopsis.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setDownloadNotice(true)
    setTimeout(() => setDownloadNotice(false), 4000)
  }

  const filteredFeatures =
    activeTab === 'all'
      ? idea.featuresDetailed
      : activeTab === 'p0'
      ? idea.featuresDetailed.filter((f) => f.priority.includes('P0'))
      : idea.featuresDetailed.filter((f) => f.priority.includes('P1'))

  const progressPct = Math.round((completedPhases.length / idea.roadmap.length) * 100)

  return (
    <div className="blueprint-container">
      {/* Top Notification Toast */}
      {downloadNotice && (
        <div className="download-toast-banner animate-in">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span>Capstone Synopsis downloaded successfully (.md formatted for university submission).</span>
        </div>
      )}

      {/* Header */}
      <section className="section-wrap detail-head">
        <div className="detail-top-nav">
          <Link href="/generate/results" className="text-link">
            <ArrowLeft size={15} /> All Matched Ideas
          </Link>
          <div className="flex items-center gap-2">
            <span className="nav-eval-badge">
              <Sparkles size={12} /> Complete 6-Pillar Blueprint
            </span>
          </div>
        </div>

        <div className={`eyebrow accent-${idea.accent}`}>{idea.category}</div>
        <h1>{idea.title}</h1>
        <p className="detail-tagline">{idea.tagline}</p>

        <div className="detail-meta-bar">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="match-chip">
              <Sparkles size={14} className="text-amber-500" /> {idea.match}% Match
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
              onClick={handleDownloadSynopsis}
              className="button button-secondary download-btn"
              title="Download formatted university synopsis in Markdown"
            >
              <Download size={15} />
              <span>Download Synopsis (.md)</span>
            </button>

            <Link href="/dashboard" className="button button-primary">
              <span>Track in Dashboard</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main 2-Column Grid */}
      <section className="section-wrap detail-grid">
        {/* Left Column: Context, Features, Roadmap */}
        <div className="detail-main">
          {/* Problem Context */}
          <div className="detail-card-panel">
            <div className="panel-header">
              <h2>Problem Context &amp; Academic Need</h2>
              <span className="section-tag">Foundation</span>
            </div>
            <p className="lede mb-4">{idea.overview}</p>
            <div className="problem-statement-quote">
              <strong>The Problem Being Solved:</strong>
              <p>{idea.problemContext}</p>
            </div>
          </div>

          {/* Pillar 3: Features Guidance */}
          <div className="detail-card-panel mt-6">
            <div className="panel-header">
              <div>
                <h2>Features Guidance &amp; Scope Boundary</h2>
                <small className="text-muted">Pillar 3: Core Viva MVP vs Advanced Distinctions</small>
              </div>

              <div className="feature-tab-pill">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`tab-pill-item ${activeTab === 'all' ? 'active' : ''}`}
                >
                  All ({idea.featuresDetailed.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('p0')}
                  className={`tab-pill-item ${activeTab === 'p0' ? 'active' : ''}`}
                >
                  P0: Core MVP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('p1')}
                  className={`tab-pill-item ${activeTab === 'p1' ? 'active' : ''}`}
                >
                  P1: Distinction
                </button>
              </div>
            </div>

            <div className="features-detailed-list">
              {filteredFeatures.map((f) => {
                const isP0 = f.priority.includes('P0')
                return (
                  <div key={f.name} className={`feature-detailed-card ${isP0 ? 'p0-border' : 'p1-border'}`}>
                    <div className="feature-top-row">
                      <span className={`priority-pill ${isP0 ? 'p0' : 'p1'}`}>
                        {f.priority}
                      </span>
                      <h3>{f.name}</h3>
                    </div>
                    <p className="feature-desc">{f.description}</p>
                    <div className="feature-deliverable-row">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>
                        <strong>Viva Deliverable:</strong> {f.deliverable}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pillar 5: Phase-by-Phase Roadmap */}
          <div className="detail-card-panel mt-6">
            <div className="panel-header">
              <div>
                <h2>Development Steps &amp; Milestone Roadmap</h2>
                <small className="text-muted">Pillar 5: Interactive 4-Phase Capstone Timeline ({progressPct}% Complete)</small>
              </div>
              <span className="timeline-badge">
                <Calendar size={13} /> {idea.estimatedWeeks} Weeks Total
              </span>
            </div>

            <div className="roadmap-interactive-list">
              {idea.roadmap.map((phase, idx) => {
                const isDone = completedPhases.includes(idx)
                return (
                  <div key={phase.phase} className={`roadmap-step-card ${isDone ? 'completed' : ''}`}>
                    <div className="step-card-left">
                      <button
                        type="button"
                        onClick={() => togglePhase(idx)}
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
        </div>

        {/* Right Column: Tech Stack Guidance & Improvements */}
        <aside className="detail-side">
          {/* Pillar 4: Layered Tech Stack */}
          <div className="stack-panel">
            <div className="panel-header">
              <div>
                <h2>Technologies Guidance</h2>
                <small className="text-muted">Pillar 4: Layered Architecture &amp; Rationale</small>
              </div>
            </div>

            <div className="stack-groups-wrap">
              {idea.stack.map((group) => (
                <div className="stack-group-card" key={group.group}>
                  <span className="stack-group-title">{group.group}</span>
                  <div className="chip-row">
                    {group.tools.map((tool) => (
                      <span className="chip" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="stack-justification">
                    <strong>Architectural Rationale:</strong> {group.justification}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 6: Practical Improvements & Hardening */}
          <div className="improvements-card-panel mt-6">
            <div className="panel-header">
              <div>
                <h2>Practical Improvements</h2>
                <small className="text-muted">Pillar 6: Production Hardening &amp; Rigor</small>
              </div>
              <ShieldCheck size={18} className="text-emerald-500" />
            </div>

            <div className="improvements-grid-stacked">
              {idea.improvementsDetailed.map((imp) => (
                <div key={imp.suggestion} className="improvement-item-box">
                  <div className="improvement-area-tag">{imp.area}</div>
                  <p className="improvement-sugg">
                    <strong>Improvement:</strong> {imp.suggestion}
                  </p>
                  <p className="improvement-tip">
                    <strong>Implementation:</strong> {imp.implementationTip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 6: Viva Defense Preparation Kit */}
          <div className="viva-kit-panel mt-6">
            <div className="panel-header">
              <div>
                <h2>Viva Defense Kit</h2>
                <small className="text-muted">Real Examiner Questions &amp; Defense Answers</small>
              </div>
              <HelpCircle size={18} className="text-amber-500" />
            </div>

            <div className="viva-questions-accordion">
              {idea.vivaQuestions.map((vq, idx) => {
                const isOpen = openVivaIndex === idx
                return (
                  <div key={idx} className="viva-accordion-item">
                    <button
                      type="button"
                      onClick={() => setOpenVivaIndex(isOpen ? null : idx)}
                      className="viva-accordion-trigger"
                    >
                      <span>Q: {vq.question}</span>
                      <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="viva-accordion-content animate-in">
                        <div className="expected-answer-box">
                          <strong>Model Answer:</strong>
                          <p>{vq.expectedAnswer}</p>
                        </div>
                        <div className="defense-tip-box">
                          <Zap size={14} className="text-amber-500 flex-shrink-0" />
                          <span>
                            <strong>Examiner Strategy:</strong> {vq.defenseTip}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
