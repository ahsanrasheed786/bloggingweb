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





import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
  
  // Adding token expiration and session configuration
  callbacks: {
    async createVerificationToken(token) {
      // Token expires in 15 minutes
      token.expires = new Date(Date.now() + 15 * 60 * 1000); 
      return token;
    },
  },
  session: {
    strategy: 'jwt',    
    maxAge: 24 * 60 * 60,  
    updateAge: 60 * 60, 
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
