// import prisma from './connect'; // Adjust the path according to your project structure

// /**
//  * Create a new verification token with a 15-minute expiration.
//  * @param {string} identifier - The user's identifier (e.g., email)
//  * @param {string} token - The token to be created
//  */
// export const createVerificationToken = async (identifier, token) => {
//   await prisma.verificationToken.create({
//     data: {
//       identifier,
//       token,
//       expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
//     },
//   });
// };

// /**
//  * Validate a verification token.
//  * @param {string} identifier - The user's identifier (e.g., email)
//  * @param {string} token - The token to be validated
//  * @returns {boolean} - Returns true if the token is valid and not expired
//  */
// export const validateToken = async (identifier, token) => {
//   const verificationToken = await prisma.verificationToken.findUnique({
//     where: {
//       identifier_token: { identifier, token },
//     },
//   });

//   if (verificationToken && verificationToken.expires > new Date()) {
//     // Token is valid and not expired
//     return true;
//   }

//   // Token is either invalid or expired
//   return false;
// };
