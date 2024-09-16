
import prisma from "@/utils/connect";
import nodemailer from 'nodemailer';
import  checkAccess  from "@/utils/authontication";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT, 10),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function POST(request) {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  const { userIds, message } = await request.json();

  try {
    // Fetch users from the database
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    // Send emails with dynamic name
    for (const user of users) {
      const personalizedMessage = message.replace("{name}", user.name || "User");

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Your Message Subject',
        html: `<p>Hello ${user.name || 'User'},</p><p>${personalizedMessage}</p>`,
      };

      await transporter.sendMail(mailOptions);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to send messages" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

