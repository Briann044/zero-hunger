"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, CreditCard, Smartphone, Globe, ArrowLeft, DollarSign, Loader2 } from "lucide-react"
import { mockProjects } from "@/lib/mock-data"
import Link from "next/link"
import { notFound, useSearchParams } from "next/navigation"

interface DonatePageProps {
  params: {
    id: string
  }
}

export default function DonatePage({ params }: DonatePageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const project = mockProjects.find((p) => p.id === params.id)

  const [amount, setAmount] = useState(searchParams.get("amount") || "")
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | "instasend">("card")
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!project) {
    notFound()
  }

  const predefinedAmounts = [25, 50, 100, 250, 500]
  const mealsFromDonation = amount ? Math.floor(Number(amount) * 2) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number(amount) < 1) {
      setError("Please enter a valid donation amount")
      return
    }

    if (paymentMethod === "mpesa" && (!phoneNumber || phoneNumber.length < 10)) {
      setError("Please enter a valid phone number for M-Pesa payment")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          amount: Number(amount),
          frequency,
          paymentMethod,
          message,
          anonymous,
          phoneNumber: paymentMethod === "mpesa" ? phoneNumber : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.requiresConfirmation && data.clientSecret) {
          console.log("[v0] Payment requires confirmation:", data.clientSecret)
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }

        router.push(`/donations/success?id=${data.donation.id}`)
      } else {
        setError(data.error || "Donation failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground">
              ZeroHunger
            </Link>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ✓ Verified
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Donate to: {project.title}</h1>
            <p className="text-muted-foreground text-lg">
              Supporting {project.ngoName} • {project.location}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Make Your Donation</CardTitle>
                <CardDescription>Every dollar makes a difference in fighting hunger</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Donation Amount</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {predefinedAmounts.map((presetAmount) => (
                        <Button
                          key={presetAmount}
                          type="button"
                          variant={amount === presetAmount.toString() ? "default" : "outline"}
                          onClick={() => setAmount(presetAmount.toString())}
                          className="h-12"
                        >
                          ${presetAmount}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10"
                        min="1"
                        required
                      />
                    </div>
                    {mealsFromDonation > 0 && (
                      <p className="text-sm text-muted-foreground">
                        💡 Your ${amount} donation will provide approximately {mealsFromDonation} meals
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Donation Frequency</Label>
                    <Select value={frequency} onValueChange={(value: "one-time" | "monthly") => setFrequency(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time donation</SelectItem>
                        <SelectItem value="monthly">Monthly recurring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Payment Method</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        type="button"
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("card")}
                        className="justify-start h-12"
                      >
                        <CreditCard className="mr-3 h-4 w-4" />
                        Credit/Debit Card (Stripe)
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "mpesa" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("mpesa")}
                        className="justify-start h-12"
                      >
                        <Smartphone className="mr-3 h-4 w-4" />
                        M-Pesa Mobile Money
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "instasend" ? "default" : "outline"}
                        onClick={() => setPaymentMethod("instasend")}
                        className="justify-start h-12"
                      >
                        <Globe className="mr-3 h-4 w-4" />
                        Instasend (Global)
                      </Button>
                    </div>
                  </div>

                  {paymentMethod === "mpesa" && (
                    <div className="space-y-3">
                      <Label htmlFor="phoneNumber" className="text-base font-medium">
                        M-Pesa Phone Number
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="e.g., +254712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">Enter your M-Pesa registered phone number</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support for the community..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={anonymous}
                      onCheckedChange={(checked) => setAnonymous(checked as boolean)}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Make this donation anonymous
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!amount || loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Donate $${amount || "0"} ${frequency === "monthly" ? "Monthly" : "Now"}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.shortDescription}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your donation:</span>
                        <span className="font-medium">${amount || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meals provided:</span>
                        <span className="font-medium">{mealsFromDonation} meals</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="font-medium capitalize">{frequency}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  <strong>100% of your donation</strong> goes directly to this project. Platform fees are covered by
                  optional tips and corporate sponsorships.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why This Matters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Verified NGO with transparent fund allocation</li>
                    <li>• Real-time impact tracking and reporting</li>
                    <li>• Direct community benefit with measurable outcomes</li>
                    <li>• Tax-deductible receipt provided automatically</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
