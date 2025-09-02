// app/api/projects/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      take: 10, // top recommended projects
    })

    const formattedProjects = projects.map((p) => ({
      id: p.id,
      title: p.title,
      shortDescription: p.shortDescription,
      category: p.category,
      location: p.location,
      imageUrl: p.imageUrl,
      targetAmount: p.targetAmount,
      raisedAmount: p.raisedAmount,
    }))

    return NextResponse.json({ projects: formattedProjects })
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
