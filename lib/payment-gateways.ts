import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  paymentIntentId?: string
  clientSecret?: string
}

export interface PaymentRequest {
  amount: number // in cents for Stripe, actual amount for others
  currency: string
  description: string
  metadata?: Record<string, string>
  customerEmail?: string
  phoneNumber?: string // for M-Pesa
}

// Stripe Payment Processing
export async function processStripePayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.amount,
      currency: request.currency,
      description: request.description,
      metadata: request.metadata || {},
      receipt_email: request.customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      success: true,
      transactionId: paymentIntent.id,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Stripe payment failed",
    }
  }
}

// M-Pesa Payment Processing (Mock implementation)
export async function processMpesaPayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    // In production, integrate with M-Pesa API
    // This is a mock implementation
    const mockResponse = await mockMpesaAPI({
      amount: request.amount,
      phoneNumber: request.phoneNumber || "",
      description: request.description,
    })

    if (mockResponse.success) {
      return {
        success: true,
        transactionId: mockResponse.transactionId,
      }
    } else {
      return {
        success: false,
        error: mockResponse.error,
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "M-Pesa payment failed",
    }
  }
}

// Instasend Payment Processing (Mock implementation)
export async function processInstasendPayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    // In production, integrate with Instasend API
    // This is a mock implementation
    const mockResponse = await mockInstasendAPI({
      amount: request.amount,
      currency: request.currency,
      description: request.description,
      customerEmail: request.customerEmail,
    })

    if (mockResponse.success) {
      return {
        success: true,
        transactionId: mockResponse.transactionId,
      }
    } else {
      return {
        success: false,
        error: mockResponse.error,
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Instasend payment failed",
    }
  }
}

// Mock M-Pesa API (replace with actual M-Pesa SDK integration)
async function mockMpesaAPI(data: { amount: number; phoneNumber: string; description: string }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock validation
  if (!data.phoneNumber || data.phoneNumber.length < 10) {
    return { success: false, error: "Invalid phone number" }
  }

  if (data.amount < 1) {
    return { success: false, error: "Invalid amount" }
  }

  // Mock success response
  return {
    success: true,
    transactionId: `MPESA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
}

// Mock Instasend API (replace with actual Instasend SDK integration)
async function mockInstasendAPI(data: {
  amount: number
  currency: string
  description: string
  customerEmail?: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock validation
  if (data.amount < 1) {
    return { success: false, error: "Invalid amount" }
  }

  // Mock success response
  return {
    success: true,
    transactionId: `INSTASEND_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
}

// Payment method router
export async function processPayment(
  method: "card" | "mpesa" | "instasend",
  request: PaymentRequest,
): Promise<PaymentResult> {
  switch (method) {
    case "card":
      return processStripePayment(request)
    case "mpesa":
      return processMpesaPayment(request)
    case "instasend":
      return processInstasendPayment(request)
    default:
      return {
        success: false,
        error: "Unsupported payment method",
      }
  }
}
