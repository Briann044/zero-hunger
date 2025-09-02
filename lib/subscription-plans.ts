export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  interval: "month" | "year"
  stripePriceId: string
  features: string[]
  limits: {
    projects?: number
    analytics?: boolean
    prioritySupport?: boolean
    customBranding?: boolean
    advancedReporting?: boolean
  }
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  ngo_basic: {
    id: "ngo_basic",
    name: "NGO Basic",
    description: "Essential tools for small NGOs",
    price: 0,
    interval: "month",
    stripePriceId: "",
    features: ["Up to 3 active projects", "Basic analytics", "Standard support", "Donation processing"],
    limits: {
      projects: 3,
      analytics: false,
      prioritySupport: false,
      customBranding: false,
      advancedReporting: false,
    },
  },
  ngo_premium: {
    id: "ngo_premium",
    name: "NGO Premium",
    description: "Advanced features for growing organizations",
    price: 29,
    interval: "month",
    stripePriceId: "price_premium_monthly",
    features: [
      "Unlimited projects",
      "Advanced analytics & reporting",
      "Priority donor visibility",
      "Priority support",
      "Custom branding",
      "Impact tracking tools",
    ],
    limits: {
      projects: -1, // unlimited
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      advancedReporting: true,
    },
  },
  corporate: {
    id: "corporate",
    name: "Corporate Partnership",
    description: "Enterprise solutions for corporate CSR",
    price: 199,
    interval: "month",
    stripePriceId: "price_corporate_monthly",
    features: [
      "Everything in Premium",
      "White-label solutions",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced CSR reporting",
      "API access",
    ],
    limits: {
      projects: -1,
      analytics: true,
      prioritySupport: true,
      customBranding: true,
      advancedReporting: true,
    },
  },
}

export function getUserPlan(userRole: string, subscriptionStatus?: string): SubscriptionPlan {
  if (userRole === "ngo") {
    return subscriptionStatus === "premium" ? SUBSCRIPTION_PLANS.ngo_premium : SUBSCRIPTION_PLANS.ngo_basic
  }
  if (userRole === "corporate") {
    return SUBSCRIPTION_PLANS.corporate
  }
  return SUBSCRIPTION_PLANS.ngo_basic
}

export function canAccessFeature(userPlan: SubscriptionPlan, feature: keyof SubscriptionPlan["limits"]): boolean {
  return userPlan.limits[feature] === true || userPlan.limits[feature] === -1
}
