// lib/ types.ts
export type DonationType = "monetary" | "food" | "service"
export type DonationFrequency = "one-time" | "monthly" | "weekly"
export type ProjectStatus = "active" | "completed" | "paused" | "draft"
export type FoodCategory = "fresh-produce" | "packaged-food" | "prepared-meals" | "beverages"

export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  ngoId: string
  ngoName: string
  targetAmount: number
  raisedAmount: number
  goalMeals: number
  providedMeals: number
  status: ProjectStatus
  category: string
  location: string
  imageUrl: string
  createdAt: string
  endDate: string
  verified: boolean
}

export interface Donation {
  id: string
  donorId: string
  projectId: string
  type: DonationType
  amount?: number // For monetary donations
  frequency?: DonationFrequency
  description: string
  status: "pending" | "completed" | "failed"
  createdAt: string
  receiptUrl?: string
}

export interface FoodDonation {
  id: string
  providerId: string
  title: string
  description: string
  category: FoodCategory
  quantity: number
  unit: string
  expiryDate: string
  pickupLocation: string
  pickupTimeStart: string
  pickupTimeEnd: string
  status: "available" | "claimed" | "completed"
  imageUrl?: string
  createdAt: string
}

export interface ServiceDonation {
  id: string
  donorId: string
  title: string
  description: string
  skills: string[]
  hoursAvailable: number
  location: string
  availability: string
  status: "available" | "matched" | "completed"
  createdAt: string
}
