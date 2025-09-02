// app/api/auth/register/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, setAuthCookie, type UserRole } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, role } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate role
    const validRoles = ["donor", "ngo", "food-provider"] as const;
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        role, // Prisma role
        verified: false,
      },
    });

    // Map Prisma role to UserRole for the token
    const roleMap: Record<typeof newUser.role, UserRole> = {
      donor: "DONOR",
      ngo: "USER",          // Map NGO to USER or another UserRole as per your system
      "food-provider": "USER",
    };

    const token = await createToken({
      id: newUser.id,
      email: newUser.email,
      role: roleMap[newUser.role],
    });

    // Set cookie
    await setAuthCookie(token);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
