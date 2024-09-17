import { NextResponse } from 'next/server';
import prisma from '@/utils/connect';  // Ensure this path is correct for your Prisma setup

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    // Fetch the post with selected fields
    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        slug: true,
        img: true,
        title: true,
        metaAuthor: true,
        createdAt: true,
        catSlug: true
      } });

    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }

    // Fetch the category associated with the post
    const category = await prisma.category.findUnique({
      where: { slug: post.catSlug }
    });

    // Return the response with post and category
    return NextResponse.json({ post, category: category || null }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
