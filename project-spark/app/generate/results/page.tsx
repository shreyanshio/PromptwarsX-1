'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  SlidersHorizontal,
  Sparkles,
  Check,
  Cpu,
  Layers,
  Clock,
  Award,
} from 'lucide-react'
import { ideas, Idea } from '@/lib/ideas'
import { getCurrentUser, UserProfile } from '@/lib/auth'
import ThemeToggle from '@/components/ThemeToggle'

export default function ResultsPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [savedSlugs, setSavedSlugs] = useState<string[]>(['attendai'])

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)

    try {
      const saved = localStorage.getItem('projectspark_saved_slugs')
      if (saved) setSavedSlugs(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  function toggleSave(slug: string) {
    setSavedSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      try {
        localStorage.setItem('projectspark_saved_slugs', JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const categories = ['All', 'Computer Vision & Edge AI', 'Healthcare & NLP', 'Cybersecurity & Web3', 'IoT & ClimateTech', 'DevTools & AI Agents']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredIdeas = ideas.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory
    const matchesDiff = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty
    return matchesCat && matchesDiff
  })

  return (
    <main className="sub-page">
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
          <Link href="/dashboard" className="text-link text-small">
            Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="section-wrap results-head">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <Link href="/generate" className="text-link">
            <ArrowLeft size={15} /> Refine your interests &amp; skills
          </Link>
          <span className="live-match-pill">
            <Sparkles size={12} className="text-amber-500" />
            <span>Curated Architectures</span>
          </span>
        </div>

        <h1>Tailored Capstones Worth Defending.</h1>
        <p>
          Architected based on your domain interests, technical skills, and college viva criteria.
          Every project includes features, stack justification, build phases, and viva prep.
        </p>

        {/* Filters */}
        <div className="results-filter-bar">
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="filter-chips">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={`filter-chip ${selectedCategory === c ? 'active' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group mt-2">
            <span className="filter-label">Difficulty:</span>
            <div className="filter-chips">
              {difficulties.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDifficulty(d)}
                  className={`filter-chip ${selectedDifficulty === d ? 'active' : ''}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results List */}
      <section className="section-wrap results-list">
        {filteredIdeas.length === 0 ? (
          <div className="results-empty-state">
            <h3>No capstone ideas match this specific filter combination</h3>
            <p>Try resetting the category or difficulty filters to see more recommendations.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSelectedDifficulty('All')
              }}
              className="button button-primary button-small mt-3"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredIdeas.map((idea, i) => {
            const isSaved = savedSlugs.includes(idea.slug)
            return (
              <article className="result-card-rich" key={idea.slug}>
                <div className="result-card-sidebar">
                  <span className="result-index">0{i + 1}</span>
                  <span className="live-match-pill">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>Recommended</span>
                  </span>
                </div>

                <div className="result-card-main">
                  <div className="result-card-header">
                    <span className={`tag accent-${idea.accent}`}>{idea.category}</span>
                    <span className="difficulty-tag">{idea.difficulty}</span>
                    <span className="meta-time">
                      <Clock size={13} /> {idea.estimatedWeeks} Weeks
                    </span>
                  </div>

                  <h2>
                    <Link href={`/generate/results/${idea.slug}`}>{idea.title}</Link>
                  </h2>
                  <p className="result-tagline">{idea.tagline}</p>

                  {/* Why this fits tag */}
                  <div className="match-rationale-pill">
                    <span className="rationale-bullet">✦</span>
                    <span>{idea.matchReason}</span>
                  </div>

                  {/* Tech stack highlights */}
                  <div className="result-stack-preview">
                    {idea.stack.flatMap((s) => s.tools).slice(0, 4).map((tool) => (
                      <span key={tool} className="chip-mini">
                        {tool}
                      </span>
                    ))}
                    <span className="chip-mini-more">+{idea.stack.flatMap((s) => s.tools).length - 4} more</span>
                  </div>
                </div>

                <div className="result-card-actions">
                  <button
                    type="button"
                    onClick={() => toggleSave(idea.slug)}
                    className={`save-button ${isSaved ? 'saved' : ''}`}
                    aria-label={`Bookmark ${idea.title}`}
                    title={isSaved ? 'Saved to your dashboard' : 'Save idea'}
                  >
                    <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  <Link
                    href={`/generate/results/${idea.slug}`}
                    className="button button-primary button-small"
                    aria-label={`View full blueprint for ${idea.title}`}
                  >
                    <span>View Blueprint</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}
