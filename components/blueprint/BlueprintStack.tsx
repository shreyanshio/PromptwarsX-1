import React, { useState } from 'react'
import { StackGroup } from '@/lib/ideas'
import { Layers, Network, ArrowRight } from 'lucide-react'

interface BlueprintStackProps {
  stack: StackGroup[]
}

export const BlueprintStack: React.FC<BlueprintStackProps> = ({ stack }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'diagram'>('cards')

  return (
    <div className="stack-panel">
      <div className="panel-header">
        <div>
          <h2>Technologies Guidance</h2>
          <small className="text-muted">Layered Architecture &amp; Rationale</small>
        </div>

        {/* View mode toggle */}
        <div className="feature-tab-pill">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`tab-pill-item ${viewMode === 'cards' ? 'active' : ''}`}
          >
            <Layers size={13} />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('diagram')}
            className={`tab-pill-item ${viewMode === 'diagram' ? 'active' : ''}`}
          >
            <Network size={13} />
            <span>Flow Diagram</span>
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="stack-groups-wrap">
          {stack.map((group) => (
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
      ) : (
        /* Visual Architecture Flow Diagram */
        <div className="mt-3 p-4 rounded-xl bg-surface border border-border space-y-3 animate-in">
          <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            System Dataflow Pipeline
          </div>
          <div className="space-y-2">
            {stack.map((layer, idx) => (
              <React.Fragment key={layer.group}>
                <div className="p-3 rounded-lg bg-background border border-border shadow-sm flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{layer.group}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-primary">
                      Layer {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {layer.tools.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {idx < stack.length - 1 && (
                  <div className="flex items-center justify-center text-muted">
                    <ArrowRight size={14} className="rotate-90 my-0.5 text-primary" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
