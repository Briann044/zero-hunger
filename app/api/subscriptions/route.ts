// app/api/subscription/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

/**
 * Create a new subscription
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { planId, interval = "month" } = await request.json()
    if (!planId) {
      return NextResponse.json({ error: "Plan ID required" }, { status: 400 })
    }

    // ✅ Ensure Stripe customer exists
    let customerId = user.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id,
          userRole: user.role,
        },
      })

      customerId = customer.id

      // ✅ Persist Stripe customerId to DB
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // ✅ Build price ID convention (e.g. "price_plan123_monthly")
    const priceId = `price_${planId}_${interval}ly`

    // ✅ Create subscription in Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        userId: user.id,
        planId,
      },
    })

    const invoice = subscription.latest_invoice as Stripe.Invoice
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent

    // ✅ Save subscription in DB
    await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        planId,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
      status: subscription.status,
    })
  } catch (error: any) {
    console.error("Subscription creation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create subscription" },
      { status: 500 },
    )
  }
}

/**
 * Get active subscription
 */
export async function GET() {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // ✅ Fetch latest subscription from DB
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    if (!subscription) {
      return NextResponse.json({ subscription: null })
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
