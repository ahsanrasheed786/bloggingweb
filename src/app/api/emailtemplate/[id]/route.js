import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
import prisma from '@/utils/connect';
import  checkAccess  from "@/utils/authontication";

// PUT: Update the email template
export async function PUT(req, { params }) {
  const canAccess = await checkAccess();
   if (canAccess.status!=200) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;
  const { subject, textBody, htmlBody, templateType } = await req.json();

  try {
    const updatedTemplate = await prisma.emailTemplate.update({
    //   where: { id: parseInt(id, 10) },
    where: { id },
      data: {
        subject,
        textBody,
        htmlBody,
        templateType,
      },
    });
    return NextResponse.json(updatedTemplate);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ error: 'Error updating template' }, { status: 500 });
  }
}

// DELETE: Delete a template by ID
export async function DELETE(req, { params }) {
  const canAccess = await checkAccess();
   if (canAccess.status!=200) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { id } = params;

  try {
    await prisma.emailTemplate.delete({
    //   where: { id: parseInt(id, 10) },
    where: { id },
    });
    return NextResponse.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: 'Error deleting template' }, { status: 500 });
  }
}
