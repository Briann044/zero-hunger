"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PartnerPage() {
  return (
        <div className="container mx-auto px-4 py-2 max-w-6xl">
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
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Partner With Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Together we can amplify our impact. Join us as a partner and help fight hunger
            through joint initiatives, sponsorships, and community programs.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Brand Visibility</h3>
            <p className="text-muted-foreground">
              Showcase your commitment to social impact through campaigns and events.
            </p>
          </Card>
          <Card className="p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
            <p className="text-muted-foreground">
              Directly support initiatives that provide meals and resources to families.
            </p>
          </Card>
          <Card className="p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
            <p className="text-muted-foreground">
              Work hand-in-hand with us to create sustainable solutions to hunger.
            </p>
          </Card>
        </div>

        {/* Partner Application Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Partnership Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input placeholder="Organization / Company Name" required />
              </div>
              <div>
                <Input placeholder="Contact Person" required />
              </div>
              <div>
                <Input type="email" placeholder="Email Address" required />
              </div>
              <div>
                <Input placeholder="Phone Number" required />
              </div>
              <div>
                <Input placeholder="Website (if any)" />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your organization and why you'd like to partner"
                  rows={4}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="What kind of partnership are you interested in? (sponsorship, campaigns, logistics, etc.)"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Closing Note */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>
            We believe partnerships are the key to ending hunger. Join us in making a
            lasting difference.
          </p>
        </div>
      </div>
    </div>
  );
}
