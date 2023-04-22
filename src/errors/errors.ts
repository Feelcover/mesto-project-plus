export class NotFoundErr extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 404;
  }
};

export class InternalServerErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}

export class BadRequestErr extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
};

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
};

export class ConflictErr extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

export class UnauthorizedErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

