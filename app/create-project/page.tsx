import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPin } from "lucide-react"
import Link from "next/link"

export default function CreateProjectPage() {
  const [title, setTitle] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [targetAmount, setTargetAmount] = useState<number | "">("")
  const [location, setLocation] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send data to your API (Next.js API route) to save to DB
    console.log({
      title,
      shortDescription,
      targetAmount,
      location,
      endDate,
    })
    alert("Project created successfully! (Mock)")
    // Reset form
    setTitle("")
    setShortDescription("")
    setTargetAmount("")
    setLocation("")
    setEndDate("")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            ZeroHunger
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Create New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Briefly describe the project"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount ($)</Label>
            <Input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              placeholder="Funding goal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Project</Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
