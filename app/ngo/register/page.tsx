// app/ngo/register/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" // optional toast notifications

export default function NGORegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    website: "",
    registrationNumber: "",
    type: "",
    mission: "",
    beneficiaries: "",
    facebook: "",
    twitter: "",
    instagram: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/ngo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Registration failed")
        setLoading(false)
        return
      }

      toast.success("Registration successful!")
      router.push("/auth/login")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">NGO Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          <InputField label="Organization Name *" name="name" placeholder="Hope Foundation" value={formData.name} onChange={handleChange} required />
          <InputField label="Email *" name="email" type="email" placeholder="example@ngo.org" value={formData.email} onChange={handleChange} required />
          <InputField label="Password *" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required />
          <InputField label="Phone" name="phone" placeholder="+254 700 000 000" value={formData.phone} onChange={handleChange} />
          <InputField label="Location" name="location" placeholder="Nairobi, Kenya" value={formData.location} onChange={handleChange} />

          {/* Additional NGO Fields */}
          <InputField label="Website" name="website" placeholder="https://www.ngo.org" value={formData.website} onChange={handleChange} />
          <InputField label="Registration Number" name="registrationNumber" placeholder="NGO12345" value={formData.registrationNumber} onChange={handleChange} />
          <InputField label="Type of NGO" name="type" placeholder="Charity, Foundation, Non-Profit" value={formData.type} onChange={handleChange} />
          <TextareaField label="Mission Statement" name="mission" placeholder="Briefly describe your mission" value={formData.mission} onChange={handleChange} />
          <InputField label="Number of Beneficiaries" name="beneficiaries" type="number" placeholder="2500" value={formData.beneficiaries} onChange={handleChange} />

          {/* Social Media */}
          <InputField label="Facebook" name="facebook" placeholder="https://facebook.com/ngo" value={formData.facebook} onChange={handleChange} />
          <InputField label="Twitter" name="twitter" placeholder="https://twitter.com/ngo" value={formData.twitter} onChange={handleChange} />
          <InputField label="Instagram" name="instagram" placeholder="https://instagram.com/ngo" value={formData.instagram} onChange={handleChange} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          Already have an account? <a href="auth/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  )
}

// Reusable InputField component
function InputField({ label, name, type = "text", placeholder, value, onChange, required = false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} />
    </div>
  )
}

// Reusable TextareaField component
function TextareaField({ label, name, placeholder, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Textarea name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}
