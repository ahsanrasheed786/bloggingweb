import nodemailer from 'nodemailer';

export default async function sendThankYouEmail(req, res) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // Send the email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Thank You, ${name}!`,
      text: `Dear ${name},\n\nThank you for signing in to our service. We are glad to have you!\n\nBest regards,\nYour Team`,
      html: `<p>Dear <strong>${name}</strong>,</p><p>Thank you for signing in to our service. We are glad to have you!</p><p>Best regards,<br>Your Team</p>`,
    });

    res.status(200).json({ success: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
