import { Document, model, Schema } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

export interface IRole extends Document {
  name: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true, versionKey: false }
);

RoleSchema.add(commonOptions);

export default model<IRole>("Role", RoleSchema);
