// app/api/access/route.js

import prisma from "@/utils/connect";

export async function GET(req) {
  try {
    const accessData = await prisma.access.findMany();
    return new Response(JSON.stringify(accessData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, isAdmin } = await req.json();

    if (!name || !email || typeof isAdmin !== 'boolean') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const newAccess = await prisma.access.create({
      data: {
        email,
        isAdmin,
        name,
      },
    });

    return new Response(JSON.stringify(newAccess), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create data' }), { status: 500 });
  }
}
