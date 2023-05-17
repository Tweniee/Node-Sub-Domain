import { Schema, model, Types, Model } from "mongoose";
import { commonOptions } from "../Constants/commonOptions";
import UniqueValues from "../../Constants/UniqueValues";

enum SubscriptionDuration {
  ONE_MONTH = "ONE_MONTH",
  THREE_MONTHS = "THREE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
}

interface ISubscriptionPlan {
  tabName: typeof Types.ObjectId;
  name: string;
  description: string;
  currency: string;
  price: number;
  duration: SubscriptionDuration;
  active: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    tabName: { type: Types.ObjectId, ref: "dashboard", required: true },
    name: { type: String, required: true },
    // * description is a innerHTML
    description: { type: String, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    duration: {
      type: String,
      enum: Object.values(SubscriptionDuration),
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SubscriptionPlanSchema.add(commonOptions);

// Define pre-save hook
SubscriptionPlanSchema.pre<ISubscriptionPlan>("save", async function (next) {
  const model = this.constructor as Model<ISubscriptionPlan>;
  const count = await model.countDocuments();
  const limit = Number(UniqueValues.SUBSCRIPTION_LIMIT);

  if (count >= limit) {
    throw new Error("Document limit exceeded. Only 4 Are Allowed");
  }
  next();
});

export default model<ISubscriptionPlan>(
  "subscription_plans",
  SubscriptionPlanSchema
);
