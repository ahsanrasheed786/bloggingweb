import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

// GET ALL Questions
export const GET = async () => {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const questions = await prisma.question.findMany({
      where: { postSlug }, 
      include: {
        user: true,
        post: true,
      },
    });
    return new NextResponse(JSON.stringify(questions), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch questions" }),
      { status: 500 }
    );
  }
};
