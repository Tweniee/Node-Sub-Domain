import { Schema, Document, model } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

// Define the Enquiry schema
interface IEnquiry extends Document {
  userEmail: string;
  goal: Schema.Types.ObjectId;
  message: string;
  isAnswered: boolean;
  phoneNumber: number;
  isActive?: boolean;
  isDeleted?: boolean;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    goal: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EnquirySchema.add(commonOptions);

// Create and export the Enquiry model
export default model<IEnquiry>("Enquiry", EnquirySchema);

