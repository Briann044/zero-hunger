"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Package, Calendar } from "lucide-react"
import Link from "next/link"

interface FoodDonation {
  id: string
  title: string
  description: string
  category: string
  imageUrl?: string
  quantity: number
  unit: string
  expiryDate: string
  pickupLocation: string
  pickupTimeStart: string
  pickupTimeEnd: string
}

export default function FoodDonationsPage() {
  const [foodDonations, setFoodDonations] = useState<FoodDonation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFoodDonations() {
      try {
        const res = await fetch("/api/food-donations")
        if (!res.ok) throw new Error("Failed to fetch food donations")
        const data = await res.json()
        setFoodDonations(data.foodDonations || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodDonations()
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fresh-produce":
        return "🥬"
      case "packaged-food":
        return "📦"
      case "prepared-meals":
        return "🍽️"
      case "beverages":
        return "🥤"
      default:
        return "🍎"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fresh-produce":
        return "bg-green-100 text-green-800"
      case "packaged-food":
        return "bg-blue-100 text-blue-800"
      case "prepared-meals":
        return "bg-orange-100 text-orange-800"
      case "beverages":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <Link href="/food-donations" className="text-foreground font-medium">
              Food Donations
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/food-donations/create">List Food</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Available Food Donations</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Rescue surplus food from restaurants, markets, and food providers. Help reduce waste while feeding
            communities in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#food-listings">Browse Available Food</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/food-donations/create">Donate Surplus Food</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Food Listings */}
      <section id="food-listings" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Available Food</h2>
          </div>

          {loading ? (
            <p>Loading food donations...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodDonations.map((food) => (
                <Card key={food.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {food.imageUrl && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={food.imageUrl || "/placeholder.svg"}
                        alt={food.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(food.category)}>
                          {getCategoryIcon(food.category)} {food.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">Available</Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl text-balance">{food.title}</CardTitle>
                    <CardDescription className="text-pretty">{food.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {food.quantity} {food.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Expires {new Date(food.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{food.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          Pickup: {food.pickupTimeStart} - {food.pickupTimeEnd}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/food-donations/${food.id}/claim`}>Claim Food</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/food-donations/${food.id}`}>Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-balance">Have Surplus Food?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Join our network of food providers helping to reduce waste and feed communities. List your surplus food in
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register?role=food-provider">Join as Food Provider</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/food-donations/create">List Surplus Food</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
