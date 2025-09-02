"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function VolunteerPage() {
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
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Become a Volunteer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our mission to end hunger. Fill out the application below and our
            team will get in touch with you.
          </p>
        </div>

        {/* Volunteer Application Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Volunteer Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input placeholder="Full Name" required />
              </div>
              <div>
                <Input type="email" placeholder="Email Address" required />
              </div>
              <div>
                <Input placeholder="Phone Number" required />
              </div>
              <div>
                <Input placeholder="Location (City, Country)" required />
              </div>
              <div>
                <Textarea
                  placeholder="Why do you want to volunteer with us?"
                  rows={4}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Do you have any relevant experience or skills?"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>
            We welcome volunteers from all backgrounds. Whether you can help with
            food distribution, fundraising, or spreading awareness — your
            contribution makes a difference.
          </p>
        </div>
      </div>
    </div>
  );
}
