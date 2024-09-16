import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const slug = id;
// console.log(id);
  try {
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching service', error }, { status: 500 });
  }
} 
export async function PUT(request, { params }) {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
    const { id } = params;
    const body = await request.json();
  
    // Remove `id` and `createdAt` from the request body before updating
    const { id: _id, createdAt, ...data } = body; // Spread operator to exclude `id` and `createdAt`
  
    try {
      const updatedService = await prisma.service.update({
        where: { id },
        data: {
          ...data,
          // Other fields are automatically handled here
        },
      });
      return NextResponse.json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      return NextResponse.json({ message: 'Error updating service', error }, { status: 500 });
    }
  }
  
  
export async function DELETE(request, { params }) {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  const { id } = params;

  try {
    await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
  }
}
