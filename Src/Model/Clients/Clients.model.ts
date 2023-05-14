import mongoose, { Schema } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

export interface IClient extends mongoose.Document {
  client: Schema.Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  activityLevel: string;
  height: number;
  weight: number;
  goal: Schema.Types.ObjectId;
  medicalConditions?: string[];
  allergies?: string[];
  dietitian: Schema.Types.ObjectId;
  isActive?: boolean;
  isDeleted?: boolean;
}

const clientSchema: Schema = new Schema<IClient>(
  {
    // * Which user is requesting a service
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // * From whom the service is being requested
    dietitian: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // * The Service the are requesting
    goal: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    activityLevel: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    medicalConditions: [
      {
        type: String,
        default: [],
      },
    ],
    allergies: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

clientSchema.add(commonOptions);

export default mongoose.model<IClient>("Client", clientSchema);
