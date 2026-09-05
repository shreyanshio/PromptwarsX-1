import React from 'react'
import { PracticalImprovement } from '@/lib/ideas'
import { ShieldCheck, Sparkles } from 'lucide-react'

interface BlueprintImprovementsProps {
  improvements: PracticalImprovement[]
  improvePrompt: string
  isImproving: boolean
  improveFeedback: string | null
  onPromptChange: (val: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export const BlueprintImprovements: React.FC<BlueprintImprovementsProps> = ({
  improvements,
  improvePrompt,
  isImproving,
  improveFeedback,
  onPromptChange,
  onSubmit,
}) => {
  return (
    <div className="improvements-card-panel mt-6">
      <div className="panel-header">
        <div>
          <h2>Practical Improvements &amp; Refinements</h2>
          <small className="text-muted">Production Hardening &amp; Gemini Scope Adjustment</small>
        </div>
        <ShieldCheck size={18} className="text-emerald-500" />
      </div>

      <form onSubmit={onSubmit} className="mb-4">
        <label className="text-xs font-semibold text-muted block mb-1">
          Ask Gemini to Refine or Adjust Scope (e.g. &ldquo;Make it easier for 6 weeks&rdquo;, &ldquo;Add offline resilience&rdquo;)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={improvePrompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Enter scope change or technical improvement..."
            className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
            disabled={isImproving}
          />
          <button
            type="submit"
            disabled={isImproving || !improvePrompt.trim()}
            className="button button-primary button-small whitespace-nowrap"
          >
            {isImproving ? (
              <>
                <Sparkles size={14} className="animate-spin text-amber-300" />
                <span>Refining...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Refine</span>
              </>
            )}
          </button>
        </div>
        {improveFeedback && (
          <div className="mt-2 text-xs text-primary font-medium">
            {improveFeedback}
          </div>
        )}
      </form>

      <div className="improvements-grid-stacked">
        {improvements.map((imp) => (
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
  )
}
