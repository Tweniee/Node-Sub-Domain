import { Schema, Document, model } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

// Define the EnquiryReplies schema
interface IEnquiryReplies extends Document {
  enquiryId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  message: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

const EnquiryRepliesSchema = new Schema<IEnquiryReplies>(
  {
    // * We'll trigger the Email with a response from dietitian
    enquiryId: {
      type: Schema.Types.ObjectId,
      ref: "Enquiry",
      required: true,
    },
    // * Who replied is userId
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EnquiryRepliesSchema.add(commonOptions);

// Create and export the EnquiryReplies model
export default model<IEnquiryReplies>("EnquiryReplies", EnquiryRepliesSchema);
