import { NextResponse } from 'next/server';
 import prisma from '@/utils/connect';
export async function GET() {
  try {
     const categories = await prisma.category.findMany();
     const mostPopularPosts = await Promise.all(
      categories.map(async (category) => {
         const post = await prisma.post.findFirst({
          where: { catSlug: category.slug },
          orderBy: {
            views: 'desc',  
          },
        });
        if (post) {
          return {
            category: category.title,
            color:category.color,
            post: {
              title: post.title,
              slug: post.slug,
              views: post.views,
              // description: post.desc,
              author:post.metaAuthor,
              img: post.img,
              createdAt: post.createdAt,
            },
          };
        } else {
          return null;
        }
      })
    );
     const filteredPosts = mostPopularPosts.filter((post) => post !== null);
    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Error fetching most popular posts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
