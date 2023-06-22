import { Schema, Document, model, Types } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

// Interface
interface ITemplateCardSection extends Document {
  icon: string;
  text: Schema.Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Mongoose schema
const templateCardSectionSchema = new Schema<ITemplateCardSection>({
  icon: { type: String, required: true },
  text: { type: Types.ObjectId, ref: "TemplateText", required: true },
},
{
  timestamps: true,
  versionKey: false,
}
);

templateCardSectionSchema.add(commonOptions);

const TemplateCardSectionModel = model<ITemplateCardSection>(
  "TemplateCardSection",
  templateCardSectionSchema
);

export { TemplateCardSectionModel, ITemplateCardSection };
