import { HttpException } from "./HttpException";

/**
 * Type definition for Zod validation errors.
 */
type ZodErrorMessage = {
  path: string;
  message: string;
};

/**
 * 400 Bad Request → The request could not be understood or was missing required parameters.
 * Commonly used for validation errors or malformed JSON.
 */
export class BadRequestException extends HttpException {
  constructor(
    message: string = "Bad Request",
    data?: string | string[] | ZodErrorMessage[]
  ) {
    super(400, message, data as unknown as string[]);
  }
}

/**
 * 401 Unauthorized → Authentication is required or has failed.
 * Used when the user is not authenticated or provides invalid credentials.
 */
export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized", data?: string | string[]) {
    super(401, message, data as unknown as string[]);
  }
}

/**
 * 402 Payment Required → Reserved for future use.
 * Rarely used; sometimes applied for billing-related API access.
 */
export class PaymentRequiredException extends HttpException {
  constructor(message: string = "Payment Required", data?: string | string[]) {
    super(402, message, data as unknown as string[]);
  }
}

/**
 * 403 Forbidden → The client is authenticated but not authorized to access this resource.
 * Used when permissions or roles do not allow the requested action.
 */
export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden", data?: string | string[]) {
    super(403, message, data as unknown as string[]);
  }
}

/**
 * 404 Not Found → The requested resource could not be found.
 * Commonly used when a resource ID or URL path does not exist.
 */
export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found", data?: string | string[]) {
    super(404, message, data as unknown as string[]);
  }
}

/**
 * 405 Method Not Allowed → The HTTP method is not supported for the requested resource.
 * For example, sending a POST to a GET-only endpoint.
 */
export class MethodNotAllowedException extends HttpException {
  constructor(
    message: string = "Method Not Allowed",
    data?: string | string[]
  ) {
    super(405, message, data as unknown as string[]);
  }
}

/**
 * 406 Not Acceptable → The resource cannot generate content acceptable according to the Accept headers.
 * Used when the requested content type is not supported by the server.
 */
export class NotAcceptableException extends HttpException {
  constructor(message: string = "Not Acceptable", data?: string | string[]) {
    super(406, message, data as unknown as string[]);
  }
}

/**
 * 408 Request Timeout → The server timed out waiting for the request.
 * Common in APIs where a client took too long to send data.
 */
export class RequestTimeoutException extends HttpException {
  constructor(message: string = "Request Timeout", data?: string | string[]) {
    super(408, message, data as unknown as string[]);
  }
}

/**
 * 409 Conflict → A conflict occurred with the current state of the resource.
 * Commonly used when attempting to create a duplicate record (e.g., duplicate email).
 */
export class ConflictException extends HttpException {
  constructor(message: string = "Conflict", data?: string | string[]) {
    super(409, message, data as unknown as string[]);
  }
}

/**
 * 410 Gone → The requested resource is no longer available and has been permanently removed.
 * Rarely used in APIs; sometimes for deprecated endpoints.
 */
export class GoneException extends HttpException {
  constructor(message: string = "Gone", data?: string | string[]) {
    super(410, message, data as unknown as string[]);
  }
}

/**
 * 411 Length Required → The request did not specify the content length, which is required.
 * Used when a required Content-Length header is missing.
 */
export class LengthRequiredException extends HttpException {
  constructor(message: string = "Length Required", data?: string | string[]) {
    super(411, message, data as unknown as string[]);
  }
}

/**
 * 412 Precondition Failed → One or more conditions given in the request header fields evaluated to false.
 * Used in conditional requests (e.g., If-Match, If-Unmodified-Since).
 */
export class PreconditionFailedException extends HttpException {
  constructor(
    message: string = "Precondition Failed",
    data?: string | string[]
  ) {
    super(412, message, data as unknown as string[]);
  }
}

/**
 * 413 Payload Too Large → The request entity is larger than the server is willing or able to process.
 * Used when uploading large files beyond API limits.
 */
export class PayloadTooLargeException extends HttpException {
  constructor(message: string = "Payload Too Large", data?: string | string[]) {
    super(413, message, data as unknown as string[]);
  }
}

/**
 * 414 URI Too Long → The URI provided was too long for the server to process.
 * Common when GET query strings exceed server length limits.
 */
export class URITooLongException extends HttpException {
  constructor(message: string = "URI Too Long", data?: string | string[]) {
    super(414, message, data as unknown as string[]);
  }
}

/**
 * 415 Unsupported Media Type → The server does not support the media type of the request payload.
 * Used when Content-Type is invalid or unsupported (e.g., expecting JSON but received text/plain).
 */
export class UnsupportedMediaTypeException extends HttpException {
  constructor(
    message: string = "Unsupported Media Type",
    data?: string | string[]
  ) {
    super(415, message, data as unknown as string[]);
  }
}

/**
 * 422 Unprocessable Entity → The request was well-formed but could not be processed due to semantic errors.
 * Commonly used for data validation errors (e.g., invalid field values).
 */
export class UnprocessableEntityException extends HttpException {
  constructor(
    message: string = "Unprocessable Entity",
    data?: string | string[]
  ) {
    super(422, message, data as unknown as string[]);
  }
}

/**
 * 429 Too Many Requests → The user has sent too many requests in a given amount of time.
 * Used for rate limiting and throttling APIs.
 */
export class TooManyRequestsException extends HttpException {
  constructor(message: string = "Too Many Requests", data?: string | string[]) {
    super(429, message, data as unknown as string[]);
  }
}
