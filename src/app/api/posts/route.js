import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

// Single GET function to handle different cases
export const GET = async (req) => {
//   const canAccess = await checkAccess();
//   if (canAccess.status!=200) {
//    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 5;

  // If no query parameters, return all posts sorted by recent first
  if (!page && !cat) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc', // Sort posts by most recent
        },
      });
      return new NextResponse(JSON.stringify({ posts }), { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({ message: "Failed to fetch posts" }),
        { status: 500 }
      );
    }
  }

  // If query parameters exist, return paginated posts
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: 'desc', // Sort paginated posts by most recent
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
//   const canAccess = await checkAccess();
//   if (canAccess.status!=200) {
//    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//  }


  const session = await getAuthSession();

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
  //   );
  // }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


