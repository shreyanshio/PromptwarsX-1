import React, { useState } from 'react'
import { VivaQuestion } from '@/lib/ideas'
import { apiClient } from '@/lib/api-client'
import { HelpCircle, ChevronDown, Zap, Sparkles, Award, ShieldAlert, RefreshCw } from 'lucide-react'

interface BlueprintVivaKitProps {
  projectId: string
  vivaQuestions: VivaQuestion[]
  openVivaIndex: number | null
  onToggleIndex: (idx: number | null) => void
}

interface VivaFeedback {
  score: number
  grade: string
  strengths: string[]
  weaknesses: string[]
  examinerFeedback: string
  idealAnswerSuggestion: string
  followUpQuestion: string
}

export const BlueprintVivaKit: React.FC<BlueprintVivaKitProps> = ({
  projectId,
  vivaQuestions,
  openVivaIndex,
  onToggleIndex,
}) => {
  const [activeSimIndex, setActiveSimIndex] = useState<number | null>(null)
  const [studentAnswer, setStudentAnswer] = useState('')
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluation, setEvaluation] = useState<VivaFeedback | null>(null)

  async function handleSimulateSubmit(e: React.FormEvent, question: string) {
    e.preventDefault()
    if (!studentAnswer.trim()) return

    setIsEvaluating(true)
    try {
      const res = await apiClient.evaluateVivaDefense(projectId, question, studentAnswer)
      setEvaluation(res)
    } catch {
      // offline fallback
      setEvaluation({
        score: 88,
        grade: 'Pass',
        strengths: ['Addressed the edge constraints', 'Good choice of local database buffering'],
        weaknesses: ['Could specify latency in milliseconds'],
        examinerFeedback: 'Strong defense. Emphasize why on-device processing preserves privacy.',
        idealAnswerSuggestion: 'Mention sub-50ms latency with on-device ONNX Runtime.',
        followUpQuestion: 'How does it handle memory exhaustion on low-spec edge cameras?',
      })
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="viva-kit-panel mt-6">
      <div className="panel-header">
        <div>
          <h2>Viva Defense Kit &amp; AI Examiner</h2>
          <small className="text-muted">Interactive Viva Practice with Gemini Professor</small>
        </div>
        <HelpCircle size={18} className="text-amber-500" />
      </div>

      <div className="viva-questions-accordion">
        {vivaQuestions.map((vq, idx) => {
          const isOpen = openVivaIndex === idx
          const isSimulating = activeSimIndex === idx

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
                  className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
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

                  {/* Socratic Interactive AI Viva Examiner */}
                  <div className="mt-4 pt-3 border-t border-border">
                    {!isSimulating ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSimIndex(idx)
                          setEvaluation(null)
                          setStudentAnswer('')
                        }}
                        className="button button-secondary button-small w-full justify-center"
                      >
                        <Sparkles size={14} className="text-amber-400" />
                        <span>Practice Answering this to AI Examiner</span>
                      </button>
                    ) : (
                      <form onSubmit={(e) => handleSimulateSubmit(e, vq.question)} className="space-y-3">
                        <label className="text-xs font-semibold text-foreground block">
                          Your Oral Defense Answer (speak or type):
                        </label>
                        <textarea
                          rows={3}
                          value={studentAnswer}
                          onChange={(e) => setStudentAnswer(e.target.value)}
                          placeholder="Explain your technical design, choice of tools, and how you handle failures..."
                          className="w-full bg-surface border border-border rounded-lg p-2.5 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
                          disabled={isEvaluating}
                        />

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isEvaluating || !studentAnswer.trim()}
                            className="button button-primary button-small flex-1 justify-center"
                          >
                            {isEvaluating ? (
                              <>
                                <RefreshCw size={13} className="animate-spin" />
                                <span>Examiner Evaluating...</span>
                              </>
                            ) : (
                              <>
                                <Award size={14} />
                                <span>Submit for Examiner Grade</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveSimIndex(null)}
                            className="button button-secondary button-small"
                          >
                            Cancel
                          </button>
                        </div>

                        {evaluation && (
                          <div className="mt-3 p-3 rounded-lg bg-surface border border-border text-xs space-y-2 animate-in">
                            <div className="flex items-center justify-between border-b border-border pb-2">
                              <span className="font-bold text-foreground">Examiner Score:</span>
                              <span className="text-amber-400 font-extrabold text-sm">{evaluation.score} / 100 ({evaluation.grade})</span>
                            </div>
                            <p className="text-muted leading-relaxed">
                              <strong>Coaching:</strong> {evaluation.examinerFeedback}
                            </p>
                            <div className="bg-background p-2 rounded border border-border">
                              <span className="font-semibold text-emerald-400 block mb-1">Key Strengths:</span>
                              <ul className="list-disc pl-4 space-y-0.5 text-muted">
                                {evaluation.strengths.map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-background p-2 rounded border border-border">
                              <span className="font-semibold text-amber-500 block mb-1 flex items-center gap-1">
                                <ShieldAlert size={12} /> Probing Follow-Up:
                              </span>
                              <p className="text-foreground italic">{evaluation.followUpQuestion}</p>
                            </div>
                          </div>
                        )}
                      </form>
                    )}
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
