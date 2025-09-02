// prisma/seed.ts
import { PrismaClient, Role, UserStatus, VerificationStatus, VerificationUserType, ContentType } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function main() {
  console.log("🌱 Starting seed...")

  // --- Users ---
  const adminPassword = await hashPassword("admin123")
  const ngoPassword = await hashPassword("ngo12345")
  const donorPassword = await hashPassword("donor12345")
  const suspiciousPassword = await hashPassword("suspicious123")

  const admin = await prisma.user.upsert({
    where: { email: "brian@zerohunger.org" },
    update: {},
    create: {
      id: "1",
      email: "brian@zerohunger.org",
      password: adminPassword,
      firstName: "Brian",
      lastName: "Wambugu",
      phone: "+254114788563",
      role: Role.ADMIN,
      verified: true,
      status: UserStatus.ACTIVE,
      createdAt: new Date("2024-01-15T00:00:00Z"),
      lastLogin: new Date("2024-01-22T10:30:00Z"),
    },
  })

  const ngo1 = await prisma.user.upsert({
    where: { email: "hope.foundation@gmail.com" },
    update: {},
    create: {
      id: "2",
      email: "hope.foundation@gmail.com",
      password: ngoPassword,
      firstName: "Hope",
      lastName: "Foundation",
      phone: "+1234567891",
      role: Role.NGO,
      verified: true,
      status: UserStatus.ACTIVE,
      createdAt: new Date("2024-01-10T00:00:00Z"),
      lastLogin: new Date("2024-01-22T09:15:00Z"),
      projectsCreated: 3,
    },
  })

  const donor1 = await prisma.user.upsert({
    where: { email: "fresh.market@store.ke" },
    update: {},
    create: {
      id: "3",
      email: "fresh.market@store.ke",
      password: donorPassword,
      firstName: "Fresh",
      lastName: "Market",
      phone: "+1234567892",
      role: Role.DONOR,
      verified: true,
      status: UserStatus.ACTIVE,
      createdAt: new Date("2024-01-12T00:00:00Z"),
      lastLogin: new Date("2024-01-21T16:45:00Z"),
      foodListings: 15,
    },
  })

  await prisma.user.upsert({
    where: { email: "suspicious.user@example.com" },
    update: {},
    create: {
      id: "4",
      email: "suspicious.user@example.com",
      password: suspiciousPassword,
      firstName: "Suspicious",
      lastName: "User",
      phone: "+1234567893",
      role: Role.DONOR,
      verified: false,
      status: UserStatus.SUSPENDED,
      createdAt: new Date("2024-01-20T00:00:00Z"),
      lastLogin: new Date("2024-01-20T12:00:00Z"),
    },
  })

  console.log("✅ Users seeded")

  // --- Verification Requests ---
  await prisma.verificationRequest.createMany({
    data: [
      {
        id: "1",
        userId: ngo1.id,
        userType: VerificationUserType.NGO,
        organizationName: "Rural Aid Foundation",
        email: "contact@ruralaid.org",
        documents: ["Registration Certificate", "Tax Exemption", "Board Resolution"],
        submittedAt: new Date("2024-01-20T00:00:00Z"),
        status: VerificationStatus.PENDING,
      },
      {
        id: "2",
        userId: donor1.id,
        userType: VerificationUserType.FOOD_PROVIDER,
        organizationName: "Metro Grocery Chain",
        email: "donations@metrogrocery.com",
        documents: ["Business License", "Food Safety Certificate", "Insurance"],
        submittedAt: new Date("2024-01-19T00:00:00Z"),
        status: VerificationStatus.PENDING,
      },
    ],
  })
  console.log("✅ Verification requests seeded")

  // --- Content Reports ---
  await prisma.contentReport.createMany({
    data: [
      {
        id: "1",
        reportedById: admin.id,
        contentType: ContentType.PROJECT,
        contentId: "project-123",
        reason: "Misleading information",
        description: "The project description contains false claims about fund allocation",
        status: "PENDING",
        createdAt: new Date("2024-01-21T00:00:00Z"),
      },
      {
        id: "2",
        reportedById: ngo1.id,
        contentType: ContentType.COMMENT,
        contentId: "comment-456",
        reason: "Inappropriate content",
        description: "Comment contains offensive language",
        status: "RESOLVED",
        createdAt: new Date("2024-01-20T00:00:00Z"),
        resolvedBy: "admin@example.com",
        resolvedAt: new Date("2024-01-21T09:15:00Z"),
      },
    ],
  })
  console.log("✅ Content reports seeded")

  // --- Impact Metrics ---
  await prisma.impactMetric.create({
    data: {
      totalMealsProvided: 125000,
      totalDonations: 87500,
      totalBeneficiaries: 15600,
      totalProjects: 28,
      foodWastePrevented: 45000,
      co2EmissionsSaved: 12500,
      communitiesReached: 85,
      volunteersEngaged: 340,
    },
  })
  console.log("✅ Global impact metrics seeded")

  // --- Donor Impact Summary ---
  const donorImpact = await prisma.donorImpactSummary.create({
    data: {
      id: "donor-1",
      donorId: donor1.id,
      totalDonated: 1250,
      totalMealsProvided: 2500,
      projectsSupported: 3,
      impactRank: 85,
    },
  })
  console.log("✅ Donor impact summary seeded")

  // --- Project Impacts ---
  await prisma.projectImpact.createMany({
    data: [
      {
        id: "1",
        projectName: "Emergency Food Relief",
        totalRaised: 500,
        mealsProvided: 1000,
        beneficiariesReached: 125,
        completionPercentage: 75,
        donorImpactId: donorImpact.id,
      },
      {
        id: "2",
        projectName: "School Feeding Program",
        totalRaised: 400,
        mealsProvided: 800,
        beneficiariesReached: 100,
        completionPercentage: 80,
        donorImpactId: donorImpact.id,
      },
    ],
  })
  console.log("✅ Project impacts seeded")

  // --- Impact Stories ---
  await prisma.impactStory.createMany({
    data: [
      {
        id: "story-1",
        title: "School Feeding Program Transforms Lives",
        description: "200 children in Kibera now receive daily nutritious meals, improving health and attendance.",
        imageUrl: "/impact-story-school-feeding.png",
        location: "Kibera, Nairobi",
        beneficiaryName: "Grace Wanjiku",
        date: new Date("2024-01-15T00:00:00Z"),
        mealsProvided: 6000,
        projectImpactId: "2",
      },
    ],
  })
  console.log("✅ Impact stories seeded")

  // --- Monthly Impact ---
  await prisma.monthlyImpact.createMany({
    data: [
      { month: "Jan", meals: 8500, donations: 12000, beneficiaries: 1200, projects: 5 },
      { month: "Feb", meals: 9200, donations: 13500, beneficiaries: 1350, projects: 6 },
      { month: "Mar", meals: 10800, donations: 15200, beneficiaries: 1480, projects: 7 },
      { month: "Apr", meals: 11500, donations: 16800, beneficiaries: 1620, projects: 8 },
      { month: "May", meals: 12200, donations: 18200, beneficiaries: 1750, projects: 9 },
      { month: "Jun", meals: 13100, donations: 19500, beneficiaries: 1890, projects: 10 },
    ],
  })
  console.log("✅ Monthly impact seeded")

  console.log("🌱 Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
