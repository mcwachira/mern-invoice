import { Document, Types } from "mongoose";
import { IUserDocument } from "./user";

export interface ICustomer extends Document {
  createdBy: Types.ObjectId;
  name: string;
  email: string;
  accountNo?: string;
  vatTinNo?: number;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument; // Or more specifically if you have a type like IUser
    }
  }
}
