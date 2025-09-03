"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  shortDescription: string
  category: string
  imageUrl?: string
  verified: boolean
  ngoName: string
  location: string
  raisedAmount: number
  targetAmount: number
  providedMeals: number
  endDate: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Failed to fetch projects")
        const data = await res.json()
        setProjects(data.projects || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
            <Link href="/projects" className="text-foreground font-medium">
              Projects
            </Link>
            <Link href="/food-donations" className="text-muted-foreground hover:text-foreground transition-colors">
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
              <Link href="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Active Projects Fighting Hunger</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Support verified NGO projects making real impact in communities worldwide. Every donation is tracked and
            transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="">Browse Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create-project">Start a Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {projects.length} Active Projects
              </Badge>
            </div>
          </div>

          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
                    </div>
                    {project.verified && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✓ Verified
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-balance">{project.title}</CardTitle>
                    <CardDescription className="text-pretty">{project.shortDescription}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.ngoName}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(project.raisedAmount / project.targetAmount) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{Math.round((project.raisedAmount / project.targetAmount) * 100)}% funded</span>
                        <span>{project.providedMeals.toLocaleString()} meals provided</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Ends {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/projects/${project.id}/donate`}>Donate Now</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/projects/${project.id}`}>Learn More</Link>
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
          <h3 className="text-3xl font-bold mb-4 text-balance">Ready to Make an Impact?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Join our community of donors and help us achieve Zero Hunger. Every contribution counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Join as Donor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="auth/register">Register NGO</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
