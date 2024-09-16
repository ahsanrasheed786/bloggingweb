import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

// GET ALL Questions OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const postSlug   = searchParams.get("postSlug");
// console.log(postSlug);
  try {
    const questions = await prisma.question.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(questions, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong! to fetch questions", searchParams} , { status: 500 })
    );
  }
};
 

// POST (create) a question
export const POST = async (req) => {
  const session = await getAuthSession(); // Get user session
  // const {session } = useSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  const { desc, postSlug } = await req.json();

  try {
    const question = await prisma.question.create({
      data: {
        desc,
        postSlug,
        userEmail: session.user.email,
        answer: "", // Default empty answer
      },
    });
    return new NextResponse(JSON.stringify(question), { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create question" }),
      { status: 500 }
    );
  }
};

// PUT (update) a question
export const PUT = async (req) => {
  const canAccess = await checkAccess();
   if (!canAccess.status===200) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id, desc, answer, isRead } = await req.json();

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { desc, answer, isRead, updatedAt: new Date() },
    });
    return new NextResponse(JSON.stringify(updatedQuestion), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update question" }),
      { status: 500 }
    );
  }
};

// DELETE a question
export const DELETE = async (req) => {
  const canAccess = await checkAccess();
   if (!canAccess.status===200) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = await req.json();

  try {
    await prisma.question.delete({
      where: { id },
    });
    return new NextResponse(JSON.stringify({ message: "Question deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete question" }),
      { status: 500 }
    );
  }
};
