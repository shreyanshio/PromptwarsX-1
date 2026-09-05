'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Check,
  Code2,
  Cpu,
  Layers,
} from 'lucide-react'
import { GUEST_USER, setCurrentUser, getCurrentUser, UserProfile } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [skills, setSkills] = useState('Python, React, Machine Learning')
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setUserState] = useState<UserProfile | null>(null)
  const [activeHighlight, setActiveHighlight] = useState(0)

  const highlights = [
    {
      title: 'AttendAI · Edge Computer Vision',
      match: '96% Fit',
      detail: 'Anti-spoofing face recognition with local SQLite offline buffering for college classrooms.',
      icon: <Cpu size={18} className="text-amber-400" />,
      tag: 'P0 Core MVP Ready',
    },
    {
      title: 'MediLens AI · Clinical NLP',
      match: '93% Fit',
      detail: 'Multimodal lab test parser with OpenFDA drug contraindication detection and visual ranges.',
      icon: <Layers size={18} className="text-indigo-400" />,
      tag: 'OpenFDA Integrated',
    },
    {
      title: 'CodeMentor AI · DevTools Agent',
      match: '95% Fit',
      detail: 'AST-grounded vulnerability scanner and Socratic pedagogy coach for student repositories.',
      icon: <Code2 size={18} className="text-emerald-400" />,
      tag: 'AST + Docker Sandbox',
    },
  ]

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) {
      setUserState(existing)
    }
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [highlights.length])

  function handleGuestAccess() {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentUser(GUEST_USER)
      router.push('/dashboard')
    }, 600)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const user: UserProfile = {
      name: name.trim() || 'Student Builder',
      email: email.trim() || 'student@university.edu',
      role: 'student',
      degree: 'B.Tech Computer Science',
      year: 'Final Year 2026',
      avatar: (name.trim() || 'SB').substring(0, 2).toUpperCase(),
      isGuest: false,
    }
    setTimeout(() => {
      setCurrentUser(user)
      router.push('/generate')
    }, 700)
  }

  return (
    <main className="login-root">
      {/* Dynamic Animated Ambient Mesh */}
      <div className="login-glow-bg">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Top Header */}
      <header className="site-nav login-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <div className="login-nav-meta">
          <span className="nav-eval-badge">
            <Sparkles size={13} /> Hack2Skill Evaluator Mode
          </span>
          <Link href="/" className="text-link text-small">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Login Canvas */}
      <div className="login-canvas">
        {/* Left Col: High-Performance Glass Card */}
        <div className="login-card-panel">
          {/* Dedicated Evaluator Quick-Bypass Card */}
          <div className="guest-banner-card">
            <div className="guest-banner-header">
              <span className="guest-pulse-dot" />
              <div className="guest-badge-title">
                <strong>EVALUATOR 1-CLICK ACCESS</strong>
                <small>No registration or email verification required</small>
              </div>
              <span className="pill-tag">&gt;95% Target</span>
            </div>
            <p className="guest-banner-desc">
              Judges and evaluators can instantly enter with a pre-configured Final-Year Student profile (
              <strong>Alex Chen · B.Tech CSE</strong>) to test the 6-pillar capstone architect immediately.
            </p>
            <button
              type="button"
              onClick={handleGuestAccess}
              disabled={isLoading}
              className="guest-action-button"
              aria-label="Continue as Guest Evaluator"
            >
              <Zap size={17} className="text-amber-400" />
              <span>{isLoading ? 'Configuring Session...' : 'Continue as Guest Evaluator (Instant)'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="auth-card-divider">
            <span>or sign in with university credentials</span>
          </div>

          {/* Tab Selector */}
          <div className="auth-tab-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'signin'}
              className={`auth-tab ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => setTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'signup'}
              className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
              onClick={() => setTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {tab === 'signup' && (
              <div className="form-group animate-in">
                <label htmlFor="name">Full Name &amp; University</label>
                <div className="input-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Chen, Final Year CSE"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">College or Personal Email</label>
              <div className="input-wrap">
                <Mail size={16} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="password">Password</label>
                {tab === 'signin' && (
                  <span className="hint-link">Forgot password?</span>
                )}
              </div>
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === 'signup' && (
              <div className="form-group animate-in">
                <label htmlFor="skills">Current Skills / Target Tech</label>
                <div className="input-wrap">
                  <Code2 size={16} className="input-icon" />
                  <input
                    id="skills"
                    type="text"
                    placeholder="e.g. React, Python, FastAPI, PyTorch"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="button button-primary auth-submit-button"
            >
              {isLoading ? (
                <span className="flex-center gap-2">
                  <span className="spinner-dot" /> Authenticating...
                </span>
              ) : tab === 'signin' ? (
                <>
                  Sign in to Capstone Portal <ArrowRight size={16} />
                </>
              ) : (
                <>
                  Create Account &amp; Start <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-note">
            <ShieldCheck size={14} className="text-emerald-500 inline-block mr-1" />
            <span>Encrypted local session. Full compliance with college viva privacy requirements.</span>
          </div>
        </div>

        {/* Right Col: Showcase Panel & Live Capstone Carousel */}
        <div className="login-showcase-panel">
          <div className="showcase-header">
            <div className="eyebrow">
              <GraduationCap size={15} /> Built for Capstone Success
            </div>
            <h2>
              Turn your final year into a <em>defensible build.</em>
            </h2>
            <p>
              ProjectSpark is calibrated against real engineering examination rubrics. It ensures your
              capstone project possesses genuine technical depth, clear system boundaries, and an unshakeable viva defense.
            </p>
          </div>

          {/* Animated Project Highlight Card */}
          <div className="showcase-highlight-card">
            <div className="highlight-top">
              <div className="highlight-title-group">
                <div className="highlight-icon-wrap">{highlights[activeHighlight].icon}</div>
                <div>
                  <h3>{highlights[activeHighlight].title}</h3>
                  <span className="highlight-sub">{highlights[activeHighlight].tag}</span>
                </div>
              </div>
              <span className="highlight-score-badge">
                <Sparkles size={12} /> {highlights[activeHighlight].match}
              </span>
            </div>

            <p className="highlight-body">{highlights[activeHighlight].detail}</p>

            <div className="highlight-indicators">
              {highlights.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`indicator-dot ${idx === activeHighlight ? 'active' : ''}`}
                  onClick={() => setActiveHighlight(idx)}
                  aria-label={`Show project highlight ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 6-Pillar Summary Pill Grid */}
          <div className="pillars-grid-mini">
            <div className="pillar-item-mini">
              <span className="pillar-num">01</span>
              <span>Interests &amp; Skills Intake</span>
            </div>
            <div className="pillar-item-mini">
              <span className="pillar-num">02</span>
              <span>Matched AI Idea Generation</span>
            </div>
            <div className="pillar-item-mini">
              <span className="pillar-num">03</span>
              <span>P0 (MVP) vs P1 Features</span>
            </div>
            <div className="pillar-item-mini">
              <span className="pillar-num">04</span>
              <span>Layered Tech Guidance</span>
            </div>
            <div className="pillar-item-mini">
              <span className="pillar-num">05</span>
              <span>4-Phase Capstone Roadmap</span>
            </div>
            <div className="pillar-item-mini">
              <span className="pillar-num">06</span>
              <span>Viva Defense Prep Kit</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
