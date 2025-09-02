import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using ZeroHunger ("the Platform"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Platform Purpose</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ZeroHunger is a donation platform dedicated to supporting SDG 2: Zero Hunger. We connect donors with
              verified NGOs, food providers, and community organizations to combat hunger and food insecurity globally.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform facilitates monetary donations, food donations, and volunteer services to maximize impact in
              the fight against hunger.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts and Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Account Registration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Users must provide accurate, current, and complete information during registration. You are
                  responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">User Types</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>
                    <strong>Donors:</strong> Individuals or organizations making financial or in-kind contributions
                  </li>
                  <li>
                    <strong>NGOs:</strong> Verified non-profit organizations implementing hunger relief programs
                  </li>
                  <li>
                    <strong>Food Providers:</strong> Businesses or individuals donating surplus food
                  </li>
                  <li>
                    <strong>Volunteers:</strong> Individuals offering services and skills
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Donations and Payments</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Payment Processing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use secure third-party payment processors including Stripe, M-Pesa, and Instasend. All donations
                  are processed securely and in accordance with industry standards.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Transaction Fees</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A 2.5% platform fee is applied to donations to cover operational costs and platform maintenance. This
                  fee helps us continue providing free services to NGOs and maintain platform security.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Refund Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Donations are generally non-refundable. However, in cases of technical errors or fraudulent activity,
                  refunds may be processed at our discretion within 30 days of the transaction.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. NGO Verification and Compliance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All NGOs must undergo verification to ensure legitimacy and compliance with local regulations. We reserve
              the right to suspend or terminate accounts that fail to meet our verification standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              NGOs must provide regular impact reports and maintain transparency in fund utilization.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent text-foreground mb-4">6. Prohibited Activities</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Fraudulent or misleading information about projects or organizations</li>
              <li>Misuse of donated funds or resources</li>
              <li>Harassment or inappropriate behavior toward other users</li>
              <li>Violation of local laws or regulations</li>
              <li>Unauthorized access to other user accounts or platform systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Platform and its original content, features, and functionality are owned by ZeroHunger and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              ZeroHunger acts as a facilitator between donors and recipients. We are not responsible for the actions of
              NGOs, the use of donated funds, or the outcomes of funded projects. Users donate at their own discretion
              and risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try
              to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-foreground font-medium">ZeroHunger Support</p>
              <p className="text-muted-foreground">Email: legal@zerohunger.org</p>
              <p className="text-muted-foreground">Address: 123 Impact Street, Global City, GC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
       
  )
}
