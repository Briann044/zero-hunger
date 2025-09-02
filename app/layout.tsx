import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { Suspense } from "react"
import "./globals.css"

// Import Google Fonts
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "ZeroHunger - Fighting Hunger Together",
  description:
    "Donation platform for SDG 2: Zero Hunger. Connect donors, NGOs, and beneficiaries transparently.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
