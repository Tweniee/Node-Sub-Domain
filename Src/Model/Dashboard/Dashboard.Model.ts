import { Document, Schema, Types, model } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";
import { IPermission } from "./Permissions/Permissions.Model";

export interface IDashboard extends Document {
  role: typeof Types.ObjectId;
  name: string;
  permissions: IPermission;
  isActive?: boolean;
  isDeleted?: boolean;
}

const dashboardSchema = new Schema<IDashboard>(
  {
    role: { type: Types.ObjectId, ref: "Role", required: true },
    name: { type: String, required: true },
    permissions: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

dashboardSchema.add(commonOptions);

export default model<IDashboard>("Dashboard", dashboardSchema);
