'use client'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ideas, type Accent } from '@/lib/ideas'
import { getCurrentUser, UserProfile } from '@/lib/auth'
import { ThemeToggle } from '@/components/ThemeToggle'

type GalleryItem = {
  title: string
  category: string
  text: string
  accent: Accent
  href: string
  cta: string
}

const community: GalleryItem[] = [
  {
    title: 'LectureLens',
    category: 'Study Tools',
    text: 'Turns a recorded lecture into a searchable, summarized study guide.',
    accent: 'indigo',
    href: '/generate',
    cta: 'Remix this idea',
  },
  {
    title: 'ParkSpotter',
    category: 'Mobile & Computer Vision',
    text: 'Live campus parking availability, built from repurposed CCTV feeds.',
    accent: 'amber',
    href: '/generate',
    cta: 'Remix this idea',
  },
]

const items: GalleryItem[] = [
  ...ideas.map((idea) => ({
    title: idea.title,
    category: idea.category,
    text: idea.tagline,
    accent: idea.accent,
    href: `/generate/results/${idea.slug}`,
    cta: 'View idea',
  })),
  ...community,
]

export default function Explore() {
  const [q, setQ] = useState('')
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)
  }, [])

  const shown = items.filter((i) => `${i.title} ${i.category} ${i.text}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <main className="sub-page">
      <header className="site-nav">
        <Link href="/" className="brand-mark"><span className="brand-glyph">✦</span> Project<span>Spark</span></Link>
        <div className="flex items-center gap-3">
          {user ? (
            <span className="user-badge-pill">
              <span className="user-badge-dot" /> {user.name}
            </span>
          ) : (
            <Link href="/login" className="nav-login">Sign in</Link>
          )}
          <ThemeToggle />
          <Link href="/generate" className="button button-small">Generate <ArrowRight size={14}/></Link>
        </div>
      </header>
      <section className="section-wrap explore-head">
        <div className="eyebrow">Ideas other students are building</div>
        <h1>Borrow someone else's spark to start yours.</h1>
        <p>Browse real project shapes from other final-year students, then remix one into something that's yours.</p>
        <div className="search-box">
          <Search size={18}/>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by tech, topic, or feeling" aria-label="Search ideas"/>
        </div>
      </section>
      <section className="section-wrap explore-grid">
        {shown.map((item) => (
          <article className="explore-card" key={item.title}>
            <div className={`explore-dot accent-${item.accent}`}/>
            <span className={`tag accent-${item.accent}`}>{item.category}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <Link href={item.href} className="text-link">{item.cta} <ArrowRight size={15}/></Link>
          </article>
        ))}
      </section>
    </main>
  )
}
