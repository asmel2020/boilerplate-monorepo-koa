export class HttpException extends Error {
  public readonly status: number;
  public readonly data: string[] | undefined | string;
  override message: string;

  constructor(status: number, message: string, data?: string[]) {
    super(message);

    this.status = status;

    if (!data) {
      this.data = message;
    }
    if (Array.isArray(data)) {
      this.data = data;
    }
    if (typeof data === "string") {
      this.data = data;
    }
    this.message = message;
    this.name = new.target.name;

    Error.captureStackTrace?.(this, this.constructor);
  }

  /**
   * Returns a standard serializable object for HTTP responses
   */
  getResponse() {
    let errors = undefined;

    if (Array.isArray(this.data)) {
      errors = this.data;
    }

    return {
      status: this.status,
      message: this.message,
      errors,
    };
  }
}
