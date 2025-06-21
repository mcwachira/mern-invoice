import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { randomBytes } from "crypto";
import { ICustomer } from "../types/customer";

const customerSchema = new Schema<ICustomer>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [
        validator.isEmail,
        "A Customer must have a valid email address",
      ],
    },
    accountNo: String,
    vatTinNo: {
      type: Number,
      default: 0,
    },
    address: String,
    city: String,
    country: String,
    phoneNumber: {
      type: String,
      required: true,
      validate: [
        validator.isMobilePhone,
        "Your mobile phone number must begin with a '+' followed by your a country code then an actual number e.g +254123456789",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

customerSchema.pre("save", async function (next) {
  this.accountNo = `Cus-${randomBytes(3).toString("hex").toUpperCase()}`;
});

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
