import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-plans"

export default function PricingPage() {
  const plans = Object.values(SUBSCRIPTION_PLANS)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground">
              ZeroHunger
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/impact" className="text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </Link>
            <Link href="/pricing" className="text-foreground font-medium">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Choose Your Impact Level</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Select the plan that best fits your organization's needs and amplify your impact in the fight against
            hunger.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={plan.id} className={`relative ${index === 1 ? "border-primary shadow-lg scale-105" : ""}`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  {index === 0 && <Heart className="h-12 w-12 text-primary" />}
                  {index === 1 && <Zap className="h-12 w-12 text-primary" />}
                  {index === 2 && <Crown className="h-12 w-12 text-primary" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/{plan.interval}</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={index === 1 ? "default" : "outline"} size="lg" asChild>
                  <Link href={plan.price === 0 ? "/auth/register" : `/subscribe?plan=${plan.id}`}>
                    {plan.price === 0 ? "Get Started Free" : "Start Free Trial"}
                  </Link>
                </Button>

                {plan.price > 0 && (
                  <p className="text-xs text-muted-foreground text-center">14-day free trial • Cancel anytime</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">How do transaction fees work?</h3>
              <p className="text-muted-foreground text-sm">
                We charge a small 2.5% transaction fee on donations to cover payment processing and platform
                maintenance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground text-sm">
                We accept all major credit cards, M-Pesa, and Instasend for global accessibility.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-muted-foreground text-sm">
                No setup fees. All plans include free onboarding and setup assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
