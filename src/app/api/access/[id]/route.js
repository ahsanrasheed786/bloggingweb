import prisma from "@/utils/connect";

// Handle PATCH request to update the isAdmin status
export async function PATCH(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract ID from the URL path

  try {
    const { isAdmin } = await req.json();

    // Validate input
    if (typeof isAdmin !== 'boolean') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    // Update the user in the database
    const updatedAccess = await prisma.access.update({
      where: { id },
      data: { isAdmin },
    });

    return new Response(JSON.stringify(updatedAccess), { status: 200 });
  } catch (error) {
    console.error('Error updating access:', error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Failed to update data' }), { status: 500 });
  }
}

// Handle DELETE request to delete a user
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract ID from the URL path

  try {
    // Delete the user from the database
    const deletedAccess = await prisma.access.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedAccess), { status: 200 });
  } catch (error) {
    console.error('Error deleting access:', error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), { status: 500 });
  }
}
