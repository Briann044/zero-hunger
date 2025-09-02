// app/food-donations/create/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CreateFoodDonationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    location: "",
    expiryDate: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Basic validation
    if (!formData.title || !formData.description || !formData.quantity || !formData.location) {
      toast.error("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/food-donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to create donation")
        setLoading(false)
        return
      }

      toast.success("Food donation created successfully!")
      router.push("/food-donations") // redirect to list of donations
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Food Donation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Surplus rice donation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the food items"
              required
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
            <Input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="50 kg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Nairobi, Kenya"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <Input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Create Donation"}
          </Button>
        </form>
      </div>
    </div>
  )
}
