import { Document, Types, Model } from "mongoose";

// Interface for the token document
export interface IVerifyResetToken {
  _userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

// Document interface (includes mongoose Document methods and fields)
export interface IVerifyResetTokenDocument
  extends IVerifyResetToken,
    Document {}

// Model interface (optional, if you want to add static methods)
export interface IVerifyResetTokenModel
  extends Model<IVerifyResetTokenDocument> {}
