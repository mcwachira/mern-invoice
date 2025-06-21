import { Document, Types } from "mongoose";

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
