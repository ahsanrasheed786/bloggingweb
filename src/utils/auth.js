// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GithubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "./connect";
// import { getServerSession } from "next-auth";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret:process.env.FACEBOOK_SECRET,
//     }),
//     GithubProvider({
//       // enabled:false,
//       clientId: process.env.GITHUB_ID,
//       clientSecret:process.env.GITHUB_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export const getAuthSession = () => getServerSession(authOptions);




// import NextAuth from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
//  import transporter from "./nodemailer"; // Path to the nodemailer config
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "./connect";
// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//       sendVerificationRequest: async ({ identifier: email, url, provider }) => {
//         const { from } = provider;
//         try {
//           await transporter.sendMail({
//             to: email,
//             from,
//             subject: `Sign in to ${new URL(url).host}`,
//             text: `Sign in to ${new URL(url).host}\n\n${url}\n\n`,
//             html: `<p>Sign in to ${new URL(url).host}</p><p><a href="${url}">Click here to sign in</a></p>`,
//           });
//         } catch (error) {
//           console.error("Error sending email:", error);
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);





// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GithubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import prisma from "./connect";
// import { getServerSession } from "next-auth";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//     }),
//   ],
  
//   // Adding token expiration and session configuration
//   callbacks: {
//     async createVerificationToken(token) {
//       // Token expires in 15 minutes
//       token.expires = new Date(Date.now() + 15 * 60 * 1000); 
//       return token;
//     },
//   },
//   session: {
//     strategy: 'jwt',    
//     maxAge: 24 * 60 * 60,  
//     updateAge: 60 * 60, 
//   },
  
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export const getAuthSession = () => getServerSession(authOptions);




// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './connect';
import { createVerificationToken, validateToken } from './tokenUtils'; // Import token utils
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

const sendThankYouEmail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Thank You for Logging In!',
    text: `Hi ${user.name || 'there'},\n\nThank you for logging in to our platform.\n\nBest regards,\nYour Team`,
  };

  await transporter.sendMail(mailOptions);
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
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
    async signIn({ user }) {
      if (user.email) {
        try {
          await sendThankYouEmail(user);
        } catch (error) {
          console.error('Error sending thank you email:', error);
        }
      }
      return true; // Continue with sign-in
    },
  },
  pages: {
    verifyRequest: '/auth/verify-request', // Custom verify request page
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async createVerificationToken(token) {
      // Set the token expiration to 15 minutes from now
      await createVerificationToken(token.identifier, token.token); // Use the utility function
    },
  },
};

export default NextAuth(authOptions);
