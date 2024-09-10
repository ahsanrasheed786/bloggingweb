 

import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import { sendThankYouEmail } from "../app/api/nodemailer/route.js"; // Adjust the path if necessary

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Ensure `user` and `account` objects are defined
      if (user && account) {
        try {
          // Send thank you email for both email sign-ins and OAuth sign-ins
          await sendThankYouEmail(user.email, user.name);
        } catch (error) {
          console.error('Error sending thank you email:', error);
        }
      } else if (["github", "google", "facebook"].includes(account.provider)) {
                  const userName = user.name || "User";
                  await sendThankYouEmail(user.email, userName);
                }
      return true; // Continue with sign-in
    },

    async createVerificationToken(token) {
      token.expires = new Date(Date.now() + 15 * 60 * 1000); // Set token expiration to 15 minutes
      return token;
    },

    async session({ session, token }) {
      if (token?.email) {
        session.user.email = token.email;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to the previous page if available, otherwise redirect to base URL
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },

  pages: {
    verifyRequest: '/auth/verify-request', // Custom verify request page
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // Session max age set to 1 day
    updateAge: 60 * 60, // Session is updated every 1 hour
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async createVerificationToken(token) {
      token.expires = new Date(Date.now() + 15 * 60 * 1000); // Set token expiration
      return token;
    },
  },
};

export default function NextAuthHandler(req, res) {
  return NextAuth(req, res, authOptions);
}

export const getAuthSession = () => getServerSession(authOptions);
