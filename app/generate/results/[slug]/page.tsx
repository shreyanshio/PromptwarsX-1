import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { getIdea, ideas, Idea } from '@/lib/ideas'
import { getProjectById } from '@/services/project-service'
import { DEMO_USER_UID } from '@/lib/auth-server'
import BlueprintView from '@/components/BlueprintView'

import ThemeToggle from '@/components/ThemeToggle'

export const dynamicParams = true

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let idea = getIdea(slug)
  if (!idea) {
    try {
      idea = (await getProjectById(DEMO_USER_UID, slug)) as unknown as Idea
    } catch {
      // ignore
    }
  }
  if (!idea) return {}
  return {
    title: `${idea.title} — Capstone Architecture & Viva Defense Blueprint`,
    description: idea.tagline,
  }
}

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let idea = getIdea(slug)

  if (!idea) {
    try {
      idea = (await getProjectById(DEMO_USER_UID, slug)) as unknown as Idea
    } catch {
      // ignore
    }
  }

  if (!idea) {
    return (
      <main className="sub-page">
        <header className="site-nav">
          <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
            <span className="brand-glyph">✦</span> Project<span>Spark</span>
          </Link>
          <ThemeToggle />
        </header>
        <div className="not-found-panel">
          <h1>That spark fizzled out.</h1>
          <p>We couldn't find a capstone idea at this address. It may have been renamed or never existed.</p>
          <Link href="/generate/results" className="button button-primary">
            Back to your matches <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="sub-page blueprint-page">
      <header className="site-nav">
        <Link href="/" className="brand-mark" aria-label="ProjectSpark home">
          <span className="brand-glyph">✦</span> Project<span>Spark</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/generate/results" className="text-link text-small">
            All Ideas
          </Link>
          <ThemeToggle />
          <Link href="/dashboard" className="text-link text-small">
            Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <BlueprintView idea={idea} />
    </main>
  )
}
