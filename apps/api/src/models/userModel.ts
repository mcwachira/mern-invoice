import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { IUser, IUserDocument, IUserModel } from "../types/user";
import { USER } from "../constants";

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator(value: string) {
          return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
        },
        message:
          "Username must be alphanumeric. Hyphens and underscores allowed.",
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value: string) {
          return /^[a-zA-Z\s'-]+$/.test(value);
        },
        message:
          "First name can only include letters, spaces, hyphens, and apostrophes",
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value: string) {
          return /^[a-zA-Z\s'-]+$/.test(value);
        },
        message:
          "Last name can only include letters, spaces, hyphens, and apostrophes",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        validator.isStrongPassword,
        "Password must be at least 8 characters long, with uppercase, lowercase letters, and a symbol",
      ],
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator(this: IUserDocument, value: string) {
          // 'this' here is IUserDocument, but validator ignores typing, so safe to leave as function(value)
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    isEmailVerified: { type: Boolean, default: false, required: true },
    provider: { type: String, default: "email", required: true },
    googleID: String,
    avatar: String,
    businessName: String,
    phoneNumber: {
      type: String,
      default: "+254123456789",
      validate: {
        validator: validator.isMobilePhone,
        message:
          "Phone must start with '+' and a valid country code, e.g. +254123456789",
      },
    },
    address: String,
    city: String,
    country: String,
    passwordChangedAt: Date,
    roles: {
      type: [String],
      default: [USER],
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  },
);

// Pre-save hooks
userSchema.pre("save", function (next) {
  if (this.roles.length === 0) {
    this.roles.push(USER);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date();
  next();
});

// Instance method
userSchema.methods.comparePassword = async function (
  givenPassword: string,
): Promise<boolean> {
  // `this.password` will exist here because select: false excluded it by default; ensure you explicitly select it when querying.
  return bcrypt.compare(givenPassword, this.password!);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);
export default User;
