// app/api/projects/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET: fetch top 10 active projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "ACTIVE" },
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

// POST: create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, shortDescription, category, location, targetAmount, imageUrl, endDate } = body

    // basic validation
    if (!title || !shortDescription || !category || !location || !targetAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data: any = {
      title,
      shortDescription,
      category,
      location,
      targetAmount: Number(targetAmount),
      imageUrl: imageUrl || "",
      status: "ACTIVE",
    }

    // only include endDate if it exists
    if (endDate) {
      data.endDate = new Date(endDate)
    }

    const newProject = await prisma.project.create({ data })

    return NextResponse.json({ project: newProject }, { status: 201 })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
