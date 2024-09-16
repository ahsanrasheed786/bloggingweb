import prisma from "@/utils/connect";
import  checkAccess  from "@/utils/authontication";

export async function GET(request,{ params }) {
  try {
    const entry = await prisma.varifydoctor.findUnique({
      where: { id: params.id },
    });
    if (!entry) {
      return new Response('Entry not found', { status: 404 });
    }
    return new Response(JSON.stringify(entry), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch varify entry:', error);
    return new Response('Failed to fetch varify entry', { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    const data = await request.json();
    const updatedEntry = await prisma.varifydoctor.update({
      where: { id: params.id },
      data,
    });
    return new Response(JSON.stringify(updatedEntry), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update varify entry:', error);
    return new Response('Failed to update varify entry', { status: 500 });
  }
}

 
 

export async function DELETE(request, { params }) {
  const canAccess = await checkAccess();
  if (canAccess.status!=200) {
   return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
 }
  try {
    // Extract the ID from params
    const { id } = params;

    // Validate ID
    if (!id) {
      return new Response('ID is required', { status: 400 });
    }

    // Attempt to delete the entry
    const deletedEntry = await prisma.varifydoctor.delete({
      where: { id },
    });

    // Check if entry was actually deleted
    if (!deletedEntry) {
      return new Response('Entry not found', { status: 404 });
    }

    return new Response('Entry deleted successfully', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Failed to delete varify entry:', error);

    // Return a detailed error message
    return new Response('Failed to delete varify entry', { status: 500 });
  }
}