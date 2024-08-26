


// update message sucessfully
// import prisma from "@/utils/connect";
// import { getAuthSession } from "@/utils/auth";

// export async function POST(req) {
//   const session = await getAuthSession();
//   const userId = session.user?.email;
//   const { postId, rating } = await req.json();
  
//   if (!userId) {
//     return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
//   }

//   try {
//     // Check if the user has already rated this post
//     const existingRating = await prisma.rating.findUnique({
//       where: { postId_userId: { postId, userId } },
//     });

//     let ratingStatus;
//     if (existingRating) {
//       // Update the existing rating
//       await prisma.rating.update({
//         where: { postId_userId: { postId, userId } },
//         data: { rating },
//       });
//       ratingStatus = 'updated';
//     } else {
//       // Create a new rating
//       await prisma.rating.create({
//         data: { postId, rating, userId },
//       });
//       ratingStatus = 'created';
//     }

//     // Update the post's average rating
//     const ratings = await prisma.rating.findMany({
//       where: { postId },
//       select: { rating: true },
//     });
//     const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

//     await prisma.post.update({
//       where: { id: postId },
//       data: { averageRating },
//     });

//     return new Response(JSON.stringify({ message: `Rating ${ratingStatus} successfully` }), { status: 200 });
//   } catch (error) {
//     console.error('Error saving rating:', error);
//     return new Response(JSON.stringify({ error: 'Error saving rating' }), { status: 500 });
//   }
// }



//  tryin to calculate reating and storing in post table


import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function POST(req) {
  const session = await getAuthSession();
  const userId = session.user?.email;
  const { postId, rating } = await req.json();
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    // Check if the user has already rated this post
    const existingRating = await prisma.rating.findUnique({
      where: { postId_userId: { postId, userId } },
    });

    if (existingRating) {
      // Update the existing rating
      await prisma.rating.update({
        where: { postId_userId: { postId, userId } },
        data: { rating },
      });
    } else {
      // Create a new rating
      await prisma.rating.create({
        data: { postId, rating, userId },
      });
    }

    // Update the post's total rating information
    const ratings = await prisma.rating.findMany({
      where: { postId },
      select: { rating: true },
    });

    const totalRatingsCount = ratings.length;
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatingsCount;

    await prisma.post.update({
      where: { id: postId },
      data: {
        totalRating: {
          count: totalRatingsCount,
          average: averageRating,
        },
      },
    });

    return new Response(JSON.stringify({ message: 'Rating saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving rating:', error);
    return new Response(JSON.stringify({ error: 'Error saving rating' }), { status: 500 });
  }
}







