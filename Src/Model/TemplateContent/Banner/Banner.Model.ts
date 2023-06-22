import { Document, Schema, model } from 'mongoose';
import { commonOptions } from '../../Constants/commonOptions';

// Interface
interface ITemplateBannerSection extends Document {
  bg_Image: string;
  text: Schema.Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
}

// Schema
const TemplateBannerSectionSchema = new Schema<ITemplateBannerSection>({
  bg_Image: {
    type: String,
    required: true
  },
  text: {
    type: Schema.Types.ObjectId,
    ref: 'templateText',
    required: true
  }
},
{
  timestamps: true,
  versionKey: false,
}
);

TemplateBannerSectionSchema.add(commonOptions);

// Model
const TemplateBannerSectionModel = model<ITemplateBannerSection>('templateBannerSection', TemplateBannerSectionSchema);

export { ITemplateBannerSection, TemplateBannerSectionModel };
