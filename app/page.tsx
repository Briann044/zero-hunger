import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ZeroHunger</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/impact" className="text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">Together We Can End Hunger</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Connect with verified NGOs, track your impact, and help achieve SDG 2: Zero Hunger. Every donation creates
            measurable change in communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/donate">Start Donating</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Meals Provided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Partner NGOs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">45</div>
              <div className="text-muted-foreground">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Transparency Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-balance">How ZeroHunger Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Choose Your Role</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Join as a Donor, NGO, or Food Provider. Each role has tailored features to maximize your impact in
                  fighting hunger.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Make Your Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Donate money, pledge food, or offer services. Support verified projects with transparent fund
                  allocation and real-time tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Track Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  See exactly how your donations help. Get detailed reports, photos, and stories from beneficiaries in
                  real-time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-balance">Ready to Make a Difference?</h3>
          <p className="text-xl mb-8 text-pretty max-w-2xl mx-auto opacity-90">
            Join thousands of donors, NGOs, and organizations working together to achieve Zero Hunger by 2030.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/auth/register">Join ZeroHunger Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">ZeroHunger</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Working towards SDG 2: Zero Hunger through transparent, impactful donations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/transparency" className="hover:text-foreground transition-colors">
                    Transparency
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-foreground transition-colors">
                    Impact Reports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/donate" className="hover:text-foreground transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className="hover:text-foreground transition-colors">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/partner" className="hover:text-foreground transition-colors">
                    Partner with Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ZeroHunger.org All rights reserved. Supporting UN SDG 2: Zero Hunger.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
