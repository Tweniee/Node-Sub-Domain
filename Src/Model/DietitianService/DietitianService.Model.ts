import mongoose, { Schema, Document } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

// Define interface for DietitianService document
interface IDietitianService extends Document {
  tabName: mongoose.Types.ObjectId;
  serviceName: mongoose.Types.ObjectId;
  description: string;
  price: number;
  durationInMinutes: number;
  availableDays: string[];
  dietitian: mongoose.Types.ObjectId;
}

// Define schema for DietitianService
const DietitianServiceSchema: Schema = new Schema(
  {
    tabName: {
      type: mongoose.Types.ObjectId,
      ref: "Dashboard",
      required: true,
    },
    dietitian: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    serviceName: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    // * durationInMinutes Field Allow Dietitian to set the time limit of the session they will take one on one with the client //
    availableDays: [{ type: String }],
    // * availableDays Field Allows the dietitian to set the days in a week of when they are available //
  },
  { timestamps: true, versionKey: false }
);

DietitianServiceSchema.add(commonOptions);

// Define and export DietitianService model
export default mongoose.model<IDietitianService>(
  "DietitianService",
  DietitianServiceSchema
);
