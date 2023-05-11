import { Document, Types } from "mongoose";

interface IPermissionDashboard extends Document {
  _id: Types.ObjectId;
  name: string;
  permissionId: {
    _id: Types.ObjectId;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };
}

export default IPermissionDashboard;
