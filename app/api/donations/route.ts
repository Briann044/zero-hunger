// src/app/api/donations/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { processPayment } from "@/lib/payment-gateways";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { projectId, amount, frequency, paymentMethod, message, anonymous, phoneNumber, donationType } =
      await request.json();

    // Validate input
    if (!amount || !frequency || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (Number(amount) < 1) {
      return NextResponse.json({ error: "Minimum donation amount is $1" }, { status: 400 });
    }

    if (paymentMethod === "mpesa" && (!phoneNumber || phoneNumber.length < 10)) {
      return NextResponse.json({ error: "Valid phone number required for M-Pesa" }, { status: 400 });
    }

    const isGeneralDonation = projectId === "general" || !projectId;

    // Build payment request for gateway
    const paymentRequest = {
      amount: paymentMethod === "card" ? Number(amount) * 100 : Number(amount),
      currency: "usd",
      description: isGeneralDonation
        ? `General donation - ${donationType || "General Fund"}`
        : `Donation to project ${projectId}`,
      metadata: {
        projectId: projectId || "general",
        donorId: user.id,
        frequency,
        donationType: donationType || "general",
      },
      customerEmail: user.email,
      phoneNumber: phoneNumber || undefined,
    };

    const paymentResult = await processPayment(paymentMethod, paymentRequest);

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error || "Payment processing failed" },
        { status: 400 }
      );
    }

    // Map status to Prisma enum
    const statusMap: Record<string, Prisma.DonationStatus> = {
      completed: "COMPLETED",
      pending: "PENDING",
    };

    const donation = await prisma.donation.create({
      data: {
        donorId: user.id,
        projectId: projectId && projectId !== "general" ? projectId : null,
        type: "MONETARY",
        amount: Number(amount),
        frequency,
        paymentMethod,
        message: message || "",
        anonymous: anonymous || false,
        status: paymentMethod === "card" ? statusMap["pending"] : statusMap["completed"],
        transactionId: paymentResult.transactionId || null,
        paymentIntentId: paymentResult.paymentIntentId || null,
        receiptUrl: `/receipts/${Math.random().toString(36).substr(2, 9)}.pdf`,
      },
    });

    const response: any = {
      success: true,
      donation,
      message: "Donation processed successfully",
    };

    if (paymentResult.clientSecret) {
      response.clientSecret = paymentResult.clientSecret;
      response.requiresConfirmation = true;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Donation processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const donations = await prisma.donation.findMany({
      where: { donorId: user.id },
      include: { project: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      donations,
      total: donations.reduce((sum, d) => sum + d.amount, 0),
      count: donations.length,
    });
  } catch (error) {
    console.error("Get donations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
