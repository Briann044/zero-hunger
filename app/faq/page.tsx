"use client";

import Link from "next/link";
import { Heart,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We’ve got answers. Here’s everything you need to know about
            donating, volunteering, and partnering with us.
          </p>
        </div>

        {/* Accordion FAQ */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="donations">
            <AccordionTrigger className="text-lg font-medium">
              How are my donations used?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              100% of your donations go directly to hunger relief efforts — including
              providing meals, supporting local food banks, and funding community projects.
              We ensure complete transparency in tracking every donation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="secure">
            <AccordionTrigger className="text-lg font-medium">
              Is my donation secure?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. We use trusted and encrypted payment gateways to ensure your
              transactions are safe and protected.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="volunteer">
            <AccordionTrigger className="text-lg font-medium">
              How can I volunteer?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              You can apply through our{" "}
              <a href="/volunteer" className="underline text-primary">
                Volunteer Page
              </a>
              . Once approved, you’ll be connected to opportunities that match your skills
              and availability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="partner">
            <AccordionTrigger className="text-lg font-medium">
              Can my organization partner with you?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely! Visit our{" "}
              <a href="/partner" className="underline text-primary">
                Partner Page
              </a>{" "}
              to learn more and apply. Partnerships help us scale impact through campaigns,
              sponsorships, and logistics support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="impact">
            <AccordionTrigger className="text-lg font-medium">
              How do I know my contribution makes a difference?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We regularly publish updates on our{" "}
              <a href="/impact" className="underline text-primary">
                Impact Page
              </a>{" "}
              with real stories, photos, and statistics showing the difference your support
              makes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tax">
            <AccordionTrigger className="text-lg font-medium">
              Are donations tax-deductible?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              This depends on your country. We provide receipts for all donations, and you
              may use them for tax purposes if applicable in your jurisdiction.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="other">
            <AccordionTrigger className="text-lg font-medium">
              I have another question not listed here.
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We’d love to help! Please reach out through our{" "}
              <a href="/contact" className="underline text-primary">
                Contact Page
              </a>
              , and our team will get back to you promptly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
