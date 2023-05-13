import { Schema, Document, model, Types } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

// Define the interface for a document in the collection
interface ITemplateContentInfo extends Document {
  tabName: typeof Types.ObjectId;
  parentTab: typeof Types.ObjectId;
  children: (typeof Types.ObjectId)[];
  dietitian: typeof Types.ObjectId;
  title: string;
  subTitle: string;
  description: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Define the Mongoose schema
const templateContentInfoSchema = new Schema<ITemplateContentInfo>(
  {
    tabName: {
      type: Types.ObjectId,
      ref: "Dashboard",
      required: true,
    },
    parentTab: {
      type: Types.ObjectId,
      ref: "templateContent",
      required: false,
      default: null,
    },
    children: [
      {
        type: Types.ObjectId,
        ref: "templateContent",
        required: false,
        default: null,
      },
    ],
    dietitian: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

templateContentInfoSchema.add(commonOptions);

// Define the Mongoose model for the collection
export default model<ITemplateContentInfo>(
  "templateContent",
  templateContentInfoSchema
);
