import { describe, it, expect } from 'vitest'
import { extractJsonFromText } from '@/lib/gemini'
import { AIServiceError } from '@/lib/errors'

describe('Gemini AI Output Handling', () => {
  it('should clean markdown json fences and parse valid JSON', () => {
    const rawWithMarkdown = '```json\n{"title": "Test AI Project", "difficulty": "Intermediate"}\n```'
    const parsed = extractJsonFromText(rawWithMarkdown) as { title: string; difficulty: string }
    expect(parsed.title).toBe('Test AI Project')
    expect(parsed.difficulty).toBe('Intermediate')
  })

  it('should throw SyntaxError when input is not valid JSON', () => {
    const invalid = '```json\n{ not valid json }\n```'
    expect(() => extractJsonFromText(invalid)).toThrow(SyntaxError)
  })

  it('AIServiceError should format proper error code and 503 status', () => {
    const err = new AIServiceError('Gemini quota reached')
    expect(err.statusCode).toBe(503)
    expect(err.code).toBe('AI_SERVICE_ERROR')
    expect(err.message).toBe('Gemini quota reached')
  })
})
