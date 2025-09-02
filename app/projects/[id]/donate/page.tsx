"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import Link from "next/link"
import { notFound } from "next/navigation"

interface DonatePageProps {
  params: { id: string }
}

interface Project {
  id: string
  title: string
  shortDescription: string
  category: string
  imageUrl?: string
  verified: boolean
  ngoName: string
  location: string
}

export default function DonatePage({ params }: DonatePageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loadingProject, setLoadingProject] = useState(true)
  const [projectError, setProjectError] = useState(false)

  const [amount, setAmount] = useState(searchParams.get("amount") || "")
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | "instasend">("card")
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const predefinedAmounts = [25, 50, 100, 250, 500]
  const mealsFromDonation = amount ? Math.floor(Number(amount) * 2) : 0

  // Fetch project from API
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (!res.ok) throw new Error("Project not found")
        const data = await res.json()
        if (!data.project) {
          setProjectError(true)
        } else {
          setProject(data.project)
        }
      } catch (err) {
        console.error(err)
        setProjectError(true)
      } finally {
        setLoadingProject(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loadingProject) return <p className="text-center py-16">Loading project...</p>
  if (projectError || !project) notFound()

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
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
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
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Form and sidebar content remains the same */}
        {/* ... your existing form JSX ... */}
      </div>
    </div>
  )
}
