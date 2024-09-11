 
// app/api/likes/status/route.js
import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  try {
    const session = await getAuthSession();
    const userId = session.user.email;

    // Check if the user has liked the post
    const hasLiked = await prisma.like.findFirst({
      where: { userId, postId },
    });

    

    // Get the count of all like documents for the post
    const likeCount = await prisma.like.count({
      where: { postId },
    });

    return new Response(JSON.stringify({
      hasLiked: !!hasLiked,
      likes:likeCount,
    //   likeCount, // Add this line to include the number of like documents
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching like status:', error);
    return new Response(JSON.stringify({ error: 'Error fetching like status' }), {
      status: 500,
    });
  }
}

 