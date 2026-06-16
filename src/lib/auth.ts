import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import { adminAuth } from "./firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        firebaseToken: { label: "Firebase Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.firebaseToken) return null;
        
        let decodedToken;
        try {
          decodedToken = await adminAuth.verifyIdToken(credentials.firebaseToken);
        } catch (error) {
          console.error("Firebase token verification failed:", error);
          return null;
        }

        const email = decodedToken.email;
        const phone = decodedToken.phone_number; // Firebase stores it with + country code

        if (!email && !phone) return null;

        const searchCriteria = email ? { email } : { phone };

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
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "Google User"
            }
          });
        }
        
        // Map database ID to the user object so the jwt callback receives it
        user.id = dbUser.id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
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
