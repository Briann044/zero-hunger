// app/profile/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Heart, Settings, Shield } from "lucide-react"
import { toast } from "react-hot-toast" // optional for notifications

type Donation = {
  id: string
  project: string
  amount: number
  date: string
  meals: number
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    bio: "Passionate about fighting hunger and supporting communities in need.",
    organization: user?.role === "ngo" ? "Hope Foundation Kenya" : "",
    website: user?.role === "ngo" ? "https://hopefoundation.ke" : "",
  })

  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch("/api/donations")
        const data = await res.json()
        setDonations(data.donations || [])
      } catch (err) {
        console.error("Failed to fetch donations", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)
  const totalMeals = donations.reduce((sum, d) => sum + d.meals, 0)
  const projectsSupported = new Set(donations.map((d) => d.project)).size

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to update profile")

      const updatedUser = await res.json()
      toast.success("Profile updated successfully!")
      refreshUser(updatedUser) // update auth context
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "donor": return "bg-blue-100 text-blue-800"
      case "ngo": return "bg-emerald-100 text-emerald-800"
      case "food-provider": return "bg-orange-100 text-orange-800"
      case "admin": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-2 max-w-6xl">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              ZeroHunger
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
            <Link href="/impact" className="text-muted-foreground hover:text-foreground transition-colors">Impact</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and view your impact</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={saving}
          >
            <Settings className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Overview */}
            {/* ...same as before... */}
            
            {/* Profile Details with API-saving */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing || saving}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing || saving}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing || saving}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing || saving}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing || saving}
                    rows={3}
                  />
                </div>

                {/* NGO Fields */}
                {user?.role === "ngo" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        disabled={!isEditing || saving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        disabled={!isEditing || saving}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations and Settings Tabs remain the same */}
        </Tabs>
      </div>
    </div>
  )
}
