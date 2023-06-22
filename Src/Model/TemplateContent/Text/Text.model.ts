import mongoose, { Document, Schema, Types } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

interface ITemplateText extends Document {
  subHeading: Types.ObjectId | null;
  text: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

const templateHeadingSchema = new Schema<ITemplateText>({
  subHeading: {
    type: Schema.Types.ObjectId,
    ref: "TemplateText",
    default: null,
  },
  text: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
  versionKey: false,
}
);

templateHeadingSchema.add(commonOptions);

const TemplateTextModel = mongoose.model<ITemplateText>(
  "TemplateText",
  templateHeadingSchema
);

export { TemplateTextModel, ITemplateText };
