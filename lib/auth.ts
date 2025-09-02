// lib/auth.ts
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export type UserRole = "USER" | "DONOR" |"FOOD-PROVIDER" | "ADMIN"; 

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  exp: number;
}

export async function createToken(user: { id: string; email: string; role: UserRole }) {
  return await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    // Narrow the type safely
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as UserRole,
      exp: payload.exp as number,
    };
  } catch {
    return null;
  }
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  // Fetch from DB
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  return user;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
