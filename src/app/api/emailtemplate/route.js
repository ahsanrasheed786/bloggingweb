 
import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
import prisma from '@/utils/connect';

// GET: Fetch all email templates
export async function GET() {
  try {
    const templates = await prisma.emailTemplate.findMany();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Error fetching templates' }, { status: 500 });
  }
}

// POST: Create a new email template, ensuring only one template exists
export async function POST(req) {
  const { subject, textBody, htmlBody, templateType } = await req.json();

  try {
    // Delete existing templates before creating a new one
    // await prisma.emailTemplate.deleteMany();

    // Create the new template
    const newTemplate = await prisma.emailTemplate.create({
      data: {
        subject,
        textBody,
        htmlBody,
        templateType,
      },
    });

    return NextResponse.json(newTemplate);
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Error creating template' }, { status: 500 });
  }
}
