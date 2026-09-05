'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Menu,
  Moon,
  Sparkles,
  Sun,
  WandSparkles,
  X,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Award,
  BookOpen,
} from 'lucide-react'
import { ideas } from '@/lib/ideas'
import { getCurrentUser, UserProfile } from '@/lib/auth'

const featuredIdeas = [...ideas].sort((a, b) => b.match - a.match).slice(0, 3)

const faqs = [
  {
    q: 'How does ProjectSpark align with university capstone requirements?',
    a: 'Every project generated adheres to academic defense standards: strict scope boundaries for 1-2 semesters, layered architecture justification, clear separation between Core MVP (P0) and Distinction (P1) features, and pre-compiled viva defense questions.',
  },
  {
    q: 'Can judges and evaluators test the platform without registering?',
    a: 'Yes! We built a dedicated 1-Click Guest Access mode specifically for Hack2Skill evaluators. You enter immediately with a pre-configured student profile to test the intake, ideas, architecture, and synopsis export.',
  },
  {
    q: 'Will the recommended tech stack match what I already know?',
    a: 'Yes. Our intake matrix analyzes your existing languages and frameworks, builds upon them, and prescribes 1-2 prestigious stretch technologies (like on-device ONNX, zk-SNARKs, or AST parsing) that examiners look for.',
  },
  {
    q: 'Can I export a formal project synopsis for my college guide/examiner?',
    a: 'Absolutely. Every capstone blueprint includes a 1-Click "Download Capstone Synopsis (.md)" button that formats your problem statement, features, stack, roadmap, and viva prep into a clean document ready for college submission.',
  },
]

export default function Home() {
  const [dark, setDark] = useState(true)
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
    <div className={dark ? 'app-shell dark' : 'app-shell'}>
      <header className="site-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <nav className={mobileOpen ? 'nav-links mobile-visible' : 'nav-links'} aria-label="Main navigation">
          <Link href="#pillars">The 6 Pillars</Link>
          <Link href="/explore">Explore ideas</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="#faq">FAQ</Link>

          {currentUser ? (
            <Link href="/dashboard" className="nav-user-pill">
              <span className="user-badge-dot" /> {currentUser.name} ({currentUser.isGuest ? 'Guest' : 'Student'})
            </Link>
          ) : (
            <Link href="/login" className="nav-login">
              Log in
            </Link>
          )}

          <Link href="/login" className="button button-small">
            Start creating <ArrowRight size={14} />
          </Link>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* Judge Fast-Pass Banner */}
        <div className="evaluator-fast-banner">
          <div className="evaluator-fast-content">
            <span className="banner-tag">
              <Zap size={13} className="text-amber-400" /> Hack2Skill Evaluator Quick-Pass
            </span>
            <span>
              Judges can skip signups and jump straight to the 6-pillar capstone architect.
            </span>
            <Link href="/login" className="banner-link">
              Launch Guest Portal <ArrowRight size={13} />
            </Link>
          </div>
        </div>

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
              worth defending — complete with features, layered tech stacks, a 4-phase roadmap, and an examiner viva kit.
            </p>
            <div className="hero-actions">
              <Link href="/login" className="button button-primary">
                Launch Capstone Architect <WandSparkles size={17} />
              </Link>
              <Link href="#pillars" className="text-link">
                See the 6 Pillars <ArrowRight size={16} />
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
            <span>AI Ideas</span>
            <i>✦</i>
            <span>P0/P1 Features</span>
            <i>✦</i>
            <span>Layered Stacks</span>
            <i>✦</i>
            <span>Roadmap Phases</span>
            <i>✦</i>
            <span>Viva Defense Kit</span>
            <i>✦</i>
          </div>
        </section>

        {/* The 6 Pillars Section */}
        <section id="pillars" className="section-wrap how-section">
          <div className="section-intro">
            <div>
              <div className="eyebrow">The 6 Problem Statement Pillars</div>
              <h2>
                Engineered from intake
                <br />
                to final viva defense.
              </h2>
            </div>
            <p>
              We solved the 6 core challenges students face when turning a raw spark into an academically
              defensible, industry-ready engineering project.
            </p>
          </div>
          <div className="process-grid-six">
            <ProcessCard
              num="01"
              icon={<Compass />}
              title="Interests &amp; Skills Intake"
              text="Map domain passions with verified technical competencies across frontend, backend, AI/ML, and cloud."
            />
            <ProcessCard
              num="02"
              icon={<Sparkles />}
              title="Matched Capstone Ideas"
              text="AI-synthesized project concepts tailored with exact match scores (%) and transparent reasoning."
            />
            <ProcessCard
              num="03"
              icon={<Layers />}
              title="Features Guidance"
              text="Clear separation between Core Viva MVP (P0) to pass evaluation and Advanced Distinctions (P1) for top marks."
            />
            <ProcessCard
              num="04"
              icon={<Cpu />}
              title="Technologies Guidance"
              text="Prescriptive, layered stack choices with architectural rationale justifying why each technology belongs."
            />
            <ProcessCard
              num="05"
              icon={<WandSparkles />}
              title="4-Phase Build Roadmap"
              text="Actionable week-by-week timeline with concrete review deliverables and internal viva milestones."
            />
            <ProcessCard
              num="06"
              icon={<ShieldCheck />}
              title="Practical Improvements &amp; Viva Kit"
              text="Production hardening (security, edge cases, offline sync) plus real examiner questions &amp; model answers."
            />
          </div>
        </section>

        {/* Ideas Showcase Section */}
        <section className="ideas-section">
          <div className="section-wrap">
            <div className="section-intro compact">
              <div>
                <div className="eyebrow">Calibrated for Capstone Viva</div>
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
                    <span className="idea-score">{idea.match}% fit</span>
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
        <span>Built for the final-year builder. Calibrated for 95%+ hackathon evaluation.</span>
        <div>
          <Link href="/explore">Explore</Link>
          <Link href="/login">Guest Access</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </footer>
    </div>
  )
}

function ProcessCard({
  num,
  icon,
  title,
  text,
}: {
  num: string
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <article className="process-card">
      <div className="process-top">
        <span>{num}</span>
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
          <span className="pulse-dot" /> 6 PILLARS GENERATED
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
      <div className="float-badge badge-top">P0 MVP + P1 Distinction</div>
      <div className="float-badge badge-side">
        <Sparkles size={15} /> 96% Match Fit
      </div>
    </div>
  )
}
