import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        identifier: { label: "Phone or Email", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.otp) return null;
        
        // Mock OTP validation - for production this would verify against Twilio/Firebase
        if (credentials.otp !== "123456") {
           // Reject if not our mock code
           return null;
        }

        const isEmail = credentials.identifier.includes('@');
        const searchCriteria = isEmail 
          ? { email: credentials.identifier } 
          : { phone: credentials.identifier };

        // Find or create user
        let user = await prisma.user.findUnique({
          where: searchCriteria as any
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              ...searchCriteria,
              name: "New User"
            } as any
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        } as any;
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
