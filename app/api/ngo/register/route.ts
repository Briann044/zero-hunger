// /api/ngo/register/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      phone,
      location,
      website,
      registrationNumber,
      type,
      mission,
      beneficiaries,
      facebook,
      twitter,
      instagram,
    } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    // Use correct Prisma client property 'nGO'
    const newNGO = await prisma.nGO.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        location,
        website: website || null,
        registrationNumber: registrationNumber || null,
        type: type || null,
        mission: mission || null,
        beneficiaries: beneficiaries ? Number(beneficiaries) : null,
        facebook: facebook || null,
        twitter: twitter || null,
        instagram: instagram || null,
        role: "NGO",
        status: "ACTIVE",
      },
    })

    return NextResponse.json({ ngo: newNGO, message: "NGO registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("NGO registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
