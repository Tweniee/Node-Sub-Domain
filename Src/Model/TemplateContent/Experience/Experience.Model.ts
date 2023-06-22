import { Types, Schema, Document, model } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

// Interface for templateExperienceSection document
interface ITemplateExperienceSection extends Document {
  icon: string;
  bg_Color: string;
  text: Schema.Types.ObjectId;
  imageText: Schema.Types.ObjectId;
  cardImage: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Mongoose schema for templateExperienceSection
const templateExperienceSectionSchema = new Schema<ITemplateExperienceSection>(
  {
    icon: { type: String, required: true },
    bg_Color: { type: String, required: true },
    text: { type: Types.ObjectId, ref: "templateText", required: true },
    imageText: { type: Types.ObjectId, ref: "templateText", required: true },
    cardImage: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

templateExperienceSectionSchema.add(commonOptions);

// Create and export the Mongoose model
const TemplateExperienceSectionModel = model<ITemplateExperienceSection>(
  "templateExperienceSection",
  templateExperienceSectionSchema
);

export { TemplateExperienceSectionModel, ITemplateExperienceSection };
