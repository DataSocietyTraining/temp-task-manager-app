// ─────────────────────────────────────────────
//  Global Error Handler Middleware
//
//  TODO: Implement a middleware function that:
//    1. Logs the error
//    2. Sends a JSON response with a message and
//       an appropriate HTTP status code
// ─────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO
};
