import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, Download, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <Link href="/" className="text-2xl font-bold text-foreground">
              ZeroHunger
            </Link>
          </div>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Thank You for Your Donation!</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Your contribution will help provide meals to families in need. You're making a real difference in the fight
            against hunger.
          </p>

          {/* Donation Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Donation Summary</CardTitle>
              <CardDescription>Your contribution details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <div className="text-2xl font-bold text-primary">$100</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Meals Provided</span>
                  <div className="text-2xl font-bold text-green-600">200</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Project</span>
                  <div className="font-medium">Emergency Food Relief</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Frequency</span>
                  <div className="font-medium">One-time</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transaction ID</span>
                  <Badge variant="secondary">TXN-ABC123XYZ</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Impact
            </Button>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Immediate Impact:</strong> Your donation is immediately
                    allocated to the Emergency Food Relief project
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Progress Updates:</strong> You'll receive regular updates on how
                    your donation is being used
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Impact Reports:</strong> View detailed reports and photos from
                    the communities you're helping
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
