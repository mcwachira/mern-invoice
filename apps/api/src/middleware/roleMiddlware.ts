import { ADMIN, USER } from "../constants/index";
import { Request, Response, NextFunction } from "express";

const ROLES = {
  User: USER,
  Admin: ADMIN,
};

// Extend Express Request type to include `roles`
interface AuthenticatedRequest extends Request {
  user?: any; // You can replace `any` with your IUserDocument type
  roles?: string[];
}

const checkRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    //if (!req?.user && !req?.roles) {
    if (!req?.user || !req?.roles) {
      res.status(401);
      throw new Error("You are not authporized to use our platform");
    }

    const rolesArray = [...allowedRoles];

    const roleFound = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!roleFound) {
      res.status(403); // 403 is better for forbidden access
      throw new Error("You are not authorized to perform this request");
    }

    next();
  };
};

const role = { ROLES, checkRoles };
export default role;
