import { NextResponse } from 'next/server'
import { AppError } from './errors'

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string; details?: unknown }

/**
 * Creates a standardized JSON success response.
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

/**
 * Creates a standardized JSON error response.
 * Never exposes stack traces or internal secrets in production.
 */
export function apiError(
  error: unknown,
  fallbackStatus = 500
): NextResponse<ApiResponse<never>> {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        ...(process.env.NODE_ENV === 'development' && error.details ? { details: error.details } : {}),
      },
      { status: error.statusCode }
    )
  }

  // Handle generic error
  const message =
    error instanceof Error && process.env.NODE_ENV === 'development'
      ? error.message
      : 'An unexpected server error occurred'

  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'INTERNAL_SERVER_ERROR',
    },
    { status: fallbackStatus }
  )
}
