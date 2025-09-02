// app/donate/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Users, Utensils, Globe, ArrowRight, Shield, Star, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function DonatePage() {
  const { user } = useAuth()
  const router = useRouter()

  const [donationType, setDonationType] = useState("general")
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const quickAmounts = [500, 1000, 2500, 5000, 10000]

  const donationTypes = [
    {
      id: "general",
      title: "General Fund",
      description: "Support our overall mission to fight hunger",
      icon: Heart,
      impact: "Flexible funding for urgent needs",
    },
    {
      id: "emergency",
      title: "Emergency Relief",
      description: "Immediate food assistance for crisis situations",
      icon: Shield,
      impact: "Rapid response to food emergencies",
    },
    {
      id: "education",
      title: "School Feeding",
      description: "Nutritious meals for children in schools",
      icon: Users,
      impact: "Better education through nutrition",
    },
    {
      id: "community",
      title: "Community Programs",
      description: "Long-term food security initiatives",
      icon: Globe,
      impact: "Sustainable community development",
    },
  ]

  const featuredProjects = [
    {
      id: 1,
      title: "School Feeding Program - Kibera",
      organization: "Hope Foundation Kenya",
      image: "/school-children-eating-lunch-classroom.png",
      raised: 450000,
      goal: 500000,
      supporters: 234,
    },
    {
      id: 2,
      title: "Emergency Food Relief - Turkana",
      organization: "Kenya Red Cross",
      image: "/rural-community-food-distribution-kenya.png",
      raised: 780000,
      goal: 1000000,
      supporters: 456,
    },
    {
      id: 3,
      title: "Community Garden Initiative",
      organization: "Green Future Kenya",
      image: "/community-garden-vegetables-farming.png",
      raised: 120000,
      goal: 200000,
      supporters: 89,
    },
  ]

  const calculateMeals = (amount: number) => {
    return Math.floor(amount / 20) // KSh 20 per meal
  }

  const validateForm = () => {
    if (!amount || Number.parseFloat(amount) < 1) {
      setError("Please enter a valid donation amount (minimum KSh 1)")
      return false
    }

    if (paymentMethod === "mpesa" && (!phoneNumber || phoneNumber.length < 10)) {
      setError("Please enter a valid phone number for M-Pesa payments")
      return false
    }

    return true
  }

  const handleDonate = async () => {
    if (!user) {
      router.push("/auth/login?redirect=/donate")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const donationData = {
        projectId: "general", // General donation
        amount: Number.parseFloat(amount),
        frequency,
        paymentMethod,
        message,
        anonymous,
        phoneNumber: paymentMethod === "mpesa" ? phoneNumber : undefined,
        donationType, // Add donation type for general donations
      }

      console.log("[v0] Processing donation:", donationData)

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Donation failed")
      }

      console.log("[v0] Donation successful:", result)

      // Handle Stripe payment confirmation if needed
      if (result.requiresConfirmation && result.clientSecret) {
        // For Stripe payments, redirect to a confirmation page or handle with Stripe Elements
        // For now, we'll treat it as successful
        console.log("[v0] Stripe payment requires confirmation:", result.clientSecret)
      }

      // Redirect to success page
      router.push(`/donations/success?id=${result.donation.id}&amount=${amount}`)
    } catch (err: any) {
      console.error("[v0] Donation error:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Make a Difference Today</h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto text-balance">
              Your donation can provide meals, hope, and a brighter future for those fighting hunger
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-emerald-100">
                <Star className="w-5 h-5 fill-current" />
                <span>Trusted by 10,000+ donors</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Shield className="w-5 h-5" />
                <span>100% secure donations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Choose Your Impact</CardTitle>
                <CardDescription>Select how you'd like to support the fight against hunger</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Donation Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Donation Focus</Label>
                  <RadioGroup value={donationType} onValueChange={setDonationType}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {donationTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <div key={type.id} className="relative">
                            <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                            <Label
                              htmlFor={type.id}
                              className="flex flex-col p-4 border-2 rounded-lg cursor-pointer hover:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <Icon className="w-5 h-5 text-emerald-600" />
                                <span className="font-medium">{type.title}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{type.description}</p>
                              <p className="text-xs text-emerald-600 font-medium">{type.impact}</p>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {/* Amount Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Donation Amount (KSh)</Label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {quickAmounts.map((quickAmount) => (
                      <Button
                        key={quickAmount}
                        variant={amount === quickAmount.toString() ? "default" : "outline"}
                        onClick={() => setAmount(quickAmount.toString())}
                        className="h-12"
                      >
                        {quickAmount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg h-12"
                  />
                  {amount && (
                    <p className="text-sm text-emerald-600 font-medium">
                      <Utensils className="w-4 h-4 inline mr-1" />
                      This can provide {calculateMeals(Number.parseFloat(amount) || 0)} meals
                    </p>
                  )}
                </div>

                {/* Frequency Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Donation Frequency</Label>
                  <RadioGroup value={frequency} onValueChange={setFrequency}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">One-time donation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly donation</Label>
                      <Badge variant="secondary" className="ml-2">
                        Recommended
                      </Badge>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa">M-Pesa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instasend" id="instasend" />
                      <Label htmlFor="instasend">Instasend</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Phone Number Input for M-Pesa */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="e.g., 254712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12"
                    />
                    <p className="text-sm text-gray-600">Enter your M-Pesa registered phone number</p>
                  </div>
                )}

                {/* Optional Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share why you're donating or leave a message of hope..."
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Anonymous Donation Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Make this donation anonymous
                  </Label>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  disabled={!amount || isLoading}
                  className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Donate KSh {amount ? Number.parseFloat(amount).toLocaleString() : "0"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Authentication Notice */}
                {!user && (
                  <p className="text-sm text-center text-gray-600">
                    You'll be redirected to sign in before completing your donation
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Our Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">2.4M+</p>
                  <p className="text-sm text-gray-600">Meals Provided</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">45,000+</p>
                  <p className="text-sm text-gray-600">People Helped</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">150+</p>
                  <p className="text-sm text-gray-600">Active Projects</p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Projects</CardTitle>
                <CardDescription>Support specific initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">{project.title}</h4>
                          <p className="text-xs text-gray-600 mb-1">{project.organization}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-600 font-medium">
                              {Math.round((project.raised / project.goal) * 100)}% funded
                            </span>
                            <span className="text-gray-500">{project.supporters} supporters</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/projects">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
