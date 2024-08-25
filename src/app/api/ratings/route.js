// pages/api/ratings.js

import prisma from "@/utils/connect";

export async function POST(req) {
  const { postId, rating, userId } = await req.json();

  try {
    // Create or update the rating
    await prisma.rating.upsert({
      where: { postId_userId: { postId, userId } },
      update: { rating },
      create: { postId, rating, userId },
    });

    // Update the post's average rating if needed
    const ratings = await prisma.rating.findMany({
      where: { postId },
      select: { rating: true },
    });
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await prisma.post.update({
      where: { id: postId },
      data: { averageRating },
    });

    return new Response(JSON.stringify({ message: 'Rating saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving rating:', error);
    return new Response(JSON.stringify({ error: 'Error saving rating' }), { status: 500 });
  }
}
