
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

 
export async function GET() {
  try {
    const ads = await prisma.ads.findMany();
    return NextResponse.json(ads);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching ads', error }, { status: 500 });
  }
}

 export async function POST(request) {
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

 