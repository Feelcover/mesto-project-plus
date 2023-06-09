class ForbiddenError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export default ForbiddenError;
