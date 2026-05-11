import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);
  if (res.headersSent) return;
  res.status(500).json({ error: 'internal_error', message: err.message });
}
