import React from 'react'
import { StackGroup } from '@/lib/ideas'

interface BlueprintStackProps {
  stack: StackGroup[]
}

export const BlueprintStack: React.FC<BlueprintStackProps> = ({ stack }) => {
  return (
    <div className="stack-panel">
      <div className="panel-header">
        <div>
          <h2>Technologies Guidance</h2>
          <small className="text-muted">Layered Architecture &amp; Rationale</small>
        </div>
      </div>

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
    </div>
  )
}
