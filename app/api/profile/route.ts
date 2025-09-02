// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, email, phone, location, bio, organization, website } = body

    // Basic validation (optional)
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
        phone,
        location,
        bio,
        organization: user.role === "ngo" ? organization : undefined,
        website: user.role === "ngo" ? website : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        location: true,
        bio: true,
        organization: true,
        website: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error("Profile update error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
