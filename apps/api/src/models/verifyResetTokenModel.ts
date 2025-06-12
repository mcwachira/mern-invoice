import mongoose from "mongoose";
import {
  IVerifyResetTokenDocument,
  IVerifyResetTokenModel,
} from "../types/verifyResetToken";
const { Schema } = mongoose;

const verifyResetToken = new Schema<IVerifyResetTokenDocument>({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
});

const VerifyResetToken = mongoose.model<
  IVerifyResetTokenDocument,
  IVerifyResetTokenModel
>("VerifyResetToken", verifyResetToken);

export default VerifyResetToken;
