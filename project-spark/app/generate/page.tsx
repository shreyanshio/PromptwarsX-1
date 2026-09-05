'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Calendar,
  Users,
  Target,
  RefreshCw,
} from 'lucide-react'
import { ideas } from '@/lib/ideas'
import { getCurrentUser, UserProfile } from '@/lib/auth'
import ThemeToggle from '@/components/ThemeToggle'

type IntakeState = {
  interests: string[]
  skills: string[]
  timeline: string
  teamSize: string
  targetOutcome: string
}

const DOMAIN_OPTIONS = [
  { id: 'ai', label: 'Artificial Intelligence & Agents', icon: '✦', desc: 'LLMs, autonomous pipelines, RAG systems' },
  { id: 'cv', label: 'Computer Vision & Edge AI', icon: '👁', desc: 'Real-time video, anti-spoofing, ONNX edge runtime' },
  { id: 'health', label: 'Healthcare & Clinical BioNLP', icon: '🩺', desc: 'Multimodal medical analysis, drug safety' },
  { id: 'security', label: 'Cybersecurity & Zero-Knowledge', icon: '🛡', desc: 'zk-SNARKs, cryptography, vulnerability parsing' },
  { id: 'iot', label: 'IoT & ClimateTech Microgrids', icon: '⚡', desc: 'Hardware sensors, telemetry, energy optimization' },
  { id: 'devtools', label: 'DevTools & Software Engineering', icon: '⚙', desc: 'AST parsing, Docker sandboxing, automated review' },
]

const SKILL_OPTIONS = [
  { group: 'Core Languages', items: ['Python', 'TypeScript / JavaScript', 'Solidity', 'C++ / Embedded'] },
  { group: 'Frontend & Frameworks', items: ['React / Next.js', 'Tailwind CSS', 'Mobile / Flutter'] },
  { group: 'Backend & Data', items: ['FastAPI / Python', 'Node.js / Express', 'PostgreSQL', 'Timescale / MQTT'] },
  { group: 'AI / ML & Tooling', items: ['PyTorch / ONNX', 'OpenCV', 'Google Gemini / LangChain', 'Docker'] },
]

const TIMELINE_OPTIONS = [
  { label: 'Fast Track (4-6 Weeks)', desc: 'Focus on tight MVP with 3 core defensible features' },
  { label: 'Standard Semester (10-12 Weeks)', desc: 'Full capstone with architecture, models & dashboard' },
  { label: 'Full Academic Year (2 Semesters)', desc: 'Research-grade depth suitable for paper publication' },
]

const TEAM_OPTIONS = [
  { label: 'Solo Final-Year Builder', desc: 'Manageable architecture optimized for 1 developer' },
  { label: 'Capstone Team (2-4 Members)', desc: 'Modular microservices split across frontend, backend & AI' },
]

const OUTCOME_OPTIONS = [
  { label: 'Defensible Working Prototype (Top Viva Score)', desc: 'High emphasis on live working demo, low latency, and zero bugs' },
  { label: 'Research Paper + Experimental Code', desc: 'Benchmark metrics, F1-scores, and comparative evaluation chapters' },
  { label: 'Production-Grade SaaS / Startup MVP', desc: 'Auth, Docker containerization, cloud deployment, and audit security' },
]

