// ─────────────────────────────────────────────
//  Request Validation Middleware
//
//  TODO: Implement a middleware factory that
//        checks for required fields in req.body.
//        Return 400 with a descriptive message
//        if any required field is missing.
// ─────────────────────────────────────────────

import { Request, Response, NextFunction } from 'express';

export const validateRequired = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // TODO
  };
};
