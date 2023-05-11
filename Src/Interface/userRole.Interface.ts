import { Document, Types } from "mongoose";

interface IUserRole extends Document {
  _id: Types.ObjectId;
  role: Types.ObjectId;
}

export default IUserRole;
