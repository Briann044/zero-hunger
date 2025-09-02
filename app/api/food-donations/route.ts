// src/app/api/food-donations/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user || user.role !== Role.FOOD_PROVIDER) {
  return NextResponse.json(
    { error: "Food provider authentication required" },
    { status: 401 }
  )
}
    

    const {
      title,
      description,
      category,
      quantity,
      unit,
      expiryDate,
      pickupLocation,
      pickupTimeStart,
      pickupTimeEnd,
    } = await request.json()

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !quantity ||
      !unit ||
      !expiryDate ||
      !pickupLocation ||
      !pickupTimeStart ||
      !pickupTimeEnd
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const parsedQuantity = Number(quantity)
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json({ error: "Quantity must be a positive number" }, { status: 400 })
    }

    const foodDonation = await prisma.foodDonation.create({
      data: {
        providerId: user.id,
        title,
        description,
        category,
        quantity: parsedQuantity,
        unit,
        expiryDate: new Date(expiryDate),
        pickupLocation,
        pickupTimeStart: new Date(pickupTimeStart),
        pickupTimeEnd: new Date(pickupTimeEnd),
        status: "AVAILABLE",
      },
    })

    return NextResponse.json({
      success: true,
      foodDonation,
      message: "Food donation listed successfully",
    })
  } catch (error) {
    console.error("Food donation creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const foodDonations = await prisma.foodDonation.findMany({
      orderBy: { createdAt: "desc" },
      include: { provider: { select: { id: true, firstName: true } } },
    })

    return NextResponse.json({
      foodDonations,
      count: foodDonations.length,
    })
  } catch (error) {
    console.error("Get food donations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
