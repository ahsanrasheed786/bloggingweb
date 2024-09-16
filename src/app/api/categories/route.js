 

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

// Add a Category
export const POST = async (request) => {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const { title, slug, color, categoryDesc } = await request.json();

    if (!title || !slug) {
      return new NextResponse(
        JSON.stringify({ message: "Title and Slug are required." }),
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        title,
        slug,
        color,
        categoryDesc,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Edit a Category
export const PUT = async (request) => {

  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const { id, title, slug, color, categoryDesc } = await request.json();

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Category ID is required." }),
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        title,
        slug,
        color,
        categoryDesc,
      },
    });

    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Delete a Category
export const DELETE = async (request) => {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const { id } = await request.json();

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Category ID is required." }),
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return new NextResponse(
      JSON.stringify({ message: "Category deleted successfully." }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Get the Most Popular Post from Each Category
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany(
      // {
    //   include: {
    //     Posts: {
    //       orderBy: {
    //         views: "desc", },
    //       take: 1,  }, }, }
    );

    // const mostPopularPosts = categories.map((category) => ({
    //   title: category.title,
    //   id: category.id,
    //   slug: category.slug,
    //   img: category.img,
    //   categoryDesc: category.categoryDesc,
    //   post: category.Posts[0],
    // }));

    // return new NextResponse(JSON.stringify(mostPopularPosts), { status: 200 });
    return new NextResponse(JSON.stringify(categories), { status: 200 });

  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};










