import { Types } from "mongoose";
import {
  Subscription,
  UpdateSubscription,
} from "../../Interface/Subscription.Interface";
import { SubscriptionModel } from "../../Model/Index";

export const createSubscriptionPlanService = async (body: Subscription) => {
  const subscriptionPlan = await SubscriptionModel.create(body);
  return subscriptionPlan;
};

export const updateSubscriptionPlanService = async (
  body: UpdateSubscription
) => {
  const { planId, tabName, name, description, currency, price, duration } =
    body;
  const updatedSubscriptionPlan = await SubscriptionModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(planId),
    },
    { $set: { tabName, name, description, currency, price, duration } },
    { new: true }
  );
  return updatedSubscriptionPlan;
};

export const getSingleSubscriptionPlanService = async (planId: string) => {
  const subscriptionPlan = await SubscriptionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(planId),
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);
  return subscriptionPlan;
};

export const getAllSubscriptionPlanService = async () => {
  const subscriptionPlan = await SubscriptionModel.aggregate([
    {
      $match: {
        isActive: true,
        isDeleted: false,
      },
    },
    {
      $project: {
        isActive: 0,
        isDeleted: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);
  return subscriptionPlan;
};

export const deleteSubscriptionPlanService = async (planId: Types.ObjectId) => {
  const subscriptionPlan = await SubscriptionModel.findOneAndUpdate(
    { _id: new Types.ObjectId(planId) },
    { $set: { isActive: false, isDeleted: true } },
    { new: true }
  );
  return subscriptionPlan;
};
