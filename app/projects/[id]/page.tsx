"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Heart, MapPin, Calendar, Target, Users, CheckCircle, DollarSign } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: {
    id: string
  }
}

interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  category: string
  imageUrl?: string
  verified: boolean
  ngoName: string
  location: string
  raisedAmount: number
  targetAmount: number
  providedMeals: number
  goalMeals: number
  endDate: string
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (!res.ok) throw new Error("Project not found")
        const data = await res.json()
        if (!data.project) {
          setError(true)
        } else {
          setProject(data.project)
        }
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (loading) return <p className="text-center py-16">Loading project...</p>
  if (error || !project) notFound()

  const progressPercentage = (project.raisedAmount / project.targetAmount) * 100
  const mealsPercentage = (project.providedMeals / project.goalMeals) * 100

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
              ← Back to Projects
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={`/projects/${project.id}/donate`}>Donate Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
                {project.verified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Verified NGO
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-foreground text-balance">{project.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">{project.ngoName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Ends {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Project Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">About This Project</h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">{project.description}</p>
            </div>

            {/* Impact Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Project Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Funding Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${project.raisedAmount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">of ${project.targetAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      <p className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% funded</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Meals Provided
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          {project.providedMeals.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">of {project.goalMeals.toLocaleString()}</span>
                      </div>
                      <Progress value={mealsPercentage} className="h-3" />
                      <p className="text-sm text-muted-foreground">{Math.round(mealsPercentage)}% of goal reached</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Support This Project</CardTitle>
                <CardDescription>Make a direct impact on this community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Raised</span>
                    <span className="font-bold">${project.raisedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Goal</span>
                    <span className="font-bold">${project.targetAmount.toLocaleString()}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/projects/${project.id}/donate`}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Donate Now
                    </Link>
                  </Button>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.id}/donate?amount=25`}>$25</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.id}/donate?amount=50`}>$50</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.id}/donate?amount=100`}>$100</Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="text-center text-sm text-muted-foreground">
                  <p>💡 $10 = 20 meals for families in need</p>
                </div>
              </CardContent>
            </Card>

            {/* NGO Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the NGO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{project.ngoName}</p>
                    <p className="text-sm text-muted-foreground">Verified Organization</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  A trusted partner in fighting hunger with transparent operations and proven impact.
                </p>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View NGO Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
