import mongoose, { Schema, Document } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

interface IPayment extends Document {
  payment_id: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  payer_id: Schema.Types.ObjectId;
  payee_id: Schema.Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
}

const paymentSchema: Schema<IPayment> = new Schema<IPayment>(
  {
    payment_id: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

paymentSchema.add(commonOptions);

export default mongoose.model<IPayment>("Payment", paymentSchema);

// ! Only Model is created But the gateway is pending that we'll work in future
