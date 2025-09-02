import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, DollarSign, Users, TrendingUp, MapPin, Calendar, Plus, Edit } from "lucide-react"
import Link from "next/link"

// Mock NGO data
const ngoData = {
  id: "ngo-1",
  name: "Hope Foundation",
  totalProjects: 3,
  activeProjects: 2,
  totalRaised: 15000,
  beneficiariesServed: 2500,
  mealsProvided: 5000,
}

const ngoProjects = mockProjects.slice(0, 3).map((project) => ({
  ...project,
  ngoName: ngoData.name,
  donations: Math.floor(Math.random() * 50) + 10,
  recentDonations: [
    { amount: 100, donor: "John D.", date: "2024-01-20" },
    { amount: 50, donor: "Sarah M.", date: "2024-01-19" },
    { amount: 200, donor: "Anonymous", date: "2024-01-18" },
  ],
}))

export default function NGODashboardPage() {
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
            <Link href="/ngo/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/ngo/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              My Projects
            </Link>
            <Link href="/ngo/beneficiaries" className="text-muted-foreground hover:text-foreground transition-colors">
              Beneficiaries
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/ngo/profile">Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/ngo/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {ngoData.name}!</h1>
          <p className="text-muted-foreground text-lg">
            Manage your projects and track the impact you're making in the fight against hunger.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${ngoData.totalRaised.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {ngoData.totalProjects} projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiaries Served</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{ngoData.beneficiariesServed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">People helped</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{ngoData.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{ngoData.mealsProvided.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total impact</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="donations">Recent Donations</TabsTrigger>
            <TabsTrigger value="reports">Impact Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Project Management</h3>
              <Button asChild>
                <Link href="/ngo/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {ngoProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.shortDescription}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Ends {new Date(project.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-medium">
                          ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(project.raisedAmount / project.targetAmount) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{project.donations}</div>
                        <div className="text-xs text-muted-foreground">Donations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{project.providedMeals}</div>
                        <div className="text-xs text-muted-foreground">Meals Served</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest contributions to your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ngoProjects.flatMap((project) =>
                    project.recentDonations.map((donation, index) => (
                      <div
                        key={`${project.id}-${index}`}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>From {donation.donor}</span>
                            <span>{donation.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary">${donation.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            ≈ {Math.floor(donation.amount / 0.5)} meals
                          </div>
                        </div>
                      </div>
                    )),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Analytics</CardTitle>
                <CardDescription>Track your organization's impact over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Monthly Donations</h4>
                      <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Chart: Donation trends</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Beneficiary Growth</h4>
                      <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Chart: People served</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Download Full Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
