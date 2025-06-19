import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`That route does not exist - ${req.originalUrl}`);
  (error as CustomError).statusCode = 404;
  next(error);
};

export { errorHandler, notFound };
