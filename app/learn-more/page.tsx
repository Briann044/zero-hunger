import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Target, TrendingUp, Shield, Globe, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-background">
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
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Understanding ZeroHunger</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Learn how our platform connects donors, NGOs, and communities to create lasting impact in the fight against
            hunger. Discover the technology, transparency, and trust that makes ZeroHunger the leading donation platform
            for SDG 2.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">The Global Hunger Crisis</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nearly 800 million people worldwide face chronic hunger, while 2.3 billion experience food insecurity.
                  Despite having enough food to feed everyone, systemic issues prevent equitable distribution.
                </p>
                <p>
                  Traditional donation platforms lack transparency, making it difficult for donors to see real impact.
                  Many NGOs struggle with funding gaps, while surplus food goes to waste instead of reaching those in
                  need.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive mb-1">800M</div>
                  <div className="text-sm text-muted-foreground">People face hunger</div>
                </div>
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive mb-1">1/3</div>
                  <div className="text-sm text-muted-foreground">Food is wasted</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/community-food-distribution-africa.png"
                alt="Community food distribution in Africa"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Our Comprehensive Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              ZeroHunger bridges the gap between donors and impact through technology, transparency, and verified
              partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Verified Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All NGOs undergo rigorous verification including legal documentation, financial audits, and field
                  visits to ensure legitimacy and impact.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track your donations from contribution to impact with photos, reports, and direct beneficiary feedback
                  updated in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Support projects across 45+ countries with localized payment methods including M-Pesa, Instasend, and
                  international options.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">How ZeroHunger Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our platform creates a seamless ecosystem connecting all stakeholders in the fight against hunger.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold">Choose Your Role</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Donors:</strong> Individuals, corporations, or foundations
                    looking to make measurable impact
                  </p>
                  <p>
                    <strong className="text-foreground">NGOs:</strong> Verified organizations running hunger relief
                    programs
                  </p>
                  <p>
                    <strong className="text-foreground">Food Providers:</strong> Restaurants, farms, and suppliers with
                    surplus food
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/auth/register">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-medium">Donor Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">NGO Management</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-medium">Food Provider Portal</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">$50</div>
                      <div className="text-sm text-muted-foreground">Provides 150 meals</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">Card</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">M-Pesa</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="text-sm font-medium">Bank</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold">Make Your Contribution</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Monetary Donations:</strong> Support specific projects with
                    transparent fund allocation
                  </p>
                  <p>
                    <strong className="text-foreground">Food Donations:</strong> List surplus food for local NGO pickup
                    and distribution
                  </p>
                  <p>
                    <strong className="text-foreground">Service Donations:</strong> Volunteer skills like logistics,
                    marketing, or nutrition counseling
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/donate">
                      Start Donating <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold">Track Your Impact</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Real-Time Updates:</strong> Receive photos and reports as your
                    donations are used
                  </p>
                  <p>
                    <strong className="text-foreground">Impact Metrics:</strong> See exactly how many meals provided,
                    people helped, and communities reached
                  </p>
                  <p>
                    <strong className="text-foreground">Beneficiary Stories:</strong> Read direct testimonials from
                    those your donations have helped
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/impact">
                      View Impact <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">Meals Provided</span>
                      <span className="text-primary font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">People Helped</span>
                      <span className="text-primary font-bold">312</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">Projects Supported</span>
                      <span className="text-primary font-bold">8</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Built on Trust & Transparency</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Every aspect of our platform is designed to ensure your donations create maximum impact with complete
              accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">NGO Verification</h3>
              <p className="text-sm text-muted-foreground">Legal documentation, financial audits, and field visits</p>
            </Card>

            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Financial Tracking</h3>
              <p className="text-sm text-muted-foreground">Real-time fund allocation with detailed expense reports</p>
            </Card>

            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Impact Verification</h3>
              <p className="text-sm text-muted-foreground">Photo evidence and beneficiary feedback for every project</p>
            </Card>

            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Public Reporting</h3>
              <p className="text-sm text-muted-foreground">Quarterly impact reports and annual transparency audits</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Make a Measurable Impact?</h2>
          <p className="text-xl mb-8 text-pretty max-w-3xl mx-auto opacity-90">
            Join the ZeroHunger community and be part of the solution to end hunger by 2030. Every donation is tracked,
            every impact is measured, and every story is shared.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/auth/register">Start Your Journey</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/projects">Browse Projects</Link>
            </Button>
          </div>
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
            <p>&copy; 2024 ZeroHunger. All rights reserved. Supporting UN SDG 2: Zero Hunger.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
