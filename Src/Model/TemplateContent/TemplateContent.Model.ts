import { Schema, Document, model, Types } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

// Define the interface for a document in the collection
interface ITemplateContentInfo extends Document {
  tabName: Schema.Types.ObjectId;
  sectionOne: Schema.Types.ObjectId;
  sectionTwo: Schema.Types.ObjectId[];
  sectionThree: Schema.Types.ObjectId;
  sectionFour: Schema.Types.ObjectId;
  sectionFive: Schema.Types.ObjectId;
  dietitian: Schema.Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Define the Mongoose schema
const templateContentInfoSchema = new Schema<ITemplateContentInfo>(
  {
    tabName: { type: Schema.Types.ObjectId, ref: "dashboard", required: true },
    sectionOne: {
      type: Schema.Types.ObjectId,
      ref: "templateBannerSection",
      required: true,
    },
    sectionTwo: [
      {
        type: Schema.Types.ObjectId,
        ref: "templateBannerCards",
        required: true,
      },
    ],
    sectionThree: {
      type: Schema.Types.ObjectId,
      ref: "templateExperienceSection",
      required: true,
    },
    sectionFour: {
      type: Schema.Types.ObjectId,
      ref: "templateGrowthSection",
      required: true,
    },
    sectionFive: {
      type: Schema.Types.ObjectId,
      ref: "templateAboutSection",
      required: true,
    },
    dietitian: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

templateContentInfoSchema.add(commonOptions);

// Define the Mongoose model for the collection
export const TemplateContentModel = model<ITemplateContentInfo>(
  "templateContent",
  templateContentInfoSchema
);
