import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

// DELETE a question
export const DELETE = async (req, { params }) => {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  const { id } = params;
  console.log("Deleted request ID:", id);

  try {
    await prisma.question.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error deleting question:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete question" }),
      { status: 500 }
    );
  }
};

// PATCH a question (for read status and editing)
// export const PATCH = async (req, { params }) => {
//   const { id } = params;
//   const body = await req.json();

//   try {
//     const updatedQuestion = await prisma.question.update({
//       where: { id },
//       data: body,
//     });

//     return new NextResponse(JSON.stringify(updatedQuestion), { status: 200 });
//   } catch (err) {
//     console.error("Error updating question:", err);
//     return new NextResponse(
//       JSON.stringify({ message: "Failed to update question" }),
//       { status: 500 }
//     );
//   }
// };

// PATCH A question (for adding a reply)
export const PATCH = async (req, { params }) => {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  const { id } = params;
  const body = await req.json();

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        reply: body.reply, // Ensure that reply is passed and updated here
        isRead: true // Optionally mark the question as read when replying
      },
    });

    return new NextResponse(JSON.stringify(updatedQuestion), { status: 200 });
  } catch (err) {
    console.error("Error updating question:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update question" }),
      { status: 500 }
    );
  }
};

// POST reply to a question
export const POST = async (req, { params }) => {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  const { id } = params; // question ID
  console.log("Posted request ID:", id);
  const body = await req.json();
  console.log("Posted request body:", body.postSlug);

  try {
    if (!body.content) {
      return new NextResponse(
        JSON.stringify({ message: "Content field is required" }),
        { status: 400 }
      );
    }

    // Create the reply associated with the question
    const newReply = await prisma.reply.create({
      data: {
        questionId: id,
        content: body.content,
      },
    });

    return new NextResponse(JSON.stringify(newReply), { status: 201 });
  } catch (err) {
    console.error("Error posting reply:", err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to post reply" }),
      { status: 500 }
    );
  }
};
