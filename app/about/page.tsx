// src/app/about/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, Globe, Shield, Zap, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Kimani",
      role: "Founder & CEO",
      description: "Former UN World Food Programme coordinator with 10+ years fighting hunger in East Africa.",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "David Ochieng",
      role: "Head of Technology",
      description: "Tech entrepreneur passionate about using technology to solve humanitarian challenges.",
      image: "/professional-man-cto.png",
    },
    {
      name: "Grace Wanjiku",
      role: "Impact Director",
      description: "Development expert specializing in community-based nutrition programs and impact measurement.",
      image: "/professional-woman-director.png",
    },
  ]

  const milestones = [
    { year: "2023", event: "ZeroHunger platform launched", description: "Started with 5 NGO partners in Nairobi" },
    { year: "2023", event: "First 100,000 meals", description: "Reached milestone of 100K meals provided" },
    { year: "2024", event: "Regional expansion", description: "Expanded to Uganda, Tanzania, and Rwanda" },
    { year: "2024", event: "1M+ meals milestone", description: "Surpassed 1 million meals provided to communities" },
    {
      year: "2024",
      event: "Corporate partnerships",
      description: "Partnered with major food retailers and restaurants",
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description:
        "Every donation is tracked and reported with complete transparency to build trust with our community.",
    },
    {
      icon: Target,
      title: "Impact-Focused",
      description:
        "We measure success by real-world impact: meals provided, lives changed, and communities strengthened.",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description:
        "Local communities lead their own development with our platform providing the tools and connections.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage technology to make humanitarian aid more efficient, transparent, and effective.",
    },
  ]

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
            <Link href="/about" className="text-foreground font-medium">
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
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">About ZeroHunger</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            We're on a mission to achieve UN Sustainable Development Goal 2: Zero Hunger by 2030. Through technology,
            transparency, and community collaboration, we're building a world where no one goes hungry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects">Join Our Mission</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/impact">See Our Impact</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                To create a transparent, efficient, and community-driven platform that connects donors, NGOs, food
                providers, and beneficiaries in the fight against hunger. We believe that with the right tools and
                transparency, we can eliminate hunger in our lifetime.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Transparent Impact</h4>
                    <p className="text-muted-foreground">Every donation tracked from source to beneficiary</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Community Empowerment</h4>
                    <p className="text-muted-foreground">Local communities lead their own development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Sustainable Solutions</h4>
                    <p className="text-muted-foreground">Long-term programs that create lasting change</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/community-food-distribution-africa.png"
                alt="Community food distribution"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">2.5M+</div>
                <div className="text-sm opacity-90">Meals Provided</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              These core values guide everything we do and shape how we work with our community partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              From a small idea to a platform serving millions, here's how we've grown our impact.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Passionate professionals dedicated to ending hunger through innovation and community collaboration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{member.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Partnerships */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recognition & Partnerships</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              We're proud to work with leading organizations and be recognized for our impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Awards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• UN SDG Action Award 2024 - Technology for Good</li>
                  <li>• Kenya ICT Excellence Award - Social Impact Category</li>
                  <li>• Africa Innovation Prize - Humanitarian Technology</li>
                  <li>• Featured in Forbes Africa 30 Under 30</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Key Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• UN World Food Programme - Technology Partner</li>
                  <li>• Kenya Red Cross Society - Implementation Partner</li>
                  <li>• Safaricom Foundation - Mobile Money Integration</li>
                  <li>• 150+ Verified NGO Partners across East Africa</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-balance">Join Us in Fighting Hunger</h3>
          <p className="text-xl mb-8 text-pretty max-w-2xl mx-auto opacity-90">
            Whether you're a donor, NGO, food provider, or volunteer, there's a place for you in our mission to achieve
            Zero Hunger by 2030.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
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
                  <Link href="/projects" className="hover:text-foreground transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-foreground transition-colors">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register?role=ngo" className="hover:text-foreground transition-colors">
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
