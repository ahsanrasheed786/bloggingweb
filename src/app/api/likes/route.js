// import prisma from "@/utils/connect";
// import { getAuthSession } from "@/utils/auth";

// export async function POST(req) {
//   const { postId } = await req.json();
//   const session = await getAuthSession();

//   try {
//     // Assume userId is retrieved from the session or authentication context
//     const userId = session.user.email; // Replace with actual user ID

//     // Check if the user has already liked the post
//     const existingLike = await prisma.like.findFirst({
//       where: {
//         AND: [
//           { postId: postId },
//           { userId: userId }
//         ]
//       }
//     });

//     if (existingLike) {
//       return new Response(JSON.stringify({ message: 'Already liked' }), {
//         status: 400,
//       });
//     }

//     // Create a like in the database
//     await prisma.like.create({
//       data: {
//         userId: userId,
//         postId: postId,
//       },
//     });

//     // Increment the like count in the post
//     await prisma.post.update({
//       where: { id: postId },
//       data: { totalLikes: { increment: 1 } },
//     });

//     return new Response(JSON.stringify({ message: 'Post liked successfully' }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error liking the post:', error);
//     return new Response(JSON.stringify({ error: 'Error liking the post' }), {
//       status: 500,
//     });
//   }
// }




// import prisma from "@/utils/connect";
// import { getAuthSession } from "@/utils/auth";

// export async function POST(req) {
//   const { postId } = await req.json();
//   const session = await getAuthSession();

//   try {
//     const userId = session.user.email;

//     // Check if the user has already liked the post
//     const existingLike = await prisma.like.findFirst({
//       where: {
//         userId: userId,
//         postId: postId,
//       },
//     });

//     if (existingLike) {
//       // Remove the like if it already exists
//       await prisma.like.delete({
//         where: {
//           id: existingLike.id,
//         },
//       });

//       // Decrement the like count in the post
//       await prisma.post.update({
//         where: { id: postId },
//         data: { totalLikes: { decrement: 1 } },
//       });

//       return new Response(JSON.stringify({ message: 'Like removed successfully' }), {
//         status: 200,
//       });
//     } else {
//       // Create a like if it doesn't exist
//       await prisma.like.create({
//         data: {
//           userId: userId,
//           postId: postId,
//         },
//       });

//       // Increment the like count in the post
//       await prisma.post.update({
//         where: { id: postId },
//         data: { totalLikes: { increment: 1 } },
//       });

//       return new Response(JSON.stringify({ message: 'Post liked successfully' }), {
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error('Error processing the like:', error);
//     return new Response(JSON.stringify({ error: 'Error processing the like' }), {
//       status: 500,
//     });
//   }
// }





import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export async function POST(req) {
  const { postId } = await req.json();
  const session = await getAuthSession();

  try {
    const userId = session.user.email; // Retrieve user ID from the session

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: { 
        postId_userId: { postId, userId } // Adjust this to match your schema
      }
    });

    if (existingLike) {
      // Remove the like
      await prisma.like.delete({
        where: { 
          id: existingLike.id 
        },
      });
      
      // Decrement the like count in the post
      await prisma.post.update({
        where: { id: postId },
        data: { totalLikes: { decrement: 1 } },
      });

      return new Response(JSON.stringify({ message: 'Like removed' }), { status: 200 });
    } else {
      // Create a like
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
