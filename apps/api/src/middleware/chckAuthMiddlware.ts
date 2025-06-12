import { NextFunction, Request, Response } from "express";
import asynchandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { IUserDocument } from "../types/user";

// Extend Express Request interface to include user and roles
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
      roles?: string[];
    }
  }
}

// JWT Payload interface
export interface JWTPayload extends JwtPayload {
  id: string;
  roles: string[];
  email?: string;
  username?: string;
}

// Auth middleware with proper typing
const checkAuth = asynchandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let jwt_token: string;

    // Bearer sdfasdfasdfasdfsd
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);

    if (!authHeader?.startsWith("Bearer")) {
      res.sendStatus(401);
      return;
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      jwt_token = authHeader.split(" ")[1];

      jwt.verify(
        jwt_token,
        process.env.JWT_ACCESS_SECRET_KEY as string,
        async (
          err: jwt.VerifyErrors | null,
          decoded: string | JwtPayload | undefined,
        ) => {
          if (err) {
            res.sendStatus(403);
            return;
          }

          // Type assertion for decoded payload
          const payload = decoded as JWTPayload;
          const userId = payload.id;

          try {
            const user = await User.findById(userId).select("-password").exec();

            if (!user) {
              res.sendStatus(404);
              return;
            }

            req.user = user;
            req.roles = payload.roles;
            next();
          } catch (error) {
            res.sendStatus(500);
          }
        },
      );
    }
  },
);

export default checkAuth;
