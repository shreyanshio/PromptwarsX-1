import { z } from 'zod'

export const vivaExaminerInputSchema = z.object({
  projectId: z.string().trim().min(1),
  question: z.string().trim().min(1),
  studentAnswer: z.string().trim().min(1).max(3000),
})

export const vivaEvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  grade: z.enum(['Strong Pass (Distinction)', 'Pass', 'Needs Improvement', 'Unsatisfactory']),
  strengths: z.array(z.string().trim().min(1)),
  weaknesses: z.array(z.string().trim().min(1)),
  examinerFeedback: z.string().trim().min(1),
  idealAnswerSuggestion: z.string().trim().min(1),
  followUpQuestion: z.string().trim().min(1),
})

export type VivaExaminerInput = z.infer<typeof vivaExaminerInputSchema>
export type VivaEvaluation = z.infer<typeof vivaEvaluationSchema>
