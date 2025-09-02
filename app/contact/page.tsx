"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to get involved? Reach out to us and we’ll get
            back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" required />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <div>
                  <Textarea placeholder="Your Message" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardContent className="flex items-center space-x-4 p-6">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">support@zerohunger.org</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="flex items-center space-x-4 p-6">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">+254 715 763 406</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="flex items-center space-x-4 p-6">
                <MapPin className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-muted-foreground">
                    Nairobi, Kenya <br /> Kenyatta Avenue
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
