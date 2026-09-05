/**
 * Application Error Hierarchy for ProjectSpark
 * Standardized status codes and safe error messages.
 */

export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly details?: unknown

  constructor(message: string, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid request payload', code = 'BAD_REQUEST', details?: unknown) {
    super(message, 400, code, details)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required', code = 'UNAUTHORIZED') {
    super(message, 401, code)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden to this resource', code = 'FORBIDDEN') {
    super(message, 403, code)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', code = 'NOT_FOUND') {
    super(message, 404, code)
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded. Please try again later.', code = 'RATE_LIMIT_EXCEEDED') {
    super(message, 429, code)
  }
}

export class AIServiceError extends AppError {
  constructor(message = 'AI generation service temporarily unavailable', code = 'AI_SERVICE_ERROR', details?: unknown) {
    super(message, 503, code, details)
  }
}
