import type { Request, Response, NextFunction } from "express";
import z, { type ZodType, ZodError } from "zod";
// ZodSchema deprecated
import env from "../../env.ts";

export function validateBody<T extends ZodType>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      // console.log({ validatedData });

      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // for debugging purposes (this wasn't in the workshop)
        // but why not add this, only in case of development
        if (env.APP_STAGE === "dev") {
          console.error({ fieldErrors: z.flattenError(error).fieldErrors });
        }
        // important that we return here because we
        // don't want to call next in this case
        // since we are sending error response to client
        // and no next middleware should be called
        return res.status(400).json({
          error: "Body Validation Failed!",
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
          error: "Params Validation Failed!",
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
          error: "Querystring Validation Failed!",
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
