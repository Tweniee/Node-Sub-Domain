export interface Subscription {
  tabName: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  duration: SubscriptionDuration;
}

export interface UpdateSubscription {
  planId:string;
  tabName: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  duration: SubscriptionDuration;
}
type SubscriptionDuration =
  | "ONE_MONTH"
  | "THREE_MONTHS"
  | "SIX_MONTHS"
  | "ONE_YEAR";
