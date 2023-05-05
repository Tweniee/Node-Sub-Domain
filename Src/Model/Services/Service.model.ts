import mongoose, { Document } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

// Define the schema for the Service table
export interface IService extends Document {
  name: string;
  image?: string;
  description: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

const ServiceSchema = new mongoose.Schema<IService>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

ServiceSchema.add(commonOptions);

// Create a model for the Service schema
const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;
