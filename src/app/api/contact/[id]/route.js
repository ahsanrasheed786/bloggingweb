import prisma from "@/utils/connect";

// PATCH: Mark as Read
export const PATCH = async (req, { params }) => {
  const { id } = params;
  
  try {
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { read: true }, // Mark as read
    });

    return new Response(JSON.stringify(updatedContact), { status: 200 });
  } catch (error) {
    console.error('Failed to mark as read:', error);
    return new Response(JSON.stringify({ error: 'Failed to mark as read' }), { status: 500 });
  }
};

// DELETE: Delete Contact
export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.contact.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Contact deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete contact' }), {
      status: 500,
    });
  }
};
