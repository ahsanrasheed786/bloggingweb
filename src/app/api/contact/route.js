// import { prisma } from '@/lib/prisma';  // Assuming you have prisma setup
import prisma from "@/utils/connect";
import  checkAccess  from "@/utils/authontication";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    //  const newContact = 
     await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to submit contact form' }), {
      status: 500,
    });
  }
};

export const GET = async () => {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
    try {
      const contacts = await prisma.contact.findMany();
      return new Response(JSON.stringify(contacts), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch contacts' }), {
        status: 500,
      });
    }
  };