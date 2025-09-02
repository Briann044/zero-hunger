// app/api/admin/users/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const where: any = {}

    if (role && role !== "all") {
      where.role = role
    }

    if (status && status !== "all") {
      where.status = status
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    const total = await prisma.user.count()
    const active = await prisma.user.count({ where: { status: "active" } })
    const suspended = await prisma.user.count({ where: { status: "suspended" } })
    const pending = await prisma.user.count({ where: { status: "pending" } })

    const byRole = {
      donor: await prisma.user.count({ where: { role: "donor" } }),
      ngo: await prisma.user.count({ where: { role: "ngo" } }),
      "food-provider": await prisma.user.count({ where: { role: "food-provider" } }),
      admin: await prisma.user.count({ where: { role: "admin" } }),
    }

    return NextResponse.json({
      users,
      total: users.length,
      summary: { total, active, suspended, pending, byRole },
    })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { userId, action, reason } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: "User ID and action are required" }, { status: 400 })
    }

    let newStatus
    switch (action) {
      case "suspend":
        newStatus = "suspended"
        break
      case "activate":
        newStatus = "active"
        break
      case "verify":
        newStatus = "verified"
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus },
    })

    return NextResponse.json({
      success: true,
      message: `User ${action}ed successfully`,
      user: updatedUser,
    })
  } catch (error) {
    console.error("Admin user action error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
