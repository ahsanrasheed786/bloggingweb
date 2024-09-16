
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import  checkAccess  from "@/utils/authontication";

 
export async function GET() {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const ads = await prisma.ads.findMany();
    return NextResponse.json(ads);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching ads', error }, { status: 500 });
  }
}

 export async function POST(request) {
  const canAccess = await checkAccess();
  if (!canAccess.status===200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const body = await request.json();
    const newAd = await prisma.ads.create({
      data: {
        img: body.img,
        slug: body.slug,
        discount: body.discount,
        description: body.description,
        name: body.name,
        contact: body.contact,
      },
    });
    return NextResponse.json(newAd);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating ad', error }, { status: 500 });
  }
}

 