import { Types } from "mongoose";

export interface DietitianServiceInterface {
  serviceName: Types.ObjectId;
  tabName:Types.ObjectId;
  dietitian:Types.ObjectId;
  description: string;
  price: number;
  durationInMinutes: number;
  availableDays: string[];
}

export interface UpdateDietitianServiceInterface {
  serviceId:Types.ObjectId;
  description: string;
  price: number;
  durationInMinutes: number;
  availableDays: string[];
}
