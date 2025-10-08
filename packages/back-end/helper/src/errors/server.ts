import { HttpException } from "./HttpException";

/**
 * 500 Internal Server Error → A generic error message for unexpected conditions on the server.
 * Used when no specific error message is suitable or an unhandled exception occurs.
 * Indicates that the server encountered a situation it does not know how to handle.
 */
export class InternalServerErrorException extends HttpException {
  constructor(
    message: string = "Internal Server Error",
    data?: string | string[]
  ) {
    super(500, message, data as unknown as string[]);
  }
}

/**
 * 501 Not Implemented → The server does not support the functionality required to fulfill the request.
 * Used when an endpoint or feature is declared but not yet implemented.
 */
export class NotImplementedException extends HttpException {
  constructor(
    message: string = "Internal Server Error",
    data?: string | string[]
  ) {
    super(501, message, data as unknown as string[]);
  }
}

/**
 * 502 Bad Gateway → The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
 * Commonly used in distributed systems, API gateways, or reverse proxies.
 */
export class BadGatewayException extends HttpException {
  constructor(message: string = "Bad Gateway", data?: string | string[]) {
    super(502, message, data as unknown as string[]);
  }
}

/**
 * 503 Service Unavailable → The server is currently unable to handle the request due to temporary overloading or maintenance.
 * Often used during downtime or system maintenance windows.
 */
export class ServiceUnavailableException extends HttpException {
  constructor(
    message: string = "Service Unavailable",
    data?: string | string[]
  ) {
    super(503, message, data as unknown as string[]);
  }
}

/**
 * 504 Gateway Timeout → The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
 * Typically used when backend services take too long to respond or are unreachable.
 */
export class GatewayTimeoutException extends HttpException {
  constructor(message: string = "Gateway Timeout", data?: string | string[]) {
    super(504, message, data as unknown as string[]);
  }
}
