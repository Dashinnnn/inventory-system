import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          // ZodError.issues is the most reliable way to get the array of mistakes
          errors: error.issues.map((issue) => ({
            // issue.path[1] is 'name', 'email', etc.
            field: issue.path[issue.path.length - 1],
            message: issue.message,
          })),
        });
      } return res.status(500).json({ message: "Internal Server Error" });
    }
  };
