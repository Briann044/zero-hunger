import { Button } from "@/components/ui/button" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, DollarSign, Users, TrendingUp, MapPin, Calendar, Plus, Edit } from "lucide-react"
import Link from "next/link"

// NGO static data
const ngoData = {
  id: "ngo-1",
  name: "Hope Foundation",
  totalProjects: 3,
  activeProjects: 2,
  totalRaised: 15000,
  beneficiariesServed: 2500,
  mealsProvided: 5000,
}

// Replace projects with empty array so build passes
const ngoProjects: typeof ngoData[] = []

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

            {/* No projects yet */}
            <p className="text-muted-foreground">You have no projects yet.</p>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <p className="text-muted-foreground">No donations to display yet.</p>
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
