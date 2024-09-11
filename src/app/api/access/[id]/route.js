import prisma from "@/utils/connect.js";

// Handle PATCH request to update the isAdmin status
export async function PATCH(req, { params }) {
  const { id } = params; // Access the dynamic id from the URL

  console.log("Received ID for update:", id); // Log the id to confirm it's received

  try {
    const { isAdmin } = await req.json();

    // Validate input
    if (typeof isAdmin !== 'boolean') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the user in the database
    const updatedAccess = await prisma.access.update({
      where: { id },
      data: { isAdmin },
    });

    return new Response(JSON.stringify(updatedAccess), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating access:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Failed to update data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle DELETE request to delete a user
export async function DELETE(req, { params }) {
  const { id } = params; // Access the dynamic id from the URL

  console.log("Received ID for delete:", id); // Log the id to confirm it's received

  try {
    // Delete the user from the database
    const deletedAccess = await prisma.access.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedAccess), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting access:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Failed to delete data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
