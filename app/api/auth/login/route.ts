// app/api/auth/login/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { createToken, setAuthCookie, UserRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    const normalizedRole = role.toUpperCase() as UserRole;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role.toUpperCase() !== normalizedRole) {
      return NextResponse.json({ error: "Invalid role for this account" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password || "");
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role.toUpperCase() as UserRole,
    });

    await setAuthCookie(token);

    // Avoid redeclaration error by renaming password field
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
