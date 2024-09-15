
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');  
//     if (!id) {
//       return NextResponse.json({ message: 'No id provided' }, { status: 400 });
//     }
//     const ad = await prisma.ads.findUnique({
//       where: { id: parseInt(id) },  
//     });
//     if (!ad) {
//       return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
//     }
//     return NextResponse.json(ad);
//   } catch (error) {
//     return NextResponse.json({ message: 'Error fetching ad', error }, { status: 500 });
//   }
// }
export async function GET(request, { params }) {
  const { id } = params;
  // console.log(id);
  try {
    const ad = await prisma.ads.findUnique({
      where: { id },  
    })

    if (!ad) {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching ad', error }, { status: 500 });
  }
}
export async function PUT(request) {
    try {
      const body = await request.json();
      const updatedAd = await prisma.ads.update({
        where: { id: body.id },
        data: {
          img: body.img,
          slug: body.slug,
          discount: body.discount,
          description: body.description,
          name: body.name,
          contact: body.contact,
        },
      });
      return NextResponse.json(updatedAd);
    } catch (error) {
      return NextResponse.json({ message: 'Error updating ad', error }, { status: 500 });
    }
  }
  
   export async function DELETE(request) {
    try {
      const body = await request.json();
      await prisma.ads.delete({
        where: { id: body.id },
      });
      return NextResponse.json({ message: 'Ad deleted successfully' });
    } catch (error) {
      return NextResponse.json({ message: 'Error deleting ad', error }, { status: 500 });
    }
  }
  