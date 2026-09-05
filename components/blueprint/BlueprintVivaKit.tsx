import React from 'react'
import { VivaQuestion } from '@/lib/ideas'
import { HelpCircle, ChevronDown, Zap } from 'lucide-react'

interface BlueprintVivaKitProps {
  vivaQuestions: VivaQuestion[]
  openVivaIndex: number | null
  onToggleIndex: (idx: number | null) => void
}

export const BlueprintVivaKit: React.FC<BlueprintVivaKitProps> = ({
  vivaQuestions,
  openVivaIndex,
  onToggleIndex,
}) => {
  return (
    <div className="viva-kit-panel mt-6">
      <div className="panel-header">
        <div>
          <h2>Viva Defense Kit</h2>
          <small className="text-muted">Real Examiner Questions &amp; Defense Answers</small>
        </div>
        <HelpCircle size={18} className="text-amber-500" />
      </div>

      <div className="viva-questions-accordion">
        {vivaQuestions.map((vq, idx) => {
          const isOpen = openVivaIndex === idx
          return (
            <div key={idx} className="viva-accordion-item">
              <button
                type="button"
                onClick={() => onToggleIndex(isOpen ? null : idx)}
                className="viva-accordion-trigger"
              >
                <span>Q: {vq.question}</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="viva-accordion-content animate-in">
                  <div className="expected-answer-box">
                    <strong>Model Answer:</strong>
                    <p>{vq.expectedAnswer}</p>
                  </div>
                  <div className="defense-tip-box">
                    <Zap size={14} className="text-amber-500 flex-shrink-0" />
                    <span>
                      <strong>Examiner Strategy:</strong> {vq.defenseTip}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
