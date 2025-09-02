// app/api/admin/verifications/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"

    const where =
      status === "all"
        ? {}
        : {
            status: status,
          }

    const verifications = await prisma.verificationRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    const summary = {
      pending: await prisma.verificationRequest.count({ where: { status: "pending" } }),
      approved: await prisma.verificationRequest.count({ where: { status: "approved" } }),
      rejected: await prisma.verificationRequest.count({ where: { status: "rejected" } }),
    }

    return NextResponse.json({
      verifications,
      total: verifications.length,
      summary,
    })
  } catch (error) {
    console.error("Admin verifications fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { verificationId, action, notes } = await request.json()

    if (!verificationId || !action) {
      return NextResponse.json({ error: "Verification ID and action are required" }, { status: 400 })
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const verification = await prisma.verificationRequest.findUnique({
      where: { id: verificationId },
    })

    if (!verification) {
      return NextResponse.json({ error: "Verification request not found" }, { status: 404 })
    }

    const updatedVerification = await prisma.verificationRequest.update({
      where: { id: verificationId },
      data: {
        status: action === "approve" ? "approved" : "rejected",
        reviewedBy: user.id,
        reviewedAt: new Date(),
        notes: notes || "",
      },
    })

    return NextResponse.json({
      success: true,
      message: `Verification ${action}d successfully`,
      verification: updatedVerification,
    })
  } catch (error) {
    console.error("Admin verification action error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
