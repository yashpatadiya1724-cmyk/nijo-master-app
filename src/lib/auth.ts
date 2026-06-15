import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.phone) return null;
        
        // Mock OTP validation - for production this would verify against Twilio/Firebase
        if (credentials.otp !== "492") {
           // Reject if not our mock code
           return null;
        }

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { phone: credentials.phone }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              phone: credentials.phone,
              name: "New User"
            }
          });
        }

        return {
          id: user.id,
          name: user.name,
          phone: user.phone
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/onboarding",
  }
};
