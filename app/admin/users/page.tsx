import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Users, AlertTriangle, CheckCircle, Ban, Eye } from "lucide-react"
import Link from "next/link"

// This would be fetched from the API in a real implementation
const mockUserData = {
  users: [
    {
      id: "1",
      email: "john.donor@example.com",
      firstName: "John",
      lastName: "Smith",
      role: "donor",
      status: "active",
      verified: true,
      createdAt: "2024-01-15T00:00:00Z",
      lastLogin: "2024-01-22T10:30:00Z",
      totalDonations: 1250,
    },
    {
      id: "2",
      email: "hope.foundation@example.com",
      firstName: "Hope",
      lastName: "Foundation",
      role: "ngo",
      status: "active",
      verified: true,
      createdAt: "2024-01-10T00:00:00Z",
      lastLogin: "2024-01-22T09:15:00Z",
      projectsCreated: 3,
    },
    {
      id: "3",
      email: "fresh.market@example.com",
      firstName: "Fresh",
      lastName: "Market Co",
      role: "food-provider",
      status: "active",
      verified: true,
      createdAt: "2024-01-12T00:00:00Z",
      lastLogin: "2024-01-21T16:45:00Z",
      foodListings: 15,
    },
    {
      id: "4",
      email: "suspicious.user@example.com",
      firstName: "Suspicious",
      lastName: "User",
      role: "donor",
      status: "suspended",
      verified: false,
      createdAt: "2024-01-20T00:00:00Z",
      lastLogin: "2024-01-20T12:00:00Z",
      totalDonations: 0,
    },
  ],
  summary: {
    total: 1250,
    active: 1200,
    suspended: 45,
    pending: 5,
    byRole: {
      donor: 1200,
      ngo: 12,
      "food-provider": 8,
      admin: 30,
    },
  },
}

export default function AdminUsersPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      donor: "bg-blue-100 text-blue-800",
      ngo: "bg-purple-100 text-purple-800",
      "food-provider": "bg-green-100 text-green-800",
      admin: "bg-gray-100 text-gray-800",
    }
    return <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{role}</Badge>
  }

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
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-foreground font-medium">
              Users
            </Link>
            <Link href="/admin/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/admin/reports" className="text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
          </nav>
          <Button variant="outline" asChild>
            <Link href="/admin/settings">Settings</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground text-lg">
            Manage platform users, verify organizations, and monitor account activity.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockUserData.summary.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Platform users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockUserData.summary.active.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
              <Ban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockUserData.summary.suspended}</div>
              <p className="text-xs text-muted-foreground">Suspended accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockUserData.summary.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name or email..." className="pl-10" />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="donor">Donors</SelectItem>
                  <SelectItem value="ngo">NGOs</SelectItem>
                  <SelectItem value="food-provider">Food Providers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUserData.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {user.role === "donor" && user.totalDonations && <span>${user.totalDonations} donated</span>}
                        {user.role === "ngo" && user.projectsCreated && <span>{user.projectsCreated} projects</span>}
                        {user.role === "food-provider" && user.foodListings && (
                          <span>{user.foodListings} listings</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === "active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 bg-transparent"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
