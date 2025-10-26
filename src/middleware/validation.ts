import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";
// ZodSchema deprecated

export function validateBody<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);

      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join(". "),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

export function validateParams<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join(". "),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

export function validateQueryParams<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join(". "),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}
