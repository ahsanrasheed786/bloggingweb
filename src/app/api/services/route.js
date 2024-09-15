import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching services', error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newService = await prisma.service.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating service', error }, { status: 500 });
  }
}
