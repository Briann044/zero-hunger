"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Check, Heart } from "lucide-react"
import Link from "next/link"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-plans"

export default function SubscribePage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "ngo_premium"
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const plan = SUBSCRIPTION_PLANS[planId]

  const handleSubscribe = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, interval: "month" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed")
      }

      // In production, redirect to Stripe Checkout or handle payment confirmation
      console.log("[v0] Subscription created:", data)

      // Mock success - redirect to dashboard
      window.location.href = "/dashboard?subscribed=true"
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Plan Not Found</CardTitle>
            <CardDescription>The requested subscription plan could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/pricing">View All Plans</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground">
              ZeroHunger
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Plan Summary */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-4">Selected Plan</Badge>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Subscription Form */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Subscription</CardTitle>
              <CardDescription>Start your 14-day free trial today. Cancel anytime.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <span>14-day free trial</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span>
                    Then ${plan.price}/{plan.interval}
                  </span>
                  <span className="font-medium">${plan.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={handleSubscribe} disabled={loading} className="w-full" size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Start Free Trial"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription
                  at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
