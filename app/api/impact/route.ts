// app/api/impact/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "global"
    const userId = searchParams.get("userId")

    switch (type) {
      case "global": {
        const metrics = await prisma.impactMetric.findMany()
        const monthlyData = await prisma.monthlyImpact.findMany({ orderBy: { month: "asc" } })
        const stories = await prisma.impactStory.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
        })

        return NextResponse.json({
          metrics,
          monthlyData,
          stories,
        })
      }

      case "donor": {
        const user = await getUser()
        if (!user) {
          return NextResponse.json({ error: "Authentication required" }, { status: 401 })
        }

        const donorImpact = await prisma.donorImpact.findUnique({
          where: { donorId: user.id },
          include: { topProjects: true },
        })

        if (!donorImpact) {
          return NextResponse.json({ impact: null, stories: [] })
        }

        const stories = await prisma.impactStory.findMany({
          where: {
            projectId: {
              in: donorImpact.topProjects.map((p) => p.projectId),
            },
          },
          orderBy: { createdAt: "desc" },
        })

        return NextResponse.json({
          impact: donorImpact,
          stories,
        })
      }

      case "project": {
        const projectId = searchParams.get("projectId")
        if (!projectId) {
          return NextResponse.json({ error: "Project ID required" }, { status: 400 })
        }

        const stories = await prisma.impactStory.findMany({
          where: { projectId },
          orderBy: { createdAt: "desc" },
        })

        const totalMeals = stories.reduce((sum, story) => sum + (story.mealsProvided || 0), 0)

        const projectMetrics = {
          totalMeals,
          beneficiariesReached: stories.length * 50, // still mock for now
          storiesCount: stories.length,
        }

        return NextResponse.json({
          metrics: projectMetrics,
          stories,
        })
      }

      default:
        return NextResponse.json({ error: "Invalid impact type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Impact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