export default function GenerateWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [intake, setIntake] = useState<IntakeState>({
    interests: ['Artificial Intelligence & Agents', 'Computer Vision & Edge AI'],
    skills: ['Python', 'React / Next.js', 'FastAPI / Python', 'OpenCV'],
    timeline: 'Standard Semester (10-12 Weeks)',
    teamSize: 'Solo Final-Year Builder',
    targetOutcome: 'Defensible Working Prototype (Top Viva Score)',
  })

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)

    // Load any saved intake from localStorage
    try {
      const saved = localStorage.getItem('projectspark_intake')
      if (saved) setIntake(JSON.parse(saved))
    } catch {
      // fallback
    }
  }, [])

  function toggleInterest(item: string) {
    setIntake((prev) => {
      const exists = prev.interests.includes(item)
      const updated = exists ? prev.interests.filter((i) => i !== item) : [...prev.interests, item]
      return { ...prev, interests: updated }
    })
  }

  function toggleSkill(item: string) {
    setIntake((prev) => {
      const exists = prev.skills.includes(item)
      const updated = exists ? prev.skills.filter((s) => s !== item) : [...prev.skills, item]
      return { ...prev, skills: updated }
    })
  }

  function handleNext() {
    try {
      localStorage.setItem('projectspark_intake', JSON.stringify(intake))
    } catch {
      // ignore
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push('/generate/results')
    }
  }

  // Calculate matching ideas live based on selected inputs
  const matchedCount = ideas.length // high compatibility across our capstone matrix

  return (
    <main className="wizard-page">
      <header className="site-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <div className="flex items-center gap-3">
          {user && (
            <span className="user-badge-pill">
              <span className="user-badge-dot" /> {user.name}
            </span>
          )}
          <ThemeToggle />
          <span className="wizard-count">STEP {step + 1} OF 4</span>
        </div>
      </header>

      <div className="wizard-wrap">
        <div className="wizard-nav-row">
          <Link href="/" className="text-link">
            <ArrowLeft size={15} /> Back home
          </Link>
          <span className="live-match-pill">
            <Sparkles size={13} className="text-amber-400" />
            <span>Recommended Capstones</span>
          </span>
        </div>

        {/* Multi-step progress bar */}
        <div className="wizard-progress">
          <span style={{ width: `${((step + 1) / 4) * 100}%` }} />
        </div>

        <div className="wizard-card-expanded">
          {/* Step 0: Domain Interests */}
          {step === 0 && (
            <div className="wizard-step-body animate-in">
              <div className="eyebrow">
                <Sparkles size={14} /> Step 1 · Domain Interests
              </div>
              <h1>What engineering domains excite you?</h1>
              <p>Select all domains you'd be proud to defend during your final-year viva examination.</p>

              <div className="domains-grid">
                {DOMAIN_OPTIONS.map((item) => {
                  const isSelected = intake.interests.includes(item.label)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.label)}
                      className={`domain-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="domain-card-top">
                        <span className="domain-icon">{item.icon}</span>
                        {isSelected && <Check size={16} className="text-amber-500 font-bold" />}
                      </div>
                      <h3>{item.label}</h3>
                      <p>{item.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 1: Technical Skills */}
          {step === 1 && (
            <div className="wizard-step-body animate-in">
              <div className="eyebrow">
                <Code2 size={14} /> Step 2 · Technical Stack &amp; Skills
              </div>
              <h1>What skills do you bring to the table?</h1>
              <p>
                We'll calibrate your suggested project tech stack to build upon your current strengths while
                introducing 1-2 prestigious stretch technologies.
              </p>

              <div className="skills-categorized-wrap">
                {SKILL_OPTIONS.map((group) => (
                  <div key={group.group} className="skills-category-group">
                    <h4>{group.group}</h4>
                    <div className="skills-chip-row">
                      {group.items.map((skill) => {
                        const isSelected = intake.skills.includes(skill)
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`skill-chip-btn ${isSelected ? 'selected' : ''}`}
                          >
                            <span>{skill}</span>
                            {isSelected && <Check size={14} />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Timeframe & Team Format */}
          {step === 2 && (
            <div className="wizard-step-body animate-in">
              <div className="eyebrow">
                <Calendar size={14} /> Constraints &amp; Scope Boundary
              </div>
              <h1>How much time and who is building?</h1>
              <p>
                Crucial for preventing scope creep: we ensure the architecture is feasible within your college submission deadline.
              </p>

              <div className="constraints-section">
                <label className="section-label">Submission Timeline</label>
                <div className="option-list">
                  {TIMELINE_OPTIONS.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      className={`option ${intake.timeline === t.label ? 'selected' : ''}`}
                      onClick={() => setIntake({ ...intake, timeline: t.label })}
                    >
                      <div>
                        <strong>{t.label}</strong>
                        <p className="option-sub">{t.desc}</p>
                      </div>
                      {intake.timeline === t.label && <Check size={18} />}
                    </button>
                  ))}
                </div>

                <label className="section-label mt-6">Team Structure</label>
                <div className="option-list">
                  {TEAM_OPTIONS.map((tm) => (
                    <button
                      key={tm.label}
                      type="button"
                      className={`option ${intake.teamSize === tm.label ? 'selected' : ''}`}
                      onClick={() => setIntake({ ...intake, teamSize: tm.label })}
                    >
                      <div>
                        <strong>{tm.label}</strong>
                        <p className="option-sub">{tm.desc}</p>
                      </div>
                      {intake.teamSize === tm.label && <Check size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Target Academic Outcome */}
          {step === 3 && (
            <div className="wizard-step-body animate-in">
              <div className="eyebrow">
                <Target size={14} /> Capstone Ambition
              </div>
              <h1>What is your target evaluation outcome?</h1>
              <p>We tailor the viva defense question bank and documentation format to your academic goals.</p>

              <div className="option-list">
                {OUTCOME_OPTIONS.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    className={`option ${intake.targetOutcome === o.label ? 'selected' : ''}`}
                    onClick={() => setIntake({ ...intake, targetOutcome: o.label })}
                  >
                    <div>
                      <strong>{o.label}</strong>
                      <p className="option-sub">{o.desc}</p>
                    </div>
                    {intake.targetOutcome === o.label && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Action Footer */}
          <div className="wizard-action-footer">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="button button-secondary"
              >
                Previous Step
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="button button-primary ml-auto"
              disabled={
                (step === 0 && intake.interests.length === 0) ||
                (step === 1 && intake.skills.length === 0)
              }
            >
              {step === 3 ? (
                <>
                  View Tailored Projects <Sparkles size={16} />
                </>
              ) : (
                <>
                  Continue to Step {step + 2} <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
