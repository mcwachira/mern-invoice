import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { randomBytes } from "crypto";
import { IDocument } from "../types/document";

const paymentSchema = new Schema(
  {
    paidBy: String,
    datePaid: String,
    amountPaid: Number,
    paymentMethod: {
      type: String,
      default: "Cash",
      enum: [
        "Cash",
        "Mobile Money",
        "Paypal",
        "Credit Card",
        "Bank Transfer",
        "Others",
      ],
    },
    additionalInfo: String,
  },
  {
    timestamps: true,
  },
);

const documentSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    customer: {
      name: String,
      email: String,
      accountNo: String,
      vatTinNo: String,
      address: String,
      city: String,
      country: String,
      phoneNumber: String,
    },
    documentType: {
      type: String,
      default: "Invoice",
      enum: ["Invoice", "Receipt", "Quotation"],
    },
    documentNumber: String,
    dueDate: Date,
    additionalInfo: String,
    termsConditions: String,
    status: {
      type: String,
      default: "Not Paid",
      enum: ["Not Paid", "Not Fully Paid", "Paid"],
    },
    subTotal: Number,
    salesTax: Number,
    rates: String,
    total: Number,
    currency: String,
    totalAmountReceived: Number,
    billingItems: [
      {
        itemName: String,
        unitPrice: Number,
        quantity: Number,
        discount: String,
      },
    ],
    paymentRecords: [paymentSchema],
  },
  {
    timestamps: true,
  },
);

documentSchema.pre("save", async function (next) {
  this.documentNumber = `${new Date().getFullYear()}-${new Date().toLocaleString(
    "default",
    { month: "long" },
  )}-${randomBytes(3).toString("hex").toUpperCase()}`;
  next();
});

const Document = mongoose.model<IDocument>("Document", documentSchema);

export default Document;
