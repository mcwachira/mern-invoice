import { Document, Model } from "mongoose";

// Base user interface (without Mongoose-specific fields)
export interface IUser {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string; // Optional because select: false
  passwordConfirm?: string; // Only used during creation/validation
  isEmailVerified: boolean;
  provider: string;
  googleID?: string;
  avatar?: string;
  businessName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  passwordChangedAt?: Date;
  roles: string[];
  active: boolean;
  refreshToken: string[];
  createdAt: Date;
  updatedAt: Date;
}

// User document interface (extends Mongoose Document)
export interface IUserDocument extends IUser, Document {
  comparePassword(givenPassword: string): Promise<boolean>;
}

// export interface IUserMethods extends IUser, Document {
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }
// User model interface
export interface IUserModel extends Model<IUserDocument> {}

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument; // Directly specify the type of req.user
    }
  }
}
