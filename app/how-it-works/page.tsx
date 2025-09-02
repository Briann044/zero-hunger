"use client";

import Link from "next/link";
import { HandHeart, CreditCard, UtensilsCrossed, BarChart, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
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
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giving is simple. Here’s how your donation creates real impact —
            from you, to the community.
          </p>
        </div>

        {/* Step-by-Step Flow */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="text-center shadow-md">
            <CardHeader>
              <HandHeart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <CardTitle>1. Choose a Cause</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select a project or campaign that matters most to you.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <CardTitle>2. Make a Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Give securely online using your preferred payment method.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <UtensilsCrossed className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <CardTitle>3. Resources Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your contribution provides food and support directly to families in need.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <BarChart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <CardTitle>4. Track the Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get updates, reports, and stories showing how your donation made a difference.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start your journey of impact today by supporting a cause you care about.
          </p>
          <Button asChild size="lg">
            <a href="/projects">Browse Projects</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
