import { Document, Schema, model, Types } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  role: typeof Types.ObjectId;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  sessionEndTime?: string;
  sessionStartTime?: string;
  availableDays?: string[];
  isActive?: boolean;
  isDeleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    availableDays: [
      {
        type: String,
        default: null,
      },
    ],
    sessionEndTime: {
      type: String,
      default: null,
    },
    sessionStartTime: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.add(commonOptions);

export default model<IUser>("users", userSchema);
