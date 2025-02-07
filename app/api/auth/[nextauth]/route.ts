import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest, NextResponse } from "next/server";

// Define authOptions separately
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Fake user authentication (Replace with real API call)
        const user = {
          id: "1",
          name: "John Doe",
          email: credentials?.email,
        };
        if (credentials?.email === "admin@example.com" && credentials?.password === "password") {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Set in .env.local
};

// Correct way to define API route handlers in Next.js 13+ app directory
const handler = NextAuth(authOptions);

export const GET = async (req: NextRequest) => {
  return handler(req as any, {} as any);
};

export const POST = async (req: NextRequest) => {
  return handler(req as any, {} as any);
};
