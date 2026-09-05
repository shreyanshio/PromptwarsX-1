import { describe, it, expect, vi } from 'vitest'
import { evaluateVivaDefense } from '@/services/viva-service'
import { ideas } from '@/lib/ideas'

describe('Viva Defense Examiner Service', () => {
  it('evaluates oral defense and returns structured grading', async () => {
    const project = ideas[0]
    const question = 'How do you guarantee anti-spoofing in AttendAI?'
    const answer = 'We run MiniFASNet with 3D facial texture analysis locally on ONNX runtime under 40ms.'

    const result = await evaluateVivaDefense(project as any, question, answer)

    expect(result).toBeDefined()
    expect(typeof result.score).toBe('number')
    expect(result.score).toBeGreaterThanOrEqual(0)
    expect(result.score).toBeLessThanOrEqual(100)
    expect(Array.isArray(result.strengths)).toBe(true)
    expect(Array.isArray(result.weaknesses)).toBe(true)
    expect(result.examinerFeedback.length).toBeGreaterThan(0)
    expect(result.idealAnswerSuggestion.length).toBeGreaterThan(0)
  })
})
