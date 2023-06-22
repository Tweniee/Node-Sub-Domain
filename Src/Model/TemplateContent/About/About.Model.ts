import { Schema, Document, model } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

// Interface
interface ITemplateAboutSection extends Document {
  text: Schema.Types.ObjectId;
  cards: string[];
  isActive?: boolean;
  isDeleted?: boolean;
}

// Mongoose schema
const TemplateAboutSectionSchema = new Schema<ITemplateAboutSection>(
  {
    text: { type: Schema.Types.ObjectId, ref: "templateText", required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: "templateBannerCards" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TemplateAboutSectionSchema.add(commonOptions);

const TemplateAboutSectionModel = model<ITemplateAboutSection>(
  "TemplateAboutSection",
  TemplateAboutSectionSchema
);

export default TemplateAboutSectionModel;
