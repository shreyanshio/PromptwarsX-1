import { GoogleGenAI } from '@google/genai'
import { AIServiceError } from './errors'

let genAIClient: GoogleGenAI | null = null

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new AIServiceError(
      'Google Gemini API key is missing. Please set GEMINI_API_KEY in your server environment.'
    )
  }

  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey })
  }

  return genAIClient
}

export interface GenerateStructuredParams {
  systemInstruction: string
  prompt: string
  modelName?: string
}

/**
 * Extracts and safely parses JSON from an AI response, stripping markdown code fences if present.
 */
export function extractJsonFromText(rawText: string): unknown {
  let cleaned = rawText.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  cleaned = cleaned.trim()

  return JSON.parse(cleaned)
}

/**
 * Calls Gemini with structured JSON output requirements.
 * Retries once if the initial output fails to parse as valid JSON.
 */
export async function callGeminiStructured<T>(
  params: GenerateStructuredParams
): Promise<T> {
  const client = getGeminiClient()
  const primaryModel = params.modelName || process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  const fallbackModel = 'gemini-2.0-flash'

  async function executeCall(model: string, userPrompt: string): Promise<string> {
    const response = await client.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction: params.systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    })

    const text = response.text
    if (!text) {
      throw new AIServiceError('Gemini returned an empty response.')
    }
    return text
  }

  let rawOutput = ''
  try {
    rawOutput = await executeCall(primaryModel, params.prompt)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn(`[Gemini] Primary model ${primaryModel} failed: ${message}. Attempting fallback to ${fallbackModel}...`)
    try {
      rawOutput = await executeCall(fallbackModel, params.prompt)
    } catch (fallbackErr: unknown) {
      const fbMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)
      console.error('[Gemini] All model attempts failed:', fbMsg)
      throw new AIServiceError(`Gemini Generation Error: ${fbMsg}`)
    }
  }

  try {
    return extractJsonFromText(rawOutput) as T
  } catch (parseErr) {
    console.warn('[Gemini] Failed to parse JSON from AI output. Retrying with explicit repair prompt...')
    const repairPrompt = `${params.prompt}\n\nCRITICAL: The previous output was invalid JSON. You must return ONLY pure, syntactically valid JSON.`
    const repairedOutput = await executeCall(fallbackModel, repairPrompt)
    try {
      return extractJsonFromText(repairedOutput) as T
    } catch (secondErr) {
      console.error('[Gemini] Repair attempt also returned malformed JSON:', secondErr)
      throw new AIServiceError('Gemini returned malformed structured data that could not be parsed.')
    }
  }
}
