import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@company.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Check if employee
        const employee = await db.employee.findUnique({
          where: { email: credentials.email }
        });
        if (employee && employee.password) {
          const match = await bcrypt.compare(credentials.password, employee.password);
          if (match) {
            return {
              id: employee.id,
              name: employee.name,
              email: employee.email,
              role: 'EMPLOYEE'
            };
          }
        }

        // 2. Check if regular user
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });
        if (user && user.password) {
          const match = await bcrypt.compare(credentials.password, user.password);
          if (match) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: 'USER'
            };
          }
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // initial sign in
      if (user) {
        token.uid = user.id;
        token.role = (user as any).role || 'USER'; // Default to USER for OAuth
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as any).id = token.uid as string;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
