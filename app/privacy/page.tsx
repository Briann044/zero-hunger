import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              ZeroHunger ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our donation platform dedicated
              to supporting SDG 2: Zero Hunger.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Profile information and preferences</li>
                  <li>Donation history and impact tracking data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Organization Information (NGOs & Food Providers)
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Organization name, registration details, and verification documents</li>
                  <li>Project information and impact reports</li>
                  <li>Financial information for verification purposes</li>
                  <li>Contact details of authorized representatives</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>IP address, browser type, and device information</li>
                  <li>Usage data and platform interaction analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log files and error reports</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Process donations and facilitate connections between donors and recipients</li>
              <li>Verify NGO and food provider credentials for platform security</li>
              <li>Provide impact tracking and transparency reporting</li>
              <li>Send donation receipts and impact updates</li>
              <li>Improve platform functionality and user experience</li>
              <li>Comply with legal obligations and prevent fraudulent activity</li>
              <li>Communicate important platform updates and policy changes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">With Your Consent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may share your information when you explicitly consent, such as when making donations to specific
                  projects where your name may be shared with the receiving organization.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Service Providers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We work with trusted third-party service providers for payment processing (Stripe, M-Pesa, Instasend),
                  analytics, and platform infrastructure. These providers are bound by strict confidentiality
                  agreements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Legal Requirements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may disclose information when required by law, to protect our rights, or to prevent fraud and
                  ensure platform security.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Transparency and Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aggregated, anonymized data may be used for impact reporting and transparency initiatives to
                  demonstrate the collective impact of our community in fighting hunger.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing through PCI-compliant providers</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication measures</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Privacy Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Access and Correction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, update, or correct your personal information through your account
                  settings or by contacting our support team.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Data Portability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You can request a copy of your personal data in a structured, machine-readable format.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Deletion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You may request deletion of your personal information, subject to legal and operational requirements
                  such as donation records for tax and compliance purposes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Communication Preferences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You can opt out of non-essential communications while still receiving important account and
                  donation-related updates.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for platform functionality and security
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand usage patterns and improve the platform
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and preferences
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can manage cookie preferences through your browser settings, though disabling certain cookies may
              affect platform functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a global platform fighting hunger worldwide, we may transfer your information to countries outside your
              residence. We ensure appropriate safeguards are in place to protect your information in accordance with
              applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform is not intended for children under 13. We do not knowingly collect personal information from
              children under 13. If you believe we have collected information from a child under 13, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.
              We will notify you of significant changes through email or platform notifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-foreground font-medium">ZeroHunger Privacy Team</p>
              <p className="text-muted-foreground">Email: privacy@zerohunger.org</p>
              <p className="text-muted-foreground">Address: 123 Impact Street, Global City, GC 12345</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy is designed to comply with applicable data protection regulations including GDPR,
              CCPA, and other regional privacy laws. We are committed to maintaining the highest standards of data
              protection as we work together to achieve Zero Hunger globally.
            </p>
          </section>
        </div>
      </div>
    </div>
  
  )
}
