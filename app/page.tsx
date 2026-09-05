'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Menu,
  Sparkles,
  WandSparkles,
  X,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react'
import { ideas } from '@/lib/ideas'
import { getCurrentUser, UserProfile } from '@/lib/auth'
import ThemeToggle from '@/components/ThemeToggle'

const featuredIdeas = [...ideas].slice(0, 3)

const faqs = [
  {
    q: 'How does ProjectSpark align with university capstone requirements?',
    a: 'Every project blueprint adheres to academic defense standards: strict scope boundaries for 1-2 semesters, layered architecture justification, clear separation between Core MVP and Distinction features, and pre-compiled viva defense questions.',
  },
  {
    q: 'Can I explore blueprints without creating an account?',
    a: 'Yes, you can launch Demo Mode with one click from the sign-in page to explore sample capstone architectures, roadmap timelines, and synopsis exports immediately.',
  },
  {
    q: 'Will the recommended tech stack match what I already know?',
    a: 'Yes. The intake matrix analyzes your existing languages and frameworks, builds upon them, and prescribes 1-2 prestigious stretch technologies (like on-device ONNX, zk-SNARKs, or AST parsing) that examiners look for.',
  },
  {
    q: 'Can I export a formal project synopsis for my college guide/examiner?',
    a: 'Absolutely. Every capstone blueprint includes a 1-Click "Download Capstone Synopsis (.md)" button that formats your problem statement, features, stack, roadmap, and viva prep into a clean document ready for college submission.',
  },
]

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setCurrentUser(existing)
  }, [])

  return (
    <div className="app-shell">
      <header className="site-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <nav className={mobileOpen ? 'nav-links mobile-visible' : 'nav-links'} aria-label="Main navigation">
          <Link href="#how">How it works</Link>
          <Link href="/explore">Explore ideas</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="#faq">FAQ</Link>

          {currentUser ? (
            <Link href="/dashboard" className="nav-user-pill">
              <span className="user-badge-dot" /> {currentUser.name}
            </Link>
          ) : (
            <Link href="/login" className="nav-login">
              Sign in
            </Link>
          )}

          <Link href="/generate" className="button button-small">
            Start building <ArrowRight size={14} />
          </Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" /> Built for final-year engineering builders
            </div>
            <h1>
              Turn your final year
              <br />
              <em>into a defensible build.</em>
            </h1>
            <p>
              ProjectSpark analyzes your interests and technical skills to architect a capstone project
              worth defending — complete with features, layered tech stacks, a step-by-step roadmap, and an examiner viva kit.
            </p>
            <div className="hero-actions">
              <Link href="/generate" className="button button-primary">
                Launch Project Architect <WandSparkles size={17} />
              </Link>
              <Link href="#how" className="text-link">
                See how it works <ArrowRight size={16} />
              </Link>
            </div>
            <div className="trust-line">
              <div className="avatar-stack">
                <span>RM</span>
                <span>AK</span>
                <span>SP</span>
                <span>+</span>
              </div>
              <span>Calibrated for engineering college viva &amp; evaluation rubrics</span>
            </div>
          </div>
          <HeroScene />
        </section>

        <section className="marquee-band">
          <div className="marquee-content">
            <span>Interests &amp; Skills</span>
            <i>✦</i>
            <span>Capstone Blueprints</span>
            <i>✦</i>
            <span>Core MVP Features</span>
            <i>✦</i>
            <span>Layered Stacks</span>
            <i>✦</i>
            <span>Milestone Roadmaps</span>
            <i>✦</i>
            <span>Viva Defense Prep</span>
            <i>✦</i>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how" className="section-wrap how-section">
          <div className="section-intro">
            <div>
              <div className="eyebrow">From Concept to Defense</div>
              <h2>
                A Complete Architecture
                <br />
                For Your Capstone Build.
              </h2>
            </div>
            <p>
              Everything you need to turn raw thoughts into an academically defensible,
              production-ready engineering submission.
            </p>
          </div>
          <div className="process-grid">
            <ProcessCard
              icon={<Compass />}
              title="Skills &amp; Interest Profile"
              text="Map your domain passions with verified technical competencies across frontend, backend, AI/ML, and cloud."
            />
            <ProcessCard
              icon={<Sparkles />}
              title="Tailored Project Discovery"
              text="Discover feasible, novel capstone concepts matched to your background, timeframe, and academic ambition."
            />
            <ProcessCard
              icon={<Layers />}
              title="Scope &amp; Feature Breakdown"
              text="Clear separation between Core MVP to pass evaluation and Advanced Distinctions for top grades."
            />
            <ProcessCard
              icon={<Cpu />}
              title="Layered Tech Stack"
              text="Prescriptive architecture recommendations with clear rationale justifying why each technology is used."
            />
            <ProcessCard
              icon={<WandSparkles />}
              title="Development Roadmap"
              text="Actionable phase-by-phase timeline with concrete review deliverables and internal viva milestones."
            />
            <ProcessCard
              icon={<ShieldCheck />}
              title="Production Hardening &amp; Viva Kit"
              text="Production guidelines (security, edge cases, offline resilience) plus examiner questions &amp; answers."
            />
          </div>
        </section>

        {/* Ideas Showcase Section */}
        <section className="ideas-section">
          <div className="section-wrap">
            <div className="section-intro compact">
              <div>
                <div className="eyebrow">Curated Capstones</div>
                <h2>
                  Pre-Engineered Ideas
                  <br />
                  Ready to Defend.
                </h2>
              </div>
              <Link href="/explore" className="text-link">
                Explore all ideas <ArrowRight size={16} />
              </Link>
            </div>
            <div className="idea-grid">
              {featuredIdeas.map((idea) => (
                <article key={idea.slug} className={`idea-card accent-${idea.accent}`}>
                  <div className="idea-meta">
                    <span className="tag">{idea.category}</span>
                    <span className="idea-score">{idea.difficulty}</span>
                  </div>
                  <h3>{idea.title}</h3>
                  <p>{idea.tagline}</p>
                  <div className="idea-footer">
                    <span>{idea.estimatedWeeks} Weeks Track</span>
                    <Link href={`/generate/results/${idea.slug}`} aria-label={`Explore ${idea.title}`}>
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap quote-section">
          <div className="quote-mark">“</div>
          <blockquote>
            ProjectSpark didn't just give our team an idea — it gave us a layered architecture we could defend
            in front of external viva examiners and a roadmap we finished 2 weeks early.
          </blockquote>
          <div className="quote-person">
            <span className="person-avatar">AI</span>
            <div>
              <strong>Ananya Iyer &amp; Team</strong>
              <span>B.Tech CSE, Capstone Gold Medalist</span>
            </div>
          </div>
        </section>

        <section id="faq" className="section-wrap faq-section">
          <div className="section-intro compact">
            <div>
              <div className="eyebrow">Questions, answered</div>
              <h2>
                Good to know
                <br />
                before you start.
              </h2>
            </div>
            <p>Ready to build? Here is everything examiners and students ask us.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={faq.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={openFaq === i ? 'rotate' : ''} size={19} />
                </button>
                {openFaq === i && <p>{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="newsletter-wrap">
          <div className="newsletter">
            <div>
              <div className="eyebrow">Instant Capstone Synopsis</div>
              <h2>
                Export your project
                <br />
                synopsis in seconds.
              </h2>
              <p>Download university-formatted Markdown &amp; PDF blueprints directly.</p>
            </div>
            {sent ? (
              <div className="sent-state">
                <Check size={18} /> You are on the priority build list.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSent(true)
                }}
              >
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="button button-primary" type="submit">
                  Get Guide <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <Link href="/" className="brand-mark">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <span>Built for final-year engineering builders and capstone defenses.</span>
        <div>
          <Link href="/explore">Explore</Link>
          <Link href="/login">Demo Access</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </footer>
    </div>
  )
}

function ProcessCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <article className="process-card">
      <div className="process-top">
        <div className="process-icon">{icon}</div>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function HeroScene() {
  return (
    <div className="hero-scene" aria-label="Interactive illustration of a project idea taking shape">
      <div className="scene-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="scene-card card-back">
        <small>STUDENT INPUT</small>
        <strong>“Python + OpenCV + Edge AI for attendance”</strong>
      </div>
      <div className="scene-card card-front">
        <div className="card-label">
          <span className="pulse-dot" /> CAPSTONE BLUEPRINT
        </div>
        <h3>
          AttendAI
          <br />
          <em>Edge Vision Core</em>
        </h3>
        <p>Anti-spoofing liveness checks with zero biometric cloud leakage.</p>
        <div className="mini-progress">
          <span />
        </div>
        <small>Phase 02 of 04 · Recognition Engine</small>
      </div>
      <div className="float-badge badge-top">Core MVP + Distinction</div>
      <div className="float-badge badge-side">
        <Sparkles size={15} /> Recommended Stack
      </div>
    </div>
  )
}
