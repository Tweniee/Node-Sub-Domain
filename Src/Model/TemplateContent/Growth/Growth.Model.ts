import { Schema, Document, model } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

// Interface for templateGrowthSection document
interface ITemplateGrowthSection extends Document {
  text: Schema.Types.ObjectId;
  cardImage: string;
  bulletPoints: string;
  bulletIcons: string;
  icon: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Define the Mongoose schema for templateGrowthSection
const templateGrowthSectionSchema = new Schema<ITemplateGrowthSection>(
  {
    text: {
      type: Schema.Types.ObjectId,
      ref: "templateText",
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    cardImage: {
      type: String,
      required: true,
    },
    bulletPoints: {
      type: String,
      required: true,
    },
    bulletIcons: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

templateGrowthSectionSchema.add(commonOptions);

// Create and export the Mongoose model for templateGrowthSection
const TemplateGrowthSectionModel = model<ITemplateGrowthSection>(
  "templateGrowthSection",
  templateGrowthSectionSchema
);

export { TemplateGrowthSectionModel, ITemplateGrowthSection };
