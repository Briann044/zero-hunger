import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Package, Clock, MapPin, Calendar, Plus, Truck } from "lucide-react"
import Link from "next/link"

// Mock food provider data
const providerData = {
  id: "provider-1",
  name: "Fresh Market Co.",
  totalListings: 15,
  activeListings: 8,
  totalDonated: "2,500 lbs",
  mealsProvided: 1200,
  pickupsCompleted: 12,
}

const mockFoodListings = [
  {
    id: "1",
    title: "Fresh Vegetables - Mixed",
    category: "fresh-produce",
    quantity: 50,
    unit: "lbs",
    expiryDate: "2024-01-25",
    pickupLocation: "Downtown Market",
    status: "available",
    estimatedMeals: 100,
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Packaged Bread Loaves",
    category: "packaged-food",
    quantity: 30,
    unit: "loaves",
    expiryDate: "2024-01-23",
    pickupLocation: "Bakery District",
    status: "claimed",
    estimatedMeals: 60,
    createdAt: "2024-01-19",
    claimedBy: "Hope Foundation",
  },
  {
    id: "3",
    title: "Prepared Sandwiches",
    category: "prepared-meals",
    quantity: 100,
    unit: "pieces",
    expiryDate: "2024-01-22",
    pickupLocation: "Central Kitchen",
    status: "completed",
    estimatedMeals: 100,
    createdAt: "2024-01-18",
    completedAt: "2024-01-21",
  },
]

export default function FoodProviderDashboardPage() {
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
            <Link href="/food-provider/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link
              href="/food-provider/listings"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              My Listings
            </Link>
            <Link
              href="/food-provider/pickups"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pickups
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/food-provider/profile">Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/food-provider/listings/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Food
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {providerData.name}!</h1>
          <p className="text-muted-foreground text-lg">
            Manage your food donations and track the impact of reducing food waste.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{providerData.totalDonated}</div>
              <p className="text-xs text-muted-foreground">Food rescued from waste</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meals Provided</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{providerData.mealsProvided.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimated meals created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{providerData.activeListings}</div>
              <p className="text-xs text-muted-foreground">Available for pickup</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Pickups</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{providerData.pickupsCompleted}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">Food Listings</TabsTrigger>
            <TabsTrigger value="pickups">Pickup Schedule</TabsTrigger>
            <TabsTrigger value="impact">Impact Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Food Donation Listings</h3>
              <Button asChild>
                <Link href="/food-provider/listings/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockFoodListings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {listing.quantity} {listing.unit}
                          </span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{listing.pickupLocation}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Expires {new Date(listing.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          listing.status === "available"
                            ? "default"
                            : listing.status === "claimed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {listing.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Estimated meals: <span className="font-medium text-foreground">{listing.estimatedMeals}</span>
                        </div>
                        {listing.status === "claimed" && listing.claimedBy && (
                          <div className="text-sm text-muted-foreground">
                            Claimed by: <span className="font-medium text-foreground">{listing.claimedBy}</span>
                          </div>
                        )}
                        {listing.status === "completed" && listing.completedAt && (
                          <div className="text-sm text-muted-foreground">
                            Completed:{" "}
                            <span className="font-medium text-foreground">
                              {new Date(listing.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {listing.status === "available" && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pickups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Pickups</CardTitle>
                <CardDescription>Scheduled food collection appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Fresh Vegetables - Mixed</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Hope Foundation</span>
                        <span>Tomorrow, 2:00 PM - 4:00 PM</span>
                        <span>Downtown Market</span>
                      </div>
                    </div>
                    <Badge variant="secondary">Confirmed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Packaged Bread Loaves</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Community Kitchen</span>
                        <span>Jan 24, 10:00 AM - 12:00 PM</span>
                        <span>Bakery District</span>
                      </div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental & Social Impact</CardTitle>
                <CardDescription>Track the positive impact of your food donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">2,500 lbs</div>
                      <div className="text-sm text-green-700">Food Waste Prevented</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,200</div>
                      <div className="text-sm text-blue-700">Meals Created</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">850 kg</div>
                      <div className="text-sm text-purple-700">CO₂ Emissions Saved</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Monthly Food Donations</h4>
                    <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Chart: Food donation trends</span>
                    </div>
                  </div>

                  <Button variant="outline">Download Impact Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
