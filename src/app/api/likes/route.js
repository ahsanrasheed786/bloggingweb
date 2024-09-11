 


import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function POST(req) {
  const { postId } = await req.json();
  const session = await getAuthSession();

  try {
    const userId = session.user.email;  

     const existingLike = await prisma.like.findUnique({
      where: { 
        postId_userId: { postId, userId }  
      }
    });

    if (existingLike) {
      // Remove the like
      await prisma.like.delete({
        where: { 
          id: existingLike.id 
        },
      });
 
      await prisma.post.update({
        where: { id: postId },
        data: { totalLikes: { decrement: 1 } },
      });

      return new Response(JSON.stringify({ message: 'Like removed' }), { status: 200 });
    } else {
       await prisma.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });

      // Increment the like count in the post
      await prisma.post.update({
        where: { id: postId },
        data: { totalLikes: { increment: 1 } },
      });

      return new Response(JSON.stringify({ message: 'Post liked successfully' }), { status: 200 });
    }
  } catch (error) {
    console.error('Error processing the like:', error);
    return new Response(JSON.stringify({ error: 'Error processing the like' }), { status: 500 });
  }
}
