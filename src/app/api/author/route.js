import prisma from "@/utils/connect";

export async function GET() {
  try {
    const varifyEntries = await prisma.varifydoctor.findMany();
    return new Response(JSON.stringify(varifyEntries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch varify entries:', error);
    return new Response('Failed to fetch varify entries', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newEntry = await prisma.varifydoctor.create({
      data,
    });
    return new Response(JSON.stringify(newEntry), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create varify entry:', error);
    return new Response('Failed to create varify entry', { status: 500 });
  }
}
