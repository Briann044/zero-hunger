// app/api/services/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { title, description, skills, hoursAvailable, location, availability } = await request.json()

    // Validate input
    if (!title || !description || !skills || !hoursAvailable || !location || !availability) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Save to DB
    const serviceDonation = await prisma.serviceDonation.create({
      data: {
        donorId: user.id,
        title,
        description,
        skills: Array.isArray(skills) ? skills : [skills],
        hoursAvailable: Number(hoursAvailable),
        location,
        availability,
        status: "available",
      },
    })

    return NextResponse.json({
      success: true,
      serviceDonation,
      message: "Service offering created successfully",
    })
  } catch (error) {
    console.error("Service creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const serviceDonations = await prisma.serviceDonation.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      serviceDonations,
      count: serviceDonations.length,
    })
  } catch (error) {
    console.error("Get service donations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
