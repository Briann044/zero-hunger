/*
  Warnings:

  - You are about to drop the column `userId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `raised` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donorId` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalMeals` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ngoId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ngoName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetAmount` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."VerificationUserType" AS ENUM ('NGO', 'FOOD_PROVIDER');

-- CreateEnum
CREATE TYPE "public"."VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('PROJECT', 'COMMENT', 'PROFILE');

-- CreateEnum
CREATE TYPE "public"."ReportStatus" AS ENUM ('PENDING', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "public"."DonationType" AS ENUM ('MONETARY', 'FOOD', 'SERVICE');

-- CreateEnum
CREATE TYPE "public"."DonationFrequency" AS ENUM ('ONE_TIME', 'MONTHLY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."FoodCategory" AS ENUM ('FRESH_PRODUCE', 'PACKAGED_FOOD', 'PREPARED_MEALS', 'BEVERAGES');

-- CreateEnum
CREATE TYPE "public"."DonationStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."FoodDonationStatus" AS ENUM ('AVAILABLE', 'CLAIMED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."ServiceDonationStatus" AS ENUM ('AVAILABLE', 'MATCHED', 'COMPLETED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Role" ADD VALUE 'NGO';
ALTER TYPE "public"."Role" ADD VALUE 'FOOD_PROVIDER';

-- DropForeignKey
ALTER TABLE "public"."Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Donation" DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "donorId" TEXT NOT NULL,
ADD COLUMN     "frequency" "public"."DonationFrequency",
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "status" "public"."DonationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "type" "public"."DonationType" NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "goal",
DROP COLUMN "raised",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "goalMeals" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "ngoId" TEXT NOT NULL,
ADD COLUMN     "ngoName" TEXT NOT NULL,
ADD COLUMN     "providedMeals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "raisedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL,
ADD COLUMN     "targetAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "foodListings" INTEGER,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "projectsCreated" INTEGER,
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalDonations" DOUBLE PRECISION,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."NGO" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "registrationNumber" TEXT,
    "type" TEXT,
    "mission" TEXT,
    "beneficiaries" INTEGER,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "role" TEXT NOT NULL DEFAULT 'NGO',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NGO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodDonation" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."FoodCategory" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "pickupTimeStart" TIMESTAMP(3) NOT NULL,
    "pickupTimeEnd" TIMESTAMP(3) NOT NULL,
    "status" "public"."FoodDonationStatus" NOT NULL DEFAULT 'AVAILABLE',
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceDonation" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "hoursAvailable" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "status" "public"."ServiceDonationStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userType" "public"."VerificationUserType" NOT NULL,
    "organizationName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "documents" TEXT[],
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContentReport" (
    "id" TEXT NOT NULL,
    "reportedById" TEXT NOT NULL,
    "contentType" "public"."ContentType" NOT NULL,
    "contentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."ReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ContentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ImpactMetric" (
    "id" TEXT NOT NULL,
    "totalMealsProvided" INTEGER NOT NULL,
    "totalDonations" DOUBLE PRECISION NOT NULL,
    "totalBeneficiaries" INTEGER NOT NULL,
    "totalProjects" INTEGER NOT NULL,
    "foodWastePrevented" DOUBLE PRECISION NOT NULL,
    "co2EmissionsSaved" DOUBLE PRECISION NOT NULL,
    "communitiesReached" INTEGER NOT NULL,
    "volunteersEngaged" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImpactMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MonthlyImpact" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "meals" INTEGER NOT NULL,
    "donations" DOUBLE PRECISION NOT NULL,
    "beneficiaries" INTEGER NOT NULL,
    "projects" INTEGER NOT NULL,
    "donorImpactId" TEXT,

    CONSTRAINT "MonthlyImpact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectImpact" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "totalRaised" DOUBLE PRECISION NOT NULL,
    "mealsProvided" INTEGER NOT NULL,
    "beneficiariesReached" INTEGER NOT NULL,
    "completionPercentage" INTEGER NOT NULL,
    "donorImpactId" TEXT,

    CONSTRAINT "ProjectImpact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ImpactStory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "location" TEXT NOT NULL,
    "beneficiaryName" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "mealsProvided" INTEGER NOT NULL,
    "projectImpactId" TEXT NOT NULL,

    CONSTRAINT "ImpactStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DonorImpactSummary" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "totalDonated" DOUBLE PRECISION NOT NULL,
    "totalMealsProvided" INTEGER NOT NULL,
    "projectsSupported" INTEGER NOT NULL,
    "impactRank" INTEGER NOT NULL,

    CONSTRAINT "DonorImpactSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NGO_email_key" ON "public"."NGO"("email");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodDonation" ADD CONSTRAINT "FoodDonation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceDonation" ADD CONSTRAINT "ServiceDonation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VerificationRequest" ADD CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContentReport" ADD CONSTRAINT "ContentReport_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonthlyImpact" ADD CONSTRAINT "MonthlyImpact_donorImpactId_fkey" FOREIGN KEY ("donorImpactId") REFERENCES "public"."DonorImpactSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectImpact" ADD CONSTRAINT "ProjectImpact_donorImpactId_fkey" FOREIGN KEY ("donorImpactId") REFERENCES "public"."DonorImpactSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImpactStory" ADD CONSTRAINT "ImpactStory_projectImpactId_fkey" FOREIGN KEY ("projectImpactId") REFERENCES "public"."ProjectImpact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
