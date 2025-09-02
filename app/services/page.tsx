"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, User, Calendar } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  description: string
  skills: string[]
  location: string
  hoursAvailable: number
  availability: string
  createdAt: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services")
        if (!res.ok) throw new Error("Failed to fetch services")
        const data = await res.json()
        setServices(data.services || [])
      } catch (err) {
        console.error(err)
        setError("Failed to load services")
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const getSkillColor = (skill: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
    ]
    return colors[skill.length % colors.length]
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
            <Link href="/food-donations" className="text-muted-foreground hover:text-foreground transition-colors">
              Food Donations
            </Link>
            <Link href="/services" className="text-foreground font-medium">
              Services
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/services/create">Offer Service</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Volunteer Services & Skills</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Share your skills and time to support hunger relief efforts. From logistics to education, every skill makes
            a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#service-listings">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services/create">Offer Your Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Listings */}
      <section id="service-listings" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Available Services</h2>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {services.length} Available Services
              </Badge>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-16 text-muted-foreground">Loading services...</p>
          ) : error ? (
            <p className="text-center py-16 text-red-600">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground">No services available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-600 text-white">Available</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.hoursAvailable}h</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-balance">{service.title}</CardTitle>
                    <CardDescription className="text-pretty">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Skills Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className={getSkillColor(skill)}>
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{service.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Posted {new Date(service.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/services/${service.id}/request`}>Request Service</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/services/${service.id}`}>Details</Link>
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
          <h3 className="text-3xl font-bold mb-4 text-balance">Have Skills to Share?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Your expertise can make a real difference in fighting hunger. From nutrition education to logistics support,
            every skill counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register?role=donor">Join as Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services/create">Offer Your Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
