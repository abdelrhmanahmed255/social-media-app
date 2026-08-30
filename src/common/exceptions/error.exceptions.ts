export class AppException extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequetException extends AppException {
  constructor(message: string = "Bad Request", cause?: unknown) {
    super(message, 400, cause);
  }
}

export class NotFoundException extends AppException {
  constructor(message: string = "Not Found", cause?: unknown) {
    super(message, 404, cause);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string = "Unauthorized", cause?: unknown) {
    super(message, 401, cause);
  }
}

export class ForbiddenException extends AppException {
  constructor(message: string = "Forbidden", cause?: unknown) {
    super(message, 403, cause);
  }
}
