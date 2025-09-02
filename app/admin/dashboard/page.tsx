import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

// Mock admin data
const adminData = {
  totalUsers: 1250,
  totalDonations: 45000,
  totalProjects: 28,
  pendingVerifications: 5,
  activeNGOs: 12,
  foodProviders: 8,
  donors: 1200,
  flaggedContent: 3,
  subscriptionRevenue: 2840,
  activeSubscriptions: 18,
  trialUsers: 7,
  churnRate: 5.2,
}

const pendingVerifications = [
  {
    id: "1",
    type: "NGO",
    name: "Rural Aid Foundation",
    email: "contact@ruralaid.org",
    submittedAt: "2024-01-20",
    documents: ["Registration Certificate", "Tax Exemption"],
  },
  {
    id: "2",
    type: "Food Provider",
    name: "Metro Grocery Chain",
    email: "donations@metrogrocery.com",
    submittedAt: "2024-01-19",
    documents: ["Business License", "Food Safety Certificate"],
  },
]

const recentActivity = [
  {
    id: "1",
    type: "donation",
    description: "New $500 donation to Emergency Relief Project",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "project",
    description: "Hope Foundation created new project",
    timestamp: "4 hours ago",
    status: "pending_review",
  },
  {
    id: "3",
    type: "user",
    description: "New NGO registration: Community Care",
    timestamp: "6 hours ago",
    status: "pending_verification",
  },
]

const systemAlerts = [
  {
    id: "1",
    type: "warning",
    message: "High donation volume detected - monitor for fraud",
    timestamp: "1 hour ago",
  },
  {
    id: "2",
    type: "info",
    message: "Monthly backup completed successfully",
    timestamp: "3 hours ago",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground">
              ZeroHunger Admin
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-muted-foreground hover:text-foreground transition-colors">
              Users
            </Link>
            <Link href="/admin/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/admin/reports" className="text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/settings">Settings</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/profile">Profile</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor platform activity, manage users, and ensure the integrity of the ZeroHunger ecosystem.
          </p>
        </div>

        {/* System Alerts */}
        {systemAlerts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
            <div className="space-y-2">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    alert.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <AlertTriangle
                    className={`h-4 w-4 ${alert.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
                  />
                  <div className="flex-1">
                    <span className="text-sm">{alert.message}</span>
                    <span className="text-xs text-muted-foreground ml-2">• {alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{adminData.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {adminData.donors} donors, {adminData.activeNGOs} NGOs, {adminData.foodProviders} providers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${adminData.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Platform lifetime</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{adminData.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Across all NGOs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{adminData.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${adminData.subscriptionRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {adminData.activeSubscriptions} active • {adminData.trialUsers} trials
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
                <CardDescription>Review and approve new organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{verification.name}</h4>
                          <Badge variant="outline">{verification.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {verification.email} • Submitted {verification.submittedAt}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Documents: {verification.documents.join(", ")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.status === "completed"
                              ? "bg-green-500"
                              : activity.status === "pending_review"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="space-y-1">
                          <div className="text-sm">{activity.description}</div>
                          <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : activity.status === "pending_review"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {activity.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Donation Fees (2.5%)</span>
                      <span className="font-medium">${(adminData.totalDonations * 0.025).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subscriptions</span>
                      <span className="font-medium">${adminData.subscriptionRevenue.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total Revenue</span>
                        <span>
                          ${(adminData.totalDonations * 0.025 + adminData.subscriptionRevenue).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Subscriptions</span>
                      <span className="font-medium">{adminData.activeSubscriptions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trial Users</span>
                      <span className="font-medium">{adminData.trialUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Churn Rate</span>
                      <span className="font-medium text-red-600">{adminData.churnRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review flagged content and user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No flagged content</h3>
                  <p className="text-muted-foreground">All content is currently in good standing</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
