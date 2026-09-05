'use client'

import { useState } from 'react'
import { Idea } from '@/lib/ideas'
import { apiClient } from '@/lib/api-client'
import { CheckCircle2 } from 'lucide-react'
import { BlueprintHeader } from './blueprint/BlueprintHeader'
import { BlueprintFeatures } from './blueprint/BlueprintFeatures'
import { BlueprintRoadmap } from './blueprint/BlueprintRoadmap'
import { BlueprintStack } from './blueprint/BlueprintStack'
import { BlueprintImprovements } from './blueprint/BlueprintImprovements'
import { BlueprintVivaKit } from './blueprint/BlueprintVivaKit'

interface BlueprintViewProps {
  idea: Idea
}

export default function BlueprintView({ idea }: BlueprintViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'p0' | 'p1'>('all')
  const [completedPhases, setCompletedPhases] = useState<number[]>([0, 1])
  const [openVivaIndex, setOpenVivaIndex] = useState<number | null>(0)
  const [isSaved, setIsSaved] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [improvements, setImprovements] = useState(idea.improvementsDetailed)
  const [improvePrompt, setImprovePrompt] = useState('')
  const [isImproving, setIsImproving] = useState(false)
  const [improveFeedback, setImproveFeedback] = useState<string | null>(null)

  async function togglePhase(index: number) {
    const isChecked = completedPhases.includes(index)
    const nextPhases = isChecked
      ? completedPhases.filter((i) => i !== index)
      : [...completedPhases, index]
    setCompletedPhases(nextPhases)

    try {
      await apiClient.updateRoadmapTask(
        idea.slug,
        `phase-${index}`,
        isChecked ? 'TODO' : 'COMPLETED'
      )
    } catch {
      // offline fallback
    }
  }

  async function toggleSave() {
    const nextSaved = !isSaved
    setIsSaved(nextSaved)
    try {
      await apiClient.saveProject(idea.slug, nextSaved)
    } catch {
      // offline fallback
    }
  }

  async function handleImproveSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!improvePrompt.trim()) return

    setIsImproving(true)
    setImproveFeedback(null)

    try {
      const res = await apiClient.improveProject(idea.slug, improvePrompt.trim())
      const newItem = {
        area: (res.difficulty === 'Advanced' ? 'Academic Rigor' : 'Scalability') as
          | 'Academic Rigor'
          | 'Scalability',
        suggestion: `${res.improvement}: ${res.whyItHelps}`,
        implementationTip: res.implementationSteps.join('; '),
      }
      setImprovements((prev) => [newItem, ...prev])
      setImproveFeedback(`Gemini applied: "${res.improvement}" (${res.expectedImpact})`)
      setImprovePrompt('')
    } catch {
      setImproveFeedback('Could not connect to Gemini service. Check API key.')
    } finally {
      setIsImproving(false)
    }
  }

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
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

    showToast('Capstone Synopsis downloaded successfully (.md formatted for university submission).')
  }

  function handleDownloadStarterKit() {
    const isPython = idea.stack.some((s) => s.tools.some((t) => t.toLowerCase().includes('python') || t.toLowerCase().includes('fastapi')))
    
    const readmeContent = `# ${idea.title} — Starter Scaffold
${idea.overview}

## 🚀 Quick Setup
${isPython ? '```bash\npython -m venv venv\nsource venv/bin/activate # or venv\\Scripts\\activate on Windows\npip install -r requirements.txt\npython main.py\n```' : '```bash\nnpm install\nnpm run dev\n```'}

## 📦 Prescribed Stack
${idea.stack.map(s => `- **${s.group}**: ${s.tools.join(', ')} (${s.justification})`).join('\n')}
`
    const scriptContent = isPython
      ? `# ${idea.title} Entrypoint\nimport sys\n\ndef main():\n    print("Starting ${idea.title} engine...")\n    # TODO: Implement ${idea.featuresDetailed[0]?.name || 'core feature'}\n\nif __name__ == "__main__":\n    main()\n`
      : `// ${idea.title} Entrypoint\nconsole.log("Starting ${idea.title} service...");\n`

    const starterBundle = `${readmeContent}\n\n---\n\n### // main.py / index.js\n${scriptContent}`
    
    const blob = new Blob([starterBundle], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${idea.slug}-starter-scaffold.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showToast('Starter Scaffold generated and downloaded successfully!')
  }

  return (
    <div className="blueprint-container">
      {toastMessage && (
        <div className="download-toast-banner animate-in">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <BlueprintHeader
        idea={idea}
        isSaved={isSaved}
        onToggleSave={toggleSave}
        onDownloadSynopsis={handleDownloadSynopsis}
        onDownloadStarterKit={handleDownloadStarterKit}
      />

      <section className="section-wrap detail-grid">
        <div className="detail-main">
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

          <BlueprintFeatures
            features={idea.featuresDetailed}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <BlueprintRoadmap
            roadmap={idea.roadmap}
            completedPhases={completedPhases}
            estimatedWeeks={idea.estimatedWeeks}
            onTogglePhase={togglePhase}
          />
        </div>

        <aside className="detail-side">
          <BlueprintStack stack={idea.stack} />

          <BlueprintImprovements
            improvements={improvements}
            improvePrompt={improvePrompt}
            isImproving={isImproving}
            improveFeedback={improveFeedback}
            onPromptChange={setImprovePrompt}
            onSubmit={handleImproveSubmit}
          />

          <BlueprintVivaKit
            projectId={idea.slug}
            vivaQuestions={idea.vivaQuestions}
            openVivaIndex={openVivaIndex}
            onToggleIndex={setOpenVivaIndex}
          />
        </aside>
      </section>
    </div>
  )
}
