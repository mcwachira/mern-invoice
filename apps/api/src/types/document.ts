import { Document as MongooseDocument, Types } from "mongoose";

// Embedded payment record schema
export interface IPaymentRecord {
  paidBy?: string;
  datePaid?: string;
  amountPaid?: number;
  paymentMethod?:
    | "Cash"
    | "Mobile Money"
    | "Paypal"
    | "Credit Card"
    | "Bank Transfer"
    | "Others";
  additionalInfo?: string;
}

// Embedded billing item schema
export interface IBillingItem {
  itemName?: string;
  unitPrice?: number;
  quantity?: number;
  discount?: string;
}

// Embedded customer snapshot within the document
export interface ICustomerSnapshot {
  name?: string;
  email?: string;
  accountNo?: string;
  vatTinNo?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
}

// Main Document interface for Mongoose
export interface IDocument extends MongooseDocument {
  createdBy: Types.ObjectId;
  customer: ICustomerSnapshot;
  documentType: "Invoice" | "Receipt" | "Quotation";
  documentNumber?: string;
  dueDate?: Date;
  additionalInfo?: string;
  termsConditions?: string;
  status: "Not Paid" | "Not Fully Paid" | "Paid";
  subTotal?: number;
  salesTax?: number;
  rates?: string;
  total?: number;
  currency?: string;
  totalAmountReceived?: number;
  billingItems: IBillingItem[];
  paymentRecords: IPaymentRecord[];
  createdAt: Date;
  updatedAt: Date;
}
