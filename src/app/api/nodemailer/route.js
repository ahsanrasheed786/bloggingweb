 


 
import nodemailer from 'nodemailer';
import prisma from '@/utils/connect'; // Adjust the path if necessary

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT, 10),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});
 
export const sendThankYouEmail = async (email, name = "User") => {
   const template = await prisma.emailTemplate.findUnique({
    where: { templateType: 'thank_you' },
  });

  // Replace placeholders in the email body
  const subject = template?.subject.replace('{{name}}', name);
  const textBody = template?.textBody.replace('{{name}}', name);
  const htmlBody = template?.htmlBody.replace('{{name}}', name);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject || 'Thank you for signing in!',
    text: textBody || `Hi ${name},\n\nThank you for signing in! We're glad to have you on board.\n\nBest regards,\nYour Team`,
    html: htmlBody || `<p>Hi ${name},</p><p>Thank you for signing in! We're glad to have you on board.</p><p>Best regards,<br>Your Team</p>`,
  };
 
  try {
    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully');
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
};

 