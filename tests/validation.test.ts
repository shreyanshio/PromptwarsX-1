import { describe, it, expect } from 'vitest'
import {
  generateProjectSchema,
  improveProjectSchema,
  taskUpdateSchema,
  studentProfileSchema,
} from '@/lib/validations'

describe('Zod Validation Schemas', () => {
  it('should reject generate request when interests or skills are empty', () => {
    const invalidPayload = {
      interests: [],
      skills: [],
    }
    const result = generateProjectSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  it('should accept valid generate request with default values', () => {
    const validPayload = {
      interests: ['Artificial Intelligence'],
      skills: ['Python', 'OpenCV'],
    }
    const result = generateProjectSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.experienceLevel).toBe('Intermediate')
      expect(result.data.durationWeeks).toBe(12)
    }
  })

  it('should reject improvement request when string is too short or too long', () => {
    expect(improveProjectSchema.safeParse({ request: 'hi' }).success).toBe(false)
    expect(improveProjectSchema.safeParse({ request: 'a'.repeat(501) }).success).toBe(false)
    expect(improveProjectSchema.safeParse({ request: 'Make this project easier to complete' }).success).toBe(true)
  })

  it('should validate roadmap task updates strictly to enum values', () => {
    expect(taskUpdateSchema.safeParse({ status: 'COMPLETED' }).success).toBe(true)
    expect(taskUpdateSchema.safeParse({ status: 'IN_PROGRESS' }).success).toBe(true)
    expect(taskUpdateSchema.safeParse({ status: 'INVALID_STATUS' }).success).toBe(false)
  })

  it('should validate student profile data', () => {
    expect(studentProfileSchema.safeParse({ name: '' }).success).toBe(false)
    expect(
      studentProfileSchema.safeParse({
        name: 'Jane Doe',
        email: 'jane@college.edu',
        skills: ['Python'],
      }).success
    ).toBe(true)
  })

  it('should validate viva examiner input schema correctly', async () => {
    const { vivaExaminerInputSchema, vivaEvaluationSchema } = await import('@/lib/viva-validation')
    expect(
      vivaExaminerInputSchema.safeParse({
        projectId: 'attendai',
        question: 'Explain the pipeline',
        studentAnswer: 'Uses OpenCV and ONNX runtime for on-device inference.',
      }).success
    ).toBe(true)

    expect(
      vivaExaminerInputSchema.safeParse({
        projectId: '',
        question: '',
        studentAnswer: '',
      }).success
    ).toBe(false)

    expect(
      vivaEvaluationSchema.safeParse({
        score: 92,
        grade: 'Strong Pass (Distinction)',
        strengths: ['Great latency profile'],
        weaknesses: ['Needs battery analysis'],
        examinerFeedback: 'Impressive answer.',
        idealAnswerSuggestion: 'Mention FPS metrics.',
        followUpQuestion: 'How does it scale?',
      }).success
    ).toBe(true)
  })
})

