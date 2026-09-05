import React from 'react'
import { FeatureDetail } from '@/lib/ideas'
import { CheckCircle2 } from 'lucide-react'

interface BlueprintFeaturesProps {
  features: FeatureDetail[]
  activeTab: 'all' | 'p0' | 'p1'
  onTabChange: (tab: 'all' | 'p0' | 'p1') => void
}

export const BlueprintFeatures: React.FC<BlueprintFeaturesProps> = ({
  features,
  activeTab,
  onTabChange,
}) => {
  const filtered =
    activeTab === 'all'
      ? features
      : activeTab === 'p0'
      ? features.filter((f) => f.priority.includes('P0'))
      : features.filter((f) => f.priority.includes('P1'))

  return (
    <div className="detail-card-panel mt-6">
      <div className="panel-header">
        <div>
          <h2>Features Guidance &amp; Scope Boundary</h2>
          <small className="text-muted">Core Viva MVP vs Advanced Distinctions</small>
        </div>

        <div className="feature-tab-pill">
          <button
            type="button"
            onClick={() => onTabChange('all')}
            className={`tab-pill-item ${activeTab === 'all' ? 'active' : ''}`}
          >
            All ({features.length})
          </button>
          <button
            type="button"
            onClick={() => onTabChange('p0')}
            className={`tab-pill-item ${activeTab === 'p0' ? 'active' : ''}`}
          >
            P0: Core MVP
          </button>
          <button
            type="button"
            onClick={() => onTabChange('p1')}
            className={`tab-pill-item ${activeTab === 'p1' ? 'active' : ''}`}
          >
            P1: Distinction
          </button>
        </div>
      </div>

      <div className="features-detailed-list">
        {filtered.map((f) => {
          const isP0 = f.priority.includes('P0')
          return (
            <div key={f.name} className={`feature-detailed-card ${isP0 ? 'p0-border' : 'p1-border'}`}>
              <div className="feature-top-row">
                <span className={`priority-pill ${isP0 ? 'p0' : 'p1'}`}>
                  {f.priority}
                </span>
                <h3>{f.name}</h3>
              </div>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-deliverable-row">
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                <span>
                  <strong>Viva Deliverable:</strong> {f.deliverable}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
