"use client";


import Link from "next/link";
import { ShieldCheck, FileSearch, TrendingUp, Handshake, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-background">
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transparency & Accountability
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in building trust by showing exactly how your donations are used. 
            Every contribution is tracked to ensure it makes a real impact.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="text-center shadow-md">
            <CardHeader>
              <ShieldCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <CardTitle>100% Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Donations are processed safely and directly reach our trusted partners.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <FileSearch className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <CardTitle>Verified Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We carefully vet NGOs and community programs before collaboration.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <CardTitle>Impact Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Quarterly reports track meals served, families reached, and goals achieved.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md">
            <CardHeader>
              <Handshake className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <CardTitle>Community First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We ensure donations are distributed fairly and sustainably at the local level.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Accountability Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground mb-6 text-center">
            How We Ensure Accountability
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Financial Audits</h3>
              <p className="text-muted-foreground">
                Independent audits are conducted annually to guarantee transparency in fund usage.
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Donations can be tracked from the moment you give until they reach beneficiaries.
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Open Communication</h3>
              <p className="text-muted-foreground">
                We provide donors with regular updates and impact stories from the field.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Trust Matters</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of donors who believe in our transparent, impact-driven mission.
          </p>
          <Button asChild size="lg">
            <a href="/projects">See Active Projects</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
