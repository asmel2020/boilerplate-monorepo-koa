import { HttpException } from "./HttpException";

/**
 * 301 Moved Permanently → The requested resource has been permanently moved to a new URI.
 * Clients should update their bookmarks or references to use the new location.
 * Typically used in URL redirection scenarios where the original URL is deprecated.
 */
export class MovedPermanentlyException extends HttpException {
  constructor(message: string = "Moved Permanently", data?: string | string[]) {
    super(301, message, data as unknown as string[]);
  }
}

/**
 * 302 Found → The requested resource resides temporarily under a different URI.
 * The client should continue to use the original URI for future requests.
 * Commonly used for temporary redirects, such as login redirects or A/B testing.
 */
export class FoundException extends HttpException {
  constructor(message: string = "Found", data?: string | string[]) {
    super(302, message, data as unknown as string[]);
  }
}

/**
 * 304 Not Modified → The resource has not been modified since the version specified by the request headers.
 * The client can use its cached version of the resource.
 * Commonly used with caching mechanisms and conditional GET requests.
 */
export class NotModifiedException extends HttpException {
  constructor(message: string = "Not Modified", data?: string | string[]) {
    super(304, message, data as unknown as string[]);
  }
}
