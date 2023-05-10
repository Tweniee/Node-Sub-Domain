import { Document, Schema, model } from "mongoose";
import { commonOptions } from "../../Constants/commonOptions";

export interface IPermission extends Document {
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
}

const permissionSchema = new Schema<IPermission>(
  {
    canCreate: { type: Boolean, required: true, default: false },
    canRead: { type: Boolean, required: true, default: false },
    canUpdate: { type: Boolean, required: true, default: false },
    canDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false }
);

permissionSchema.add(commonOptions);

export default model<IPermission>("Permission", permissionSchema);
