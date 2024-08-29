import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
 
// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      // select: {  catSlug: false},
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
// UPDATE A POST
export const PATCH = async (req, { params }) => {
  const { slug } = params;

  try {
    const body = await req.json();
    const updatedPost = await prisma.post.update({
      where: { slug },
      // { catSlug: { $exists: false } },  // Check if catSlug doesn't exist
      // { $set: { catSlug: null } } ,
      data: body,
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update post" }),
      { status: 500 }
    );
  }
};
 

// DELETE A POST
export const DELETE = async (req, { params }) => {
  const { slug } = params;

  try {
    await prisma.post.delete({
      where: { slug },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post" }),
      { status: 500 }
    );
  }
};