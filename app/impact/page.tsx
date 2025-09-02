"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Heart, Users, Target, Leaf, Globe, MapPin, Calendar } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts"
import Link from "next/link"

// Mock data - in production, this would be fetched from the API
const globalImpact = {
  totalMealsProvided: 125000,
  totalDonationsReceived: 87500,
  totalBeneficiaries: 15600,
  totalProjects: 28,
  foodWastePrevented: 45000,
  co2EmissionsSaved: 12500,
  communitiesReached: 85,
  volunteersEngaged: 340,
}

const monthlyData = [
  { month: "Jan", meals: 8500, donations: 12000, beneficiaries: 1200 },
  { month: "Feb", meals: 9200, donations: 13500, beneficiaries: 1350 },
  { month: "Mar", meals: 10800, donations: 15200, beneficiaries: 1480 },
  { month: "Apr", meals: 11500, donations: 16800, beneficiaries: 1620 },
  { month: "May", meals: 12200, donations: 18200, beneficiaries: 1750 },
  { month: "Jun", meals: 13100, donations: 19500, beneficiaries: 1890 },
]

const impactStories = [
  {
    id: "story-1",
    title: "School Feeding Program Transforms Lives",
    description:
      "Thanks to donor support, 200 children in Kibera now receive daily nutritious meals, improving their health and school attendance by 85%.",
    location: "Kibera, Nairobi",
    beneficiaryName: "Grace Wanjiku (School Principal)",
    date: "2024-01-15T00:00:00Z",
    mealsProvided: 6000,
    imageUrl: "/impact-story-school-feeding.png",
  },
  {
    id: "story-2",
    title: "Emergency Relief Saves Drought-Affected Families",
    description:
      "Rapid response donations provided emergency food supplies to 150 families during the severe drought, preventing malnutrition in children.",
    location: "Turkana County",
    beneficiaryName: "John Ekiru (Community Leader)",
    date: "2024-01-20T00:00:00Z",
    mealsProvided: 4500,
    imageUrl: "/impact-story-drought-relief.png",
  },
  {
    id: "story-3",
    title: "Community Garden Provides Sustainable Food Source",
    description:
      "The community garden project now feeds 80 households with fresh vegetables, reducing food insecurity by 70% in the area.",
    location: "Kisumu",
    beneficiaryName: "Mary Atieno (Garden Coordinator)",
    date: "2024-01-25T00:00:00Z",
    mealsProvided: 2400,
    imageUrl: "/impact-story-community-garden.png",
  },
]

const chartConfig = {
  meals: {
    label: "Meals Provided",
    color: "hsl(var(--chart-1))",
  },
  donations: {
    label: "Donations ($)",
    color: "hsl(var(--chart-2))",
  },
  beneficiaries: {
    label: "Beneficiaries",
    color: "hsl(var(--chart-3))",
  },
}

export default function ImpactPage() {
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
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/impact" className="text-foreground font-medium">
              Impact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/projects">Donate</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Collective Impact Against Hunger</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Together, we're making a real difference in the fight against hunger. See how your donations and our
            community's efforts are transforming lives across Kenya and beyond.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">
                {globalImpact.totalMealsProvided.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Meals Provided</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-green-600">
                {globalImpact.totalBeneficiaries.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">People Helped</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">{globalImpact.communitiesReached}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Communities Reached</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <Leaf className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-emerald-600">
                {(globalImpact.foodWastePrevented / 1000).toFixed(1)}T
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Food Waste Prevented</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Impact Analytics</TabsTrigger>
            <TabsTrigger value="stories">Impact Stories</TabsTrigger>
            <TabsTrigger value="transparency">Transparency Report</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-8">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Meals Provided</CardTitle>
                  <CardDescription>Track our progress in fighting hunger over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <AreaChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="meals"
                        stroke="var(--color-meals)"
                        fill="var(--color-meals)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Impact Comparison</CardTitle>
                  <CardDescription>Donations vs beneficiaries reached each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="donations" fill="var(--color-donations)" />
                      <Bar dataKey="beneficiaries" fill="var(--color-beneficiaries)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Our contribution to sustainability and environmental protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {globalImpact.foodWastePrevented.toLocaleString()} kg
                    </div>
                    <p className="text-sm text-green-700">Food Waste Prevented</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {globalImpact.co2EmissionsSaved.toLocaleString()} kg
                    </div>
                    <p className="text-sm text-blue-700">CO₂ Emissions Saved</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-purple-600 mb-2">{globalImpact.volunteersEngaged}</div>
                    <p className="text-sm text-purple-700">Volunteers Engaged</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {impactStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={story.imageUrl || "/placeholder.svg?height=300&width=500&query=impact story"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {story.mealsProvided.toLocaleString()} meals
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-balance">{story.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{story.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{story.description}</p>
                    {story.beneficiaryName && <p className="text-sm font-medium">— {story.beneficiaryName}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transparency" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Transparency</CardTitle>
                <CardDescription>How donations are allocated and used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Fund Allocation</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Direct to Projects</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Platform Operations</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Emergency Reserve</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Impact Verification</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• All NGOs undergo rigorous verification</li>
                        <li>• Monthly impact reports required</li>
                        <li>• Third-party audits conducted quarterly</li>
                        <li>• Real-time donation tracking</li>
                        <li>• Beneficiary feedback collection</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" asChild>
                      <Link href="/transparency/full-report">Download Full Transparency Report</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
