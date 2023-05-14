import { Schema, model, Document, Types } from "mongoose";
import UniqueValues from "../../../Constants/UniqueValues";
import { commonOptions } from "../../Constants/commonOptions";

interface IClientService extends Document {
  client_id: typeof Types.ObjectId;
  clientUserId: typeof Types.ObjectId;
  dietitianUserId: typeof Types.ObjectId;
  service_id: typeof Types.ObjectId;
  subscription: "Active" | "In-progress" | "Completed";
  isActive?: boolean;
  isDeleted?: boolean;
}

const ClientServiceSchema = new Schema<IClientService>(
  {
    client_id: { type: Types.ObjectId, required: true, ref: "Client" },
    clientUserId: { type: Types.ObjectId, ref: "users", required: true },
    dietitianUserId: { type: Types.ObjectId, ref: "users", required: true },
    service_id: { type: Types.ObjectId, required: true, ref: "Service" },
    subscription: {
      type: String,
      enum: UniqueValues.CLIENT_SERVICE_SERVICE_ENUM,
    },
  },
  { timestamps: true, versionKey: false }
);

ClientServiceSchema.add(commonOptions);

export default model<IClientService>(
  "clientService_Status",
  ClientServiceSchema
);
